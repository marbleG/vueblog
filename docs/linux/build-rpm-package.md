# 构建 RPM 包完整指南

RPM（Red Hat Package Manager）是基于 Red Hat 的发行版（如 RHEL、CentOS、Fedora、openEuler 等）使用的软件包管理格式。本文将详细介绍如何从零开始构建自己的 RPM 包。

## 一、基本原理

### 1.1 工作空间结构

RPM 构建使用一套标准化的工作空间，通过 `rpmdev-setuptree` 命令自动创建：

```bash
$ rpmdev-setuptree
```

执行后会在用户目录下生成 `rpmbuild` 目录，结构如下：

| 目录 | 宏代码 | 功能 |
|------|--------|------|
| `~/rpmbuild/BUILD` | `%_builddir` | 构建目录，源码包解压至此，完成编译 |
| `~/rpmbuild/RPMS` | `%_rpmdir` | 保存生成的二进制 RPM 包 |
| `~/rpmbuild/SOURCES` | `%_sourcedir` | 存放源码包（.tar.gz 等）和所有 patch 补丁 |
| `~/rpmbuild/SPECS` | `%_specdir` | 存放 RPM 包配置（.spec）文件 |
| `~/rpmbuild/SRPMS` | `%_srcrpmdir` | 生成/保存源码 RPM 包 |

### 1.2 构建阶段

RPM 构建分为多个阶段，每个阶段在 `.spec` 文件中通过宏定义：

| 阶段 | 读取目录 | 写入目录 | 具体动作 |
|------|----------|----------|----------|
| `%prep` | `%_sourcedir` | `%_builddir` | 读取源代码和 patch，解压源代码至构建目录并应用补丁 |
| `%build` | `%_builddir` | `%_builddir` | 编译位于构建目录下的文件，执行 `./configure && make` |
| `%install` | `%_builddir` | `%_buildrootdir` | 将编译好的文件安装至 `%_buildrootdir`，这就是用户安装 RPM 后最终得到的文件结构 |
| `%check` | `%_builddir` | `%_builddir` | 检查软件是否正常运行，执行 `make test` |
| 二进制构建 | `%_buildrootdir` | `%_rpmdir` | 从最终安装目录读取文件，在 `%_rpmdir` 下创建 RPM 包，不同架构保存到不同子目录 |
| 源码构建 | `%_sourcedir` | `%_srcrpmdir` | 创建源码 RPM 包（.src.rpm），用于审核和升级软件包 |

## 二、环境准备

### 2.1 安装依赖工具

在 openEuler / CentOS / Fedora 上：

```bash
# openEuler / CentOS 使用 dnf
$ dnf install rpmdevtools rpm-build

# Fedora 完整安装开发工具
$ dnf install @development-tools fedora-packager rpmdevtools
```

### 2.2 推荐做法：使用非 root 用户构建

> **安全提示**：不要使用 root 用户进行打包操作。如果构建过程出现错误，可能会破坏系统。

```bash
# 创建专门用于构建 RPM 的用户
$ useradd makerpm
$ usermod -a -G mock makerpm
$ passwd makerpm
```

切换到该用户后，执行初始化：

```bash
$ su - makerpm
$ rpmdev-setuptree
```

## 三、完整示例：构建 Hello World RPM 包

我们以 GNU Hello World 项目为例，演示完整的构建过程。

### 3.1 下载源码

将源码放入 `SOURCES` 目录：

```bash
$ cd ~/rpmbuild/SOURCES
$ wget http://ftp.gnu.org/gnu/hello/hello-2.10.tar.gz
```

### 3.2 编写 SPEC 文件

在 `SPECS` 目录下创建 `hello.spec`：

```bash
$ cd ~/rpmbuild/SPECS
$ vim hello.spec
```

写入以下内容：

