import{_ as n,c as a,a as i,o as l}from"./app-ZssbyP6J.js";const e="/assets/img-Ccm5WmT_.png",p={};function c(d,s){return l(),a("div",null,[...s[0]||(s[0]=[i(`<h1 id="存储" tabindex="-1"><a class="header-anchor" href="#存储"><span>存储</span></a></h1><h3 id="_1-集中式存储" tabindex="-1"><a class="header-anchor" href="#_1-集中式存储"><span>1. 集中式存储</span></a></h3><ol><li>DAS</li><li>NAS</li><li>SAN:SCSI</li></ol><h3 id="_2-分布式存储" tabindex="-1"><a class="header-anchor" href="#_2-分布式存储"><span>2. 分布式存储</span></a></h3><ol><li>块存储 磁盘（未格式化）,性能要求高</li><li>文件系统存储 （NAS），文本编辑</li><li>对象存储 上传 下载 备份 4. 2006 亚马逊 s3</li></ol><h4 id="_2-1-ceph" tabindex="-1"><a class="header-anchor" href="#_2-1-ceph"><span>2.1 ceph</span></a></h4><pre><code>软件定义的开源文件解决方案，对象存储重点（s3,swift）
</code></pre><p>版本：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#相关操作</span></span>
<span class="line"><span class="token comment">#部署</span></span>
<span class="line"><span class="token comment">#1.ceph-deploy方式</span></span>
<span class="line"><span class="token comment">#主机名 不能更改</span></span>
<span class="line"><span class="token comment">#主机名解析</span></span>
<span class="line"></span>
<span class="line">/etc/hosts</span>
<span class="line"><span class="token comment">#yum ceph安装</span></span>
<span class="line"><span class="token comment">#ssh免密</span></span>
<span class="line"></span>
<span class="line">ceph-deploy new ceph1 ceph2 ceph3</span>
<span class="line">yum <span class="token function">install</span> ceph</span>
<span class="line">ceph-deploy mon create-initial</span>
<span class="line">ceph-deploy admin ceph1 ceph2 ceph3</span>
<span class="line">ceph-deploy mgr create ceph1 ceph2 ceph3</span>
<span class="line"></span>
<span class="line">ceph-deploy osd create <span class="token parameter variable">--data</span> /dev/sdb ceph1_osd</span>
<span class="line"></span>
<span class="line">lsblk</span>
<span class="line">blkid</span>
<span class="line"><span class="token comment">#ceph 相关命令</span></span>
<span class="line">ceph <span class="token parameter variable">--version</span></span>
<span class="line">ceph osd tree</span>
<span class="line">ceph osd pool create mypool <span class="token number">8</span></span>
<span class="line">ceph pg dump pgs_brief</span>
<span class="line">ceph osd pool get mypool all</span>
<span class="line"></span>
<span class="line"><span class="token comment">#块存储</span></span>
<span class="line">ceph osd pool application <span class="token builtin class-name">enable</span> mypool rbd</span>
<span class="line">rbd create mypool/disk01 <span class="token parameter variable">--size</span> 1G</span>
<span class="line">rbd map mypool/disk01</span>
<span class="line">ll /dev/rbd0</span>
<span class="line">mkfs.ext4 /dev/rbd0</span>
<span class="line"></span>
<span class="line"><span class="token comment">#2.cephadm</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#3.手动</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#4.ceph-ansible</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>架构</p><ol><li>服务 <ol><li>mon 集群所有信息,状态，入口</li><li>mgr 监控，收集所有信息,查询操作</li><li>mds 元数据</li></ol></li><li>osd 磁盘</li><li>pool 存储池 逻辑概念 ，先创建 <ol><li><code>ceph osd pool ls detail</code></li><li>pg: 归置组，看不见，对象名hash计算后存到PG上（crush1），PG根据pool的类型和副本数放到对应的osd( crush2)</li><li>pgp:</li></ol></li><li>rdb 块</li><li>iSCSI（Internet Small Computer System Interface）是一种在IP网络上运行的存储协议，它将SCSI协议封装在TCP/IP协议中，可以通过网络提供块级存储服务。iSCSI架构通常包括以下组件： <ol><li>iSCSI initiator：发起iSCSI请求的主机或设备，它使用iSCSI协议访问iSCSI target上的存储资源。</li><li>iSCSI target：提供存储资源的设备或主机，它使用iSCSI协议响应iSCSI initiator的请求，并将存储资源映射到iSCSI LUN（Logical Unit Number）。</li><li>iSCSI LUN：iSCSI target上的逻辑单元号，它可以是一个物理磁盘、一个分区、一个文件或其他存储资源，由iSCSI target管理并映射给iSCSI initiator。</li><li>iSCSI SAN（Storage Area Network）：使用iSCSI协议连接的存储网络，它可以是一个局域网或广域网，连接多个iSCSI initiator和iSCSI target，并提供共享存储资源。</li><li>iSCSI HBA（Host Bus Adapter）：连接iSCSI initiator和iSCSI SAN的网络适配器或网卡，它可以是专用的iSCSI HBA或使用标准网卡实现。</li><li>iSCSI software initiator：在主机上安装的iSCSI initiator软件，它使用主机的网络适配器或网卡连接到iSCSI SAN，并将iSCSI请求转换为SCSI命令。</li><li>在iSCSI架构中，iSCSI initiator通过网络连接到iSCSI target，并访问iSCSI LUN上的存储资源，就像直接连接到本地存储设备一样。通过iSCSI技术，可以实现存储资源的共享、备份、迁移等功能，提高存储资源的利用率和可靠性。</li></ol></li></ol><p>rados是对象数据的底层存储服务由多个主机组成的存储集群 librados 是rados的api 可以使用java</p><p>ceph通过crush 计算后存储在对应的服务器上</p><p>访问方式 基于librados api提供接口</p><ol><li>cephfs 挂载后访问</li><li>rbd 块，相当于提供的磁盘</li><li>RadosGW</li></ol><p>底层rados</p><ol><li>FileStore BlueStore POSIX</li></ol><p><img src="`+e+'" alt="img.png"></p><p>对象存储</p><ol><li>副本，故障域（osd，host）</li></ol>',20)])])}const r=n(p,[["render",c]]),t=JSON.parse('{"path":"/store/","title":"存储","lang":"zh-CN","frontmatter":{},"git":{},"filePathRelative":"store/README.md"}');export{r as comp,t as data};
