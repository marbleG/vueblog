import{_ as a,c as n,e,o as i}from"./app-OQtyNMaF.js";const l="/assets/img-DSvaUaRu.png",c={};function p(d,s){return i(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="linux学习" tabindex="-1"><a class="header-anchor" href="#linux学习"><span>linux学习</span></a></h1><h2 id="磁盘管理" tabindex="-1"><a class="header-anchor" href="#磁盘管理"><span>磁盘管理</span></a></h2><ol><li>新加磁盘</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">lsblk</span>
<span class="line"><span class="token function">parted</span> /dev/sdc print</span>
<span class="line"><span class="token function">fdisk</span> /dev/sdc <span class="token comment">#新建GPT分区表，g w</span></span>
<span class="line">gdisk /dev/sdc <span class="token comment">#新建GPT分区</span></span>
<span class="line">partprobe <span class="token comment">#更新linux核心的分区表信息】</span></span>
<span class="line">mkfs.ext4 /dev/sdc1 <span class="token comment">#磁盘格式化（建置文件系统）</span></span>
<span class="line">fsck.ext4 /dev/sdc1 <span class="token comment">#文件系统检测</span></span>
<span class="line">blkid <span class="token comment">#获取待挂载分区/文件系统</span></span>
<span class="line"><span class="token function">mount</span> /dev/sdc1 /data/ext4 <span class="token comment">#挂载</span></span>
<span class="line"><span class="token function">df</span> /data/ext4 <span class="token comment">#查看是否挂载</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>扩缩容</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">lsblk</span>
<span class="line">blkid</span>
<span class="line"><span class="token function">parted</span> /dev/sda print</span>
<span class="line"><span class="token function">fdisk</span> /dev/sda</span>
<span class="line"><span class="token comment">#1.d 2    --删除待扩容分区</span></span>
<span class="line"><span class="token comment">#2.n 2    --重建待扩容分区</span></span>
<span class="line"><span class="token comment">#3.2048   --重建待扩容分区开始大小</span></span>
<span class="line"><span class="token comment">#4.+10G   --重建待扩容分区结束大小</span></span>
<span class="line"><span class="token comment">#5.w</span></span>
<span class="line">resize2fs /dev/sda2</span>
<span class="line"></span>
<span class="line"><span class="token function">parted</span> /dev/sda</span>
<span class="line"><span class="token comment">#resizepart 2 30G</span></span>
<span class="line">resize2fs /dev/sda2</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>清空磁盘</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">of</span><span class="token operator">=</span>/dev/sdd <span class="token assign-left variable">bs</span><span class="token operator">=</span>1M <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">10</span> <span class="token assign-left variable">conv</span><span class="token operator">=</span>fsync</span>
<span class="line">wipefs <span class="token parameter variable">-a</span> <span class="token parameter variable">-f</span> /dev/sdd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>分区软件：GParted</p><h2 id="网络管理" tabindex="-1"><a class="header-anchor" href="#网络管理"><span>网络管理</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">用户权限</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">su</span> - root</span>
<span class="line"><span class="token function">passwd</span></span>
<span class="line"><span class="token comment">#/etc/network/interfaces.d/setup</span></span>
<span class="line">auto lo</span>
<span class="line">iface lo inet loopback</span>
<span class="line"></span>
<span class="line">auto eth0</span>
<span class="line">iface eth0 inet dhcp</span>
<span class="line"></span>
<span class="line">auto enp0s8</span>
<span class="line">iface enp0s8 inet static</span>
<span class="line">address <span class="token number">192.168</span>.56.101</span>
<span class="line">netmask <span class="token number">255.255</span>.255.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>##服务 <img src="`+l+'" alt="img.png"></p>',12)])])}const o=a(c,[["render",p]]),r=JSON.parse('{"path":"/linux/","title":"linux学习","lang":"zh-CN","frontmatter":{"publish":true,"tags":["linux","已发布"]},"git":{"updatedTime":1785203748000,"contributors":[{"name":"mabofu","username":"mabofu","email":"1218892028@qq.com","commits":6,"url":"https://github.com/mabofu"},{"name":"Ma, Bofu","username":"","email":"bfma@linx-info.com","commits":1}],"changelog":[{"hash":"cd3026482dc3b1ff6a1d3cea702000413e4ffbd7","time":1785203748000,"email":"bfma@linx-info.com","author":"Ma, Bofu","message":"feat: 博客新增 AI 一级分类并发布 Copilot 工作流文章"},{"hash":"fc8399437ff0ef441daa5f8684407d9fa48223d9","time":1783169485000,"email":"1218892028@qq.com","author":"mabofu","message":"feat: migrate existing docs articles to vault/Publish/"},{"hash":"822b6e211366d84cb9148691afd0bd460335baab","time":1674868806000,"email":"dev16302@linx-info.com","author":"mabofu","message":"add java develop"},{"hash":"0d576ba562a34aabe2dddd1bfb573c033cdf9f48","time":1670573795000,"email":"dev16302@linx-info.com","author":"mabofu","message":"Add 清空磁盘命令"},{"hash":"3b4cd8951682a89ebb576fc30ea663168ed9a721","time":1669296373000,"email":"1218892028@qq.com","author":"mabofu","message":"新加磁盘"},{"hash":"681b81e8fc2d2e5d9361a3ad74fccceda9049396","time":1667921581000,"email":"1218892028@qq.com","author":"mabofu","message":"分区扩缩容"},{"hash":"284f7e614600f68ef9fa61cfd0025a60e62d9b47","time":1667835883000,"email":"1218892028@qq.com","author":"mabofu","message":"ceph crush"}]},"filePathRelative":"linux/README.md"}');export{o as comp,r as data};