```spec
Name:           hello
Version:        2.10
Release:        1%{?dist}
Summary:        The "Hello World" program from GNU
Summary(zh_CN): GNU "Hello World" 程序

License:        GPLv3+
URL:            http://ftp.gnu.org/gnu/hello
Source0:        http://ftp.gnu.org/gnu/hello/%{name}-%{version}.tar.gz

BuildRequires:  gettext
Requires(post): info
Requires(preun): info

%description
The "Hello World" program, done with all bells and whistles of a proper FOSS
project, including configuration, build, internationalization, help files, etc.

%description -l zh_CN
"Hello World" 程序, 包含 FOSS 项目所需的所有部分, 包括配置, 构建, 国际化, 帮助文件等.

%prep
%setup -q

%build
%configure
make %{?_smp_mflags}

%install
make install DESTDIR=%{buildroot}
%find_lang %{name}
rm -f %{buildroot}/%{_infodir}/dir

%post
/sbin/install-info %{_infodir}/%{name}.info %{_infodir}/dir || :

%preun
if [ $1 = 0 ] ; then
/sbin/install-info --delete %{_infodir}/%{name}.info %{_infodir}/dir || :
fi

%files -f %{name}.lang
%doc AUTHORS ChangeLog NEWS README THANKS TODO
%license COPYING
%{_mandir}/man1/hello.1.*
%{_infodir}/hello.info.*
%{_bindir}/hello

%changelog
* Thu Dec 26 2019 Your Name <youremail@xxx.xxx> - 2.10-1
- Update to 2.10
* Sat Dec 3 2016 Your Name <youremail@xxx.xxx> - 2.9-1
- Update to 2.9
```

### 3.3 SPEC 文件关键字说明

| 关键字 | 说明 |
|--------|------|
| `Name` | 软件包名称 |
| `Version` | 软件版本号 |
| `Release` | 发布编号，`%{?dist}` 表示自动添加发行版后缀 |
| `Summary` | 软件包简要说明 |
| `License` | 软件授权协议 |
| `URL` | 项目主页 |
| `Source0` | 源代码下载地址 |
| `BuildRequires` | 构建依赖的软件包 |
| `Requires` | 运行时依赖的软件包 |

### 3.4 检查 SPEC 文件

使用 `rpmlint` 检查常见错误：

```bash
$ rpmlint hello.spec
```

根据输出修复错误和警告。

### 3.5 开始构建

同时构建二进制包和源码包：

```bash
$ rpmbuild -ba hello.spec
```

常用的 `rpmbuild` 选项：

| 选项 | 说明 |
|------|------|
| `-ba specfile` | 同时构建源码包和二进制包 |
| `-bb specfile` | 只构建二进制包 |
| `-bs specfile` | 只构建源码包 |
| `--clean` | 完成打包后清除构建目录 |
| `--nobuild` | 不执行实际构建，仅测试 spec 文件 |

### 3.6 获取构建结果

构建成功后，产物输出到：

- 二进制 RPM：`~/rpmbuild/RPMS/<arch>/hello-2.10-1.<arch>.rpm`
- 源码 RPM：`~/rpmbuild/SRPMS/hello-2.10-1.src.rpm`

查看产物：

```bash
$ tree ~/rpmbuild/*RPMS
/home/makerpm/rpmbuild/RPMS
└── x86_64
    ├── hello-2.10-1.el8.x86_64.rpm
    └── hello-debuginfo-2.10-1.el8.x86_64.rpm
/home/makerpm/rpmbuild/SRPMS
└── hello-2.10-1.src.rpm
```

## 四、openEuler 专属操作

### 4.1 环境快速搭建

openEuler 本身自带 `rpmdevtools` 源，直接安装即可：

```bash
# root 用户执行
$ dnf install rpmdevtools* -y
```

这会安装 `rpm-build`、`rpmdev-setuptree` 等所有必要工具以及依赖（make、gdb 等）。

### 4.2 在 openEuler 本地构建完整示例

**步骤 1：初始化工作空间**

```bash
# 普通用户执行（不推荐 root）
$ rpmdev-setuptree
```

**步骤 2：下载源码到 SOURCES**

```bash
$ cd ~/rpmbuild/SOURCES
$ wget http://ftp.gnu.org/gnu/hello/hello-2.10.tar.gz
```

**步骤 3：编写 SPEC 文件**

```bash
$ cd ~/rpmbuild/SPECS
$ vim hello.spec
# 粘贴示例内容，参考前文
```

**步骤 4：开始构建**

```bash
$ rpmbuild -ba hello.spec
```

**步骤 5：查看产物**

```bash
$ ls ~/rpmbuild/RPMS/$(uname -m)/
hello-2.10-1.oe1.<arch>.rpm
hello-debuginfo-2.10-1.oe1.<arch>.rpm
hello-debugsource-2.10-1.oe1.<arch>.rpm
```

