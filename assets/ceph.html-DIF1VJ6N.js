import{_ as n,c as a,a as e,o as l}from"./app-ZssbyP6J.js";const i="/assets/img_2-DUx_UPhP.png",p="/assets/img_1-Czt4J2YC.png",c="/assets/img_3-Bm5dfWj9.png",d="/assets/img_4-C-RMWrJ1.png",r="/assets/img_5-CXJ7y3xN.png",t="/assets/img_6-DbuXWSBr.png",o="/assets/img_7-fLLXlsz0.png",m="/assets/img_8-DX-CYkRT.png",u={};function v(h,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="ceph分布式文件系统" tabindex="-1"><a class="header-anchor" href="#ceph分布式文件系统"><span>ceph分布式文件系统</span></a></h1><h2 id="_1-快速入门" tabindex="-1"><a class="header-anchor" href="#_1-快速入门"><span>1.快速入门</span></a></h2><h3 id="_1-集群安装" tabindex="-1"><a class="header-anchor" href="#_1-集群安装"><span>1.集群安装</span></a></h3><h4 id="通过cephadm部署集群" tabindex="-1"><a class="header-anchor" href="#通过cephadm部署集群"><span>通过cephadm部署集群</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">./cephadm add-repo <span class="token parameter variable">--release</span> octopus</span>
<span class="line"><span class="token function">wget</span> <span class="token parameter variable">-q</span> -O- <span class="token string">&#39;https://mirrors.aliyun.com/ceph/keys/release.asc&#39;</span> <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -</span>
<span class="line"><span class="token function">sudo</span> apt-add-repository <span class="token string">&#39;deb https://mirrors.aliyun.com/ceph/debian-octopus/ buster main&#39;</span></span>
<span class="line">./cephadm <span class="token function">install</span></span>
<span class="line"><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/ceph</span>
<span class="line"><span class="token comment">#部署集群</span></span>
<span class="line">cephadm bootstrap --mon-ip <span class="token number">192.168</span>.56.101</span>
<span class="line"><span class="token comment">#新增节点</span></span>
<span class="line">ceph cephadm get-pub-key <span class="token operator">&gt;</span> ~/ceph.pub</span>
<span class="line">ssh-copy-id <span class="token parameter variable">-f</span> <span class="token parameter variable">-i</span> ~/ceph.pub root@marble-p2c</span>
<span class="line">ceph orch <span class="token function">host</span> <span class="token function">add</span> marble-p2c <span class="token number">192.168</span>.56.102</span>
<span class="line"><span class="token comment">#新增osd</span></span>
<span class="line">ceph orch daemon <span class="token function">add</span> osd marble-p2c:/dev/sdb</span>
<span class="line"></span>
<span class="line"><span class="token comment">#开启restful</span></span>
<span class="line">ceph restful create-self-signed-cert</span>
<span class="line">ceph restful create-key admin</span>
<span class="line"></span>
<span class="line"><span class="token comment">#新增cephfs</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token comment">#删除集群</span></span>
<span class="line">cephadm rm-cluster <span class="token parameter variable">--fsid</span><span class="token operator">=</span>3b0b3cc8-80e0-11ed-bc04-5254008e5538 <span class="token parameter variable">--force</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通过cephadm移除集群" tabindex="-1"><a class="header-anchor" href="#通过cephadm移除集群"><span>通过cephadm移除集群</span></a></h4><ol><li>cddea848-8fe8-11ed-908a-5254008e5538</li><li><code>cephadm rm-cluster --fsid cddea848-8fe8-11ed-908a-5254008e5538 --force</code></li><li></li></ol><h3 id="_1-集群部署" tabindex="-1"><a class="header-anchor" href="#_1-集群部署"><span>1.集群部署</span></a></h3><h4 id="osd模块" tabindex="-1"><a class="header-anchor" href="#osd模块"><span>osd模块</span></a></h4><ol><li>osd部署 本地磁盘挂载至ceph中 2. 分类 2. blueStore ceph-osd 进程 3. FileStore xfs+ leveldb<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#格式化，非必须</span></span>
<span class="line">mkfs.ext4 /dev/sdb</span>
<span class="line">blkid</span>
<span class="line">ceph-deplay disk list</span>
<span class="line">ceph-deplay disk zap <span class="token comment">#擦除</span></span>
<span class="line">   </span>
<span class="line">ceph-deplay osd create <span class="token function">node</span> <span class="token parameter variable">--data</span> /dev/sdb --block-db </span>
<span class="line">ceph osd tree</span>
<span class="line">ceph osd <span class="token function">ls</span></span>
<span class="line">ceph osd dump</span>
<span class="line">ceph osd status</span>
<span class="line">ceph osd perf <span class="token comment">#统计延迟</span></span>
<span class="line">ceph osd <span class="token function">df</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>osd操作<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">ceph osd pause <span class="token comment">#暂停接受数据</span></span>
<span class="line">ceph osd unpause</span>
<span class="line">ceph osd crush reweight osd.编号 <span class="token comment">#修改权重值</span></span>
<span class="line">ceph osd down osd.编号 <span class="token comment">#关闭也会重新启动，只能停服务</span></span>
<span class="line">ceph osd up osd.编号 <span class="token comment">#</span></span>
<span class="line">ceph osd out osd.编号 <span class="token comment">#驱逐出及集群</span></span>
<span class="line">ceph osd <span class="token keyword">in</span> osd.编号 <span class="token comment">#加回集群</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>osd节点<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#删除</span></span>
<span class="line"><span class="token comment">#1.修改权重 osd crush reweight</span></span>
<span class="line"><span class="token comment">#2.停止指定osd进程 systemctl stop</span></span>
<span class="line"><span class="token comment">#3.驱逐出 osd out</span></span>
<span class="line"><span class="token comment">#4.从crush移除osd节点 osd crush  rm</span></span>
<span class="line"><span class="token comment">#5.删除节点 osd rm</span></span>
<span class="line"><span class="token comment">#6.删除osd认证节点 auth rm</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">#添加</span></span>
<span class="line"><span class="token number">1</span>.没有被占用 </span>
<span class="line"><span class="token number">2</span>.格式化</span>
<span class="line"><span class="token number">3</span>.加入集群 ceph-deploy</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h4 id="存储实践" tabindex="-1"><a class="header-anchor" href="#存储实践"><span>存储实践</span></a></h4><ol><li>概念 <ol><li>Pool 逻辑存储区域</li><li>PG 归置组 pool-&gt;pg-&gt;osd</li><li>PGP 维持pg和osd的一种策略</li><li>CRUSH 5. 一致性hash算法将对象名称映射到PG 6. 将PG id 基于crush算法映射到OSD</li></ol></li><li>操作</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">ceph osd pool create 存储池名 <span class="token number">16</span> <span class="token number">16</span> <span class="token comment">#16个pg，16个组</span></span>
<span class="line">ceph osd pool <span class="token function">ls</span></span>
<span class="line">ceph osd pool <span class="token function">ls</span> detail</span>
<span class="line">ceph osd pool stats</span>
<span class="line">rados lspools</span>
<span class="line">rados put 文件对象名<span class="token punctuation">(</span>id<span class="token punctuation">)</span> /path/to/file <span class="token parameter variable">--pool</span> 存储池名 <span class="token comment">#上传文件</span></span>
<span class="line">ceph osd map 存储池 文件对象名<span class="token punctuation">(</span>id<span class="token punctuation">)</span></span>
<span class="line">rados <span class="token function">rm</span> 文件对象名<span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token parameter variable">--pool</span> 存储池名 <span class="token comment">#上传文件</span></span>
<span class="line"></span>
<span class="line">ceph pg dump</span>
<span class="line">ceph pg <span class="token function">ls</span></span>
<span class="line">ceph pg ls-by-pool</span>
<span class="line">ceph pg ls-by-osd</span>
<span class="line"><span class="token comment">#删除</span></span>
<span class="line">ceph osd pool <span class="token function">rm</span> 存储池名 存储池名 </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+i+'" alt="img_2.png"><img src="'+p+`" alt="img_1.png"></p><h2 id="_4-综合实践" tabindex="-1"><a class="header-anchor" href="#_4-综合实践"><span>4. 综合实践</span></a></h2><ol><li>可视化工具 <ol><li>calamari</li><li>VSM</li><li>Inksope</li><li>dashboard python 开发的监控页面，安装在mgr节点上</li></ol></li><li>dashboard</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="3"><li>tls 对dashboard 提供证书访问</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"></div></div><ol start="4"><li>rgw 默认dashboard未开启</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">radosgw-admin user create <span class="token parameter variable">--uid</span><span class="token operator">=</span>rgw --display-name<span class="token operator">=</span>rgw <span class="token parameter variable">--lsb_release</span> <span class="token parameter variable">-a</span></span>
<span class="line"><span class="token builtin class-name">echo</span> access_key/secret_key <span class="token operator">&gt;</span> <span class="token number">1</span>/2.file</span>
<span class="line">ceph dashboard set-rgw-api-access-key <span class="token parameter variable">-i</span> <span class="token number">1</span>.file</span>
<span class="line">ceph dashboard set-rgw-api-secret-key <span class="token parameter variable">-i</span> <span class="token number">1</span>.file</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>监控<br> prometheus<br> 架构</li></ol><h3 id="crush" tabindex="-1"><a class="header-anchor" href="#crush"><span>crush</span></a></h3><h4 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识"><span>基础知识</span></a></h4><ol><li>数据分发算法，多维度的</li><li>寻址的三次映射 3. File和object映射：文件数据object的数据块切片操作，便于多数据的并行化处理 4. object和PG映射：将文件数据切分后的每一个object通过简单的hash算法归到一个PG中 5. PG和OSD映射：将PG映射到主机实际的OSD数据磁盘上</li><li>配置和更改和数据动态再平衡等关键特性 7. osd动态平衡，osd出现异常，避免故障风暴 <img src="`+c+`" alt="img_3.png"></li><li>crush map 不同层次的逻辑Buckets和Devices组成 8. buckets：Root多区域，datacenter数据中心，room机房，rack机柜，host是主机 9. devices: 各种OSD存储设备</li></ol><p>buckets 示例</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">host</span> mon01<span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">id</span> <span class="token parameter variable">-3</span></span>
<span class="line">  <span class="token function">id</span> <span class="token parameter variable">-4</span> class hdd</span>
<span class="line">  weight <span class="token number">0.039</span></span>
<span class="line">  alg straw2</span>
<span class="line">  <span class="token builtin class-name">hash</span> <span class="token number">0</span></span>
<span class="line">  item osd.0 weight <span class="token number">0.019</span> <span class="token comment">#低一层级的bucket名称</span></span>
<span class="line">  item osd.1 weight <span class="token number">0.019</span></span>
<span class="line">  </span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相关操作</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment">#1.获取crush信息</span></span>
<span class="line">ceph osd crush dump</span>
<span class="line"><span class="token comment">#2.操作相关信息 格式转换-&gt;再次应用</span></span>
<span class="line"></span>
<span class="line">ceph osd getcrushmap <span class="token parameter variable">-o</span> crushmap_file.txt</span>
<span class="line">crushtool <span class="token parameter variable">-d</span> crushmap_file.txt </span>
<span class="line">crushtool <span class="token parameter variable">-c</span> crushmap_file.txt <span class="token parameter variable">-o</span> new.txt</span>
<span class="line">ceph osd setcrushmap <span class="token parameter variable">-i</span> new_crushmap_file.txt</span>
<span class="line">ceph osd crush dump<span class="token operator">|</span><span class="token function">grep</span> max_size</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实践：将不同数据存在不同的磁盘中 <img src="`+d+'" alt="img_4.png"> 修改部分 <img src="'+r+'" alt="img_5.png"><img src="'+t+'" alt="img_6.png"> 定制规则 <img src="'+o+'" alt="img_7.png"><img src="'+m+'" alt="img_8.png"></p>',30)])])}const g=n(u,[["render",v]]),k=JSON.parse('{"path":"/store/ceph.html","title":"ceph分布式文件系统","lang":"zh-CN","frontmatter":{},"git":{},"filePathRelative":"store/ceph.md"}');export{g as comp,k as data};