可以看到 openEuler 会自动生成调试信息包 `debuginfo` 和 `debugsource`，方便后期问题定位。

### 4.3 使用 openEuler OBS 构建

openEuler 提供了公共 OBS 服务：**https://build.openeuler.openatom.cn/**

对于 openEuler 开发者推荐使用 OBS 构建，好处：

- 自动适配 openEuler 不同版本（20.03、21.03、22.03、23.09 等）
- 自动支持多架构（x86_64、ARM64、RISC-V 等）
- 集成社区打包规范检查
- 可以直接贡献到官方仓库

**openEuler OBS 快速上手：**

1. 使用 Gitee 账号登录 OBS
2. 找到需要修改的软件包，点击 **Branch package**
3. 在你的分支修改 spec 或源码
4. 提交修改后 OBS 自动构建
5. 构建成功后可以下载产物，或者提 Pull Request 合入官方

### 4.4 openEuler 打包规范

openEuler 社区有统一的打包规范，详见：[openEuler 打包规则](https://gitee.com/openeuler/community/blob/master/zh/contributors/packaging.md)

关键要点：

- 必须符合开源许可证要求
- 一个软件包只包含一个主要功能
- 不允许捆绑静态库
- 必须包含 `%changelog` 记录变更

## 五、rpmbuild 常用选项速查

| 选项 | 功能 |
|------|------|
| `-bp specfile` | 从 `%prep` 阶段开始构建（解开源码包并打补丁） |
| `-bc specfile` | 从 `%build` 阶段开始构建 |
| `-bi specfile` | 从 `%install` 阶段开始构建 |
| `-bl specfile` | 从 `%files` 阶段开始检查文件是否齐全 |

## 六、使用 OBS 在线构建 RPM

OBS（Open Build Service）是一个通用编译框架，支持在线构建 RPM 包，无需本地配置复杂环境。

### 5.1 OBS 简介

- 支持多种 Linux 发行版（openEuler、SUSE、Fedora 等）
- 支持多种架构（x86_64、ARM64 等）
- 自动化分布式编译
- 适合多人协作和官方软件包维护

### 5.2 在 OBS 新增软件包步骤

1. 注册并登录 OBS 界面（例如 openEuler 的 OBS：https://build.openeuler.openatom.cn/）
2. 选择合适的工程，点击 **Branch package** 继承已有环境
3. 删除默认创建的示例软件包
4. 点击 **Create Package**，输入软件包信息
5. 点击 **Add file** 上传你的 `.spec` 文件和源码
6. 上传完成后，OBS 自动开始构建
7. 等待构建完成，在 **Repositories** 页签下载产物

### 5.3 使用 osc 命令行工具

OBS 提供命令行工具 `osc`，可以在本地操作：

```bash
# 安装 osc
$ dnf install osc build

# 配置认证信息
$ vim ~/.oscrc
```

`~/.oscrc` 配置示例：

```ini
[general]
apiurl = https://build.openeuler.openatom.cn/
[https://build.openeuler.openatom.cn/]
user=你的用户名
pass=你的密码
```

基本操作流程：

```bash
# 创建分支
$ osc branch openEuler:Mainline zlib

# 检出到本地
$ osc co home:你的用户名:branches:openEuler:Mainline/zlib

# 修改后提交
$ osc addremove
$ osc ci -m "更新说明"
```

OBS 会自动触发构建，可以通过网页或命令行查看构建日志。

## 七、RPM 包基础操作：dnf / rpm / yum 常用命令

构建完 RPM 包后，需要安装、查询、管理。以下是 openEuler / CentOS 中常用的包管理命令：

### 7.1 rpm 命令（直接操作 .rpm 文件）

| 命令 | 说明 |
|------|------|
| `rpm -ivh package.rpm` | 安装包并显示进度 |
| `rpm -Uvh package.rpm` | 升级包 |
| `rpm -evh package` | 卸载包 |
| `rpm -qa` | 查询所有已安装的包 |
| `rpm -qa \| grep keyword` | 搜索已安装的包 |
| `rpm -qi package` | 查询包的详细信息 |
| `rpm -ql package` | 列出包安装的所有文件路径 |
| `rpm -qf /path/to/file` | 查询某个文件属于哪个包 |
| `rpm -qp -ql package.rpm` | 查看未安装的 rpm 包内包含哪些文件 |
| `rpm -V package` | 校验已安装包的文件是否被修改 |

示例：
```bash
# 安装我们刚刚构建的 hello 包
$ rpm -ivh ~/rpmbuild/RPMS/x86_64/hello-2.10-1.oe1.x86_64.rpm

# 查询安装的文件位置
$ rpm -ql hello
/usr/bin/hello
/usr/info/hello.info
/usr/share/man/man1/hello.1.gz

# 测试运行
$ hello
Hello, world!
```

### 7.2 dnf 命令（openEuler / CentOS 8+ 默认包管理器）

openEuler 和新版 CentOS 默认使用 `dnf` 作为包管理器：

| 命令 | 说明 |
|------|------|
| `dnf install package` | 安装包 |
| `dnf update package` | 更新包 |
| `dnf remove package` | 移除包 |
| `dnf search keyword` | 搜索仓库中包 |
| `dnf info package` | 查看包信息 |
| `dnf list installed` | 列出所有已安装包 |
| `dnf list available` | 列出可升级的包 |
| `dnf provides /path/to/file` | 查询哪个包提供了这个文件 |
| `dnf clean all` | 清理缓存 |
| `dnf makecache` | 重建缓存 |
| `dnf group list` | 列出组件组 |
| `dnf group install "Development Tools"` | 安装开发工具组 |

示例：安装 rpm 构建工具组
```bash
$ dnf group install "Development Tools"
```

### 7.3 yum 命令（旧版 CentOS 使用）

`yum` 是旧版 CentOS 的包管理器，用法和 `dnf` 几乎一致：

| dnf | yum 对应 | 功能 |
|-----|---------|------|
| `dnf install` | `yum install` | 安装 |
| `dnf update` | `yum update` | 更新 |
| `dnf remove` | `yum remove` | 删除 |
| `dnf search` | `yum search` | 搜索 |
| `dnf clean all` | `yum clean all` | 清理缓存 |

### 7.4 dnf 相比 yum 的优势

`dnf` 是 yum 的下一代替代版本，主要改进：

| 特性 | dnf | yum |
|------|-----|-----|
| **依赖解析** | 使用现代的 SAT 算法，依赖解析更快更准确 | 依赖解析算法较旧，复杂场景容易出错 |
| **性能** | 占用内存更少，速度更快 | 相同操作下更慢 |
| **插件架构** | 稳定的API，插件开发更方便 | 私有API，插件开发困难 |
| **历史记录** | 更好的事务历史记录，可以更好回滚 | 记录功能较弱 |
| **开发维护** | 活跃开发持续更新 | 已停止活跃开发 |

> openEuler 和 CentOS 8+ 默认使用 `dnf`，旧 yum 仅用于兼容旧系统。在 openEuler 中 `yum` 命令已被兼容指向 `dnf`。

### 7.5 本地 RPM 包依赖解决

如果你手里有一个本地 `.rpm` 文件，直接用 `rpm -ivh` 安装可能会报依赖错误，这时可以用 `dnf` 解决依赖：

```bash
# dnf 会自动从仓库安装缺失依赖
$ dnf localinstall ./your-package.rpm

# 新版 dnf 也可以直接用 install 安装本地文件
$ dnf install ./your-package.rpm
```

## 八、最佳实践与注意事项

1. **不要使用 root 构建**：避免构建脚本错误破坏系统文件
2. **检查许可证**：必须明确指定正确的开源许可证
3. **不要捆绑依赖**：外部依赖库应该单独打包，不要和主程序捆绑在一起
4. **使用 rpmlint 检查**：构建前用 `rpmlint` 检查 spec 文件和产物，可以避免大部分常见错误
5. **保留变更日志**：`%changelog` 要记录每个版本的变更内容，特别是安全修复
6. **分离调试信息**：现代 RPM 构建工具会自动生成 debuginfo 包，有助于后续问题定位

## 九、参考资料

- [openEuler 官方文档 - 构建 RPM 包](https://docs.openeuler.org/zh/docs/21.03/docs/ApplicationDev/%E6%9E%84%E5%BB%BARPM%E5%8C%85.html)
- [Fedora 官方 Wiki - How to create an RPM package](https://fedoraproject.org/wiki/How_to_create_an_RPM_package/zh-cn)
- [Red Hat 官方 RPM 打包指南](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html-single/rpm_packaging_guide/index)
