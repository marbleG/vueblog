import{_ as a,c as e,a as l,o as p}from"./app-ChILCEWf.js";const i="/assets/image-20220928232215966-6Z6hHNAJ.png",c="/assets/image-20220928234255383-4-COBkar.png",t="/assets/1636103641572-BzcCyN3Z.png",n="/assets/image-20220930074909586-DwejHiI5.png",o="/assets/image-20220930111350189-1iJQ8jtn.png",r="/assets/image-20221008220724118-tlDiGDU0.png",d="/assets/image-20221009234113283-BM_1xpZ5.png",u="/assets/image-20221013195313762-BfTxxsE7.png",m="/assets/image-20221013195513390-hbQobYkp.png",v="/assets/image-20221013201943746-D4dPIhhO.png",k="/assets/image-20221013203249531-GwIVASNV.png",b="/assets/image-20221013204353270-BOJAR_II.png",h="/assets/image-20221013210433473-RnkUwfAQ.png",g="/assets/image-20221013211051686-BI2R2SYW.png",w="/assets/image-20221013222600422-Ayw1kQVE.png",y="/assets/1.1.3-2-RySeh4rS.png",f="/assets/image-20211013134435251-Ckbtk-Yu.png",_="/assets/image-20211013111443902-Bt9Inkme.png",x="/assets/image-20221013232913546-F4vcxX1E.png",j="/assets/image-20221013233232284-DSEjtPpK.png",q="/assets/image-20221013233326269-C9O4HJaV.png",S="/assets/image-20221013233442609-DTEAJlym.png",$="/assets/image-20221013234058265-BO8d60L0.png",C="/assets/image-20221013234413884-B4GrlTNi.png",P="/assets/image-20221013234455785-BNZaWbaE.png",A="/assets/image-20221013235206075-DamB1jlp.png",E="/assets/image-20221013235316552-DpXoBGIv.png",R="/assets/image-20220715092558666-Dfxipfr6.png",D="/assets/image-20220715093007357-Cjls28RR.png",O="/assets/image-20221015174850734-CrDqx4Xq.png",G="/assets/image-20221015175059810-Bx0ApBtY.png",T="/assets/kubernetes-1sIzjYGC.png",N="/assets/image-20221016004235785-_Vzkxb4e.png",I="/assets/image-20221016011450922-BvkjTu1C.png",B={};function M(U,s){return p(),e("div",null,[...s[0]||(s[0]=[l(`<h1 id="_1-综合实践" tabindex="-1"><a class="header-anchor" href="#_1-综合实践"><span>1 综合实践</span></a></h1><h2 id="_1-1-存储池" tabindex="-1"><a class="header-anchor" href="#_1-1-存储池"><span>1.1 存储池</span></a></h2><h3 id="_1-1-1-创建实践" tabindex="-1"><a class="header-anchor" href="#_1-1-1-创建实践"><span>1.1.1 创建实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	存储的常用管理操作包括列出、创建、重命名和删除等操作，常用相关的工具都是 “ceph osd pool”的子命令，包括<span class="token function">ls</span>、create、rename和<span class="token function">rm</span>等</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>创建存储池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">副本型存储池创建命令</span>
<span class="line">	ceph osd pool create &lt;pool-name&gt; &lt;pg-num&gt; <span class="token namespace">[pgp-num]</span> <span class="token namespace">[replicated]</span> \\ <span class="token namespace">[crush-rule-name]</span> <span class="token namespace">[expected-num-objects]</span></span>
<span class="line">	</span>
<span class="line">纠删码池创建命令</span>
<span class="line">	ceph osd pool create &lt;pool-name&gt; &lt;pg-num&gt; &lt;pgp-num&gt; erasure \\ <span class="token namespace">[erasure-code-profile]</span> <span class="token namespace">[crush-rule-name]</span> <span class="token namespace">[expected-num-objects]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">命令格式中常用的参数</span>
<span class="line">	pool-name：存储池名称，在一个RADOS存储集群上必须具有唯一性；</span>
<span class="line">	pg-num：当前存储池中的PG数量，合理的PG数量对于存储池的数据分布及性能表现来说至关重要；</span>
<span class="line">	pgp-num ：用于归置的PG数量，其值应该等于PG的数量</span>
<span class="line">	replicated<span class="token punctuation">|</span>erasure：存储池类型；副本存储池需更多原始存储空间，但已实现Ceph支持的所有操作，而纠删码存储池所需原始存储空间较少，但目前仅实现了Ceph的部分操作</span>
<span class="line">	crush-ruleset-name：此存储池所用的CRUSH规则集的名称，不过，引用的规则集必须事先存在</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取存储池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">列出存储池</span>
<span class="line">	ceph osd pool <span class="token function">ls</span> <span class="token namespace">[detail]</span></span>
<span class="line"></span>
<span class="line">获取存储池的统计数据</span>
<span class="line">	ceph osd pool stats <span class="token namespace">[pool-name]</span></span>
<span class="line"></span>
<span class="line">显示存储池的用量信息</span>
<span class="line">	rados df</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重命名存储池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">重命名存储池</span>
<span class="line">	ceph osd pool rename old-name <span class="token function">new-name</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>查看存储池信息</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">列出所有存储池名称</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span></span>
<span class="line"><span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>root</span>
<span class="line">default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>control</span>
<span class="line">default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>meta</span>
<span class="line">default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>log</span>
<span class="line">default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>buckets<span class="token punctuation">.</span>index</span>
<span class="line">default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>buckets<span class="token punctuation">.</span><span class="token keyword">data</span></span>
<span class="line">default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>otp</span>
<span class="line">default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>buckets<span class="token punctuation">.</span>non-ec</span>
<span class="line">cephfs-metadata</span>
<span class="line">cephfs-<span class="token keyword">data</span></span>
<span class="line"></span>
<span class="line">获取所有存储池的详细信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span> detail</span>
<span class="line">pool 6 <span class="token string">&#39;.rgw.root&#39;</span> replicated size 3 min_size 2 crush_rule 0 object_hash rjenkins pg_num 32 pgp_num 32 autoscale_mode warn last_change 117 flags hashpspool stripe_width 0 application rgw</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">结果显示：</span>
<span class="line">	可以看到，所有存储池的详情信息</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取所有存储池的统计数据</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool stats</span>
<span class="line">pool <span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>root id 6</span>
<span class="line">  nothing is going on</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">pool cephfs-<span class="token keyword">data</span> id 15</span>
<span class="line">  nothing is going on</span>
<span class="line">  </span>
<span class="line">获取制定存储池的统计数据</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool stats cephfs-<span class="token keyword">data</span></span>
<span class="line">pool cephfs-<span class="token keyword">data</span> id 15</span>
<span class="line">  nothing is going on</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">显示存储池的用量信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados df</span>
<span class="line">POOL_NAME                     USED OBJECTS <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> RD_OPS      <span class="token function">RD</span> WR_OPS      WR <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>root                  768 KiB       4 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>      0     0 B      4   4 KiB <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>otp                0 B       0 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>      0     0 B      0     0 B <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line">total_objects    328</span>
<span class="line">total_used       7<span class="token punctuation">.</span>0 GiB</span>
<span class="line">total_avail      113 GiB</span>
<span class="line">total_space      120 GiB</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建副本存储池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建副本型存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create replicated-pool 32 32</span>
<span class="line">pool <span class="token string">&#39;replicated-pool&#39;</span> created</span>
<span class="line"></span>
<span class="line">查看副本统计信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool stats replicated-pool</span>
<span class="line">pool replicated-pool id 18</span>
<span class="line">  nothing is going on</span>
<span class="line"></span>
<span class="line">查看副本详情信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span> detail <span class="token punctuation">|</span> grep replicated-pool</span>
<span class="line">pool 18 <span class="token string">&#39;replicated-pool&#39;</span> replicated size 3 min_size 2 crush_rule 0 object_hash rjenkins pg_num 32 pgp_num 32 autoscale_mode warn last_change 507 flags hashpspool stripe_width 0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建纠偏码池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建纠删码池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create erasure-pool 16 16 erasure</span>
<span class="line">pool <span class="token string">&#39;erasure-pool&#39;</span> created</span>
<span class="line"></span>
<span class="line">查看副本统计信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool stats erasure-pool</span>
<span class="line">pool erasure-pool id 19</span>
<span class="line">  nothing is going on</span>
<span class="line"></span>
<span class="line">查看副本详情信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span> detail <span class="token punctuation">|</span> grep erasure-pool</span>
<span class="line">pool 19 <span class="token string">&#39;erasure-pool&#39;</span> erasure size 3 min_size 2 crush_rule 1 object_hash rjenkins pg_num 16 pgp_num 16 autoscale_mode warn last_change 511 flags hashpspool stripe_width 8192</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-1-2-删除实践" tabindex="-1"><a class="header-anchor" href="#_1-1-2-删除实践"><span>1.1.2 删除实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">意外删除存储池会导致数据丢失，因此 Ceph 实施了两个机制来防止删除存储池，要删除存储池，必须先禁用这两个机制</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">第一个机制是NODELETE标志，其值需要为false，默认也是false</span>
<span class="line">	查看命令：ceph osd pool get pool-name nodelete</span>
<span class="line">	修改命令：ceph osd pool <span class="token function">set</span> pool-name nodelete false</span>
<span class="line"></span>
<span class="line">第二个机制是集群范围的配置参数mon allow pool delete，其默认值为 “false”，这表示默认不能删除存储池，临时设定的方法如下</span>
<span class="line">	ceph tell mon<span class="token punctuation">.</span><span class="token operator">*</span> injectargs <span class="token operator">--</span>mon-allow-pool-delete=<span class="token punctuation">{</span>true<span class="token punctuation">|</span>false<span class="token punctuation">}</span></span>
<span class="line">	建议删除之前将其值设置为true，删除完成后再改为false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">删除存储池命令格式</span>
<span class="line">ceph osd pool <span class="token function">rm</span> pool-name pool-name <span class="token operator">--</span>yes-i-really-really-mean-it</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>删除存储池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看删除标识</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool get replicated-pool nodelete</span>
<span class="line">nodelete: false</span>
<span class="line"></span>
<span class="line">删除存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">rm</span> replicated-pool replicated-pool <span class="token operator">--</span>yes-i-really-really-mean-it</span>
<span class="line">Error EPERM: pool deletion is disabled<span class="token punctuation">;</span> you must first <span class="token function">set</span> the mon_allow_pool_delete config option to true before you can destroy a pool</span>
<span class="line">结果显示:</span>
<span class="line">	默认无法删除存储池</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改删除标识</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph tell mon<span class="token punctuation">.</span><span class="token operator">*</span> injectargs <span class="token operator">--</span>mon-allow-pool-delete=true</span>
<span class="line">mon<span class="token punctuation">.</span>mon01: injectargs:mon_allow_pool_delete = <span class="token string">&#39;true&#39;</span></span>
<span class="line">mon<span class="token punctuation">.</span>mon02: injectargs:mon_allow_pool_delete = <span class="token string">&#39;true&#39;</span></span>
<span class="line">mon<span class="token punctuation">.</span>mon03: injectargs:mon_allow_pool_delete = <span class="token string">&#39;true&#39;</span></span>
<span class="line"></span>
<span class="line">再次删除存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">rm</span> replicated-pool replicated-pool <span class="token operator">--</span>yes-i-really-really-mean-it</span>
<span class="line">pool <span class="token string">&#39;replicated-pool&#39;</span> removed</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>永久删除方法</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">将所有的ceph<span class="token punctuation">.</span>conf文件中，增加默认允许删除存储池的配置</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">cat</span> <span class="token operator">/</span>etc/ceph/ceph<span class="token punctuation">.</span>conf</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token namespace">[mon]</span></span>
<span class="line">mon_allow_pool_delete = true</span>
<span class="line"></span>
<span class="line">然后同步到所有节点，重启mon服务</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph-deploy <span class="token operator">--</span>overwrite-conf config push admin mon01 mon02 mon03</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token keyword">for</span> i in mon0<span class="token punctuation">{</span>1<span class="token punctuation">.</span><span class="token punctuation">.</span>3<span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span> ssh <span class="token variable">$i</span> <span class="token string">&quot;sudo systemctl restart ceph-mon.target&quot;</span><span class="token punctuation">;</span> done</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改删除标识</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph tell mon<span class="token punctuation">.</span><span class="token operator">*</span> injectargs <span class="token operator">--</span>mon-allow-pool-delete=false</span>
<span class="line"></span>
<span class="line">创建存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create replicated-pool 16 16</span>
<span class="line">pool <span class="token string">&#39;replicated-pool&#39;</span> created</span>
<span class="line"></span>
<span class="line">删除存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">rm</span> replicated-pool replicated-pool <span class="token operator">--</span>yes-i-really-really-mean-it</span>
<span class="line">pool <span class="token string">&#39;replicated-pool&#39;</span> removed</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-1-3-配额管理" tabindex="-1"><a class="header-anchor" href="#_1-1-3-配额管理"><span>1.1.3 配额管理</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>设置存储池配额</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">Ceph支持为存储池设置可存储对象的最大数量（max_objects）和可占用的最大空间（ max_bytes）两个纬度的配额</span>
<span class="line">	ceph osd pool <span class="token function">set-quota</span> &lt;pool-name&gt; max_objects<span class="token punctuation">|</span>max_bytes &lt;val&gt;</span>
<span class="line"></span>
<span class="line">获取存储池配额的相关信息</span>
<span class="line">	ceph osd pool <span class="token function">get-quota</span> &lt;pool-name&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置存储池参数</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">存储池的诸多配置属性保存于配置参数中</span>
<span class="line">	获取配置：ceph osd pool get &lt;pool-name&gt;</span>
<span class="line">	设定配置：ceph osd pool <span class="token function">set</span> &lt;pool-name&gt; &lt;key&gt; </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">常用的可配置参数</span>
<span class="line">    size：			存储池中的对象副本数；</span>
<span class="line">    min_size：		I/O所需要的最小副本数；</span>
<span class="line">    pg_num：			存储池的PG数量；</span>
<span class="line">    pgp_num：		计算数据归置时要使用的PG的有效数量；</span>
<span class="line">    crush_ruleset：	用于在集群中映射对象归置的规则组；</span>
<span class="line">    nodelete：		控制是否可删除存储池；</span>
<span class="line">    nopgchange：		控制是否可更改存储池的pg_num和pgp_num；</span>
<span class="line">    nosizechange：	控制是否可更改存储池的大小；</span>
<span class="line">    noscrub和nodeep-scrub：	控制是否可整理或深层整理存储池以解决临时高I/O负载的问题</span>
<span class="line">    scrub_min_interval：	集群负载较低时整理存储池的最小时间间隔；</span>
<span class="line">                默认值为0，表示其取值来自于配置文件中的osd_scrub_min_interval参数；</span>
<span class="line">    scrub_max_interval：整理存储池的最大时间间隔；</span>
<span class="line">                默认值为0，表示其取值来自于配置文件中的osd_scrub_max_interval参数；</span>
<span class="line">    deep_scrub_interval：深层整理存储池的间隔；</span>
<span class="line">                默认值为0，表示其取值来自于配置文件中的osd_deep_scrub参数；</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>设置存储池配额</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取存储池配额的相关信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">get-quota</span> erasure-pool</span>
<span class="line">quotas <span class="token keyword">for</span> pool <span class="token string">&#39;erasure-pool&#39;</span>:</span>
<span class="line">  max objects: N/A		<span class="token comment"># 表示没有限制</span></span>
<span class="line">  max bytes  : N/A		<span class="token comment"># 表示没有限制</span></span>
<span class="line"></span>
<span class="line">设置存储池配额的值</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">set-quota</span> erasure-pool max_objects 10000</span>
<span class="line"><span class="token function">set-quota</span> max_objects = 10000 <span class="token keyword">for</span> pool erasure-pool</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">set-quota</span> erasure-pool max_bytes 1024000</span>
<span class="line"><span class="token function">set-quota</span> max_bytes = 1024000 <span class="token keyword">for</span> pool erasure-pool</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">get-quota</span> erasure-pool</span>
<span class="line">quotas <span class="token keyword">for</span> pool <span class="token string">&#39;erasure-pool&#39;</span>:</span>
<span class="line">  max objects: 10k objects</span>
<span class="line">  max bytes  : 1000 KiB</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置存储池参数</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create replicated-pool 16 16</span>
<span class="line">pool <span class="token string">&#39;replicated-pool&#39;</span> created</span>
<span class="line"></span>
<span class="line">获取配置</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool get replicated-pool size</span>
<span class="line">size: 3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">调整配置属性</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">set</span> replicated-pool size 4</span>
<span class="line"><span class="token function">set</span> pool 21 size to 4</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool get replicated-pool size</span>
<span class="line">size: 4</span>
<span class="line"></span>
<span class="line">调整配置属性</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">set</span> replicated-pool size 3</span>
<span class="line"><span class="token function">set</span> pool 21 size to 3</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool get replicated-pool size</span>
<span class="line">size: 3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-1-4-快照管理" tabindex="-1"><a class="header-anchor" href="#_1-1-4-快照管理"><span>1.1.4 快照管理</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">关于存储池快照</span>
<span class="line">	存储池快照是指整个存储池的状态快照</span>
<span class="line">	通过存储池快照，可以保留存储池状态的历史</span>
<span class="line">	创建存储池快照可能需要大量存储空间，具体取决于存储池的大小</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常见操作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建存储池快照</span>
<span class="line">	ceph osd pool mksnap &lt;pool-name&gt; &lt;snap-name&gt;</span>
<span class="line">	rados <span class="token operator">-</span>p &lt;pool-name&gt; mksnap &lt;snap-name&gt;</span>
<span class="line"></span>
<span class="line">列出存储池的快照</span>
<span class="line">	rados <span class="token operator">-</span>p &lt;pool-name&gt; lssnap</span>
<span class="line"></span>
<span class="line">回滚存储池至指定的快照</span>
<span class="line">	rados <span class="token operator">-</span>p &lt;pool-name&gt; rollback &lt;snap-name&gt;</span>
<span class="line"></span>
<span class="line">删除存储池快照</span>
<span class="line">	ceph osd pool rmsnap &lt;pool-name&gt; &lt;snap-name&gt;</span>
<span class="line">	rados <span class="token operator">-</span>p &lt;pool-name&gt; rmsnap &lt;snap-name&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>查看快照</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看制定存储池的快照数量</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p replicated-pool lssnap</span>
<span class="line">0 snaps</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p erasure-pool lssnap</span>
<span class="line">0 snaps</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>制作快照</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建快照</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool mksnap replicated-pool replicated-snap</span>
<span class="line">created pool replicated-pool snap replicated-snap</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool mksnap erasure-pool erasure-snap</span>
<span class="line">created pool erasure-pool snap erasure-snap</span>
<span class="line"></span>
<span class="line">查看效果</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p replicated-pool lssnap</span>
<span class="line">1       replicated-snap 2062<span class="token punctuation">.</span>09<span class="token punctuation">.</span>28 22:28:33</span>
<span class="line">1 snaps</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p erasure-pool lssnap</span>
<span class="line">1       erasure-snap    2062<span class="token punctuation">.</span>09<span class="token punctuation">.</span>28 22:28:43</span>
<span class="line">1 snaps</span>
<span class="line"></span>
<span class="line">结果分析：</span>
<span class="line">	创建过image的存储池无法再创建存储池快照了，因为存储池当前已经为unmanaged snaps mode 或者 selfmanaged_snaps模式，而没有创建image的，就可以做存储池快照。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>快照还原</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">添加文件</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados put ceph-file <span class="token operator">/</span>home/cephadm/ceph-cluster/ceph<span class="token punctuation">.</span>conf <span class="token operator">--</span>pool=erasure-pool</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token function">ls</span> <span class="token operator">--</span>pool=erasure-pool</span>
<span class="line">ceph-file</span>
<span class="line"></span>
<span class="line">添加快照</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool mksnap erasure-pool erasure-snap1</span>
<span class="line">created pool erasure-pool snap erasure-snap1</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p erasure-pool lssnap</span>
<span class="line">1       erasure-snap    2062<span class="token punctuation">.</span>09<span class="token punctuation">.</span>28 22:28:43</span>
<span class="line">2       erasure-snap1   2062<span class="token punctuation">.</span>09<span class="token punctuation">.</span>28 22:30:17</span>
<span class="line">2 snaps</span>
<span class="line"></span>
<span class="line">回滚快照</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p erasure-pool rollback ceph<span class="token punctuation">.</span>conf erasure-snap</span>
<span class="line">rolled back pool erasure-pool to snapshot erasure-snap</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除快照</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">删除快照</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool rmsnap erasure-pool erasure-snap1</span>
<span class="line">removed pool erasure-pool snap erasure-snap1</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool rmsnap erasure-pool erasure-snap</span>
<span class="line">removed pool erasure-pool snap erasure-snap</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">--</span>pool=erasure-pool lssnap</span>
<span class="line">0 snaps</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-1-5-压缩管理" tabindex="-1"><a class="header-anchor" href="#_1-1-5-压缩管理"><span>1.1.5 压缩管理</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	BlueStore存储引擎提供即时数据压缩，以节省磁盘空间</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>启用压缩</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">ceph osd pool <span class="token function">set</span> &lt;pool-name&gt; compression_algorithm snappy</span>
<span class="line">	压缩算法有none、zlib、lz4、zstd和snappy等几种，默认为snappy；</span>
<span class="line">	zstd有较好的压缩比，但比较消耗CPU；</span>
<span class="line">	lz4和snappy对CPU占用比例较低；</span>
<span class="line">	不建议使用zlib；</span>
<span class="line"></span>
<span class="line">ceph osd pool <span class="token function">set</span> &lt;pool-name&gt; compression_mode aggressive</span>
<span class="line">	压缩模式：none、aggressive、passive和force，默认值为none；</span>
<span class="line">	none：不压缩</span>
<span class="line">	passive：若提示COMPRESSIBLE，则压缩</span>
<span class="line">	aggressive：除非提示INCOMPRESSIBLE，否则就压缩；</span>
<span class="line">	force：始终压缩</span>
<span class="line">	</span>
<span class="line">注意：如果需要全局压缩，最好在配置文件中定制</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">其它可用的压缩参数</span>
<span class="line">	compression_required_ratio：指定压缩比，取值格式为双精度浮点型，其值为</span>
<span class="line">SIZE_COMPRESSED/SIZE_ORIGINAL，即压缩后的大小与原始内容大小的比值，默认为 <span class="token punctuation">.</span>875；</span>
<span class="line">	compression_max_blob_size：压缩对象的最大体积，无符号整数型数值，默认为0；</span>
<span class="line">	compression_min_blob_size：压缩对象的最小体积，无符号整数型数值，默认为0；</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">全局压缩选项</span>
<span class="line">	可在ceph配置文件中设置压缩属性，它将对所有的存储池生效，可设置的相关参数如下</span>
<span class="line">	bluestore_compression_algorithm</span>
<span class="line">	bluestore_compression_mode</span>
<span class="line">	bluestore_compression_required_ratio</span>
<span class="line">	bluestore_compression_min_blob_size</span>
<span class="line">	bluestore_compression_max_blob_size</span>
<span class="line">	bluestore_compression_min_blob_size_ssd</span>
<span class="line">	bluestore_compression_max_blob_size_ssd</span>
<span class="line">	bluestore_compression_min_blob_size_hdd</span>
<span class="line">	bluestore_compression_max_blob_size_hdd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>查看默认的算法</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token namespace">[root@mon01 ~]</span><span class="token comment"># ceph daemon osd.0 config show | grep compression</span></span>
<span class="line">    <span class="token string">&quot;bluestore_compression_algorithm&quot;</span>: <span class="token string">&quot;snappy&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token string">&quot;bluestore_compression_mode&quot;</span>: <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;bluestore_compression_required_ratio&quot;</span>: <span class="token string">&quot;0.875000&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token string">&quot;rbd_compression_hint&quot;</span>: <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span></span>
<span class="line">结果显示：</span>
<span class="line">	默认的压缩算法是 snappy<span class="token punctuation">,</span>默认的压缩模式是 node<span class="token punctuation">,</span>压缩比例是0<span class="token punctuation">.</span>875</span>
<span class="line">注意：</span>
<span class="line">	这条命令最好指定节点下执行</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更改压缩算法</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">管理节点设定压缩算法</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">set</span> erasure-pool compression_algorithm zstd</span>
<span class="line"><span class="token function">set</span> pool 19 compression_algorithm to zstd</span>
<span class="line"></span>
<span class="line">存储池查看效果</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span> detail <span class="token punctuation">|</span> grep erasure-pool</span>
<span class="line">pool 19 <span class="token string">&#39;erasure-pool&#39;</span> erasure <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> compression_algorithm zstd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更改算法模式</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">更改算法模式</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">set</span> erasure-pool compression_mode aggressive</span>
<span class="line"><span class="token function">set</span> pool 19 compression_mode to aggressive</span>
<span class="line"></span>
<span class="line">查看存储池算法模式</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span> detail <span class="token punctuation">|</span> grep erasure-pool</span>
<span class="line">pool 19 <span class="token string">&#39;erasure-pool&#39;</span> erasure <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> compression_mode aggressive</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还原算法模式和算法</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">还原算法和模式</span>
<span class="line">ceph osd pool <span class="token function">set</span> erasure-pool compression_algorithm snappy</span>
<span class="line">ceph osd pool <span class="token function">set</span> erasure-pool compression_mode none</span>
<span class="line"></span>
<span class="line">查看效果</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span> detail <span class="token punctuation">|</span> grep erasure-pool</span>
<span class="line">pool 19 <span class="token string">&#39;erasure-pool&#39;</span> erasure <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> compression_algorithm snappy compression_mode none</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-1-6-纠删码基础" tabindex="-1"><a class="header-anchor" href="#_1-1-6-纠删码基础"><span>1.1.6 纠删码基础</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>场景介绍</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	纠删码理论<span class="token punctuation">(</span>erasure coding，EC<span class="token punctuation">)</span>始于 20 世纪 60 年代<span class="token punctuation">,</span>它是一种数据保护方法。从原理上说，它将数据分割成片段，把冗余数据块扩展、编码，并将其存储在不同的位置，比如磁盘、存储节点或者其它地理位置。</span>
<span class="line">	总数据块 = 原始数据块 <span class="token operator">+</span> 校验块， 常见表示为，n = k <span class="token operator">+</span> m</span>
<span class="line">	当冗余级别为n时，将这些数据块分别存放在n个硬盘上，这样就能容忍小于m个（假设初始数据有k个）硬盘发生故障。当不超过m个硬盘发生故障时，只需任意选取k个正常的数据块就能计算得到所有的原始数据。</span>
<span class="line">	在云存储中，我们通常会使用副本的方式来保证系统的可用性。问题是当存储达到 PB 级别后要求的容量将会非常高。通过使用纠删码技术可以在保证相同可用性的情况下，节省大量存储空间，从而大大的降低 TCO（总体成本）。Ceph 从 Firefly 版本开始支持纠删码。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	比如8块磁盘的总数<span class="token punctuation">(</span>N<span class="token punctuation">)</span>，5个数据盘<span class="token punctuation">(</span>K<span class="token punctuation">)</span><span class="token punctuation">,</span> 通过5个数据块计算出3个校验块<span class="token punctuation">(</span>m<span class="token punctuation">)</span>，我们可以用RS<span class="token punctuation">(</span>5<span class="token punctuation">,</span>3<span class="token punctuation">)</span>来代表。在这样的场景中，每份数据都会切分5份<span class="token operator">--</span>5*5的逆向矩阵，它可以容忍任意 3 块磁盘的故障。如果某些数据块丢失，可以通过剩下的可用数据恢复出原始的数据内容。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+i+`" alt="image-20220928232215966"></p><p>ceph纠偏码</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Ceph纠删码实现了高速的计算，但有2个缺点：速度慢、只支持对象的部分操作。ceph中的EC编码是以插件的形式来提供的。EC编码有三个指标：空间利用率、数据可靠性和恢复效率。ceph提供以下几种纠删码插件：clay<span class="token punctuation">(</span>coupled-layer<span class="token punctuation">)</span>、jerasure、lrc、shec、isa等</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Ceph支持以插件方式加载使用的纠删编码插件，存储管理员可根据存储场景的需要优化选择合用的插件。</span>
<span class="line">jerasure：</span>
<span class="line">	最为通用的和灵活的纠删编码插件，它也是纠删码池默认使用的插件；不过，任何一个OSD成员的丢失，都需要余下的所有成员OSD参与恢复过程；另外，使用此类插件时，管理员还可以通过technique选项指定要使用的编码技术：</span>
<span class="line">	reed_sol_van：最灵活的编码技术，管理员仅需提供k和m参数即可；</span>
<span class="line">	cauchy_good：更快的编码技术，但需要小心设置PACKETSIZE参数；</span>
<span class="line">	reed_sol_r6_op、liberation、blaum_roth或liber8tion：</span>
<span class="line">			仅支持使用m=2的编码技术，功能特性类同于RAID 6；</span>
<span class="line">lrc：</span>
<span class="line">	全称为Locally Repairable Erasure Code，即本地修复纠删码，除了默认的m个编码块之外，它会额外在本地创建指定数量（l）的奇偶校验块，从而在一个OSD丢失时，可以仅通过l个奇偶校验块完成恢复</span>
<span class="line"></span>
<span class="line">isa：</span>
<span class="line">	仅支持运行在intel CPU之上的纠删编码插件，它支持reed_sol_van和cauchy两种技术</span>
<span class="line"></span>
<span class="line">shec：</span>
<span class="line">	shec<span class="token punctuation">(</span>k<span class="token punctuation">,</span>m<span class="token punctuation">,</span>l<span class="token punctuation">)</span>，k为数据块，m为校验块，l代表计算校验块时需要的数据块数量。</span>
<span class="line">	其最大允许失效数据块为：ml/k，恢复失效的单个数据块（<span class="token keyword">data</span> chunk）只需要额外读取l个数据块。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基础概念</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">块（chunk）</span>
<span class="line">	基于纠删码编码时，每次编码将产生若干大小相同的块<span class="token punctuation">(</span>有序<span class="token punctuation">)</span>。</span>
<span class="line">	ceph通过数量相等的PG将这些分别存储在不同的osd中。</span>
<span class="line">条带（strip）</span>
<span class="line">	如果编码对象太大，可分多次进行编码，每次完成编码的部分称为条带。同一个对内的条带时有序的。</span>
<span class="line">分片（shared）</span>
<span class="line">	同一个对象中所有序号相同的块位于同一个PG上，他们组成对象的一个分片，分片的编号就是块的序号。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">空间利用率（rate）：</span>
<span class="line">	通过k/n计算。</span>
<span class="line">对象尺寸： </span>
<span class="line">	Ceph 存储集群里的对象有最大可配置尺寸，对象尺寸必须足够大<span class="token punctuation">,</span>而且应该是条带单元的整数倍。</span>
<span class="line">条带数量（strip_size）： </span>
<span class="line">	Ceph 客户端把一系列条带单元写入由条带数量所确定的一系列对象，这一系列的对象称为一个对象集。</span>
<span class="line">	客户端写到对象集内的最后一个对象时，再返回到第一个。</span>
<span class="line">条带宽度（strip_width）： </span>
<span class="line">	条带都有可配置的单元尺寸。Ceph 客户端把数据等分成适合写入对象的条带单元。</span>
<span class="line">	strip_width = chunk_size <span class="token operator">*</span> strip_size</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	假设有EC（k=4，m=2），strip_size=4，chunk_size=1K，那么strip_width=4K。在ceph中，strip_width默认为4K。</span>
<span class="line">	假如object对象内容是 ABCDEFGHIJKL；将该数据对象写入pool时，纠删码函数把object分4个数据块：第1个是ABC<span class="token punctuation">,</span>第2个是DEF，第3个是GHI，第4个是JKL；如果object的长度不是K的倍数，object会被填充一些内容；纠删码函数同时创建2个编码块：第4个是xxx，第5个是yyy；</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+c+`" alt="image-20220928234255383"></p><p><strong>简单实践</strong></p><p>创建纠删码池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">命令格式</span>
<span class="line">	ceph osd pool create &lt;pool-name&gt; &lt;pg-num&gt; &lt;pgp-num&gt; erasure <span class="token namespace">[erasure-code-profile]</span> <span class="token namespace">[crush-rule-name]</span> <span class="token namespace">[expected-num-objects]</span></span>
<span class="line"></span>
<span class="line">要点解析</span>
<span class="line">	未指定要使用的纠删编码配置文件时，创建命令会为其自动创建一个，并在创建相关的CRUSH规则集时使用到它</span>
<span class="line">	默认配置文件自动定义k=2和m=1，这意味着Ceph将通过三个OSD扩展对象数据，并且可以丢失其中一个OSD而不会丢失数据，因此，在冗余效果上，它相当于一个大小为2的副本池 ，不过，其存储空间有效利用率为2/3而非1/2。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他命令</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">列出纠删码配置文件</span>
<span class="line">	ceph osd erasure-code-profile <span class="token function">ls</span></span>
<span class="line"></span>
<span class="line">获取指定的配置文件的相关内容</span>
<span class="line">	ceph osd erasure-code-profile get default</span>
<span class="line"></span>
<span class="line">自定义纠删码配置文件</span>
<span class="line">	ceph osd erasure-code-profile <span class="token function">set</span> &lt;name&gt; <span class="token punctuation">[</span>&lt;directory=directory&gt;<span class="token punctuation">]</span> <span class="token punctuation">[</span>&lt;plugin=plugin&gt;<span class="token punctuation">]</span> <span class="token punctuation">[</span>&lt;crush-device-<span class="token keyword">class</span>&gt;<span class="token punctuation">]</span> <span class="token punctuation">[</span>&lt;crush-failure-domain&gt;<span class="token punctuation">]</span> <span class="token punctuation">[</span>&lt;key=value&gt; <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token operator">--</span>force<span class="token punctuation">]</span></span>
<span class="line">	<span class="token operator">-</span> directory：加载纠删码插件的目录路径，默认为<span class="token operator">/</span>usr/lib/ceph/erasure-code；</span>
<span class="line">	<span class="token operator">-</span> plugin：用于生成及恢复纠删码块的插件名称，默认为jerasure；</span>
<span class="line">	<span class="token operator">-</span> crush-device-<span class="token keyword">class</span>：设备类别，例如hdd或ssd，默认为none，即无视类别；</span>
<span class="line">	<span class="token operator">-</span> crush-failure-domain：故障域，默认为host，支持使用的包括osd、host、rack、row和room等 ；</span>
<span class="line">	<span class="token operator">-</span> <span class="token operator">--</span>force：强制覆盖现有的同名配置文件；</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">示例：</span>
<span class="line">	例如，如果所需的体系结构必须承受两个OSD的丢失，并且存储开销为40％</span>
<span class="line">	ceph osd erasure-code-profile <span class="token function">set</span> myprofile  k=4  m=2 crush-failure-domain=osd</span>
<span class="line">	例如，下面的命令创建了一个使用lrc插件的配置文件LRCprofile，其本地奇偶校验块为3，故障域为osd</span>
<span class="line">	ceph osd erasure-code-profile <span class="token function">set</span> LRCprofile plugin=lrc k=4 m=2 l=3 crush-failure-domain=osd</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看纠删码池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">列出纠删码配置文件</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile <span class="token function">ls</span></span>
<span class="line">default</span>
<span class="line"></span>
<span class="line">获取指定的配置文件的相关内容</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile get default</span>
<span class="line">k=2</span>
<span class="line">m=1</span>
<span class="line">plugin=jerasure</span>
<span class="line">technique=reed_sol_van</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自定义纠删码配置</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建纠删码配置</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile <span class="token function">set</span> myprofile  k=4  m=2 crush-failure-domain=osd</span>
<span class="line"></span>
<span class="line">查看纠删码配置信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile <span class="token function">ls</span></span>
<span class="line">default</span>
<span class="line">myprofile</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile get myprofile</span>
<span class="line">crush-device-<span class="token keyword">class</span>=</span>
<span class="line">crush-failure-domain=osd</span>
<span class="line">crush-root=default</span>
<span class="line">jerasure-per-chunk-alignment=false</span>
<span class="line">k=4</span>
<span class="line">m=2</span>
<span class="line">plugin=jerasure</span>
<span class="line">technique=reed_sol_van</span>
<span class="line">w=8</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建定制的纠偏码池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create erasure-pool-myprofile 8 8 erasure myprofile</span>
<span class="line">pool <span class="token string">&#39;erasure-pool-myprofile&#39;</span> created</span>
<span class="line"></span>
<span class="line">查看效果</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span> detail <span class="token punctuation">|</span> grep erasure-pool-myprofile</span>
<span class="line">pool 22 <span class="token string">&#39;erasure-pool-myprofile&#39;</span> erasure size 6 min_size 5 crush_rule 2 object_hash rjenkins pg_num 8 pgp_num 8 autoscale_mode warn last_change 540 flags hashpspool stripe_width 16384</span>
<span class="line">解析：</span>
<span class="line">	erasure size 6 代表有<span class="token punctuation">(</span>K+m<span class="token punctuation">)</span>6个osd磁盘</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于插件定制纠偏码配置</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">基于纠偏码算法定制专属配置</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile <span class="token function">set</span> LRCprofile plugin=lrc k=4 m=2 l=3 crush-failure-domain=osd</span>
<span class="line"></span>
<span class="line">查看纠删码配置信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile <span class="token function">ls</span></span>
<span class="line">LRCprofile</span>
<span class="line">default</span>
<span class="line">myprofile</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile get LRCprofile</span>
<span class="line">crush-device-<span class="token keyword">class</span>=</span>
<span class="line">crush-failure-domain=osd</span>
<span class="line">crush-root=default</span>
<span class="line">k=4</span>
<span class="line">l=3</span>
<span class="line">m=2</span>
<span class="line">plugin=lrc</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建定制配置的纠偏码池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create erasure-pool-LRCprofile 1 1 erasure LRCprofile</span>
<span class="line">pool <span class="token string">&#39;erasure-pool-LRCprofile&#39;</span> created</span>
<span class="line"></span>
<span class="line">查看效果</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span> detail <span class="token punctuation">|</span> grep erasure-pool-LRCprofile</span>
<span class="line">pool 23 <span class="token string">&#39;erasure-pool-LRCprofile&#39;</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> flags hashpspool stripe_width 16384</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-1-7-纠删码实践" tabindex="-1"><a class="header-anchor" href="#_1-1-7-纠删码实践"><span>1.1.7 纠删码实践</span></a></h3><p>学习目标</p><p>这一节，我们从 数据实践、异常实践、小结三个方面来学习。</p><p><strong>数据实践</strong></p><p>纠删码池数据实践</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create ecpool 12 12 erasure</span>
<span class="line">pool <span class="token string">&#39;ecpool&#39;</span> created</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">数据写入实践</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">echo</span> ABCDEFGHI <span class="token punctuation">|</span> rados <span class="token operator">--</span>pool ecpool put object_data <span class="token operator">-</span></span>
<span class="line"></span>
<span class="line">数据读取实践</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">--</span>pool ecpool get object_data <span class="token operator">-</span></span>
<span class="line">ABCDEFGHI</span>
<span class="line"></span>
<span class="line">注意：</span>
<span class="line">	数据写入和读取的实践命令末尾必须有一个 <span class="token operator">-</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">文件写入实践</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">echo</span> test &gt; test<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p ecpool put test test<span class="token punctuation">.</span>txt</span>
<span class="line"></span>
<span class="line">文件读取实践</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p ecpool get test file<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">cat</span> file<span class="token punctuation">.</span>txt</span>
<span class="line">test</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>纠删码池不支持部分image功能</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">启用rbd功能</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool application enable ecpool rbd</span>
<span class="line">enabled application <span class="token string">&#39;rbd&#39;</span> on pool <span class="token string">&#39;ecpool&#39;</span></span>
<span class="line"></span>
<span class="line">创建image操作</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rbd create myimg <span class="token operator">-</span>p ecpool <span class="token operator">--</span>size 1024</span>
<span class="line">2062-09-29 01:01:01<span class="token punctuation">.</span>144 7faafbfff700 <span class="token operator">-</span>1 librbd::image::ValidatePoolRequest: handle_overwrite_rbd_info: pool missing required overwrite support</span>
<span class="line">2062-09-29 01:01:01<span class="token punctuation">.</span>144 7faafbfff700 <span class="token operator">-</span>1 librbd::image::CreateRequest: 0x55a667ec7190 handle_validate_data_pool: pool does not support RBD images</span>
<span class="line">rbd: create error: <span class="token punctuation">(</span>22<span class="token punctuation">)</span> Invalid argument</span>
<span class="line">结果显示：</span>
<span class="line">	纠偏码池不支持RBD images的参数操作</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>异常实践</strong></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建纠删码配置</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile  <span class="token function">set</span> Ecprofile crush-failure-domain=osd k=3 m=2</span>
<span class="line"></span>
<span class="line">查看纠删码配置信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile <span class="token function">ls</span></span>
<span class="line">Ecprofile</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd erasure-code-profile get  Ecprofile</span>
<span class="line">crush-device-<span class="token keyword">class</span>=</span>
<span class="line">crush-failure-domain=osd</span>
<span class="line">crush-root=default</span>
<span class="line">jerasure-per-chunk-alignment=false</span>
<span class="line">k=3</span>
<span class="line">m=2</span>
<span class="line">plugin=jerasure</span>
<span class="line">technique=reed_sol_van</span>
<span class="line">w=8</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">基于纠删码配置文件创建erasure类型的Ceph池：</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create Ecpool 16 16 erasure Ecprofile</span>
<span class="line">pool <span class="token string">&#39;Ecpool&#39;</span> created</span>
<span class="line"></span>
<span class="line">确认效果</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd dump <span class="token punctuation">|</span> grep Ecpool</span>
<span class="line">pool 25 <span class="token string">&#39;Ecpool&#39;</span> erasure size 5 min_size 4 crush_rule 4 object_hash rjenkins pg_num 16 pgp_num 16 autoscale_mode warn last_change 566 flags hashpspool stripe_width 12288</span>
<span class="line">结果显示：</span>
<span class="line">	erasure size 5 表示 3+2=5 个osd磁盘来存储数据和校验码</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建文件后提交文件到纠删码池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">echo</span> test_ecpool &gt; test_file<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados put <span class="token operator">-</span>p Ecpool object1 test_file<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p Ecpool <span class="token function">ls</span></span>
<span class="line">object1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查纠删码池中和object1的OSDmap</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd map Ecpool object1</span>
<span class="line">osdmap e566 pool <span class="token string">&#39;Ecpool&#39;</span> <span class="token punctuation">(</span>25<span class="token punctuation">)</span> object <span class="token string">&#39;object1&#39;</span> <span class="token operator">-</span>&gt; pg 25<span class="token punctuation">.</span>bac5debc <span class="token punctuation">(</span>25<span class="token punctuation">.</span>c<span class="token punctuation">)</span> <span class="token operator">-</span>&gt; up <span class="token punctuation">(</span><span class="token punctuation">[</span>2<span class="token punctuation">,</span>1<span class="token punctuation">,</span>0<span class="token punctuation">,</span>4<span class="token punctuation">,</span>5<span class="token punctuation">]</span><span class="token punctuation">,</span> p2<span class="token punctuation">)</span> acting <span class="token punctuation">(</span><span class="token punctuation">[</span>2<span class="token punctuation">,</span>1<span class="token punctuation">,</span>0<span class="token punctuation">,</span>4<span class="token punctuation">,</span>5<span class="token punctuation">]</span><span class="token punctuation">,</span> p2<span class="token punctuation">)</span></span>
<span class="line">结果显示：</span>
<span class="line">	0-5的osd磁盘上都有我们的数据库和校验块</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">找到两台节点，将两个被用到的osd移除，比如mon02主机上的osd2，mon03主机上的osd5</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ssh mon03 sudo systemctl stop ceph-osd@5</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ssh mon02 sudo systemctl stop ceph-osd@2</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd tree</span>
<span class="line">ID <span class="token keyword">CLASS</span> WEIGHT  <span class="token function">TYPE</span> NAME      STATUS REWEIGHT PRI-AFF</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token operator">-</span>5       0<span class="token punctuation">.</span>03897     host mon02</span>
<span class="line"> 2   hdd 0<span class="token punctuation">.</span>01949         osd<span class="token punctuation">.</span>2    down  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line"> 3   hdd 0<span class="token punctuation">.</span>01949         osd<span class="token punctuation">.</span>3      up  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line"><span class="token operator">-</span>7       0<span class="token punctuation">.</span>03897     host mon03</span>
<span class="line"> 4   hdd 0<span class="token punctuation">.</span>01949         osd<span class="token punctuation">.</span>4      up  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line"> 5   hdd 0<span class="token punctuation">.</span>01949         osd<span class="token punctuation">.</span>5    down  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查EC池和object1的OSDmap</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd map Ecpool object1</span>
<span class="line">osdmap e574 pool <span class="token string">&#39;Ecpool&#39;</span> <span class="token punctuation">(</span>25<span class="token punctuation">)</span> object <span class="token string">&#39;object1&#39;</span> <span class="token operator">-</span>&gt; pg 25<span class="token punctuation">.</span>bac5debc <span class="token punctuation">(</span>25<span class="token punctuation">.</span>c<span class="token punctuation">)</span> <span class="token operator">-</span>&gt; up <span class="token punctuation">(</span><span class="token namespace">[NONE,1,0,4,NONE]</span><span class="token punctuation">,</span> p1<span class="token punctuation">)</span> acting <span class="token punctuation">(</span><span class="token namespace">[NONE,1,0,4,NONE]</span><span class="token punctuation">,</span> p1<span class="token punctuation">)</span></span>
<span class="line">结果显示：</span>
<span class="line">	osd<span class="token punctuation">.</span>5和osd<span class="token punctuation">.</span>2 已经不管用了</span>
<span class="line">	</span>
<span class="line">获取文件查看</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados <span class="token operator">-</span>p Ecpool get object1 ok<span class="token punctuation">.</span>txt</span>
<span class="line">结果显示：</span>
<span class="line">	查看文件失败，可以看到，不允许有超过2个osd失败的效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_1-2-存储进阶" tabindex="-1"><a class="header-anchor" href="#_1-2-存储进阶"><span>1.2 存储进阶</span></a></h2><h3 id="_1-2-1-原理解读" tabindex="-1"><a class="header-anchor" href="#_1-2-1-原理解读"><span>1.2.1 原理解读</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>存储池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	RADOS存储集群提供的基础存储服务需要由“pool”分割为逻辑存储区域 <span class="token operator">--</span> 对象数据的名称空间。我们在部署ceph集群的过程中，涉及到大量的应用程序，而这些应用程序在创建的时候，需要专属的数据存储空间<span class="token operator">--</span>存储池，比如rbd存储池、rgw存储池、cephfs存储池等。</span>
<span class="line">	存储池还可以再进一步细分为一至多个子名称空间，比如我们在看pool的时候</span>
<span class="line">	<span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool <span class="token function">ls</span></span>
<span class="line">    <span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>root</span>
<span class="line">    default<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>control</span>
<span class="line">    <span class="token punctuation">{</span>根命名空间<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token punctuation">{</span>应用命名空间<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token punctuation">{</span>子空间<span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	对于Ceph集群来说，它的存储池主要由默认的副本池<span class="token punctuation">(</span>replicated pool<span class="token punctuation">)</span>和纠删码池<span class="token punctuation">(</span>erasure code<span class="token punctuation">)</span> 两种类型组成。</span>
<span class="line">	客户端在使用这些存储池的时候，往往依赖于相关用户信息的认证机制。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>数据存储逻辑</p><p><img src="`+t+`" alt="1636103641572"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Ceph 在 RADOS 集群中动态存储、复制和重新平衡数据对象。由于许多不同的用户在无数 OSD 上出于不同目的将对象存储在不同的池中，因此 Ceph 操作需要一些数据放置规划。Ceph 中主要的数据放置规划概念包括：</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">Pools（池）：</span>
<span class="line">	Ceph 将数据存储在pool中，pool是用于存储对象的逻辑组。首次部署集群而不创建pool时，Ceph 使用默认pool来存储数据。</span>
<span class="line">	pool主要管理的内容有：PG的数量、副本的数量和pool的 CRUSH 规则。</span>
<span class="line">	当然了。要将数据存储在池中，您必须有一个经过身份验证的用户，该用户具有该池的权限。</span>
<span class="line">参考资料：https:<span class="token operator">/</span><span class="token operator">/</span>docs<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com/en/quincy/rados/operations/pools/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">Placement Groups（归置组）：</span>
<span class="line">	归置组 <span class="token punctuation">(</span>PG<span class="token punctuation">)</span> 是 Ceph 如何分发数据的内部实现细节。</span>
<span class="line">	Ceph 将对象映射到归置组<span class="token punctuation">(</span>PG<span class="token punctuation">)</span>，归置组<span class="token punctuation">(</span>PG<span class="token punctuation">)</span>是逻辑对象池的分片或片段，它们将对象作为一个组放置到OSD中。当 Ceph 将数据存储在 OSD 中时，放置组会减少每个对象的元数据量。</span>
<span class="line">	每个 PG 都属于一个特定的Pool，因此当多个Pool使用相同的 OSD 时，必须注意每个OSD的PG副本的总和不能超过OSD自身允许的PG数量阈值。</span>
<span class="line">参考资料：https:<span class="token operator">/</span><span class="token operator">/</span>docs<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com/en/quincy/rados/operations/placement-groups</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">CRUSH Maps（CRUSH 映射）： </span>
<span class="line">	CRUSH 是让 Ceph 在正常运行情况下进行数据扩展的重要部分。CRUSH 映射为 CRUSH 算法提供集群的物理拓扑数据，以确定对象及其副本的数据应该存储在哪里，以及如何跨故障域以增加数据安全等。</span>
<span class="line">参考资料：https:<span class="token operator">/</span><span class="token operator">/</span>docs<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com/en/quincy/rados/operations/crush-map。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">Balancer：</span>
<span class="line">	平衡器是一个功能，它会自动优化PG跨设备的分布，以实现数据的均衡分布，最大化集群中可以存储的数据量，并在OSD之间平均分配工作负载。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">Pool数量、CRUSH规则和PG数量决定了 Ceph 将如何放置数据</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">Ceph 的 RADOS中，引入了 PG 的概念用以更好地管理数据。PG 的引入降低对数量巨大的对象的管理难度。</span>
<span class="line">	1、对象数量时刻处于变化中。而PG的数量经过人工规划因而严格可控。</span>
<span class="line">	2、PG数量远小于对象，且生命周期稳定。因此以PG为单位进行数据同步或者迁移，相比较对象难度更小。</span>
<span class="line"></span>
<span class="line">PG 最引人注目之处在于其可以在OSD之间（根据CRUSH的实时计算结果）自由迁移，这是ceph赖以实现自动数据恢复、自动数据平衡等高级特性的基础。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	RADOS 提供的是基于 Object 的存储功能，每个 Object 会先通过简单的 Hash 算法归到一个 PG 中，PGID 再作为<span class="token string">&quot;参数&quot;</span>通过 CRUSH 计算置入到多个 OSD 中。</span>
<span class="line">	Object <span class="token operator">-</span> 可以理解为一个文件</span>
<span class="line">	PG     <span class="token operator">-</span> 可以理解为一个目录</span>
<span class="line">	OSD    <span class="token operator">-</span> 可以理解我一个PG目录下的简易文件系统</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">存储池在操作资源对象的时候，需要设置：对象的所有权<span class="token operator">/</span>访问权、归置组的数量、CRUSH 规则 </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>PG 映射到 OSD</p><p><img src="`+n+`" alt="image-20220930074909586"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	每个Pool都有许多归置组。当 Ceph 客户端存储对象时，CRUSH 会将每个对象映射到一个归置组<span class="token punctuation">,</span>然后CRUSH 将 PG 动态映射到 OSD。</span>
<span class="line">	所以说，PG相当于 OSD守护进程 和 Ceph客户端之间的一个中间层：</span>
<span class="line">		1 通过CRUSH实现数据对象动态平衡的分散到所有OSD中，同时也可以让客户端知道数据在哪个OSD中</span>
<span class="line">		2 中间层还允许新加入的OSD和其他OSD在数据负载时候实现动态平衡</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PG id</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	当 Ceph客户端绑定到 Ceph Mon节点时，它会检索 Cluster Map的最新副本。客户端可以通过Cluster Map了解集群中的所有监视器、OSD和元数据服务器信息。由于数据对象与Cluster Map无关，所以它对对象位置一无所知。</span>
<span class="line">	客户端操作数据对象的时候，需要指定 对象ID<span class="token punctuation">(</span>就是对象名称<span class="token punctuation">)</span>和Pool。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">CRUSH算法允许客户端计算对象应该存储在哪里，从而实现客户端能够快速联系主 OSD 以存储或检索对象。</span>
<span class="line">	1 Ceph 客户端输入Pool名称和对象ID</span>
<span class="line">		rados put <span class="token punctuation">{</span>object_name<span class="token punctuation">}</span> <span class="token operator">/</span>path/to/local_file <span class="token operator">--</span>pool=<span class="token punctuation">{</span>pool_name<span class="token punctuation">}</span></span>
<span class="line">	2 Ceph 获取对象ID后对其进行hash处理</span>
<span class="line">		hash<span class="token punctuation">(</span>对象ID名称<span class="token punctuation">)</span><span class="token operator">%</span>PG_num</span>
<span class="line">	3 Ceph 基于PG数为模对PG进行哈希计算后获取 PG ID，比如 58</span>
<span class="line">	4 Ceph 根据pool名称获取Pool ID，比如 4</span>
<span class="line">	5 Ceph 将pool ID 附加到 PG ID，比如 4<span class="token punctuation">.</span>58</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Ceph OSD 守护进程会检查彼此的心跳并向 Ceph Mon节点报告状态信息。</span>
<span class="line">	Ceph OSD 守护进程会将同一组PG中所有对象的状态进行一致性同步，同步异常往往会自动解决</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>数据一致性</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	为了保证Ceph 存储集群的数据安全向，它被设计为存储至少两个对象副本，以便它可以在保持数据安全的同时继续在某个状态下运行。</span>
<span class="line">	<span class="token namespace">[root@mon01 ~]</span><span class="token comment"># ceph daemon osd.0 config show | grep default_size</span></span>
<span class="line">    <span class="token string">&quot;osd_pool_default_size&quot;</span>: <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token namespace">[root@mon01 ~]</span><span class="token comment"># ceph osd pool get ecpool size</span></span>
<span class="line">	size: 3</span>
<span class="line">	所以PG在关联的时候，往往会关联多个OSD的id值，我们会将同一个PG关联的多个OSD集合称为 Acting <span class="token function">Set</span>，注意该<span class="token function">Set</span>是一个有序集合。其中第一个OSD，我们将其称为 Primary OSD，然后依次类推为 Secondary OSD等等。注意Primary OSD守护进程会维护同一组PG的所有OSD副本数据状态的一致性。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	对于Acting <span class="token function">Set</span>的 Ceph OSD 守护进程状态主要有四种：</span>
<span class="line">		UP<span class="token punctuation">(</span>启动已运行<span class="token punctuation">)</span>、Down<span class="token punctuation">(</span>关闭未运行<span class="token punctuation">)</span>、In<span class="token punctuation">(</span>集群中<span class="token punctuation">)</span>、Out<span class="token punctuation">(</span>集群外<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">	</span>
<span class="line">	我们可以通过 ceph <span class="token operator">-</span>s、ceph osd tree、ceph osd stat来查看OSD的状态信息</span>
<span class="line">	<span class="token namespace">[root@mon01 ~]</span><span class="token comment"># ceph osd stat</span></span>
<span class="line">	6 osds: 6 up <span class="token punctuation">(</span>since 14h<span class="token punctuation">)</span><span class="token punctuation">,</span> 6 in <span class="token punctuation">(</span>since 14h<span class="token punctuation">)</span><span class="token punctuation">;</span> epoch: e631</span>
<span class="line">	注意：</span>
<span class="line">		OSD和PG上的每一次状态变更的历史信息，我们称为epoch</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+o+`" alt="image-20220930111350189"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-2-2-归置组" tabindex="-1"><a class="header-anchor" href="#_1-2-2-归置组"><span>1.2.2 归置组</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>PG简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	当用户在Ceph存储集群中创建存储池Pool的时候，我们往往会为它创建PG和PGS，如果我们没有指定PG和PGP的话，则Ceph使用配置文件中的默认值来创建Pool的PG和PGP。通常情况下，我们建议用户根据实际情况在配置文件中自定义pool的对象副本数量和PG数目。</span>
<span class="line">参考资料：</span>
<span class="line">	https:<span class="token operator">/</span><span class="token operator">/</span>docs<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com/en/latest/rados/configuration/pool-pg-config-ref/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	关于对象副本数目，用户可以根据自身对于数据安全性的要求程度进行设置，Ceph默认存储一份主数据对象和两个副本数据<span class="token punctuation">(</span>osd pool default size = 3<span class="token punctuation">)</span>。对于PG数目，假如数据对象副本数目为N，集群OSD数量为M，则每个OSD上的PG数量为X，官方提供了一个默认的PG数量计算公式。</span>
<span class="line">	PG<span class="token punctuation">|</span>PGP 数量 = M <span class="token operator">*</span> X <span class="token operator">/</span> N</span>
<span class="line">注意：</span>
<span class="line">	官方推荐X默认的值为100</span>
<span class="line">	再一个，PG算出来的数据往往不是一个整数，但是我们往往将该值取为最接近2的幂次方值。	</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">PG数量计数：</span>
<span class="line">	假如Ceph集群有100个OSD，数据副本为3，则PG数量值为 100*100/3=3333<span class="token punctuation">.</span>33<span class="token punctuation">,</span>该值不是一个整数，我们将该值取为4096<span class="token punctuation">(</span>2^12<span class="token punctuation">)</span><span class="token punctuation">,</span>所以我们可以将PG相关的属性设置为</span>
<span class="line">	<span class="token namespace">[global]</span></span>
<span class="line">    osd pool default size = 4</span>
<span class="line">    osd pool default min size = 1</span>
<span class="line">    osd pool default pg mum = 4096</span>
<span class="line">    osd pool default pgp mum = 4096</span>
<span class="line"></span>
<span class="line">常见数量统计：</span>
<span class="line">	OSD&lt;5个，pg_num 设置为 256；5个&lt;OSD&lt;10个，pg_num 设置为 512；</span>
<span class="line">	10个&lt;OSD&lt;50个，pg_num 设置为 2048；50个&lt;OSD，pg_num 设置为 4096；</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>信息查看</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">存储池的归置组数量设置好之后，还可以增加，但不可以减少</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool create mypool 128</span>
<span class="line">pool <span class="token string">&#39;mypool&#39;</span> created</span>
<span class="line"></span>
<span class="line">获取PG和PGP的数量</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool get mypool pg_num</span>
<span class="line">pg_num: 128</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool get mypool pgp_num</span>
<span class="line">pgp_num: 128</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">调整PG的数量</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool <span class="token function">set</span> mypool pg_num 256</span>
<span class="line"><span class="token function">set</span> pool 7 pg_num to 256</span>
<span class="line"></span>
<span class="line">调整PGP的数量<span class="token punctuation">(</span>不允许大于PG梳理<span class="token punctuation">)</span></span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool <span class="token function">set</span> mypool pgp_num 512</span>
<span class="line">Error EINVAL: specified pgp_num 512 &gt; pg_num 256</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool <span class="token function">set</span> mypool pgp_num 256</span>
<span class="line"><span class="token function">set</span> pool 7 pgp_num to 256</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取完整的PG的统计信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg dump</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg dump <span class="token operator">--</span>format=json</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg dump <span class="token operator">--</span>format=json-pretty</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取精简的PG统计信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph <span class="token operator">-</span>s <span class="token punctuation">|</span> grep pgs</span>
<span class="line">    pools:   1 pools<span class="token punctuation">,</span> 256 pgs</span>
<span class="line">    pgs:     256 active+clean</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg dump_stuck</span>
<span class="line">ok</span>
<span class="line"></span>
<span class="line">查看所有PG的状态</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg stat</span>
<span class="line">256 pgs: 256 active+clean<span class="token punctuation">;</span> 0 B <span class="token keyword">data</span><span class="token punctuation">,</span> 122 MiB used<span class="token punctuation">,</span> 114 GiB <span class="token operator">/</span> 120 GiB avail</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看指定PG值的统计信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg 7<span class="token punctuation">.</span>c4 query</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>状态</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查集群状态时<span class="token punctuation">(</span>ceph <span class="token operator">-</span>s<span class="token punctuation">)</span>， Ceph 会报告归置组状态<span class="token punctuation">,</span>其最优状态为 active+clean。其他常见状态有：</span>
<span class="line">    Creating 			Ceph 仍在创建归置组。</span>
<span class="line">    Active				Ceph 可处理到归置组的请求。</span>
<span class="line">    Clean				Ceph 把归置组内的对象复制了规定次数。</span>
<span class="line">    Down				包含必备数据的副本挂了，所以归置组离线。</span>
<span class="line">    Replay				某 OSD 崩溃后，归置组在等待客户端重放操作。</span>
<span class="line">    Splitting			Ceph 正在把一归置组分割为多个。（实现了？）</span>
<span class="line">    Scrubbing			Ceph 正在检查归置组的一致性。</span>
<span class="line">    Degraded			归置组内的对象还没复制到规定次数。</span>
<span class="line">    Inconsistent		Ceph 检测到了归置组内一或多个副本间不一致现象。</span>
<span class="line">    Peering				归置组正在互联。</span>
<span class="line">    Repair				Ceph 正在检查归置组、并试图修复发现的不一致（如果可能的话）。</span>
<span class="line">    Recovering			Ceph 正在迁移<span class="token operator">/</span>同步对象及其副本。</span>
<span class="line">    Backfill			Ceph 正在扫描并同步整个归置组的内容，Backfill 是恢复的一种特殊情况。</span>
<span class="line">    <span class="token function">Wait-backfill</span>		归置组正在排队，等候回填。</span>
<span class="line">    Backfill-toofull	一回填操作在等待，因为目标 OSD 使用率超过了占满率。</span>
<span class="line">    Incomplete			Ceph 探测到某一归置组异常。</span>
<span class="line">    Stale				归置组处于一种未知状态，从归置组运行图变更起就没再收到它的更新。</span>
<span class="line">    Remapped			归置组被临时映射到了另外一组 OSD ，它们不是 CRUSH 算法指定的。</span>
<span class="line">    Undersized			此归置组的副本数小于配置的存储池副本水平。</span>
<span class="line">    Peered				此归置组已互联，因为副本数没有达到标准，不能向客户端提供服务</span>
<span class="line">    </span>
<span class="line">异常状态标识</span>
<span class="line">	Inactive 			归置组不能处理读写，因为它们在等待一个有最新数据的 OSD 复活且进入集群。</span>
<span class="line">	Unclean 			归置组含有复制数未达到期望数量的对象，它们应该在恢复中。</span>
<span class="line">	Stale 				归置组处于未知状态：存储它们的 OSD 有段时间没向监视器报告了。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>获取特殊状态的PG</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg dump_stuck stale</span>
<span class="line">ok</span>
<span class="line">注意：</span>
<span class="line">	其他的异常状态有：inactive<span class="token punctuation">|</span>unclean<span class="token punctuation">|</span>stale<span class="token punctuation">|</span>undersized<span class="token punctuation">|</span>degraded</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>列举不一致pg信息</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">列出不一致的PG：</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rados list-inconsistent-pg mypool</span>
<span class="line"><span class="token punctuation">[</span><span class="token punctuation">]</span></span>
<span class="line">列出不一致的 rados 对象：</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rados list-inconsistent-obj 7<span class="token punctuation">.</span>c4</span>
<span class="line"><span class="token punctuation">{</span><span class="token string">&quot;epoch&quot;</span>:156<span class="token punctuation">,</span><span class="token string">&quot;inconsistents&quot;</span>:<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">列出给定置放群组中不一致的快照集：</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rados list-inconsistent-snapset 7<span class="token punctuation">.</span>c4</span>
<span class="line"><span class="token punctuation">{</span><span class="token string">&quot;epoch&quot;</span>:156<span class="token punctuation">,</span><span class="token string">&quot;inconsistents&quot;</span>:<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修复损坏pg信息</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg repair 7<span class="token punctuation">.</span>c4</span>
<span class="line">instructing pg 7<span class="token punctuation">.</span>c4 on osd<span class="token punctuation">.</span>4 to repair</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>临时PG</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	假设一个PG的acting <span class="token function">set</span>为<span class="token punctuation">[</span>0<span class="token punctuation">,</span>1<span class="token punctuation">,</span>2<span class="token punctuation">]</span>列表。此时如果osd0出现故障，导致CRUSH算法重新分配该PG的acting <span class="token function">set</span>为<span class="token punctuation">[</span>3<span class="token punctuation">,</span>1<span class="token punctuation">,</span>2<span class="token punctuation">]</span>。此时osd3为该PG的主OSD，但是OSD3为新加入的OSD，并不能负担该PG上的读操作。所以PG向Monitor申请一个临时的PG，osd1为临时的主OSD，这是up <span class="token function">set</span>变为<span class="token punctuation">[</span>1<span class="token punctuation">,</span>3<span class="token punctuation">,</span>2<span class="token punctuation">]</span>，acting <span class="token function">set</span>依然为<span class="token punctuation">[</span>3<span class="token punctuation">,</span>1<span class="token punctuation">,</span>2<span class="token punctuation">]</span>，导致acting <span class="token function">set</span>和up <span class="token function">set</span>不同。当osd3完成Backfill过程之后，临时PG被取消，该PG的up <span class="token function">set</span>修复为acting <span class="token function">set</span>，此时acting <span class="token function">set</span>和up <span class="token function">set</span>都是<span class="token punctuation">[</span>3<span class="token punctuation">,</span>1<span class="token punctuation">,</span>2<span class="token punctuation">]</span>列表。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-2-3-运行图" tabindex="-1"><a class="header-anchor" href="#_1-2-3-运行图"><span>1.2.3 运行图</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>map简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	对于Ceph集群来说，有个非常重要的特点就是高性能，而高性能有一个非常突出的特点就是单位时间内处理业务数据的量。Ceph为了实现业务数据的精准高效操作，它主要是通过五种Map分别来实现特定的功能：</span>
<span class="line">	Monitor Map</span>
<span class="line">		Mon节点和所有节点的连接信息，包括ceph集群ID，monitor 节点名称，IP地址和端口等。</span>
<span class="line">	CRUSH Map </span>
<span class="line">		让 Ceph 在正常运行情况下进行高效数据操作的重要支撑部分，包括数据的写入和查询用到的设备列表、存储桶信息、故障域结构，故障域规则等。</span>
<span class="line">	OSD Map</span>
<span class="line">		保存OSD的基本信息，包括ID，状态，副本、PG、OSD信息等，便于数据的均衡性操作。</span>
<span class="line">	MDS Map</span>
<span class="line">		保存MDS的基本信息，包括版本号、创建和修改时间、数据和元数据存储池、数量、MDS状态等。</span>
<span class="line">	PG Map</span>
<span class="line">		保存PG的基本信息，包括PG的ID、数量、状态、版本号、时间戳、容量百分比等。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+n+`" alt="image-20220930074909586"></p><p><strong>简单实践</strong></p><p>基本map关联关系</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看mon相关的关联关系</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$  ceph mon dump</span>
<span class="line">epoch 3</span>
<span class="line">fsid d932ded6-3765-47c1-b0dc-e6957051e31a</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">2: <span class="token namespace">[v2:10.0.0.15:3300/0,v1:10.0.0.15:6789/0]</span> mon<span class="token punctuation">.</span>mon03</span>
<span class="line">dumped monmap epoch 3</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看osd相关信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd dump</span>
<span class="line">epoch 158</span>
<span class="line">fsid d932ded6-3765-47c1-b0dc-e6957051e31a</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">osd<span class="token punctuation">.</span>5 up   in  weight 1 up_from 146 up_thru 156 down_at 145 last_clean_interval <span class="token punctuation">[</span>125<span class="token punctuation">,</span>142<span class="token punctuation">)</span> <span class="token namespace">[v2:10.0.0.15:6800/1274,v1:10.0.0.15:6805/1274]</span> <span class="token namespace">[v2:192.168.8.15:6804/1274,v1:192.168.8.15:6805/1274]</span> exists<span class="token punctuation">,</span>up 67282205-0c58-49c8-9af6-878198d05f2e</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看mds相关信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mds dump</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看crush相关信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd crush dump</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;devices&quot;</span>: <span class="token punctuation">[</span> 					<span class="token comment"># 设备列表信息</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token string">&quot;id&quot;</span>: 0<span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;name&quot;</span>: <span class="token string">&quot;osd.0&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;class&quot;</span>: <span class="token string">&quot;hdd&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;types&quot;</span>: <span class="token punctuation">[</span>						<span class="token comment"># 资源类型列表12类，主要有</span></span>
<span class="line">        <span class="token punctuation">{</span>							<span class="token comment"># osd、host、chassis、rack</span></span>
<span class="line">            <span class="token string">&quot;type_id&quot;</span>: 0<span class="token punctuation">,</span>			<span class="token comment"># row、pdu、pod、room</span></span>
<span class="line">            <span class="token string">&quot;name&quot;</span>: <span class="token string">&quot;osd&quot;</span>			<span class="token comment"># datacenter、zone、region、root</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;buckets&quot;</span>: <span class="token punctuation">[</span>					<span class="token comment"># 存储桶列表</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token string">&quot;id&quot;</span>: <span class="token operator">-</span>1<span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;name&quot;</span>: <span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;rules&quot;</span>: <span class="token punctuation">[</span>						<span class="token comment"># 数据映射规则列表</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token string">&quot;rule_id&quot;</span>: 0<span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;rule_name&quot;</span>: <span class="token string">&quot;replicated_rule&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;tunables&quot;</span>: <span class="token punctuation">{</span>					<span class="token comment"># 可调节的相关属性</span></span>
<span class="line">        <span class="token string">&quot;choose_local_tries&quot;</span>: 0<span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;choose_args&quot;</span>: <span class="token punctuation">{</span><span class="token punctuation">}</span>				<span class="token comment"># 可选择的其他参数</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看PG的相关信息</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看pg相关的信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg dump</span>
<span class="line">version 3481</span>
<span class="line">stamp 2062-10-08 20:54:41<span class="token punctuation">.</span>007647</span>
<span class="line">last_osdmap_epoch 0</span>
<span class="line">last_pg_scan 0</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">OSD_STAT USED    AVAIL   USED_RAW TOTAL   HB_PEERS    PG_SUM PRIMARY_PG_SUM</span>
<span class="line">5         20 MiB  19 GiB  1<span class="token punctuation">.</span>0 GiB  20 GiB <span class="token punctuation">[</span>0<span class="token punctuation">,</span>1<span class="token punctuation">,</span>2<span class="token punctuation">,</span>3<span class="token punctuation">,</span>4<span class="token punctuation">]</span>    137             44</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">sum      122 MiB 114 GiB  6<span class="token punctuation">.</span>1 GiB 120 GiB</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看PG-OSD关系图</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg map 7<span class="token punctuation">.</span>c4</span>
<span class="line">osdmap e158 pg 7<span class="token punctuation">.</span>c4 <span class="token punctuation">(</span>7<span class="token punctuation">.</span>c4<span class="token punctuation">)</span> <span class="token operator">-</span>&gt; up <span class="token punctuation">[</span>4<span class="token punctuation">,</span>2<span class="token punctuation">,</span>1<span class="token punctuation">]</span> acting <span class="token punctuation">[</span>4<span class="token punctuation">,</span>2<span class="token punctuation">,</span>1<span class="token punctuation">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">提交文件到对应的osd里面</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rados put ceph-file <span class="token operator">/</span>home/cephadm/ceph-cluster/ceph<span class="token punctuation">.</span>conf <span class="token operator">--</span>pool=mypool</span>
<span class="line">object-PG-OSD关系图 查看ceph-file文件对象的内部属性关系</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd map mypool ceph-file</span>
<span class="line">osdmap e51 pool <span class="token string">&#39;mypool&#39;</span> <span class="token punctuation">(</span>1<span class="token punctuation">)</span> object <span class="token string">&#39;ceph-file&#39;</span> <span class="token operator">-</span>&gt; pg 1<span class="token punctuation">.</span>7753490d <span class="token punctuation">(</span>1<span class="token punctuation">.</span>d<span class="token punctuation">)</span> <span class="token operator">-</span>&gt; up <span class="token punctuation">(</span><span class="token punctuation">[</span>2<span class="token punctuation">,</span>1<span class="token punctuation">,</span>5<span class="token punctuation">]</span><span class="token punctuation">,</span> p2<span class="token punctuation">)</span> acting <span class="token punctuation">(</span><span class="token punctuation">[</span>2<span class="token punctuation">,</span>1<span class="token punctuation">,</span>5<span class="token punctuation">]</span><span class="token punctuation">,</span> p2<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-2-4-crush" tabindex="-1"><a class="header-anchor" href="#_1-2-4-crush"><span>1.2.4 CRUSH</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	CRUSH<span class="token punctuation">(</span>Controlled Replication Under Scalable Hashing<span class="token punctuation">)</span>是ceph的核心设计之一，它本质上是Ceph存储集群使用的一种数据分发算法，类似于OpenStack的Swift和AQS的对象存储所使用的哈希和一致性hash数据分布算法。</span>
<span class="line">	CRUSH算法通过接受多维参数，通过一定的计算对客户端对象数据进行分布存储位置的确定，来解决数据动态分发的问题。因此ceph客户端无需经过传统查表的方式来获取数据的索引，进而根据索引来读写数据，只需通过crush算法计算后直接和对应的OSD交互进行数据读写。这样，ceph就避免了查表这种传统中心化架构存在的单点故障、性能瓶颈以及不易扩展的缺陷。这也是Ceph相较于其他分布式存储系统具有高扩展性、高可用和高性能特点的主要原因。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>CRUSH Map简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">Ceph中的寻址至少要经历以下三次映射：</span>
<span class="line">	File 和 object 映射：文件数据object的数据块切片操作，便于多数据的并行化处理。</span>
<span class="line">	Object 和 PG 映射：将文件数据切分后的每一个Object通过简单的 Hash 算法归到一个 PG 中。</span>
<span class="line">	PG 和 OSD 映射：将PG映射到主机实际的OSD数据磁盘上。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	CRUSH算法提供了配置和更改和数据动态再平衡等关键特性，而CRUSH算法存储数据对象的过程可通过CRUSH Map控制并进行自定义修改，CRUSH Map是Ceph集群物理拓扑结构、副本策略以及故障域等信息抽象配置段，借助于CRUSH Map可以将数据伪随机地分布到集群的各个OSD上。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+r+`" alt="image-20221008220724118"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">CRUSH Map 由不同层次的逻辑Buckets 和 Devices组成：</span>
<span class="line">	Buckets <span class="token operator">-</span> Root指的是多区域，datacenter是数据中心，room是机房、rack是机柜，host是主机</span>
<span class="line">	Devices <span class="token operator">-</span> 主要指各种OSD存储设备</span>
<span class="line">注意：</span>
<span class="line">	对于每一个Ceph集群来说，CRUSH Map在正式上线前已经确定好了，如果用户需要自定义更改CRUSH Map的话，必须在集群上线前进行更改和核实，然后应用到CRUSH算法中。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Buckets</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">CRUSH Map中的Buckets是用户自定义增加的，每个层级的Bucket对应不同的故障域，在实际应用中，为了更加精细化地隔离故障域，用户还可以增加PDU、POD、ROW、CHASSIS等，这些名称是用户随意定义的。</span>
<span class="line">对于Ceph N版本来说，它默认声明了12种Buckets。</span>
<span class="line">	root-根分区、region-可用区域、zone-数据区域、datacenter-数据中心</span>
<span class="line">	room-机房、pod-机房单间、pdu-电源插座、row-机柜排</span>
<span class="line">	rack-机柜、chassis-机箱、host-主机、osd-磁盘</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件解读</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"></span>
<span class="line"><span class="token comment"># begin crush map  设定修正bug、优化算法、以及向后兼容老版本等属性信息</span></span>
<span class="line">tunable choose_local_tries 0			<span class="token comment"># 为做向后兼容应保持为0</span></span>
<span class="line">tunable choose_local_fallback_tries 0	<span class="token comment"># 为做向后兼容应保持为0</span></span>
<span class="line">tunable choose_total_tries 50			<span class="token comment"># 选择bucket的最大重试次数</span></span>
<span class="line">tunable chooseleaf_descend_once 1		<span class="token comment"># 为做向后兼容应保持为1</span></span>
<span class="line">tunable chooseleaf_vary_r 1				<span class="token comment"># 修复旧bug，为做向后兼容应保持为1</span></span>
<span class="line">tunable chooseleaf_stable 1				<span class="token comment"># 避免不必要的pg迁移，为做向后兼容应保持为1</span></span>
<span class="line">tunable straw_calc_version 1			<span class="token comment"># straw算法版本，为做向后兼容应保持为1</span></span>
<span class="line">tunable allowed_bucket_algs 54			<span class="token comment"># 允许使用的bucket选择算法，通过位运算计算得出的值</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># devices 该部分保存了 Ceph 集群中所有 OSD 设备和 ceph-osd 守护进程的映射关系。</span></span>
<span class="line"><span class="token comment"># 格式： device {num} {osd.name} [class {class}]</span></span>
<span class="line">device 0 osd<span class="token punctuation">.</span>0 <span class="token keyword">class</span> hdd</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">device 5 osd<span class="token punctuation">.</span>5 <span class="token keyword">class</span> hdd</span>
<span class="line"></span>
<span class="line"><span class="token comment"># types 该部分定义了在 CRUSH 层次结构中用到的 buckets 类型。</span></span>
<span class="line"><span class="token comment"># 格式：type {num} {bucket-name}</span></span>
<span class="line"><span class="token function">type</span> 0 osd			<span class="token comment"># OSD守护进程编号（如：osd.1,osd.2等）</span></span>
<span class="line"><span class="token function">type</span> 1 host			<span class="token comment"># OSD所在主机名称</span></span>
<span class="line"><span class="token function">type</span> 2 chassis		<span class="token comment"># host所在机箱名称</span></span>
<span class="line"><span class="token function">type</span> 3 rack			<span class="token comment"># 机箱所在机柜名称</span></span>
<span class="line"><span class="token function">type</span> 4 row			<span class="token comment"># 机柜所在排名称</span></span>
<span class="line"><span class="token function">type</span> 5 pdu			<span class="token comment"># 机柜排所在的电源插座</span></span>
<span class="line"><span class="token function">type</span> 6 pod			<span class="token comment"># 电源插座专属的单间</span></span>
<span class="line"><span class="token function">type</span> 7 room			<span class="token comment"># 房间所属的机房</span></span>
<span class="line"><span class="token function">type</span> 8 datacenter	<span class="token comment"># 机房所属的数据中心</span></span>
<span class="line"><span class="token function">type</span> 9 zone			<span class="token comment"># 数据中心所属的数据区域</span></span>
<span class="line"><span class="token function">type</span> 10 region		<span class="token comment"># 数据区域所属的可用区域</span></span>
<span class="line"><span class="token function">type</span> 11 root		<span class="token comment"># 设备管理的根路径</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># buckets 该部分定义了一个个具体的type类型的设备区域</span></span>
<span class="line">host mon01 <span class="token punctuation">{</span></span>
<span class="line">        id <span class="token operator">-</span>3           <span class="token comment"># do not change unnecessarily</span></span>
<span class="line">        id <span class="token operator">-</span>4 <span class="token keyword">class</span> hdd         <span class="token comment"># do not change unnecessarily</span></span>
<span class="line">        <span class="token comment"># weight 0.039</span></span>
<span class="line">        alg straw2		<span class="token comment"># straw2算法减少了集群发生了改变后的数据移动</span></span>
<span class="line">        hash 0  <span class="token comment"># bucket使用的hash算法，默认是rjenkins1</span></span>
<span class="line">        item osd<span class="token punctuation">.</span>0 weight 0<span class="token punctuation">.</span>019		<span class="token comment"># 低一层级的bucket名称，以及其对应的weight</span></span>
<span class="line">        item osd<span class="token punctuation">.</span>1 weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># rules 部分定义了存储池的属性，以及存储池中数据的存放方式，尤其是复制(replication)和放置(placement)数据的策略。默认的 CRUSH map 包含了适用于默认存储池 rbd 的一条规则。</span></span>
<span class="line">rule replicated_rule <span class="token punctuation">{</span></span>
<span class="line">        id 0				<span class="token comment"># 定制所属规则集</span></span>
<span class="line">        <span class="token function">type</span> replicated		<span class="token comment"># 作用副本存储池范围</span></span>
<span class="line">        min_size 1			<span class="token comment"># 副本少于1个，规则失效</span></span>
<span class="line">        max_size 10			<span class="token comment"># 副本大于10个，规则失效</span></span>
<span class="line">        step take default	<span class="token comment"># 作用于default类型的bucket</span></span>
<span class="line">        step chooseleaf firstn 0 <span class="token function">type</span> host	<span class="token comment"># 作用于包含3个子bucket的host</span></span>
<span class="line">        step emit  <span class="token comment"># 表示数据处理的方式，处理完数据后，清理处理过程</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># end crush map</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">bucket 实例的属性解析</span>
<span class="line"><span class="token namespace">[bucket类型]</span> <span class="token namespace">[bucket名称]</span> <span class="token punctuation">{</span></span>
<span class="line">   id <span class="token punctuation">[</span>负整数表示bucket唯一ID<span class="token punctuation">]</span></span>
<span class="line">   weight <span class="token punctuation">[</span>表示设备容量之间的权重差异，权重1<span class="token punctuation">.</span>00代表1T容量，权重0<span class="token punctuation">.</span>5代表500G容量<span class="token punctuation">]</span></span>
<span class="line">   alg <span class="token namespace">[bucket类型的算法选择: uniform|list|tree|straw|straw2，它是性能和效率之间的一种妥协]</span></span>
<span class="line">   hash <span class="token namespace">[hash算法类型: 0 是默认的rjenkins1算法]</span></span>
<span class="line">   item <span class="token punctuation">[</span>当前bucket的子项元素<span class="token punctuation">]</span> weight <span class="token punctuation">[</span>相对权重值<span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">算法解读：</span>
<span class="line">	uniform 每次设备变动，数据都会进行均衡处理，要求所有设备的权重一致，效率极低</span>
<span class="line">	list 设备的变动场景以链表方式实现，大规模设备场景下，效率极其低下。</span>
<span class="line">	tree 设备的变动场景以二叉树方式实现，综合数据处理性能叫均衡。</span>
<span class="line">	straw 设备的变动场景在list和tree之间选择最优方式进行，同时支持副本放置时公平竞争处理和二级权重处理</span>
<span class="line">	straw2 进阶版的straw，即使出现数据变动，不会影响到跨高层的数据操作。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">rule 实例的属性解析</span>
<span class="line">rule &lt;rule名称&gt;<span class="token punctuation">{</span></span>
<span class="line">    ruleset &lt;当前规则所属的规则集，整数标识&gt;</span>
<span class="line">    <span class="token function">type</span> <span class="token punctuation">[</span>指定rule作用的存储池类型 replicated<span class="token punctuation">|</span>erasure<span class="token punctuation">]</span></span>
<span class="line">    min_size &lt;存储池的副本份数小于min_size值后，rule不起作用&gt;</span>
<span class="line">    max_size &lt;存储池的副本份数大于max_size值后，rule不起作用&gt;</span>
<span class="line">    step take &lt;获取一个 bucket类型名称，开始遍历其结构&gt;</span>
<span class="line">    step <span class="token namespace">[choose|chooseleaf]</span> <span class="token namespace">[firstn|indep]</span> &lt;num&gt; &lt;bucket-<span class="token function">type</span>&gt;</span>
<span class="line">    step emit</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">注意：</span>
<span class="line">	choose：选择到预期数量和类型的bucket即可结束</span>
<span class="line">	chooseleaf：选择到预期数量和类型的bucket，并最终从这些bucket中选出叶子节点</span>
<span class="line">	<span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">	当出现osd 异常情况时，</span>
<span class="line">		副本池选择firstn方式，表示新节点以追加方式追加到osd列表</span>
<span class="line">		纠删码池选择indep方式，表示新节点以原位置插入添加到osd列表，其他保持有序状态</span>
<span class="line">	<span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">	如果 num==0，选择 N 个 bucket。</span>
<span class="line">  	如果 num &gt; 0 并且 num&lt;N，选择 num 个 bucket。</span>
<span class="line">  	如果 num &lt; 0，选择 N-num 个 bucket</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">举例1：</span>
<span class="line">  	step choose firstn 1 <span class="token function">type</span> row</span>
<span class="line">  	num=1，存储池的副本份数为3，0&lt;num&lt;3，因此，crush map会选择包含 1 个 bucket 的row进行处理。</span>
<span class="line">  	</span>
<span class="line">  	step chooseleaf firstn 0 <span class="token function">type</span> row</span>
<span class="line">  	num=0，存储池的副本份数为3，num==0，因此，crush map会从包含 3 个 bucket 的row的每一个叶子节点中选择一个子元素。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">举例2：</span>
<span class="line">	一个PG的5个副本分布在OSD 1，2，3，4，5上，然后3 down了。</span>
<span class="line">	在firstn模式下：</span>
<span class="line">		CRUSH算法发现3其down掉后，最后在末尾追加一个新的未down的OSD 6，OSD变迁过程为：</span>
<span class="line">			1，2，3，4，5 <span class="token operator">-</span>&gt; 1，2，4，5，6。</span>
<span class="line">	在indep模式下：</span>
<span class="line">		CRUSH算法发现3其down掉后，会在3位置插入一个新的未down的OSD 6，OSD变迁过程为：</span>
<span class="line">			1，2，3，4，5 <span class="token operator">-</span>&gt; 1，2，6，4，5。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>Crush map操作步骤解读</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">crush 相关的信息，我们可以通过两种方法来进行操作：</span>
<span class="line">	1 获取crush相关信息</span>
<span class="line">		ceph osd crush dump</span>
<span class="line">	2 操作crush相关信息</span>
<span class="line">		获取crush map信息后进行格式转换，编辑文件后再次应用crush map数据</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作crush信息</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">1、从monitor节点上获取CRUSH map</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd getcrushmap <span class="token operator">-</span>o crushmap_file</span>
<span class="line">23</span>
<span class="line"></span>
<span class="line">默认获取的文件并不是普通的文本文件，无法直接查看</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ file crushmap_file</span>
<span class="line">crushmap_file: MS Windows icon resource <span class="token operator">-</span> 8 icons<span class="token punctuation">,</span> 1-colors</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">2、获取该crushmap文件后，编译为可读文件</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ crushtool <span class="token operator">-</span>d crushmap_file <span class="token operator">-</span>o crushmap_file<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ file crushmap_file<span class="token punctuation">.</span>txt</span>
<span class="line">crushmap_file<span class="token punctuation">.</span>txt: ASCII text</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看文件内容</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token function">cat</span> crushmap_file<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  <span class="token comment"># 参考上述的文件格式解读</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>crush map信息修改</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改crushmap_file文件内容</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ vim crushmap_file<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rule replicated_rule <span class="token punctuation">{</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">        max_size 20     <span class="token comment"># 修改该值</span></span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">3、将修改后的crushmap_file<span class="token punctuation">.</span>txt编译为二进制文件</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ crushtool <span class="token operator">-</span>c crushmap_file<span class="token punctuation">.</span>txt <span class="token operator">-</span>o new_crushmap_file<span class="token punctuation">.</span>txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">4、将新的crushmap注入到ceph集群</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd setcrushmap <span class="token operator">-</span>i new_crushmap_file<span class="token punctuation">.</span>txt</span>
<span class="line">24</span>
<span class="line"></span>
<span class="line">确认效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd crush dump <span class="token punctuation">|</span> grep max_size</span>
<span class="line">            <span class="token string">&quot;max_size&quot;</span>: 20<span class="token punctuation">,</span></span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd crush rule dump <span class="token punctuation">|</span> grep max_size</span>
<span class="line">        <span class="token string">&quot;max_size&quot;</span>: 20<span class="token punctuation">,</span></span>
<span class="line">结果显示：</span>
<span class="line">	crush map的数据修改成功了</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-2-5-实践解读" tabindex="-1"><a class="header-anchor" href="#_1-2-5-实践解读"><span>1.2.5 实践解读</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>案例需求</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	随着存储技术的发展，目前存储平台中的存储介质的类型也越来越多了，目前主要有两大类型：SSD磁盘和SAS<span class="token punctuation">|</span>SATA磁盘。我们可以根据应用对于场景的使用特点，高性能场景的数据存储使用SSD磁盘，而普通数据的存储我们采用SAS磁盘，所以在SSD场景中，我们就可以基于SSD磁盘组成高性能POOL，将基于SAS<span class="token punctuation">|</span>SATA磁盘组成常规POOL。</span>
<span class="line">	以OpenStack场景为例，对于VM实例来说，Nova对于实时数据IO要求较高，所以推荐使用SSD存储池；VM实例创建过程中不高的冷数据，比如Glance镜像数据和Cinder块设备备份数据，推荐使用SAS<span class="token punctuation">|</span>SATA的常规POOL。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>场景规划</p><p><img src="`+d+`" alt="image-20221009234113283"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	为了区分SSD和SAS磁盘，需要在CRUSH Map中增加Root层，增加SAS和SSD区域。</span>
<span class="line">        业务A对性能要求较高，将SSD作为数据盘，需创建3副本的SSD存储池</span>
<span class="line">        业务B对性能要求不高，但数据量较大，将SAS作为数据盘降低成本，需创建3副本的SAS存储池</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>定制crush map</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制专属文件</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token function">cat</span> crushmap_file_case<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token comment"># begin crush map</span></span>
<span class="line">tunable choose_local_tries 0</span>
<span class="line">tunable choose_local_fallback_tries 0</span>
<span class="line">tunable choose_total_tries 50</span>
<span class="line">tunable chooseleaf_descend_once 1</span>
<span class="line">tunable chooseleaf_vary_r 1</span>
<span class="line">tunable chooseleaf_stable 1</span>
<span class="line">tunable straw_calc_version 1</span>
<span class="line">tunable allowed_bucket_algs 54</span>
<span class="line"></span>
<span class="line"><span class="token comment"># devices</span></span>
<span class="line">device 0 osd<span class="token punctuation">.</span>0 <span class="token keyword">class</span> ssd</span>
<span class="line">device 1 osd<span class="token punctuation">.</span>1 <span class="token keyword">class</span> sas</span>
<span class="line">device 2 osd<span class="token punctuation">.</span>2 <span class="token keyword">class</span> ssd</span>
<span class="line">device 3 osd<span class="token punctuation">.</span>3 <span class="token keyword">class</span> sas</span>
<span class="line">device 4 osd<span class="token punctuation">.</span>4 <span class="token keyword">class</span> ssd</span>
<span class="line">device 5 osd<span class="token punctuation">.</span>5 <span class="token keyword">class</span> sas</span>
<span class="line"></span>
<span class="line"><span class="token comment"># types</span></span>
<span class="line"><span class="token function">type</span> 0 osd</span>
<span class="line"><span class="token function">type</span> 1 host</span>
<span class="line"><span class="token function">type</span> 2 chassis</span>
<span class="line"><span class="token function">type</span> 3 rack</span>
<span class="line"><span class="token function">type</span> 4 row</span>
<span class="line"><span class="token function">type</span> 5 pdu</span>
<span class="line"><span class="token function">type</span> 6 pod</span>
<span class="line"><span class="token function">type</span> 7 room</span>
<span class="line"><span class="token function">type</span> 8 datacenter</span>
<span class="line"><span class="token function">type</span> 9 zone</span>
<span class="line"><span class="token function">type</span> 10 region</span>
<span class="line"><span class="token function">type</span> 11 root</span>
<span class="line"></span>
<span class="line"><span class="token comment"># buckets</span></span>
<span class="line">host mon01-ssd <span class="token punctuation">{</span></span>
<span class="line">        id <span class="token operator">-</span>3           <span class="token comment"># do not change unnecessarily</span></span>
<span class="line">        id <span class="token operator">-</span>4 <span class="token keyword">class</span> ssd         <span class="token comment"># do not change unnecessarily</span></span>
<span class="line">        <span class="token comment"># weight 0.039</span></span>
<span class="line">        alg straw2</span>
<span class="line">        hash 0  <span class="token comment"># rjenkins1</span></span>
<span class="line">        item osd<span class="token punctuation">.</span>0 weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">host mon02-ssd <span class="token punctuation">{</span></span>
<span class="line">        id <span class="token operator">-</span>5           <span class="token comment"># do not change unnecessarily</span></span>
<span class="line">        id <span class="token operator">-</span>6 <span class="token keyword">class</span> ssd         <span class="token comment"># do not change unnecessarily</span></span>
<span class="line">        <span class="token comment"># weight 0.039</span></span>
<span class="line">        alg straw2</span>
<span class="line">        hash 0  <span class="token comment"># rjenkins1</span></span>
<span class="line">        item osd<span class="token punctuation">.</span>2 weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">host mon03-ssd <span class="token punctuation">{</span></span>
<span class="line">        id <span class="token operator">-</span>7           <span class="token comment"># do not change unnecessarily</span></span>
<span class="line">        id <span class="token operator">-</span>8 <span class="token keyword">class</span> ssd         <span class="token comment"># do not change unnecessarily</span></span>
<span class="line">        <span class="token comment"># weight 0.039</span></span>
<span class="line">        alg straw2</span>
<span class="line">        hash 0  <span class="token comment"># rjenkins1</span></span>
<span class="line">        item osd<span class="token punctuation">.</span>4 weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">host mon01-sas <span class="token punctuation">{</span></span>
<span class="line">        id <span class="token operator">-</span>9 <span class="token keyword">class</span> sas</span>
<span class="line">        alg straw2</span>
<span class="line">        hash 0</span>
<span class="line">        item osd<span class="token punctuation">.</span>1 weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">host mon02-sas <span class="token punctuation">{</span></span>
<span class="line">        id <span class="token operator">-</span>10 <span class="token keyword">class</span> sas</span>
<span class="line">        alg straw2</span>
<span class="line">        hash 0</span>
<span class="line">        item osd<span class="token punctuation">.</span>3 weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">host mon03-sas <span class="token punctuation">{</span></span>
<span class="line">        id <span class="token operator">-</span>11 <span class="token keyword">class</span> sas</span>
<span class="line">        alg straw2</span>
<span class="line">        hash 0</span>
<span class="line">        item osd<span class="token punctuation">.</span>5 weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">root ssd <span class="token punctuation">{</span></span>
<span class="line">    id <span class="token operator">-</span>1</span>
<span class="line">    id <span class="token operator">-</span>2 <span class="token keyword">class</span> ssd</span>
<span class="line">    alg straw2</span>
<span class="line">    hash 0</span>
<span class="line">    item mon01-ssd weight 0<span class="token punctuation">.</span>019</span>
<span class="line">    item mon02-ssd weight 0<span class="token punctuation">.</span>019</span>
<span class="line">    item mon03-ssd weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">root sas <span class="token punctuation">{</span></span>
<span class="line">    id <span class="token operator">-</span>127</span>
<span class="line">    id <span class="token operator">-</span>128 <span class="token keyword">class</span> sas</span>
<span class="line">    alg straw2</span>
<span class="line">    hash 0</span>
<span class="line">    item mon01-sas weight 0<span class="token punctuation">.</span>019</span>
<span class="line">    item mon02-sas weight 0<span class="token punctuation">.</span>019</span>
<span class="line">    item mon03-sas weight 0<span class="token punctuation">.</span>019</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># rules</span></span>
<span class="line">rule ssd_rule <span class="token punctuation">{</span></span>
<span class="line">    id 0</span>
<span class="line">    <span class="token function">type</span> replicated</span>
<span class="line">    min_size 1</span>
<span class="line">    max_size 10</span>
<span class="line">    step take ssd</span>
<span class="line">    step chooseleaf firstn 0 <span class="token function">type</span> host</span>
<span class="line">    step emit</span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">rule sas_rule <span class="token punctuation">{</span></span>
<span class="line">    id 1</span>
<span class="line">    <span class="token function">type</span> replicated</span>
<span class="line">    min_size 1</span>
<span class="line">    max_size 10</span>
<span class="line">    step take sas</span>
<span class="line">    step chooseleaf firstn 0 <span class="token function">type</span> host</span>
<span class="line">    step emit</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># end crush map</span></span>
<span class="line">注意：</span>
<span class="line">	每个元素都应该有自己的id值</span>
<span class="line">	原则上来说，每个bucket名称最好不要一致，即使是同一台主机</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">3、将修改后的crushmap_file<span class="token punctuation">.</span>txt编译为二进制文件</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ crushtool <span class="token operator">-</span>c crushmap_file_case<span class="token punctuation">.</span>txt <span class="token operator">-</span>o crushmap_file_case</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">4、将新的crushmap注入到ceph集群</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd setcrushmap <span class="token operator">-</span>i crushmap_file_case</span>
<span class="line">25</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确认效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd crush dump</span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd crush rule dump</span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">结果显示：</span>
<span class="line">	crush map的数据修改成功了</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确认osd的状态树</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd tree</span>
<span class="line">ID   <span class="token keyword">CLASS</span> WEIGHT  <span class="token function">TYPE</span> NAME          STATUS REWEIGHT PRI-AFF</span>
<span class="line"><span class="token operator">-</span>127       0<span class="token punctuation">.</span>05699 root sas</span>
<span class="line"> <span class="token operator">-</span>12       0<span class="token punctuation">.</span>01900     host mon01-sas</span>
<span class="line">   1   sas 0<span class="token punctuation">.</span>01900         osd<span class="token punctuation">.</span>1          up  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line"> <span class="token operator">-</span>13       0<span class="token punctuation">.</span>01900     host mon02-sas</span>
<span class="line">   3   sas 0<span class="token punctuation">.</span>01900         osd<span class="token punctuation">.</span>3          up  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line"> <span class="token operator">-</span>14       0<span class="token punctuation">.</span>01900     host mon03-sas</span>
<span class="line">   5   sas 0<span class="token punctuation">.</span>01900         osd<span class="token punctuation">.</span>5          up  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line">  <span class="token operator">-</span>1       0<span class="token punctuation">.</span>05699 root ssd</span>
<span class="line">  <span class="token operator">-</span>3       0<span class="token punctuation">.</span>01900     host mon01-ssd</span>
<span class="line">   0   ssd 0<span class="token punctuation">.</span>01900         osd<span class="token punctuation">.</span>0          up  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line">  <span class="token operator">-</span>5       0<span class="token punctuation">.</span>01900     host mon02-ssd</span>
<span class="line">   2   ssd 0<span class="token punctuation">.</span>01900         osd<span class="token punctuation">.</span>2          up  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line">  <span class="token operator">-</span>7       0<span class="token punctuation">.</span>01900     host mon03-ssd</span>
<span class="line">   4   ssd 0<span class="token punctuation">.</span>01900         osd<span class="token punctuation">.</span>4          up  1<span class="token punctuation">.</span>00000 1<span class="token punctuation">.</span>00000</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建ssd存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool create ssd_pool 16 16 replicated ssd_rule</span>
<span class="line">pool <span class="token string">&#39;ssd_pool&#39;</span> created</span>
<span class="line"></span>
<span class="line">创建sas存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool create sas_pool 16 16 replicated sas_rule</span>
<span class="line">pool <span class="token string">&#39;sas_pool&#39;</span> created</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确认不同的pool所使用的osd效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg <span class="token function">ls</span><span class="token operator">-</span>by-pool  ssd_pool <span class="token punctuation">|</span>awk <span class="token string">&#39;{print $1,$2,$15}&#39;</span></span>
<span class="line">PG OBJECTS ACTING</span>
<span class="line">15<span class="token punctuation">.</span>0 0 <span class="token punctuation">[</span>4<span class="token punctuation">,</span>0<span class="token punctuation">,</span>2<span class="token punctuation">]</span>p4</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">15<span class="token punctuation">.</span>f 0 <span class="token punctuation">[</span>2<span class="token punctuation">,</span>4<span class="token punctuation">,</span>0<span class="token punctuation">]</span>p2</span>
<span class="line"></span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph pg <span class="token function">ls</span><span class="token operator">-</span>by-pool  sas_pool <span class="token punctuation">|</span>awk <span class="token string">&#39;{print $1,$2,$15}&#39;</span></span>
<span class="line">PG OBJECTS ACTING</span>
<span class="line">16<span class="token punctuation">.</span>0 0 <span class="token punctuation">[</span>3<span class="token punctuation">,</span>5<span class="token punctuation">,</span>1<span class="token punctuation">]</span>p3</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">16<span class="token punctuation">.</span>f 0 <span class="token punctuation">[</span>5<span class="token punctuation">,</span>3<span class="token punctuation">,</span>1<span class="token punctuation">]</span>p5</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_1-3-可视化" tabindex="-1"><a class="header-anchor" href="#_1-3-可视化"><span>1.3 可视化</span></a></h2><h3 id="_1-3-1-dashboard" tabindex="-1"><a class="header-anchor" href="#_1-3-1-dashboard"><span>1.3.1 dashboard</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Ceph dashboard 是通过一个web界面，对已经运行的ceph集群进行状态查看以及功能配置等功能，早起ceph使用的是第三方的dashboard组件。</span>
<span class="line">	</span>
<span class="line">	关于dashboard是通过模块的方式来进行加载的，而且默认情况下，该模块是具备输出所有ceph集群状态的一个模块，因为这里面涉及到某些敏感信息，所以默认情况下，使用https协议来进行访问。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">参考资料：</span>
<span class="line">	https:<span class="token operator">/</span><span class="token operator">/</span>docs<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com/en/latest/mgr/dashboard/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>常见 监控模块工具</p><table><thead><tr><th>工具</th><th>解析</th></tr></thead><tbody><tr><td>calamari</td><td>对外提供了十分漂亮的web管理和监控界面，以及一套改进的REST API接口，在一定程度上简化了ceph管理，最初calamari是作为lnktank公司的ceph企业级商业产品来销售，红帽2015年收购后为了更好地推动ceph的发展，对外宣布calamari开源</td></tr><tr><td>VSM</td><td>Virtual Storage Manager是Inter公司研发并且开源的一款ceph集群管理和监控软件，简化了一些ceph集群部署的一些步骤，可以简单的通过web页面来操作</td></tr><tr><td>Inksope</td><td>Inksope是一个ceph的管理和监控系统，依赖于ceph提供的API，使用MongoDB来存储实时的监控数据和历史信息</td></tr><tr><td>dashboard</td><td>是用python开发的一个ceph的监控面板，用来监控ceph的运行状态。同时提供REST API来访问状态数据，该插件必须安装在mgr节点上。</td></tr></tbody></table><p>查看模块相关的命令</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查与模块相关的功能</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mgr <span class="token operator">--</span>help <span class="token punctuation">|</span> grep module</span>
<span class="line">mgr module disable &lt;module&gt;                               disable mgr module</span>
<span class="line">mgr module enable &lt;module&gt; <span class="token punctuation">{</span><span class="token operator">--</span>force<span class="token punctuation">}</span>                      enable mgr module</span>
<span class="line">mgr module <span class="token function">ls</span>                                             list active mgr modules</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看模块功能</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mgr module <span class="token function">ls</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;always_on_modules&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;balancer&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;crash&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;devicehealth&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;orchestrator_cli&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;progress&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;rbd_support&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;status&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;volumes&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;enabled_modules&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;iostat&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;restful&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;disabled_modules&quot;</span>:</span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token string">&quot;name&quot;</span>: <span class="token string">&quot;alerts&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署dashboard模块</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">默认情况下，ceph是没有dashboard模块的</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mgr module <span class="token function">ls</span> <span class="token punctuation">|</span> grep dashboard</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">在所有的mgr节点上部署dashoard模块</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token keyword">for</span> i in mon01 mon02</span>
<span class="line">&gt; <span class="token keyword">do</span></span>
<span class="line">&gt; ssh cephadm@<span class="token variable">$i</span> <span class="token string">&quot;sudo yum install ceph-mgr-dashboard -y&quot;</span></span>
<span class="line">&gt; done</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确认ceph集群是否启动了dashboard的模块</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mgr module <span class="token function">ls</span> <span class="token punctuation">|</span> grep dashboard                          <span class="token string">&quot;name&quot;</span>: <span class="token string">&quot;dashboard&quot;</span><span class="token punctuation">,</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>启用dashboard</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">启用dashboard模块</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mgr module enable dashboard</span>
<span class="line"></span>
<span class="line">查看已经启用的功能模块</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mgr module <span class="token function">ls</span> <span class="token punctuation">|</span> grep <span class="token operator">-</span>A4 <span class="token string">&quot;enabled_modules&quot;</span></span>
<span class="line">    <span class="token string">&quot;enabled_modules&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;dashboard&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;iostat&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;restful&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看状态</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">关闭dashboard的tls功能</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph config <span class="token function">set</span> mgr mgr/dashboard/ssl false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确认dashboard的服务效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mgr services</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;dashboard&quot;</span>: <span class="token string">&quot;http://stor01.superopsmsb.com:8080/&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">查看服务器启动端口</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token keyword">for</span> i in mon01 mon02<span class="token punctuation">;</span> <span class="token keyword">do</span> ssh cephadm@<span class="token variable">$i</span> <span class="token string">&quot;sudo netstat -tnulp | grep 8080&quot;</span><span class="token punctuation">;</span> done</span>
<span class="line">tcp6       0      0 :::8080       :::<span class="token operator">*</span>       LISTEN      1963/ceph-mgr</span>
<span class="line">tcp6       0      0 :::8080       :::<span class="token operator">*</span>       LISTEN      1903/ceph-mgr</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置模块</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">配置dashboard监听的mon节点地址和端⼝：</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph config <span class="token function">set</span> mgr mgr/dashboard/mon01/server_addr 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13 </span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph config <span class="token function">set</span> mgr mgr/dashboard/mon01/server_port 8080</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph config <span class="token function">set</span> mgr mgr/dashboard/mon02/server_addr 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14 </span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph config <span class="token function">set</span> mgr mgr/dashboard/mon02/server_port 8080</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">重启mgr服务</span>
<span class="line"><span class="token namespace">[root@mon01 ~]</span><span class="token comment"># systemctl restart ceph-mgr.target</span></span>
<span class="line"><span class="token namespace">[root@mon02 ~]</span><span class="token comment"># systemctl restart ceph-mgr.target</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">再次确认监听端口的效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token keyword">for</span> i in mon01 mon02<span class="token punctuation">;</span> <span class="token keyword">do</span> ssh cephadm@<span class="token variable">$i</span> <span class="token string">&quot;sudo netstat -tnulp | grep 8080&quot;</span><span class="token punctuation">;</span> done</span>
<span class="line">tcp        0      0 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:8080   0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0:<span class="token operator">*</span>    LISTEN      2549/ceph-mgr</span>
<span class="line">tcp        0      0 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:8080   0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0:<span class="token operator">*</span>    LISTEN      2211/ceph-mgr</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">浏览器访问：10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:8080 或者 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:8080 查看效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+u+`" alt="image-20221013195313762"></p><p>设定登录密码</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">设定登录的用户名和密码</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">echo</span> <span class="token string">&quot;12345678&quot;</span> &gt;&gt; dashboard_passwd<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph dashboard <span class="token function">set-login</span><span class="token operator">-</span>credentials admin <span class="token operator">-</span>i dashboard_passwd<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span></span>
<span class="line"><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span>          WARNING: this command is deprecated<span class="token punctuation">.</span>              <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span></span>
<span class="line"><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span> Please use the <span class="token function">ac</span><span class="token operator">-</span>user-<span class="token operator">*</span> related commands to manage users<span class="token punctuation">.</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span></span>
<span class="line"><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span></span>
<span class="line">Username and password updated</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">使用用户<span class="token punctuation">(</span>admin<span class="token punctuation">)</span>和密码<span class="token punctuation">(</span>12345678<span class="token punctuation">)</span><span class="token punctuation">,</span>浏览器登录dashboard的效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+m+`" alt="image-20221013195513390"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-3-2-tls实践" tabindex="-1"><a class="header-anchor" href="#_1-3-2-tls实践"><span>1.3.2 tls实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	如果我们希望ceph具有更加安全的访问能力的话，我们可以为dashboard能力提供tls能力。对于ceph来说，它的tls能力主要有两种方式：</span>
<span class="line">	<span class="token operator">-</span> 使用默认的tls能力</span>
<span class="line">	<span class="token operator">-</span> 使用自签证书实现tls能力</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">注意：</span>
<span class="line">	对于tls能力来说，我们需要提前对于ceph启用tls的功能</span>
<span class="line">	ceph config <span class="token function">set</span> mgr mgr/dashboard/ssl true</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基本步骤</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">方法1：使用默认的tls能力</span>
<span class="line">	ceph dashboard create-self-signed-cert</span>
<span class="line">方法2：使用自签证书实现tls能力</span>
<span class="line">	openssl req <span class="token operator">-</span>new <span class="token operator">-</span>nodes <span class="token operator">-</span>x509 <span class="token operator">-</span>subj <span class="token string">&quot;/O=IT/CN=ceph.superopsmsb.com&quot;</span> <span class="token operator">-</span>days 3650 <span class="token operator">-</span>keyout dashboard<span class="token punctuation">.</span>key <span class="token operator">-</span>out dashboard<span class="token punctuation">.</span>crt <span class="token operator">-</span>extensions v3_ca</span>
<span class="line"></span>
<span class="line">配置dashboard加载证书</span>
<span class="line">ceph config-key <span class="token function">set</span> mgr mgr/dashboard/crt <span class="token operator">-</span>i dashboard<span class="token punctuation">.</span>crt </span>
<span class="line">ceph config-key <span class="token function">set</span> mgr mgr/dashboard/key <span class="token operator">-</span>i dashboard<span class="token punctuation">.</span>key</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>使用自动生成证书</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">重启模块</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ mkdir tls &amp;&amp; cd tls</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph mgr module disable dashboard</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph mgr module enable dashboard</span>
<span class="line"></span>
<span class="line">启用tls服务</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph config <span class="token function">set</span> mgr mgr/dashboard/ssl true</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">生成自签证书</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph dashboard create-self-signed-cert</span>
<span class="line">Self-signed certificate created</span>
<span class="line"></span>
<span class="line">创建 web 登录用户密码</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ <span class="token function">echo</span> <span class="token string">&quot;12345678&quot;</span> &gt;&gt; dashboard_passwd<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph dashboard <span class="token function">set-login</span><span class="token operator">-</span>credentials admin <span class="token operator">-</span>i dashboard_passwd<span class="token punctuation">.</span>txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">重启mgr服务</span>
<span class="line"><span class="token namespace">[root@mon01 ~]</span><span class="token comment"># systemctl restart ceph-mgr.target</span></span>
<span class="line"><span class="token namespace">[root@mon02 ~]</span><span class="token comment"># systemctl restart ceph-mgr.target</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">再次确认监听端口的效果</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ <span class="token keyword">for</span> i in mon01 mon02<span class="token punctuation">;</span> <span class="token keyword">do</span> ssh cephadm@<span class="token variable">$i</span> <span class="token string">&quot;sudo netstat -tnulp | grep ceph-mgr&quot;</span><span class="token punctuation">;</span> done</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">tcp        0      0 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:8443    0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0:<span class="token operator">*</span>     LISTEN      3093/ceph-mgr</span>
<span class="line">tcp        0      0 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:8443    0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0:<span class="token operator">*</span>     LISTEN      2491/ceph-mgr</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">使用用户<span class="token punctuation">(</span>admin<span class="token punctuation">)</span>和密码<span class="token punctuation">(</span>12345678<span class="token punctuation">)</span><span class="token punctuation">,</span>浏览器访问：https:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:8443 或者 https:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:8443 查看效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+v+`" alt="image-20221013201943746"></p><p>使用自签名证书</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">重启模块</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph mgr module disable dashboard</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph mgr module enable dashboard</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">生成自签证书</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ openssl req <span class="token operator">-</span>new <span class="token operator">-</span>nodes <span class="token operator">-</span>x509 <span class="token operator">-</span>subj <span class="token string">&quot;/O=IT/CN=ceph.superopsmsb.com&quot;</span> <span class="token operator">-</span>days 3650 <span class="token operator">-</span>keyout dashboard<span class="token punctuation">.</span>key <span class="token operator">-</span>out dashboard<span class="token punctuation">.</span>crt <span class="token operator">-</span>extensions v3_ca</span>
<span class="line">Generating a 2048 bit RSA private key</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">++</span><span class="token operator">+</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token operator">++</span><span class="token operator">+</span></span>
<span class="line">writing new private key to <span class="token string">&#39;dashboard.key&#39;</span></span>
<span class="line"><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">查看效果</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ <span class="token function">ls</span></span>
<span class="line">dashboard<span class="token punctuation">.</span>crt  dashboard<span class="token punctuation">.</span>key  dashboard_passwd<span class="token punctuation">.</span>txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">应用自签证书</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph config-key <span class="token function">set</span> mgr mgr/dashboard/crt <span class="token operator">-</span>i dashboard<span class="token punctuation">.</span>crt </span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph config-key <span class="token function">set</span> mgr mgr/dashboard/key <span class="token operator">-</span>i dashboard<span class="token punctuation">.</span>key</span>
<span class="line"></span>
<span class="line">创建 web 登录用户密码</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ <span class="token function">echo</span> <span class="token string">&quot;12345678&quot;</span> &gt;&gt; dashboard_passwd<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token namespace">[cephadm@admin tls]</span>$ ceph dashboard <span class="token function">set-login</span><span class="token operator">-</span>credentials admin-openssl <span class="token operator">-</span>i dashboard_passwd<span class="token punctuation">.</span>txt</span>
<span class="line"><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span></span>
<span class="line"><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span>          WARNING: this command is deprecated<span class="token punctuation">.</span>              <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span></span>
<span class="line"><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span> Please use the <span class="token function">ac</span><span class="token operator">-</span>user-<span class="token operator">*</span> related commands to manage users<span class="token punctuation">.</span> <span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span></span>
<span class="line"><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span><span class="token operator">*</span></span>
<span class="line">Username and password updated</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">宿主机hosts 文件定制</span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13 ceph<span class="token punctuation">.</span>superopsmsb<span class="token punctuation">.</span>com</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">使用用户<span class="token punctuation">(</span>admin-openssl<span class="token punctuation">)</span>和密码<span class="token punctuation">(</span>12345678<span class="token punctuation">)</span><span class="token punctuation">,</span>浏览器访问 https:<span class="token operator">/</span><span class="token operator">/</span>ceph<span class="token punctuation">.</span>superopsmsb<span class="token punctuation">.</span>com:8443 效果：</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+k+`" alt="image-20221013203249531"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-3-3-rgw实践" tabindex="-1"><a class="header-anchor" href="#_1-3-3-rgw实践"><span>1.3.3 RGW实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	ceph的dashboard很多都是可以直接使用的，但是对于 rgw<span class="token punctuation">,</span>cephfs<span class="token punctuation">,</span>iscsi<span class="token punctuation">,</span>监控等功能，需要基于手工方式启用功能。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+b+`" alt="image-20221013204353270"></p><p>准备rgw环境</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看rgw的效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph <span class="token operator">-</span>s <span class="token punctuation">|</span> grep rgw</span>
<span class="line">    rgw: 1 daemon active <span class="token punctuation">(</span>stor04<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>用户准备</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建专属的用户信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ radosgw-admin user create <span class="token operator">--</span>uid=rgw <span class="token operator">--</span>display-name=rgw <span class="token operator">--</span>system</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token string">&quot;user_id&quot;</span>: <span class="token string">&quot;rgw&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token string">&quot;keys&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token string">&quot;user&quot;</span>: <span class="token string">&quot;rgw&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;access_key&quot;</span>: <span class="token string">&quot;NAS972R98010Q2HUYW1F&quot;</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string">&quot;secret_key&quot;</span>: <span class="token string">&quot;AvQO7AepS0017A75ClRAZxkhFmzFwXxahkyQFHdX&quot;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    </span>
<span class="line">确认效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ radosgw-admin user info <span class="token operator">--</span>uid=rgw</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为Dashboard设置access_key 和 secret_key</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">注意：ceph的rgw属性定制是使用文件方式来实现</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制access-key认证信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token function">echo</span> <span class="token string">&#39;NAS972R98010Q2HUYW1F&#39;</span> &gt; access-key<span class="token punctuation">.</span>file</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph dashboard <span class="token function">set-rgw</span><span class="token operator">-</span>api-access-key <span class="token operator">-</span>i access-key<span class="token punctuation">.</span>file</span>
<span class="line">Option RGW_API_ACCESS_KEY updated</span>
<span class="line"></span>
<span class="line">定制secret_key认证信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token function">echo</span> <span class="token string">&#39;AvQO7AepS0017A75ClRAZxkhFmzFwXxahkyQFHdX&#39;</span> &gt; secret_key<span class="token punctuation">.</span>file</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph dashboard <span class="token function">set-rgw</span><span class="token operator">-</span>api-secret-key <span class="token operator">-</span>i secret_key<span class="token punctuation">.</span>file</span>
<span class="line">Option RGW_API_SECRET_KEY updated</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启mgr服务</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token namespace">[root@mon01 ~]</span><span class="token comment"># systemctl restart ceph-mgr.target</span></span>
<span class="line"><span class="token namespace">[root@mon02 ~]</span><span class="token comment"># systemctl restart ceph-mgr.target</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看dashboard的RGW效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+h+`" alt="image-20221013210433473"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-3-4-nfs实践" tabindex="-1"><a class="header-anchor" href="#_1-3-4-nfs实践"><span>1.3.4 NFS实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	ceph的dashboard很多都是可以直接使用的，但是对于 rgw<span class="token punctuation">,</span>nfs<span class="token punctuation">,</span>iscsi<span class="token punctuation">,</span>监控等功能，需要基于手工方式启用功能。自从Ceph 的J版本开始，ceph引入了 nfs-ganesha软件，ganesha通过rgw和cephfs两种方式实现ceph以nfs的方式实现外部功能访问。从Ceph Nautilus版本开始，Ceph Dashboard中可以直接支持配置这两种方式的NFS。</span>
<span class="line">	<span class="token operator">-</span> FSAL_RGW 调用librgw2将NFS协议转义为S3协议再通过RGW存入到Ceph中</span>
<span class="line">	<span class="token operator">-</span> FSAL_CEPH 调用libcephfs2将NFS转义为Cephfs协议再存入到Ceph 中</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+g+`" alt="image-20221013211051686"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">参考资料：</span>
<span class="line">	https:<span class="token operator">/</span><span class="token operator">/</span>docs<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com/en/latest/cephfs/nfs/<span class="token comment">#nfs</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们以stor04主机为ganesha节点</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看是否安装librgw2和libcephfs2软件包</span>
<span class="line"><span class="token namespace">[root@stor04 ~]</span><span class="token comment"># rpm -qa |grep librgw</span></span>
<span class="line">librgw2-14<span class="token punctuation">.</span>2<span class="token punctuation">.</span>22-0<span class="token punctuation">.</span>el7<span class="token punctuation">.</span>x86_64</span>
<span class="line"><span class="token namespace">[root@stor04 ~]</span><span class="token comment"># rpm -qa |grep libcephfs</span></span>
<span class="line">libcephfs2-14<span class="token punctuation">.</span>2<span class="token punctuation">.</span>22-0<span class="token punctuation">.</span>el7<span class="token punctuation">.</span>x86_64</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制软件源</span>
<span class="line"><span class="token function">cat</span> &gt;&gt; <span class="token operator">/</span>etc/yum<span class="token punctuation">.</span>repos<span class="token punctuation">.</span>d/nfs-ganesha<span class="token punctuation">.</span>repo&lt;&lt; eof</span>
<span class="line"><span class="token namespace">[nfs-ganesha]</span></span>
<span class="line">name=nfs-ganesha</span>
<span class="line">baseurl=http:<span class="token operator">/</span><span class="token operator">/</span>us-west<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com/nfs-ganesha/rpm-V2<span class="token punctuation">.</span>7-stable/nautilus/x86_64/</span>
<span class="line">enabled=1</span>
<span class="line">priority=1</span>
<span class="line">eof</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">部署ganesha服务</span>
<span class="line"><span class="token namespace">[root@stor04 ~]</span><span class="token comment"># yum install nfs-ganesha nfs-ganesha-ceph nfs-ganesha-rgw -y</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">启动服务</span>
<span class="line"><span class="token namespace">[root@stor04 ~]</span><span class="token comment"># systemctl start nfs-ganesha.service</span></span>
<span class="line"><span class="token namespace">[root@stor04 ~]</span><span class="token comment"># systemctl status nfs-ganesha.service</span></span>
<span class="line"><span class="token namespace">[root@stor04 ~]</span><span class="token comment"># systemctl enable nfs-ganesha.service</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>定制存储池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">新建 ganesha_data的pool，用来存放一些dashboard的nfs相关配置文件</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool create ganesha_data 16 16</span>
<span class="line">pool <span class="token string">&#39;ganesha_data&#39;</span> created</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">新建空的daemon<span class="token punctuation">.</span>txt文本文件。</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$  touch daemon<span class="token punctuation">.</span>txt</span>
<span class="line"></span>
<span class="line">导入daemon文件到ganesha_data pool中</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rados <span class="token operator">-</span>p ganesha_data put conf-stor04<span class="token punctuation">.</span>localdomain daemon<span class="token punctuation">.</span>txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">注意事项：</span>
<span class="line">	存入rados的文件名必须要是conf-&lt;daemon_id&gt;格式，其中&lt;daemon_id&gt;对应于运行此服务的节点名称。</span>
<span class="line">	后续Dashboard创建NFS后，conf-&lt;daemon_id&gt;会有内容，每个conf-&lt;daemon_id&gt;都包含指向NFS-Ganesha守护程序应服务的导出的RADOS URL。</span>
<span class="line">		格式为：<span class="token operator">%</span>url rados:<span class="token operator">/</span><span class="token operator">/</span>&lt;pool_name&gt;<span class="token punctuation">[</span><span class="token operator">/</span>&lt;namespace&gt;<span class="token punctuation">]</span><span class="token operator">/</span>export-&lt;id&gt;</span>
<span class="line">	conf-&lt;daemon_id&gt;和export-&lt;id&gt;对象必须存储在同一个RADOS池<span class="token operator">/</span>命名空间</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确认效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rados <span class="token operator">-</span>p ganesha_data <span class="token function">ls</span></span>
<span class="line">conf-mon02<span class="token punctuation">.</span>localdomain</span>
<span class="line">conf-mon03<span class="token punctuation">.</span>localdomain</span>
<span class="line">conf-mon01<span class="token punctuation">.</span>localdomain</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确定rgw认证信息</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看当前Ceph节点的rgw认证信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph auth get client<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>stor04</span>
<span class="line"><span class="token namespace">[client.rgw.stor04]</span></span>
<span class="line">        key = AQCkOEJj/uBgIRAALPAxf3NIp0EbGiCDgLegig==</span>
<span class="line">        caps mon = <span class="token string">&quot;allow rw&quot;</span></span>
<span class="line">        caps osd = <span class="token string">&quot;allow rwx&quot;</span></span>
<span class="line">exported keyring <span class="token keyword">for</span> client<span class="token punctuation">.</span>rgw<span class="token punctuation">.</span>stor04</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置ganesha配置文件</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改所有rgw节点上的ganesha配置文件 </span>
<span class="line"><span class="token namespace">[root@stor04 ~]</span><span class="token comment"># cat /etc/ganesha/ganesha.conf</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token comment"># 定制rados的连接配置</span></span>
<span class="line">RADOS_URLS <span class="token punctuation">{</span></span>
<span class="line">    ceph_conf = <span class="token string">&quot;/etc/ceph/ceph.conf&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    Userid = <span class="token string">&quot;admin&quot;</span><span class="token punctuation">;</span></span>
<span class="line">    watch_url = <span class="token string">&quot;rados://ganesha_data/conf-stor04.localdomain&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token operator">%</span>url rados:<span class="token operator">/</span><span class="token operator">/</span>ganesha_data/conf-stor04<span class="token punctuation">.</span>localdomain</span>
<span class="line"><span class="token comment"># 定制rgw的连接配置</span></span>
<span class="line">RGW <span class="token punctuation">{</span></span>
<span class="line">        ceph_conf = <span class="token string">&quot;/etc/ceph/ceph.conf&quot;</span><span class="token punctuation">;</span></span>
<span class="line">        name = <span class="token string">&quot;client.rgw.stor04.localdomain&quot;</span><span class="token punctuation">;</span></span>
<span class="line">        cluster = <span class="token string">&quot;ceph&quot;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">配置解析：</span>
<span class="line">	RADOS_URLS 定制rados的连接配置</span>
<span class="line">		watch_url 指定rados的专属文件地址</span>
<span class="line">	RGW 定制rgw的连接配置</span>
<span class="line">		name 定制rgw的专属认证账户信息</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">重启ganesha服务</span>
<span class="line"><span class="token namespace">[root@stor04 /etc/ceph]</span><span class="token comment"># systemctl restart nfs-ganesha</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>启用NFS-Ganesha能力</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">设定dashboard的nfs配置所在位置</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph dashboard <span class="token function">set-ganesha</span><span class="token operator">-</span>clusters-rados-pool-namespace ganesha_data</span>
<span class="line">Option GANESHA_CLUSTERS_RADOS_POOL_NAMESPACE updated</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">重启mgr服务</span>
<span class="line"><span class="token namespace">[root@mon01 ~]</span><span class="token comment"># systemctl restart ceph-mgr.target</span></span>
<span class="line"><span class="token namespace">[root@mon02 ~]</span><span class="token comment"># systemctl restart ceph-mgr.target</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">重新查看Dashboard的NFS功能效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+w+`" alt="image-20221013222600422"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_1-4-监控" tabindex="-1"><a class="header-anchor" href="#_1-4-监控"><span>1.4 监控</span></a></h2><h3 id="_1-4-1-prom基础" tabindex="-1"><a class="header-anchor" href="#_1-4-1-prom基础"><span>1.4.1 prom基础</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、术语解析、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>软件简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">    Prometheus 作为生态圈 Cloud Native Computing Foundation（CNCF）中的重要一员</span>
<span class="line"></span>
<span class="line">    Prometheus 本身基于Go语言开发的一套开源的系统监控报警框架和时序列数据库<span class="token punctuation">(</span>TSDB<span class="token punctuation">)</span>。它启发于 Google 的 borgmon 监控系统，在一定程度上可以理解为，Google BorgMon监控系统的开源版本。</span>
<span class="line">    该软件由工作在 SoundCloud 的 google 前员工在 2012 年创建，作为社区开源项目进行开发，并于 2015 年正式发布。2016 年，Prometheus 正式加入 Cloud Native Computing Foundation，随着容器技术的迅速发展，Kubernetes 已然成为大家追捧的容器集群管理系统。其活跃度仅次于 Kubernetes的开源项目<span class="token punctuation">,</span> 现已广泛用于容器集群的监控系统中，当然不仅限于容器集群。。</span>
<span class="line">    Prometheus功能更完善、更全面，性能也足够支撑上万台规模的集群。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">网站：https:<span class="token operator">/</span><span class="token operator">/</span>prometheus<span class="token punctuation">.</span>io/</span>
<span class="line">github：https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/prometheus</span>
<span class="line">最新版本：2<span class="token punctuation">.</span>39<span class="token punctuation">.</span>1 <span class="token operator">/</span> 2022-10-07</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>prometheus的架构效果图如下：</p><p><img src="`+y+`" alt="architecture"></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">	从上图可以看出，Prometheus 的主要模块包括：Prometheus server, exporters, Pushgateway, PromQL, Alertmanager 以及图形界面。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>其大概的工作流程是：</p><pre><code>1 Prometheus server 定期从配置好的 jobs 或者 exporters 中拉 metrics，或者接收来自 Pushgateway 发过来的 metrics，或者从其他的 Prometheus server 中拉 metrics。
2 Prometheus server 在本地存储收集到的 metrics，并运行已定义好的 alert.rules，记录新的时间序列或者向 Alertmanager 推送警报，实现一定程度上的完全冗余功能。
3 Alertmanager 根据配置文件，对接收到的警报进行去重分组，根据路由配置，向对应主机发出告警。
4 集成Grafana或其他API作为图形界面，用于可视化收集的数据。
</code></pre><p>Prometheus 由几个主要的软件组件组成，其职责概述如下。</p><table><thead><tr><th>组件</th><th>解析</th></tr></thead><tbody><tr><td>Prometheus Server</td><td>彼此独立运行，仅依靠其本地存储来实现其核心功能：抓取时序数据，规则处理和警报等。</td></tr><tr><td>Client Library</td><td>客户端库，为需要监控的服务生成相应的 metrics 并暴露给 Prometheus server。当 Prometheus server 来 pull 时，直接返回实时状态的 metrics。</td></tr><tr><td>Push Gateway</td><td>主要用于短期的 jobs。由于这类 jobs 存在时间较短，可能在 Prometheus 来 pull 之前就消失了。为此，这次 jobs 可以直接向 Prometheus server 端推送它们的 metrics。这种方式主要用于服务层面的 metrics，对于机器层面的 metrices，需要使用 node exporter。</td></tr><tr><td>Exporters</td><td>部署到第三方软件主机上，用于暴露已有的第三方服务的 metrics 给 Prometheus。</td></tr><tr><td>Alertmanager</td><td>从 Prometheus server 端接收到 alerts 后，会进行去除重复数据，分组，并路由到对应的接受方式，以高效向用户完成告警信息发送。常见的接收方式有：电子邮件，pagerduty，OpsGenie, webhook 等,一些其他的工具。</td></tr><tr><td>Data Visualization</td><td>Prometheus Web UI （Prometheus Server内建），及Grafana等</td></tr><tr><td>Service Discovery</td><td>动态发现待监控的Target，从而完成监控配置的重要组件，在容器化环境中尤为有用；该组件目前由Prometheus Server内建支持；</td></tr></tbody></table><pre><code>在上诉的组件中，大多数都是用Go编写的，因此易于构建和部署为静态二进制文件。
</code></pre><p><strong>术语解析</strong></p><p>metrics</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Prometheus中存储的数据为时间序列，即基于同一度量标准或者同一时间维度的数据流。除了时间序列数据的正常存储之外，Prometheus还会基于原始数据临时生成新的时间序列数据，用于后续查询的依据或结果。</span>
<span class="line">	每个时间序列都由metric名称和标签<span class="token punctuation">(</span>可选键值对<span class="token punctuation">)</span>组合成唯一标识。</span>
<span class="line">	</span>
<span class="line">	查询语言允许基于这些维度进行过滤和聚合。更改任何标签值，包括添加或删除标签，都会创建一个新的时间序列。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+f+`" alt="image-20211013134435251"></p><p>数据获取</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	这些metric数据，是基于HTTP call方式来进行获取的，从对方的配置文件中指定的网络端点<span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span>上周期性获取指标数据。每一个端点上几乎不可能只有一个数据指标。</span>
<span class="line">	用Prometheus术语来说，一个单独 scrape<span class="token punctuation">(</span>host:port<span class="token punctuation">;</span><span class="token punctuation">)</span>的目标称为instance，通常对应于单个进程。 一组同种类型的 instances集合称为jobs，主要用于保证可扩展性和可靠性。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+_+`" alt="image-20211013111443902"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-4-2-prom部署" tabindex="-1"><a class="header-anchor" href="#_1-4-2-prom部署"><span>1.4.2 prom部署</span></a></h3><p>学习目标</p><p>这一节，我们从 prometheus部署、grafana部署、exporter部署、小结 四个方面来学习。</p><p><strong>prometheus部署</strong></p><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建软件目录</span>
<span class="line">mkdir <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span><span class="token punctuation">{</span>server<span class="token punctuation">,</span>softs<span class="token punctuation">}</span> <span class="token operator">-</span>p</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>softs</span>
<span class="line"></span>
<span class="line">注意：</span>
<span class="line">	以上所有的prometheus软件都去https:<span class="token operator">/</span><span class="token operator">/</span>prometheus<span class="token punctuation">.</span>io/download/网站下载。</span>
<span class="line">	https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/prometheus/prometheus/releases/download/v2<span class="token punctuation">.</span>39<span class="token punctuation">.</span>1/prometheus-2<span class="token punctuation">.</span>39<span class="token punctuation">.</span>1<span class="token punctuation">.</span>linux-amd64<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">解压软件</span>
<span class="line">tar xf prometheus-2<span class="token punctuation">.</span>39<span class="token punctuation">.</span>1<span class="token punctuation">.</span>linux-amd64<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz <span class="token operator">-</span>C <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server</span>
<span class="line">ln <span class="token operator">-</span>s <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/prometheus-2<span class="token punctuation">.</span>39<span class="token punctuation">.</span>1<span class="token punctuation">.</span>linux-amd64 <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/prometheus</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装软件</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">配置准备</span>
<span class="line">mkdir <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/prometheus/<span class="token punctuation">{</span><span class="token keyword">data</span><span class="token punctuation">,</span>cfg<span class="token punctuation">,</span>logs<span class="token punctuation">,</span>bin<span class="token punctuation">}</span> <span class="token operator">-</span>p</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/prometheus</span>
<span class="line"><span class="token function">mv</span> prometheus promtool bin/</span>
<span class="line"><span class="token function">mv</span> prometheus<span class="token punctuation">.</span>yml cfg/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">环境变量定制</span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># cat /etc/profile.d/prometheus.sh </span></span>
<span class="line"><span class="token comment">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># set prometheus env</span></span>
<span class="line">export PROMETHEUS_HOME=<span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/prometheus</span>
<span class="line">export PATH=<span class="token variable">$PATH</span>:$<span class="token punctuation">{</span>PROMETHEUS_HOME<span class="token punctuation">}</span><span class="token operator">/</span>bin</span>
<span class="line"></span>
<span class="line">应用环境变量文件</span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># source /etc/profile.d/prometheus.sh </span></span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># chmod +x /etc/profile.d/prometheus.sh</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务定制</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制prometheus服务文件</span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># cat /usr/lib/systemd/system/prometheus.service</span></span>
<span class="line"><span class="token namespace">[Unit]</span></span>
<span class="line">Description=prometheus server project</span>
<span class="line">After=network<span class="token punctuation">.</span>target</span>
<span class="line"></span>
<span class="line"><span class="token namespace">[Service]</span></span>
<span class="line"><span class="token function">Type</span>=simple</span>
<span class="line">ExecStart=<span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/prometheus/bin/prometheus <span class="token operator">--</span>config<span class="token punctuation">.</span>file=<span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/prometheus/cfg/prometheus<span class="token punctuation">.</span>yml <span class="token operator">--</span>storage<span class="token punctuation">.</span>tsdb<span class="token punctuation">.</span>path=<span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/prometheus/<span class="token keyword">data</span></span>
<span class="line">Restart=on-failure</span>
<span class="line"></span>
<span class="line"><span class="token namespace">[Install]</span></span>
<span class="line">WantedBy=multi-user<span class="token punctuation">.</span>target</span>
<span class="line"></span>
<span class="line">配置解析：</span>
<span class="line">	在这里，我们需要将定制的prometheus的配置文件和数据目录作为启动参数配置好</span>
<span class="line">	其它的参数，我们可以基于prometheus <span class="token operator">--</span>help 查看更多</span>
<span class="line">	</span>
<span class="line">启动服务</span>
<span class="line">systemctl daemon-reload</span>
<span class="line">systemctl <span class="token function">start</span> prometheus<span class="token punctuation">.</span>service</span>
<span class="line">systemctl status prometheus<span class="token punctuation">.</span>service</span>
<span class="line">systemctl enable prometheus<span class="token punctuation">.</span>service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查效果</span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># netstat -tnulp | egrep &#39;Pro|pro&#39;</span></span>
<span class="line">Proto Recv-Q <span class="token function">Send-Q</span> Local Address           Foreign Address         State       PID/Program name    </span>
<span class="line">tcp6       0      0 :::9090                 :::<span class="token operator">*</span>                    LISTEN      25082/prometheus </span>
<span class="line">结果显示：</span>
<span class="line">	可以看到当前主机上可以看到一个端口9090，我们可通过可以看到prometheus的服务页面</span>
<span class="line">	</span>
<span class="line">浏览器访问 http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>18:9090/，查看效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+x+`" alt="image-20221013232913546"></p><p><strong>grafana部署</strong></p><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建软件目录</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>softs</span>
<span class="line">wget https:<span class="token operator">/</span><span class="token operator">/</span>dl<span class="token punctuation">.</span>grafana<span class="token punctuation">.</span>com/enterprise/release/grafana-enterprise-9<span class="token punctuation">.</span>2<span class="token punctuation">.</span>0-1<span class="token punctuation">.</span>x86_64<span class="token punctuation">.</span>rpm</span>
<span class="line">注意：</span>
<span class="line">	grafana软件从 https:<span class="token operator">/</span><span class="token operator">/</span>grafana<span class="token punctuation">.</span>com/grafana/download 下载</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装软件</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">安装软件</span>
<span class="line">sudo yum install grafana-enterprise-9<span class="token punctuation">.</span>2<span class="token punctuation">.</span>0-1<span class="token punctuation">.</span>x86_64<span class="token punctuation">.</span>rpm</span>
<span class="line">注意：</span>
<span class="line">	这里安装的是本地文件，所以要加文件路径</span>
<span class="line"></span>
<span class="line">安装插件</span>
<span class="line">grafana-<span class="token function">cli</span> plugins list-remote</span>
<span class="line">grafana-<span class="token function">cli</span> plugins install grafana-piechart-panel</span>
<span class="line">grafana-<span class="token function">cli</span> plugins <span class="token function">ls</span></span>
<span class="line"></span>
<span class="line">启动服务</span>
<span class="line">systemctl daemon-reload</span>
<span class="line">systemctl <span class="token function">start</span> grafana-server<span class="token punctuation">.</span>service</span>
<span class="line">systemctl status grafana-server<span class="token punctuation">.</span>service</span>
<span class="line">systemctl enable grafana-server<span class="token punctuation">.</span>service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查效果</span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># netstat -tnulp | egrep &#39;Pro|gra&#39;</span></span>
<span class="line">Proto Recv-Q <span class="token function">Send-Q</span> Local Address           Foreign Address         State       PID/Program name    </span>
<span class="line">tcp6       0      0 :::3000                 :::<span class="token operator">*</span>                    LISTEN      25839/grafana-serve </span>
<span class="line">结果显示：</span>
<span class="line">	当前主机上出现了一个端口3000</span>
<span class="line">	</span>
<span class="line">浏览器访问 http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>18:3000/，查看效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+j+`" alt="image-20221013233232284"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">输入用户名和密码：admin/admin，就会进入到更改密码的页面，重置过密码后，查看效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+q+`" alt="image-20221013233326269"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">添加数据源: 点击 <span class="token string">&quot;Add your data source&quot;</span> 选择 <span class="token string">&quot;Prometheus&quot;</span> 出现添加界面</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+S+`" alt="image-20221013233442609"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">点击最下面的 save &amp; test</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>exporter部署</strong></p><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">解压软件</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>softs</span>
<span class="line">tar xf node_exporter-1<span class="token punctuation">.</span>4<span class="token punctuation">.</span>0<span class="token punctuation">.</span>linux-amd64<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz <span class="token operator">-</span>C <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">配置命令</span>
<span class="line">ln <span class="token operator">-</span>s <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/node_exporter-1<span class="token punctuation">.</span>4<span class="token punctuation">.</span>0<span class="token punctuation">.</span>linux-amd64 <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/node_exporter</span>
<span class="line">mkdir <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/node_exporter/bin</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/node_exporter</span>
<span class="line"><span class="token function">mv</span> node_exporter bin/</span>
<span class="line"></span>
<span class="line">配置环境变量</span>
<span class="line"><span class="token comment"># cat /etc/profile.d/node_exporter.sh</span></span>
<span class="line"><span class="token comment">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># set node_exporter env</span></span>
<span class="line">export PROMETHEUS_HOME=<span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/node_exporter</span>
<span class="line">export PATH=<span class="token variable">$PATH</span>:$<span class="token punctuation">{</span>PROMETHEUS_HOME<span class="token punctuation">}</span><span class="token operator">/</span>bin</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">服务文件</span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># cat /usr/lib/systemd/system/node_exporter.service</span></span>
<span class="line"><span class="token namespace">[Unit]</span></span>
<span class="line">Description=node exporter project</span>
<span class="line">After=network<span class="token punctuation">.</span>target</span>
<span class="line"></span>
<span class="line"><span class="token namespace">[Service]</span></span>
<span class="line"><span class="token function">Type</span>=simple</span>
<span class="line">ExecStart=<span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>server/node_exporter/bin/node_exporter</span>
<span class="line">Restart=on-failure</span>
<span class="line"></span>
<span class="line"><span class="token namespace">[Install]</span></span>
<span class="line">WantedBy=multi-user<span class="token punctuation">.</span>target</span>
<span class="line"></span>
<span class="line">启动服务</span>
<span class="line">systemctl daemon-reload</span>
<span class="line">systemctl <span class="token function">start</span> node_exporter<span class="token punctuation">.</span>service</span>
<span class="line">systemctl status node_exporter<span class="token punctuation">.</span>service</span>
<span class="line">systemctl enable node_exporter<span class="token punctuation">.</span>service</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查效果</span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># netstat -tnulp | egrep &#39;Pro|node&#39;    </span></span>
<span class="line">Proto Recv-Q <span class="token function">Send-Q</span> Local Address           Foreign Address         State       PID/Program name    </span>
<span class="line">tcp6       0      0 :::9100                 :::<span class="token operator">*</span>                    LISTEN      24650/node_exporter </span>
<span class="line">结果显示：</span>
<span class="line">	可以看到当前主机上可以看到一个端口9100</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">访问http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>18:9100/metrics 就可以看到node export所在节点的所有定制好的监控项。</span>
<span class="line"><span class="token namespace">[root@stor06 /data/server/node_exporter]</span><span class="token comment"># curl -s http://10.0.0.18:9100/metrics | head</span></span>
<span class="line"><span class="token comment"># HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.</span></span>
<span class="line"><span class="token comment"># TYPE go_gc_duration_seconds summary</span></span>
<span class="line">go_gc_duration_seconds<span class="token punctuation">{</span>quantile=<span class="token string">&quot;0&quot;</span><span class="token punctuation">}</span> 0<span class="token punctuation">.</span>000104469</span>
<span class="line">go_gc_duration_seconds<span class="token punctuation">{</span>quantile=<span class="token string">&quot;0.25&quot;</span><span class="token punctuation">}</span> 0<span class="token punctuation">.</span>000104469</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>环境集成</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">编辑prometheus配置文件</span>
<span class="line"><span class="token punctuation">]</span><span class="token comment"># vim /data/server/prometheus/cfg/prometheus.yml</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">scrape_configs:</span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">  <span class="token operator">-</span> job_name: <span class="token string">&#39;node_exporter&#39;</span></span>
<span class="line">    static_configs:</span>
<span class="line">    <span class="token operator">-</span> targets: <span class="token punctuation">[</span><span class="token string">&#39;10.0.0.12:9100&#39;</span><span class="token punctuation">]</span></span>
<span class="line">    </span>
<span class="line">    属性解析：</span>
<span class="line">        新增一个job_name 和 static_configs的属性</span>
<span class="line">        targets 就是我们在基本概念中讲到的instance，格式就是<span class="token string">&quot;ip:port&quot;</span></span>
<span class="line">        </span>
<span class="line">重启服务        </span>
<span class="line">systemctl restart prometheus<span class="token punctuation">.</span>service    </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">浏览器访问 http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>18:9090/targets 就可以看到node_exporter已经被prometheus加载到监控中了，效果如下</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+$+`" alt="image-20221013234058265"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">登录到Grafana界面，点击左侧边栏<span class="token string">&quot;+&quot;</span><span class="token punctuation">,</span>选择<span class="token string">&quot;import&quot;</span><span class="token punctuation">,</span>在dashboard的输入框中输入 https:<span class="token operator">/</span><span class="token operator">/</span>grafana<span class="token punctuation">.</span>com/dashboards/8919<span class="token punctuation">,</span>查看效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+C+`" alt="image-20221013234413884"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">点击完 load后，在当前界面的下方找到数据集 prometheus，最后点击 import，效果如下</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+P+`" alt="image-20221013234455785"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-4-3-ceph监控" tabindex="-1"><a class="header-anchor" href="#_1-4-3-ceph监控"><span>1.4.3 ceph监控</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Ceph Manager内置了众多模块，包括prometheus模块，⽤于直接输出Prometheus⻛格的指标数据。我们只需要开启该功能即可，Prometheus模块默认监听于TCP协议的9283端⼝。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>开启ceph的prometheus模块</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">开启ceph的监听模块</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph mgr module enable prometheus</span>
<span class="line"></span>
<span class="line">查看模块效果</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph mgr module <span class="token function">ls</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">    <span class="token string">&quot;enabled_modules&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">&quot;dashboard&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;iostat&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;nfs&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;prometheus&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;restful&quot;</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"></span>
<span class="line">检查mgr的暴露端口</span>
<span class="line">root@mon02:~<span class="token comment"># netstat -tnulp | grep mgr</span></span>
<span class="line">tcp        0      0 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:8443          0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0:<span class="token operator">*</span>    LISTEN      8111/ceph-mgr</span>
<span class="line">tcp6       0      0 :::9283                 :::<span class="token operator">*</span>         LISTEN      8111/ceph-mgr</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置prometheus的监控配置</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token punctuation">]</span><span class="token comment"># vim /data/server/prometheus/cfg/prometheus.yml</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">scrape_configs:</span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">  <span class="token operator">-</span> job_name: <span class="token string">&#39;ceph&#39;</span></span>
<span class="line">    static_configs:</span>
<span class="line">    <span class="token operator">-</span> targets: <span class="token punctuation">[</span><span class="token string">&#39;10.0.0.13:9283&#39;</span><span class="token punctuation">]</span></span>
<span class="line">    </span>
<span class="line">    属性解析：</span>
<span class="line">        新增一个job_name 和 static_configs的属性</span>
<span class="line">        targets 就是我们在基本概念中讲到的instance，格式就是<span class="token string">&quot;ip:port&quot;</span></span>
<span class="line">        </span>
<span class="line">重启服务        </span>
<span class="line">systemctl restart prometheus<span class="token punctuation">.</span>service    </span>
<span class="line"></span>
<span class="line">浏览器访问 http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>18:9090/targets 就可以看到node_exporter已经被prometheus加载到监控中了，效果如下</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+A+`" alt="image-20221013235206075"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">登录到Grafana界面，点击左侧边栏<span class="token string">&quot;+&quot;</span><span class="token punctuation">,</span>选择<span class="token string">&quot;import&quot;</span><span class="token punctuation">,</span>在dashboard的输入框中输入 https:<span class="token operator">/</span><span class="token operator">/</span>grafana<span class="token punctuation">.</span>com/dashboards/2842<span class="token punctuation">,</span>查看效果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+E+`" alt="image-20221013235316552"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="_1-5-k8s实践" tabindex="-1"><a class="header-anchor" href="#_1-5-k8s实践"><span>1.5 k8s实践</span></a></h2><h3 id="_1-5-1-基础环境" tabindex="-1"><a class="header-anchor" href="#_1-5-1-基础环境"><span>1.5.1 基础环境</span></a></h3><p>学习目标</p><p>这一节，我们从 集群规划、主机认证、小结 三个方面来学习。</p><p><strong>集群规划</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">在这里，我们以单主分布式的主机节点效果来演示kubernetes的最新版本的集群环境部署。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+R+'" alt="image-20220715092558666"></p><p>节点集群组件规划</p><p><img src="'+D+`" alt="image-20220715093007357"></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">master节点</span>
<span class="line">	kubeadm<span class="token punctuation">(</span>集群环境<span class="token punctuation">)</span>、kubectl<span class="token punctuation">(</span>集群管理<span class="token punctuation">)</span>、kubelet<span class="token punctuation">(</span>节点状态<span class="token punctuation">)</span></span>
<span class="line">	kube-apiserver、kube-controller-manager、kube-scheduler、etcd</span>
<span class="line">	containerd<span class="token punctuation">(</span>docker方式部署<span class="token punctuation">)</span>、flannel<span class="token punctuation">(</span>插件部署<span class="token punctuation">)</span></span>
<span class="line">node节点</span>
<span class="line">	kubeadm<span class="token punctuation">(</span>集群环境<span class="token punctuation">)</span>、kubelet<span class="token punctuation">(</span>节点状态<span class="token punctuation">)</span></span>
<span class="line">	kube-proxy、containerd<span class="token punctuation">(</span>docker方式部署<span class="token punctuation">)</span>、flannel<span class="token punctuation">(</span>插件部署<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主机名规划</p><table><thead><tr><th>序号</th><th>主机ip</th><th>主机名规划</th></tr></thead><tbody><tr><td>1</td><td>10.0.0.19</td><td>kubernetes-master.superopsmsb.com kubernetes-master</td></tr><tr><td>2</td><td>10.0.0.20</td><td>kubernetes-node1.superopsmsb.com kubernetes-node1</td></tr><tr><td>3</td><td>10.0.0.21</td><td>kubernetes-node2.superopsmsb.com kubernetes-node2</td></tr></tbody></table><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改master节点主机的hosts文件</span>
<span class="line"><span class="token namespace">[root@localhost ~]</span><span class="token comment"># cat /etc/hosts</span></span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>19 kubernetes-master<span class="token punctuation">.</span>superopsmsb<span class="token punctuation">.</span>com kubernetes-master</span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>20 kubernetes-node1<span class="token punctuation">.</span>superopsmsb<span class="token punctuation">.</span>com  kubernetes-node1</span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>21 kubernetes-node2<span class="token punctuation">.</span>superopsmsb<span class="token punctuation">.</span>com  kubernetes-node2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主机认证</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	因为整个集群节点中的很多文件配置都是一样的，所以我们需要配置跨主机免密码认证方式来定制集群的认证通信机制，这样后续在批量操作命令的时候，就非常轻松了。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>脚本内容</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token namespace">[root@localhost ~]</span><span class="token comment"># cat /data/scripts/01_remote_host_auth.sh</span></span>
<span class="line"><span class="token comment">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 功能: 批量设定远程主机免密码认证</span></span>
<span class="line"><span class="token comment"># 版本: v0.2</span></span>
<span class="line"><span class="token comment"># 作者: 书记</span></span>
<span class="line"><span class="token comment"># 联系: superopsmsb.com</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 准备工作</span></span>
<span class="line">user_dir=<span class="token string">&#39;/root&#39;</span></span>
<span class="line">host_file=<span class="token string">&#39;/etc/hosts&#39;</span></span>
<span class="line">login_user=<span class="token string">&#39;root&#39;</span></span>
<span class="line">login_pass=<span class="token string">&#39;123456&#39;</span></span>
<span class="line">target_type=<span class="token punctuation">(</span>部署 免密 同步 主机名 退出<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 菜单</span></span>
<span class="line">menu<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">echo</span> <span class="token operator">-</span>e <span class="token string">&quot;\\e[31m批量设定远程主机免密码认证管理界面\\e[0m&quot;</span></span>
<span class="line">  <span class="token function">echo</span> <span class="token string">&quot;=====================================================&quot;</span></span>
<span class="line">  <span class="token function">echo</span> <span class="token operator">-</span>e <span class="token string">&quot;\\e[32m 1: 部署环境   2: 免密认证   3: 同步hosts \\e[0m&quot;</span></span>
<span class="line">  <span class="token function">echo</span> <span class="token operator">-</span>e <span class="token string">&quot;\\e[32m 4: 设定主机名 5：退出操作 \\e[0m&quot;</span></span>
<span class="line">  <span class="token function">echo</span> <span class="token string">&quot;=====================================================&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># expect环境</span></span>
<span class="line">expect_install<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">-</span>f <span class="token operator">/</span>usr/bin/expect <span class="token punctuation">]</span></span>
<span class="line">  then</span>
<span class="line">     <span class="token function">echo</span> <span class="token operator">-</span>e <span class="token string">&quot;\\e[33mexpect环境已经部署完毕\\e[0m&quot;</span></span>
<span class="line">  <span class="token keyword">else</span></span>
<span class="line">     yum install expect <span class="token operator">-</span>y &gt;&gt; <span class="token operator">/</span>dev/null 2&gt;&amp;1 &amp;&amp; <span class="token function">echo</span> <span class="token operator">-</span>e <span class="token string">&quot;\\e[33mexpect软件安装完毕\\e[0m&quot;</span> <span class="token punctuation">|</span><span class="token punctuation">|</span> <span class="token punctuation">(</span><span class="token function">echo</span> <span class="token operator">-</span>e <span class="token string">&quot;\\e[33mexpect软件安装失败\\e[0m&quot;</span> &amp;&amp; <span class="token keyword">exit</span><span class="token punctuation">)</span></span>
<span class="line">  fi</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># 秘钥文件生成环境</span></span>
<span class="line">create_authkey<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 保证历史文件清空</span></span>
<span class="line">  <span class="token punctuation">[</span> <span class="token operator">-</span>d $<span class="token punctuation">{</span>user_dir<span class="token punctuation">}</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh <span class="token punctuation">]</span> &amp;&amp; <span class="token function">rm</span> <span class="token operator">-</span>rf $<span class="token punctuation">{</span>user_dir<span class="token punctuation">}</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh/<span class="token operator">*</span></span>
<span class="line">  <span class="token comment"># 构建秘钥文件对</span></span>
<span class="line">  <span class="token operator">/</span>usr/bin/ssh-keygen <span class="token operator">-</span>t rsa <span class="token operator">-</span>P <span class="token string">&quot;&quot;</span> <span class="token operator">-</span>f $<span class="token punctuation">{</span>user_dir<span class="token punctuation">}</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh/id_rsa</span>
<span class="line">  <span class="token function">echo</span> <span class="token operator">-</span>e <span class="token string">&quot;\\e[33m秘钥文件已经创建完毕\\e[0m&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># expect自动匹配逻辑</span></span>
<span class="line">expect_autoauth_func<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 接收外部参数</span></span>
<span class="line">  command=<span class="token string">&quot;$@&quot;</span></span>
<span class="line">  expect <span class="token operator">-</span>c <span class="token string">&quot;</span>
<span class="line">    spawn \${command}</span>
<span class="line">    expect {</span>
<span class="line">      \\&quot;</span>yes/no\\<span class="token string">&quot; {send \\&quot;</span>yes\\r\\<span class="token string">&quot;; exp_continue}</span>
<span class="line">      \\&quot;</span><span class="token operator">*</span>password*\\<span class="token string">&quot; {send \\&quot;</span>$<span class="token punctuation">{</span>login_pass<span class="token punctuation">}</span>\\r\\<span class="token string">&quot;; exp_continue}</span>
<span class="line">      \\&quot;</span><span class="token operator">*</span>password*\\<span class="token string">&quot; {send \\&quot;</span>$<span class="token punctuation">{</span>login_pass<span class="token punctuation">}</span>\\r\\<span class="token string">&quot;}</span>
<span class="line">   }&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># 跨主机传输文件认证</span></span>
<span class="line">sshkey_auth_func<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 接收外部的参数</span></span>
<span class="line">  local host_list=<span class="token string">&quot;$*&quot;</span></span>
<span class="line">  <span class="token keyword">for</span> ip in $<span class="token punctuation">{</span>host_list<span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">do</span></span>
<span class="line">     <span class="token comment"># /usr/bin/ssh-copy-id -i \${user_dir}/.ssh/id_rsa.pub root@10.0.0.12</span></span>
<span class="line">     cmd=<span class="token string">&quot;/usr/bin/ssh-copy-id -i \${user_dir}/.ssh/id_rsa.pub&quot;</span></span>
<span class="line">     remote_host=<span class="token string">&quot;\${login_user}@\${ip}&quot;</span></span>
<span class="line">     expect_autoauth_func $<span class="token punctuation">{</span>cmd<span class="token punctuation">}</span> $<span class="token punctuation">{</span>remote_host<span class="token punctuation">}</span></span>
<span class="line">  done</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 跨主机同步hosts文件</span></span>
<span class="line">scp_hosts_func<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 接收外部的参数</span></span>
<span class="line">  local host_list=<span class="token string">&quot;$*&quot;</span></span>
<span class="line">  <span class="token keyword">for</span> ip in $<span class="token punctuation">{</span>host_list<span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">do</span></span>
<span class="line">     remote_host=<span class="token string">&quot;\${login_user}@\${ip}&quot;</span></span>
<span class="line">     scp $<span class="token punctuation">{</span>host_file<span class="token punctuation">}</span> $<span class="token punctuation">{</span>remote_host<span class="token punctuation">}</span>:$<span class="token punctuation">{</span>host_file<span class="token punctuation">}</span></span>
<span class="line">  done</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 跨主机设定主机名规划</span></span>
<span class="line">set_hostname_func<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 接收外部的参数</span></span>
<span class="line">  local host_list=<span class="token string">&quot;$*&quot;</span></span>
<span class="line">  <span class="token keyword">for</span> ip in $<span class="token punctuation">{</span>host_list<span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">do</span></span>
<span class="line">     host_name=$<span class="token punctuation">(</span>grep $<span class="token punctuation">{</span>ip<span class="token punctuation">}</span> $<span class="token punctuation">{</span>host_file<span class="token punctuation">}</span><span class="token punctuation">|</span>awk <span class="token string">&#39;{print $NF}&#39;</span><span class="token punctuation">)</span></span>
<span class="line">     remote_host=<span class="token string">&quot;\${login_user}@\${ip}&quot;</span></span>
<span class="line">     ssh $<span class="token punctuation">{</span>remote_host<span class="token punctuation">}</span> <span class="token string">&quot;hostnamectl set-hostname \${host_name}&quot;</span></span>
<span class="line">  done</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># 帮助信息逻辑</span></span>
<span class="line">Usage<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">echo</span> <span class="token string">&quot;请输入有效的操作id&quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token comment"># 逻辑入口</span></span>
<span class="line"><span class="token keyword">while</span> true</span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">  menu</span>
<span class="line">  read <span class="token operator">-</span>p <span class="token string">&quot;请输入有效的操作id: &quot;</span> target_id</span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">[</span> $<span class="token punctuation">{</span><span class="token comment">#target_type[@]} -ge \${target_id} ]</span></span>
<span class="line">  then</span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> $<span class="token punctuation">{</span>target_type<span class="token punctuation">[</span>$<span class="token punctuation">{</span>target_id<span class="token punctuation">}</span><span class="token operator">-</span>1<span class="token punctuation">]</span><span class="token punctuation">}</span> == <span class="token string">&quot;部署&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">    then</span>
<span class="line">       <span class="token function">echo</span> <span class="token string">&quot;开始部署环境操作...&quot;</span></span>
<span class="line">       expect_install</span>
<span class="line">       create_authkey</span>
<span class="line">    elif <span class="token punctuation">[</span> $<span class="token punctuation">{</span>target_type<span class="token punctuation">[</span>$<span class="token punctuation">{</span>target_id<span class="token punctuation">}</span><span class="token operator">-</span>1<span class="token punctuation">]</span><span class="token punctuation">}</span> == <span class="token string">&quot;免密&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">    then</span>
<span class="line">       read <span class="token operator">-</span>p <span class="token string">&quot;请输入需要批量远程主机认证的主机列表范围(示例: {12..19}): &quot;</span> num_list</span>
<span class="line">       ip_list=$<span class="token punctuation">(</span>eval <span class="token function">echo</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$num_list</span><span class="token punctuation">)</span></span>
<span class="line">       <span class="token function">echo</span> <span class="token string">&quot;开始执行免密认证操作...&quot;</span></span>
<span class="line">       sshkey_auth_func $<span class="token punctuation">{</span>ip_list<span class="token punctuation">}</span></span>
<span class="line">    elif <span class="token punctuation">[</span> $<span class="token punctuation">{</span>target_type<span class="token punctuation">[</span>$<span class="token punctuation">{</span>target_id<span class="token punctuation">}</span><span class="token operator">-</span>1<span class="token punctuation">]</span><span class="token punctuation">}</span> == <span class="token string">&quot;同步&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">    then</span>
<span class="line">       read <span class="token operator">-</span>p <span class="token string">&quot;请输入需要批量远程主机同步hosts的主机列表范围(示例: {12..19}): &quot;</span> num_list</span>
<span class="line">       ip_list=$<span class="token punctuation">(</span>eval <span class="token function">echo</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$num_list</span><span class="token punctuation">)</span></span>
<span class="line">       <span class="token function">echo</span> <span class="token string">&quot;开始执行同步hosts文件操作...&quot;</span></span>
<span class="line">       scp_hosts_func $<span class="token punctuation">{</span>ip_list<span class="token punctuation">}</span></span>
<span class="line">    elif <span class="token punctuation">[</span> $<span class="token punctuation">{</span>target_type<span class="token punctuation">[</span>$<span class="token punctuation">{</span>target_id<span class="token punctuation">}</span><span class="token operator">-</span>1<span class="token punctuation">]</span><span class="token punctuation">}</span> == <span class="token string">&quot;主机名&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">    then</span>
<span class="line">       read <span class="token operator">-</span>p <span class="token string">&quot;请输入需要批量设定远程主机主机名的主机列表范围(示例: {12..19}): &quot;</span> num_list</span>
<span class="line">       ip_list=$<span class="token punctuation">(</span>eval <span class="token function">echo</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$num_list</span><span class="token punctuation">)</span></span>
<span class="line">       <span class="token function">echo</span> <span class="token string">&quot;开始执行设定主机名操作...&quot;</span></span>
<span class="line">       set_hostname_func $<span class="token punctuation">{</span>ip_list<span class="token punctuation">}</span></span>
<span class="line">    elif <span class="token punctuation">[</span> $<span class="token punctuation">{</span>target_type<span class="token punctuation">[</span>$<span class="token punctuation">{</span>target_id<span class="token punctuation">}</span><span class="token operator">-</span>1<span class="token punctuation">]</span><span class="token punctuation">}</span> == <span class="token string">&quot;退出&quot;</span> <span class="token punctuation">]</span></span>
<span class="line">    then</span>
<span class="line">       <span class="token function">echo</span> <span class="token string">&quot;开始退出管理界面...&quot;</span></span>
<span class="line">       <span class="token keyword">exit</span></span>
<span class="line">    fi</span>
<span class="line">  <span class="token keyword">else</span></span>
<span class="line">    Usage</span>
<span class="line">  fi</span>
<span class="line">done</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">为了更好的把环境部署成功，最好提前更新一下软件源信息</span>
<span class="line"><span class="token namespace">[root@localhost ~]</span><span class="token comment"># yum makecache</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看脚本执行效果</span>
<span class="line"><span class="token namespace">[root@localhost ~]</span><span class="token comment"># /bin/bash /data/scripts/01_remote_host_auth.sh</span></span>
<span class="line">批量设定远程主机免密码认证管理界面</span>
<span class="line">=====================================================</span>
<span class="line"> 1: 部署环境   2: 免密认证   3: 同步hosts</span>
<span class="line"> 4: 设定主机名 5：退出操作</span>
<span class="line">=====================================================</span>
<span class="line">请输入有效的操作id: 1</span>
<span class="line">开始部署环境操作<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">expect环境已经部署完毕</span>
<span class="line">Generating public/private rsa key pair<span class="token punctuation">.</span></span>
<span class="line">Your identification has been saved in <span class="token operator">/</span>root/<span class="token punctuation">.</span>ssh/id_rsa<span class="token punctuation">.</span></span>
<span class="line">Your public key has been saved in <span class="token operator">/</span>root/<span class="token punctuation">.</span>ssh/id_rsa<span class="token punctuation">.</span>pub<span class="token punctuation">.</span></span>
<span class="line">The key fingerprint is:</span>
<span class="line">SHA256:u/Tzk0d9sNtG6r9Kx+6xPaENNqT3Lw178XWXQhX1yMw root@kubernetes-master</span>
<span class="line">The key<span class="token string">&#39;s randomart image is:</span>
<span class="line">+---[RSA 2048]----+</span>
<span class="line">|               .+|</span>
<span class="line">|             + o.|</span>
<span class="line">|              E .|</span>
<span class="line">|             o.  |</span>
<span class="line">|        S   +  +.|</span>
<span class="line">|         . . *=+B|</span>
<span class="line">|        o   o+B%O|</span>
<span class="line">|       . o. +.O+X|</span>
<span class="line">|        . .o.=+XB|</span>
<span class="line">+----[SHA256]-----+</span>
<span class="line">秘钥文件已经创建完毕</span>
<span class="line">批量设定远程主机免密码认证管理界面</span>
<span class="line">=====================================================</span>
<span class="line"> 1: 部署环境   2: 免密认证   3: 同步hosts</span>
<span class="line"> 4: 设定主机名 5：退出操作</span>
<span class="line">=====================================================</span>
<span class="line">请输入有效的操作id: 2</span>
<span class="line">请输入需要批量远程主机认证的主机列表范围(示例: {12..19}): {19..21}</span>
<span class="line">开始执行免密认证操作...</span>
<span class="line">spawn /usr/bin/ssh-copy-id -i /root/.ssh/id_rsa.pub root@10.0.0.19</span>
<span class="line">...</span>
<span class="line">Now try logging into the machine, with:   &quot;ssh &#39;</span>root@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>21&#39;&quot;</span>
<span class="line">and check to make sure that only the key<span class="token punctuation">(</span>s<span class="token punctuation">)</span> you wanted were added<span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line">批量设定远程主机免密码认证管理界面</span>
<span class="line">=====================================================</span>
<span class="line"> 1: 部署环境   2: 免密认证   3: 同步hosts</span>
<span class="line"> 4: 设定主机名 5：退出操作</span>
<span class="line">=====================================================</span>
<span class="line">请输入有效的操作id: 3</span>
<span class="line">请输入需要批量远程主机同步hosts的主机列表范围<span class="token punctuation">(</span>示例: <span class="token punctuation">{</span>12<span class="token punctuation">.</span><span class="token punctuation">.</span>19<span class="token punctuation">}</span><span class="token punctuation">)</span>: <span class="token punctuation">{</span>19<span class="token punctuation">.</span><span class="token punctuation">.</span>21<span class="token punctuation">}</span></span>
<span class="line">开始执行同步hosts文件操作<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">hosts                                    100%  470   226<span class="token punctuation">.</span>5KB/s   00:00</span>
<span class="line">hosts                                    100%  470   458<span class="token punctuation">.</span>8KB/s   00:00</span>
<span class="line">hosts                                    100%  470   533<span class="token punctuation">.</span>1KB/s   00:00</span>
<span class="line">批量设定远程主机免密码认证管理界面</span>
<span class="line">=====================================================</span>
<span class="line"> 1: 部署环境   2: 免密认证   3: 同步hosts</span>
<span class="line"> 4: 设定主机名 5：退出操作</span>
<span class="line">=====================================================</span>
<span class="line">请输入有效的操作id: 4</span>
<span class="line">请输入需要批量设定远程主机主机名的主机列表范围<span class="token punctuation">(</span>示例: <span class="token punctuation">{</span>12<span class="token punctuation">.</span><span class="token punctuation">.</span>19<span class="token punctuation">}</span><span class="token punctuation">)</span>: <span class="token punctuation">{</span>19<span class="token punctuation">.</span><span class="token punctuation">.</span>21<span class="token punctuation">}</span></span>
<span class="line">开始执行设定主机名操作<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">批量设定远程主机免密码认证管理界面</span>
<span class="line">=====================================================</span>
<span class="line"> 1: 部署环境   2: 免密认证   3: 同步hosts</span>
<span class="line"> 4: 设定主机名 5：退出操作</span>
<span class="line">=====================================================</span>
<span class="line">请输入有效的操作id: 5</span>
<span class="line">开始退出管理界面<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token namespace">[root@localhost ~]</span><span class="token comment"># exec /bin/bash</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># for i in {19..21}</span></span>
<span class="line">&gt; <span class="token keyword">do</span></span>
<span class="line">&gt; name=$<span class="token punctuation">(</span>ssh root@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$i</span> <span class="token string">&quot;hostname&quot;</span><span class="token punctuation">)</span></span>
<span class="line">&gt; <span class="token function">echo</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$i</span> <span class="token variable">$name</span></span>
<span class="line">&gt; done</span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>19 kubernetes-master</span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>20 kubernetes-node1</span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>21 kubernetes-node2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-2-集群准备" tabindex="-1"><a class="header-anchor" href="#_1-5-2-集群准备"><span>1.5.2 集群准备</span></a></h3><p>学习目标</p><p>这一节，我们从 内核调整、软件源配置、小结 三个方面来学习。</p><p><strong>内核调整</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">根据kubernetes官方资料的相关信息，我们需要对kubernetes集群是所有主机进行内核参数的调整。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>禁用swap</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	部署集群时，kubeadm默认会预先检查当前主机是否禁用了Swap设备，并在未禁用时强制终止部署过程。因此，在主机内存资源充裕的条件下，需要禁用所有的Swap设备，否则，就需要在后文的kubeadm init及kubeadm join命令执行时额外使用相关的选项忽略检查错误</span>
<span class="line"></span>
<span class="line">关闭Swap设备，需要分两步完成。</span>
<span class="line">首先是关闭当前已启用的所有Swap设备：</span>
<span class="line">swapoff <span class="token operator">-</span>a</span>
<span class="line">        </span>
<span class="line">而后编辑<span class="token operator">/</span>etc/fstab配置文件，注释用于挂载Swap设备的所有行。</span>
<span class="line">方法一：手工编辑</span>
<span class="line">vim <span class="token operator">/</span>etc/fstab</span>
<span class="line"><span class="token comment"># UUID=0a55fdb5-a9d8-4215-80f7-f42f75644f69 none  swap    sw      0       0</span></span>
<span class="line"></span>
<span class="line">方法二：</span>
<span class="line">sed <span class="token operator">-</span>i <span class="token string">&#39;s/.*swap.*/#&amp;/&#39;</span> <span class="token operator">/</span>etc/fstab </span>
<span class="line"> 	替换后位置的&amp;代表前面匹配的整行内容</span>
<span class="line">注意：</span>
<span class="line">	只需要注释掉自动挂载SWAP分区项即可，防止机子重启后swap启用</span>
<span class="line"></span>
<span class="line">内核<span class="token punctuation">(</span>禁用swap<span class="token punctuation">)</span>参数</span>
<span class="line"><span class="token function">cat</span> &gt;&gt; <span class="token operator">/</span>etc/sysctl<span class="token punctuation">.</span>d/k8s<span class="token punctuation">.</span>conf &lt;&lt; EOF</span>
<span class="line">vm<span class="token punctuation">.</span>swappiness=0</span>
<span class="line">EOF</span>
<span class="line">sysctl <span class="token operator">-</span>p <span class="token operator">/</span>etc/sysctl<span class="token punctuation">.</span>d/k8s<span class="token punctuation">.</span>conf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>网络参数</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">配置iptables参数，使得流经网桥的流量也经过iptables/netfilter防火墙</span>
<span class="line"><span class="token function">cat</span> &gt;&gt; <span class="token operator">/</span>etc/sysctl<span class="token punctuation">.</span>d/k8s<span class="token punctuation">.</span>conf &lt;&lt; EOF</span>
<span class="line">net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-ip6tables = 1</span>
<span class="line">net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-iptables = 1</span>
<span class="line">net<span class="token punctuation">.</span>ipv4<span class="token punctuation">.</span>ip_forward = 1</span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line">配置生效</span>
<span class="line">modprobe br_netfilter</span>
<span class="line">modprobe overlay</span>
<span class="line">sysctl <span class="token operator">-</span>p <span class="token operator">/</span>etc/sysctl<span class="token punctuation">.</span>d/k8s<span class="token punctuation">.</span>conf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">脚本方式</span>
<span class="line"><span class="token namespace">[root@localhost ~]</span><span class="token comment"># cat /data/scripts/02_kubernetes_kernel_conf.sh</span></span>
<span class="line"><span class="token comment">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 功能: 批量设定kubernetes的内核参数调整</span></span>
<span class="line"><span class="token comment"># 版本: v0.1</span></span>
<span class="line"><span class="token comment"># 作者: 书记</span></span>
<span class="line"><span class="token comment"># 联系: superopsmsb.com</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 禁用swap</span></span>
<span class="line">swapoff <span class="token operator">-</span>a</span>
<span class="line">sed <span class="token operator">-</span>i <span class="token string">&#39;s/.*swap.*/#&amp;/&#39;</span> <span class="token operator">/</span>etc/fstab</span>
<span class="line"><span class="token function">cat</span> &gt;&gt; <span class="token operator">/</span>etc/sysctl<span class="token punctuation">.</span>d/k8s<span class="token punctuation">.</span>conf &lt;&lt; EOF</span>
<span class="line">vm<span class="token punctuation">.</span>swappiness=0</span>
<span class="line">EOF</span>
<span class="line">sysctl <span class="token operator">-</span>p <span class="token operator">/</span>etc/sysctl<span class="token punctuation">.</span>d/k8s<span class="token punctuation">.</span>conf</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 打开网络转发</span></span>
<span class="line"><span class="token function">cat</span> &gt;&gt; <span class="token operator">/</span>etc/sysctl<span class="token punctuation">.</span>d/k8s<span class="token punctuation">.</span>conf &lt;&lt; EOF</span>
<span class="line">net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-ip6tables = 1</span>
<span class="line">net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-iptables = 1</span>
<span class="line">net<span class="token punctuation">.</span>ipv4<span class="token punctuation">.</span>ip_forward = 1</span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 加载相应的模块</span></span>
<span class="line">modprobe br_netfilter</span>
<span class="line">modprobe overlay</span>
<span class="line">sysctl <span class="token operator">-</span>p <span class="token operator">/</span>etc/sysctl<span class="token punctuation">.</span>d/k8s<span class="token punctuation">.</span>conf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>脚本执行</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">master主机执行效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># /bin/bash /data/scripts/02_kubernetes_kernel_conf.sh</span></span>
<span class="line">vm<span class="token punctuation">.</span>swappiness = 0</span>
<span class="line">vm<span class="token punctuation">.</span>swappiness = 0</span>
<span class="line">net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-ip6tables = 1</span>
<span class="line">net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-iptables = 1</span>
<span class="line">net<span class="token punctuation">.</span>ipv4<span class="token punctuation">.</span>ip_forward = 1</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">所有node主机执行效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># for i in 20 21;do ssh root@10.0.0.$i mkdir /data/scripts -p; scp /data/scripts/02_kubernetes_kernel_conf.sh root@10.0.0.$i:/data/scripts/02_kubernetes_kernel_conf.sh;ssh root@10.0.0.$i &quot;/bin/bash /data/scripts/02_kubernetes_kernel_conf.sh&quot;;done</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>软件源配置</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	由于我们需要在多台主机上初始化kubernetes主机环境，所以我们需要在多台主机上配置kubernetes的软件源，以最简便的方式部署kubernetes环境。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>定制阿里云软件源</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制阿里云的关于kubernetes的软件源</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># cat &gt; /etc/yum.repos.d/kubernetes.repo &lt;&lt; EOF</span></span>
<span class="line"><span class="token namespace">[kubernetes]</span></span>
<span class="line">name=Kubernetes</span>
<span class="line">baseurl=https:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>com/kubernetes/yum/repos/kubernetes-el7-x86_64</span>
<span class="line">enabled=1</span>
<span class="line">gpgcheck=0</span>
<span class="line">repo_gpgcheck=0</span>
<span class="line">gpgkey=https:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>com/kubernetes/yum/doc/yum-key<span class="token punctuation">.</span>gpg https:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>com/kubernetes/yum/doc/rpm-package-key<span class="token punctuation">.</span>gpg</span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line">更新软件源</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># yum makecache fast</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># yum install kubeadm-1.23.9-0 kubectl-1.23.9-0 kubelet-1.23.9-0 -y</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他节点主机同步软件源</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># for i in 20 21;do scp /etc/yum.repos.d/kubernetes.repo root@10.0.0.$i:/etc/yum.repos.d/kubernetes.repo;ssh root@10.0.0.$i &quot;yum makecache fast; yum install kubeadm-1.23.9-0 kubelet-1.23.9-0 -y&quot;;done</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-3-容器环境" tabindex="-1"><a class="header-anchor" href="#_1-5-3-容器环境"><span>1.5.3 容器环境</span></a></h3><p>学习目标</p><p>这一节，我们从 Docker环境、环境配置、小结 三个方面来学习。</p><p><strong>Docker环境</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	由于kubernetes1<span class="token punctuation">.</span>24版本才开始将默认支持的容器引擎转换为了Containerd了，所以这里我们还是以Docker软件作为后端容器的引擎，因为目前的CKA考试环境是以kubernetes1<span class="token punctuation">.</span>23版本为基准的。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>软件源配置</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">安装基础依赖软件</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># yum install -y yum-utils device-mapper-persistent-data lvm2</span></span>
<span class="line"></span>
<span class="line">定制专属的软件源</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装软件</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确定最新版本的docker</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># yum list docker-ce --showduplicates | sort -r</span></span>
<span class="line"></span>
<span class="line">安装最新版本的docker</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># yum install -y docker-ce</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">启动docker服务</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># systemctl restart docker</span></span>
<span class="line"></span>
<span class="line">检查效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># docker version</span></span>
<span class="line">Client: Docker Engine <span class="token operator">-</span> Community</span>
<span class="line"> Version:           20<span class="token punctuation">.</span>10<span class="token punctuation">.</span>17</span>
<span class="line"> API version:       1<span class="token punctuation">.</span>41</span>
<span class="line"> Go version:        go1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>11</span>
<span class="line"> Git commit:        100c701</span>
<span class="line"> Built:             Mon Jun  6 23:05:12 2022</span>
<span class="line"> OS/Arch:           linux/amd64</span>
<span class="line"> Context:           default</span>
<span class="line"> Experimental:      true</span>
<span class="line"></span>
<span class="line">Server: Docker Engine <span class="token operator">-</span> Community</span>
<span class="line"> Engine:</span>
<span class="line">  Version:          20<span class="token punctuation">.</span>10<span class="token punctuation">.</span>17</span>
<span class="line">  API version:      1<span class="token punctuation">.</span>41 <span class="token punctuation">(</span>minimum version 1<span class="token punctuation">.</span>12<span class="token punctuation">)</span></span>
<span class="line">  Go version:       go1<span class="token punctuation">.</span>17<span class="token punctuation">.</span>11</span>
<span class="line">  Git commit:       a89b842</span>
<span class="line">  Built:            Mon Jun  6 23:03:33 2022</span>
<span class="line">  OS/Arch:          linux/amd64</span>
<span class="line">  Experimental:     false</span>
<span class="line"> containerd:</span>
<span class="line">  Version:          1<span class="token punctuation">.</span>6<span class="token punctuation">.</span>6</span>
<span class="line">  GitCommit:        10c12954828e7c7c9b6e0ea9b0c02b01407d3ae1</span>
<span class="line"> runc:</span>
<span class="line">  Version:          1<span class="token punctuation">.</span>1<span class="token punctuation">.</span>2</span>
<span class="line">  GitCommit:        v1<span class="token punctuation">.</span>1<span class="token punctuation">.</span>2-0-ga916309</span>
<span class="line"> docker-init:</span>
<span class="line">  Version:          0<span class="token punctuation">.</span>19<span class="token punctuation">.</span>0</span>
<span class="line">  GitCommit:        de40ad0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>环境配置</strong></p><p>需求</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">1 镜像仓库</span>
<span class="line">	默认安装的docker会从官方网站上获取docker镜像，有时候会因为网络因素无法获取，所以我们需要配置国内镜像仓库的加速器</span>
<span class="line">2 kubernetes的改造</span>
<span class="line">	kubernetes的创建容器，需要借助于kubelet来管理Docker，而默认的Docker服务进程的管理方式不是kubelet的类型，所以需要改造Docker的服务启动类型为systemd方式。</span>
<span class="line">	</span>
<span class="line">注意：</span>
<span class="line">	默认情况下，Docker的服务修改有两种方式：</span>
<span class="line">		1 Docker服务 <span class="token operator">-</span> 需要修改启动服务文件，需要重载服务文件，比较繁琐。</span>
<span class="line">		2 daemon<span class="token punctuation">.</span>json文件 <span class="token operator">-</span> 修改文件后，只需要重启docker服务即可，该文件默认情况下不存在。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定制docker配置文件</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制配置文件</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># cat &gt;&gt; /etc/docker/daemon.json &lt;&lt;-EOF</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">&quot;registry-mirrors&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;http://74f21445.m.daocloud.io&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;https://registry.docker-cn.com&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;http://hub-mirror.c.163.com&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;https://docker.mirrors.ustc.edu.cn&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span> </span>
<span class="line">  <span class="token string">&quot;insecure-registries&quot;</span>: <span class="token punctuation">[</span><span class="token string">&quot;10.0.0.20:80&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> </span>
<span class="line">  <span class="token string">&quot;exec-opts&quot;</span>: <span class="token punctuation">[</span><span class="token string">&quot;native.cgroupdriver=systemd&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">EOF</span>
<span class="line"></span>
<span class="line">重启docker服务</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># systemctl restart docker</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看配置效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># docker info</span></span>
<span class="line">Client:</span>
<span class="line"> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line">Server:</span>
<span class="line"> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"> Cgroup Driver: systemd</span>
<span class="line"> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"> Insecure Registries:</span>
<span class="line">  10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>20:80</span>
<span class="line">  127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/8</span>
<span class="line"> Registry Mirrors:</span>
<span class="line">  http:<span class="token operator">/</span><span class="token operator">/</span>74f21445<span class="token punctuation">.</span>m<span class="token punctuation">.</span>daocloud<span class="token punctuation">.</span>io/</span>
<span class="line">  https:<span class="token operator">/</span><span class="token operator">/</span>registry<span class="token punctuation">.</span>docker-cn<span class="token punctuation">.</span>com/</span>
<span class="line">  http:<span class="token operator">/</span><span class="token operator">/</span>hub-mirror<span class="token punctuation">.</span>c<span class="token punctuation">.</span>163<span class="token punctuation">.</span>com/</span>
<span class="line">  https:<span class="token operator">/</span><span class="token operator">/</span>docker<span class="token punctuation">.</span>mirrors<span class="token punctuation">.</span>ustc<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>cn/</span>
<span class="line"> Live Restore Enabled: false</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>docker环境定制脚本</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看脚本内容</span>
<span class="line"><span class="token namespace">[root@localhost ~]</span><span class="token comment"># cat /data/scripts/03_kubernetes_docker_install.sh</span></span>
<span class="line"><span class="token comment">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 功能: 安装部署Docker容器环境</span></span>
<span class="line"><span class="token comment"># 版本: v0.1</span></span>
<span class="line"><span class="token comment"># 作者: 书记</span></span>
<span class="line"><span class="token comment"># 联系: superopsmsb.com</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 准备工作</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 软件源配置</span></span>
<span class="line">softs_base<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 安装基础软件</span></span>
<span class="line">  yum install <span class="token operator">-</span>y yum-utils device-mapper-persistent-<span class="token keyword">data</span> lvm2</span>
<span class="line">  <span class="token comment"># 定制软件仓库源</span></span>
<span class="line">  yum-config-manager <span class="token operator">--</span><span class="token function">add-repo</span> http:<span class="token operator">/</span><span class="token operator">/</span>mirrors<span class="token punctuation">.</span>aliyun<span class="token punctuation">.</span>com/docker-ce/linux/centos/docker-ce<span class="token punctuation">.</span>repo</span>
<span class="line">  <span class="token comment"># 更新软件源</span></span>
<span class="line">  systemctl restart network</span>
<span class="line">  yum makecache fast</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 软件安装</span></span>
<span class="line">soft_install<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 安装最新版的docker软件</span></span>
<span class="line">  yum install <span class="token operator">-</span>y docker-ce</span>
<span class="line">  <span class="token comment"># 重启docker服务</span></span>
<span class="line">  systemctl restart docker</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 加速器配置</span></span>
<span class="line">speed_config<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 定制加速器配置</span></span>
<span class="line"><span class="token function">cat</span> &gt; <span class="token operator">/</span>etc/docker/daemon<span class="token punctuation">.</span>json &lt;&lt;<span class="token operator">-</span>EOF</span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string">&quot;registry-mirrors&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">&quot;http://74f21445.m.daocloud.io&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;https://registry.docker-cn.com&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;http://hub-mirror.c.163.com&quot;</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">&quot;https://docker.mirrors.ustc.edu.cn&quot;</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string">&quot;insecure-registries&quot;</span>: <span class="token punctuation">[</span><span class="token string">&quot;10.0.0.20:80&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token string">&quot;exec-opts&quot;</span>: <span class="token punctuation">[</span><span class="token string">&quot;native.cgroupdriver=systemd&quot;</span><span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line">EOF</span>
<span class="line">  <span class="token comment"># 重启docker服务</span></span>
<span class="line">  systemctl restart docker</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 环境监测</span></span>
<span class="line">docker_check<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  process_name=$<span class="token punctuation">(</span>docker info <span class="token punctuation">|</span> grep <span class="token string">&#39;p D&#39;</span> <span class="token punctuation">|</span> awk <span class="token string">&#39;{print $NF}&#39;</span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token punctuation">[</span> <span class="token string">&quot;\${process_name}&quot;</span> == <span class="token string">&quot;systemd&quot;</span> <span class="token punctuation">]</span> &amp;&amp; <span class="token function">echo</span> <span class="token string">&quot;Docker软件部署完毕&quot;</span> <span class="token punctuation">|</span><span class="token punctuation">|</span> <span class="token punctuation">(</span><span class="token function">echo</span> <span class="token string">&quot;Docker软件部署失败&quot;</span> &amp;&amp; <span class="token keyword">exit</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 软件部署</span></span>
<span class="line">main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  softs_base</span>
<span class="line">  soft_install</span>
<span class="line">  speed_config</span>
<span class="line">  docker_check</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 调用主函数</span></span>
<span class="line">main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">其他主机环境部署docker</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># for i in {19..21}; do ssh root@10.0.0.$i &quot;mkdir -p /data/scripts&quot;; scp /data/scripts/03_kubernetes_docker_install.sh root@10.0.0.$i:/data/scripts/03_kubernetes_docker_install.sh; done</span></span>
<span class="line"></span>
<span class="line">其他主机各自执行下面的脚本</span>
<span class="line"><span class="token operator">/</span>bin/bash <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>scripts/03_kubernetes_docker_install<span class="token punctuation">.</span>sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-4-k8s环境" tabindex="-1"><a class="header-anchor" href="#_1-5-4-k8s环境"><span>1.5.4 k8s环境</span></a></h3><p>学习目标</p><p>这一节，我们从 集群部署、其他配置、小结 三个方面来学习。</p><p><strong>集群部署</strong></p><p>镜像获取</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">镜像获取脚本内容</span>
<span class="line"><span class="token namespace">[root@localhost ~]</span><span class="token comment"># cat /data/scripts/04_kubernetes_get_images.sh</span></span>
<span class="line"><span class="token comment">#!/bin/bash</span></span>
<span class="line"><span class="token comment"># 功能: 获取kubernetes依赖的Docker镜像文件</span></span>
<span class="line"><span class="token comment"># 版本: v0.1</span></span>
<span class="line"><span class="token comment"># 作者: 书记</span></span>
<span class="line"><span class="token comment"># 联系: superopsmsb.com</span></span>
<span class="line"><span class="token comment"># 定制普通环境变量</span></span>
<span class="line">ali_mirror=<span class="token string">&#39;registry.aliyuncs.com&#39;</span></span>
<span class="line">harbor_mirror=<span class="token string">&#39;kubernetes-register.superopsmsb.com&#39;</span></span>
<span class="line">harbor_repo=<span class="token string">&#39;google_containers&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 环境定制</span></span>
<span class="line">kubernetes_image_get<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment"># 获取脚本参数</span></span>
<span class="line">  kubernetes_version=<span class="token string">&quot;<span class="token variable">$1</span>&quot;</span></span>
<span class="line">  <span class="token comment"># 获取制定kubernetes版本所需镜像</span></span>
<span class="line">  images=$<span class="token punctuation">(</span>kubeadm config images list <span class="token operator">--</span>kubernetes-version=$<span class="token punctuation">{</span>kubernetes_version<span class="token punctuation">}</span> <span class="token punctuation">|</span> awk <span class="token operator">-</span>F <span class="token string">&quot;/&quot;</span> <span class="token string">&#39;{print $NF}&#39;</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment"># 获取依赖镜像</span></span>
<span class="line">  <span class="token keyword">for</span> i in $<span class="token punctuation">{</span>images<span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">do</span></span>
<span class="line">    docker pull $<span class="token punctuation">{</span>ali_mirror<span class="token punctuation">}</span><span class="token operator">/</span>$<span class="token punctuation">{</span>harbor_repo<span class="token punctuation">}</span><span class="token operator">/</span><span class="token variable">$i</span></span>
<span class="line">    docker tag $<span class="token punctuation">{</span>ali_mirror<span class="token punctuation">}</span><span class="token operator">/</span>$<span class="token punctuation">{</span>harbor_repo<span class="token punctuation">}</span><span class="token operator">/</span><span class="token variable">$i</span>  $<span class="token punctuation">{</span>harbor_mirror<span class="token punctuation">}</span><span class="token operator">/</span>$<span class="token punctuation">{</span>harbor_repo<span class="token punctuation">}</span><span class="token operator">/</span><span class="token variable">$i</span></span>
<span class="line">    docker rmi $<span class="token punctuation">{</span>ali_mirror<span class="token punctuation">}</span><span class="token operator">/</span>$<span class="token punctuation">{</span>harbor_repo<span class="token punctuation">}</span><span class="token operator">/</span><span class="token variable">$i</span></span>
<span class="line">  done</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 脚本的帮助</span></span>
<span class="line">Usage<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">echo</span> <span class="token string">&quot;/bin/bash <span class="token variable">$0</span> &quot;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 脚本主流程</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> $<span class="token comment"># -eq 0 ]</span></span>
<span class="line">then</span>
<span class="line">   read <span class="token operator">-</span>p <span class="token string">&quot;请输入要获取kubernetes镜像的版本(示例: v1.23.9): &quot;</span> kubernetes_version</span>
<span class="line">   kubernetes_image_get $<span class="token punctuation">{</span>kubernetes_version<span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line">   Usage</span>
<span class="line">fi</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">脚本执行效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># /bin/bash /data/scripts/04_kubernetes_get_images.sh</span></span>
<span class="line">请输入要获取kubernetes镜像的版本<span class="token punctuation">(</span>示例: v1<span class="token punctuation">.</span>23<span class="token punctuation">.</span>9<span class="token punctuation">)</span>: v1<span class="token punctuation">.</span>23<span class="token punctuation">.</span>9</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">node节点获取镜像</span>
<span class="line">docker pull registry<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com/google_containers/kube-proxy:v1<span class="token punctuation">.</span>23<span class="token punctuation">.</span>9</span>
<span class="line">docker pull registry<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com/google_containers/pause:3<span class="token punctuation">.</span>6</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>master环境初始化</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">环境初始化命令</span>
<span class="line">kubeadm init <span class="token operator">--</span>kubernetes-version=1<span class="token punctuation">.</span>23<span class="token punctuation">.</span>9 \\</span>
<span class="line"><span class="token operator">--</span>apiserver-advertise-address=10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>19 \\</span>
<span class="line"><span class="token operator">--</span>image-repository registry<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com/google_containers \\</span>
<span class="line"><span class="token operator">--</span>service-cidr=10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/12 \\</span>
<span class="line"><span class="token operator">--</span>pod-network-cidr=10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16 \\</span>
<span class="line"><span class="token operator">--</span>ignore-preflight-errors=Swap</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">设定kubernetes的认证权限</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># mkdir -p $HOME/.kube</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># sudo chown $(id -u):$(id -g) $HOME/.kube/config</span></span>
<span class="line"></span>
<span class="line">再次检测</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubectl get nodes</span></span>
<span class="line">NAME                STATUS     ROLES                  AGE     VERSION</span>
<span class="line">kubernetes-master   NotReady   control-plane<span class="token punctuation">,</span>master   4m10s   v1<span class="token punctuation">.</span>23<span class="token punctuation">.</span>9</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>node环境初始化</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">node节点环境初始化</span>
<span class="line">kubeadm join 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>19:6443 <span class="token operator">--</span>token vfiiwc<span class="token punctuation">.</span>se99g4ai8wl2md9r  <span class="token operator">--</span>discovery-token-ca-cert-hash sha256:0c552edf7b884431dfc1877e6f09a0660460ddbdc567d2366dae43dbc10e9554</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其他配置</strong></p><p>网络环境配置</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建基本目录</span>
<span class="line">mkdir <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/flannel <span class="token operator">-</span>p</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/flannel</span>
<span class="line"></span>
<span class="line">获取配置文件</span>
<span class="line">wget https:<span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com/flannel-io/flannel/master/Documentation/kube-flannel<span class="token punctuation">.</span>yml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">所有节点获取镜像</span>
<span class="line">docker pull docker<span class="token punctuation">.</span>io/rancher/mirrored-flannelcni-flannel-cni-plugin:v1<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0</span>
<span class="line">docker pull docker<span class="token punctuation">.</span>io/rancher/mirrored-flannelcni-flannel:v0<span class="token punctuation">.</span>19<span class="token punctuation">.</span>2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">应用网络环境配置文件</span>
<span class="line">kubectl apply <span class="token operator">-</span>f kube-flannel<span class="token punctuation">.</span>yml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确认效果</span>
<span class="line"><span class="token namespace">[root@localhost /data/kubernetes/flannel]</span><span class="token comment"># kubectl  get nodes</span></span>
<span class="line">NAME                STATUS   ROLES                  AGE     VERSION</span>
<span class="line">kubernetes-master   Ready    control-plane<span class="token punctuation">,</span>master   10m     v1<span class="token punctuation">.</span>23<span class="token punctuation">.</span>9</span>
<span class="line">kubernetes-node1    Ready    &lt;none&gt;                 9m56s   v1<span class="token punctuation">.</span>23<span class="token punctuation">.</span>9</span>
<span class="line">kubernetes-node2    Ready    &lt;none&gt;                 9m52s   v1<span class="token punctuation">.</span>23<span class="token punctuation">.</span>9</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令优化</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">放到当前用户的环境文件中</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># echo &quot;source &lt;(kubectl completion bash)&quot; &gt;&gt; ~/.bashrc</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># echo &quot;source &lt;(kubeadm completion bash)&quot; &gt;&gt; ~/.bashrc</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># source ~/.bashrc</span></span>
<span class="line"></span>
<span class="line">测试效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubectl get n</span></span>
<span class="line">namespaces                         networkpolicies<span class="token punctuation">.</span>networking<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io  nodes</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubeadm co</span></span>
<span class="line">completion  config</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-5-rbd实践" tabindex="-1"><a class="header-anchor" href="#_1-5-5-rbd实践"><span>1.5.5 rbd实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">自从k8s1<span class="token punctuation">.</span>13版本以来，ceph与k8s的集成越来越紧密。ceph为k8s提供存储服务主要有两种方式，cephfs和ceph rdb；cephfs方式支持k8s的pv的3种访问模式ReadWriteOnce，ReadOnlyMany，ReadWriteMany ，RBD支持ReadWriteOnce，ReadOnlyMany。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">跨主机免密码认证</span>
<span class="line"><span class="token namespace">[root@admin /data/scripts]</span><span class="token comment"># /bin/bash 01_remote_host_auth.sh</span></span>
<span class="line">批量设定远程主机免密码认证管理界面</span>
<span class="line">=====================================================</span>
<span class="line"> 1: 部署环境   2: 免密认证   3: 同步hosts</span>
<span class="line"> 4: 设定主机名 5：退出操作</span>
<span class="line">=====================================================</span>
<span class="line">请输入有效的操作id: 2</span>
<span class="line">请输入需要批量远程主机认证的主机列表范围<span class="token punctuation">(</span>示例: <span class="token punctuation">{</span>12<span class="token punctuation">.</span><span class="token punctuation">.</span>19<span class="token punctuation">}</span><span class="token punctuation">)</span>: <span class="token punctuation">{</span>19<span class="token punctuation">.</span><span class="token punctuation">.</span>21<span class="token punctuation">}</span></span>
<span class="line">开始执行免密认证操作<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">spawn <span class="token operator">/</span>usr/bin/ssh-<span class="token function">copy-id</span> <span class="token operator">-</span>i <span class="token operator">/</span>root/<span class="token punctuation">.</span>ssh/id_rsa<span class="token punctuation">.</span>pub root@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>19</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">Now <span class="token keyword">try</span> logging into the machine<span class="token punctuation">,</span> with:   <span class="token string">&quot;ssh &#39;root@10.0.0.21&#39;&quot;</span></span>
<span class="line">and check to make sure that only the key<span class="token punctuation">(</span>s<span class="token punctuation">)</span> you wanted were added<span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line">批量设定远程主机免密码认证管理界面</span>
<span class="line">=====================================================</span>
<span class="line"> 1: 部署环境   2: 免密认证   3: 同步hosts</span>
<span class="line"> 4: 设定主机名 5：退出操作</span>
<span class="line">=====================================================</span>
<span class="line">请输入有效的操作id: 5</span>
<span class="line">开始退出管理界面<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">ceph环境准备工作</span>
<span class="line"><span class="token namespace">[root@admin /data/scripts]</span><span class="token comment"># for i in {19..21}</span></span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">  scp <span class="token operator">/</span>etc/yum<span class="token punctuation">.</span>repos<span class="token punctuation">.</span>d/ceph<span class="token punctuation">.</span>repo root@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$i</span>:<span class="token operator">/</span>etc/yum<span class="token punctuation">.</span>repos<span class="token punctuation">.</span>d/</span>
<span class="line">  ssh root@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$i</span> <span class="token string">&quot;yum install ceph -y&quot;</span></span>
<span class="line">done</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">准备文件</span>
<span class="line"><span class="token namespace">[root@admin /data/scripts]</span><span class="token comment"># for i in {19..21};do scp 02_create_ceph_user.sh 03_remote_cephadm_auth.sh root@10.0.0.$i:/data/scripts; done</span></span>
<span class="line"></span>
<span class="line">准备专属用户</span>
<span class="line"><span class="token operator">/</span>bin/bash <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>scripts/02_create_ceph_user<span class="token punctuation">.</span>sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制数据目录的认证</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token operator">/</span>bin/bash <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>scripts/03_remote_cephadm_auth<span class="token punctuation">.</span>sh</span>
<span class="line">批量设定远程主机免密码认证管理界面</span>
<span class="line">=====================================================</span>
<span class="line"> 1: 部署环境   2: 免密认证   3: 退出操作</span>
<span class="line">=====================================================</span>
<span class="line">请输入有效的操作id: 2</span>
<span class="line">请输入需要批量远程主机认证的主机列表范围<span class="token punctuation">(</span>示例: <span class="token punctuation">{</span>12<span class="token punctuation">.</span><span class="token punctuation">.</span>19<span class="token punctuation">}</span><span class="token punctuation">)</span>: <span class="token punctuation">{</span>19<span class="token punctuation">.</span><span class="token punctuation">.</span>21<span class="token punctuation">}</span></span>
<span class="line">开始执行免密认证操作<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">spawn <span class="token operator">/</span>usr/bin/ssh-<span class="token function">copy-id</span> <span class="token operator">-</span>i <span class="token operator">/</span>home/cephadm/<span class="token punctuation">.</span>ssh/id_rsa<span class="token punctuation">.</span>pub cephadm@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>19</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">同步配置文件</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph-deploy config push kubernetes-master kubernetes-node1 kubernetes-node2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建rbd相关的存储池</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool create kube-rbddata 16 16</span>
<span class="line">pool <span class="token string">&#39;kube-rbddata&#39;</span> created</span>
<span class="line"></span>
<span class="line">启用rbd功能</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph osd pool application enable kube-rbddata rbd</span>
<span class="line">enabled application <span class="token string">&#39;rbd&#39;</span> on pool <span class="token string">&#39;kube-rbddata&#39;</span></span>
<span class="line"></span>
<span class="line">存储池初始化</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rbd pool init <span class="token operator">-</span>p kube-rbddata</span>
<span class="line"></span>
<span class="line">创建存储镜像</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rbd create kube-rbddata/kubeimg <span class="token operator">--</span>size 2Gi</span>
<span class="line"></span>
<span class="line">查看效果</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rbd <span class="token function">ls</span> <span class="token operator">-</span>p kube-rbddata <span class="token operator">-</span>l</span>
<span class="line">NAME     SIZE   PARENT  FMT  PROT  LOCK</span>
<span class="line">kubeimg  2 GiB            2</span>
<span class="line"></span>
<span class="line">查看镜像属性</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rbd info kube-rbddata/kubeimg</span>
<span class="line">rbd image <span class="token string">&#39;kubeimg&#39;</span>:</span>
<span class="line">        size 2 GiB in 512 objects</span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">        features: layering<span class="token punctuation">,</span> exclusive-lock<span class="token punctuation">,</span> object-map<span class="token punctuation">,</span> fast-<span class="token function">diff</span><span class="token punctuation">,</span> deep-flatten</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">注意：</span>
<span class="line">	有可能在k8s使用rbd的时候，提示不支持 object-map<span class="token punctuation">,</span> fast-<span class="token function">diff</span><span class="token punctuation">,</span> deep-flatten 属性，那么我们到时候执行如下命令：</span>
<span class="line">	rbd feature disable kube-rbddata/kubeimg exclusive-lock object-map fast-<span class="token function">diff</span> deep-flatten</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建专属的访问存储池的用户账号</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建专属的账号信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph auth <span class="token function">get-or</span><span class="token operator">-</span>create client<span class="token punctuation">.</span>k8s mon <span class="token string">&#39;allow r&#39;</span> osd <span class="token string">&#39;allow * pool=kube-rbddata&#39;</span> <span class="token operator">-</span>o ceph<span class="token punctuation">.</span>client<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>keyring</span>
<span class="line"></span>
<span class="line">查看秘钥环文件</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">cat</span> ceph<span class="token punctuation">.</span>client<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>keyring</span>
<span class="line"><span class="token namespace">[client.k8s]</span></span>
<span class="line">        key = AQCAR0hj6rCdNhAAFPIDxBTzujdX3SpFDE+pOQ==</span>
<span class="line"> </span>
<span class="line">完善秘钥环文件</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph auth get client<span class="token punctuation">.</span>k8s <span class="token operator">-</span>o ceph<span class="token punctuation">.</span>client<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>keyring</span>
<span class="line">exported keyring <span class="token keyword">for</span> client<span class="token punctuation">.</span>k8s</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ <span class="token function">cat</span> ceph<span class="token punctuation">.</span>client<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>keyring</span>
<span class="line"><span class="token namespace">[client.k8s]</span></span>
<span class="line">        key = AQCAR0hj6rCdNhAAFPIDxBTzujdX3SpFDE+pOQ==</span>
<span class="line">        caps mon = <span class="token string">&quot;allow r&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">传递秘钥环文件到所有k8s节点</span>
<span class="line"><span class="token keyword">for</span> i in <span class="token punctuation">{</span>19<span class="token punctuation">.</span><span class="token punctuation">.</span>21<span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">  scp ceph<span class="token punctuation">.</span>client<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>keyring root@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$i</span>:<span class="token operator">/</span>etc/ceph/</span>
<span class="line">done</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># rbd --user k8s -p kube-rbddata ls</span></span>
<span class="line">kubeimg</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># ceph --user k8s -s</span></span>
<span class="line">  cluster:</span>
<span class="line">    id:     d932ded6-3765-47c1-b0dc-e6957051e31a</span>
<span class="line">    health: HEALTH_WARN</span>
<span class="line">            application not enabled on 1 pool<span class="token punctuation">(</span>s<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ceph查看效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看当前ceph的pool信息</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># ceph --user k8s osd pool ls | grep kube</span></span>
<span class="line">kube-rbddata</span>
<span class="line"></span>
<span class="line">创建对应的镜像信息</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># rbd --user k8s create kube-rbddata/podimg02 --size 1G</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># rbd --user k8s ls -p kube-rbddata | grep od</span></span>
<span class="line">podimg01</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">待测试客户端准备镜像</span>
<span class="line"><span class="token namespace">[root@kubernetes-node1 ~]</span><span class="token comment"># docker pull redis:6.2.5</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>定制pod测试1</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制专属的pod测试资源清单文件 01-ceph-k8s-pod-test<span class="token punctuation">.</span>yaml</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Pod</span>
<span class="line">metadata:</span>
<span class="line">  name: redis-with-rdb-test</span>
<span class="line">spec:</span>
<span class="line">  nodeName: kubernetes-node1</span>
<span class="line">  containers:</span>
<span class="line">  <span class="token operator">-</span> name: redis</span>
<span class="line">    image: redis:6<span class="token punctuation">.</span>2<span class="token punctuation">.</span>5</span>
<span class="line">    imagePullPolicy: IfNotPresent</span>
<span class="line">    volumeMounts:</span>
<span class="line">    <span class="token operator">-</span> mountPath: <span class="token string">&quot;/data&quot;</span></span>
<span class="line">      name: redis-cephrbd-vol</span>
<span class="line">  volumes:</span>
<span class="line">  <span class="token operator">-</span> name: redis-cephrbd-vol</span>
<span class="line">    rbd:</span>
<span class="line">      monitors:</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:6789</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:6789</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>15:6789</span>
<span class="line">      pool: kube-rbddata</span>
<span class="line">      image: kubeimg</span>
<span class="line">      fsType: xfs</span>
<span class="line">      user: k8s</span>
<span class="line">      keyring: <span class="token operator">/</span>etc/ceph/ceph<span class="token punctuation">.</span>client<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>keyring</span>
<span class="line">      </span>
<span class="line">应用资源清单文件</span>
<span class="line">kubectl apply <span class="token operator">-</span>f 01-ceph-k8s-pod-test<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl get pod -o wide</span></span>
<span class="line">NAME                  READY   STATUS    RESTARTS   AGE   IP           NODE      <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">redis-with-rdb-test   1/1     Running   0          22s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>2   k8s-node1 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line">查看信息</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl describe  pod redis-with-rdb-test</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看宿主机绑定效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-node1 ~]</span><span class="token comment"># rbd showmapped</span></span>
<span class="line">id pool         namespace image   snap device</span>
<span class="line">0  kube-rbddata           kubeimg <span class="token operator">-</span>    <span class="token operator">/</span>dev/rbd0</span>
<span class="line"><span class="token namespace">[root@kubernetes-node1 ~]</span><span class="token comment"># mount | grep rbd</span></span>
<span class="line"><span class="token operator">/</span>dev/rbd0 on <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/kubelet/plugins/kubernetes<span class="token punctuation">.</span>io/rbd/mounts/kube-rbddata-image-kubeimg <span class="token function">type</span> xfs <span class="token punctuation">(</span>rw<span class="token punctuation">,</span>relatime<span class="token punctuation">,</span>attr2<span class="token punctuation">,</span>inode64<span class="token punctuation">,</span>sunit=8192<span class="token punctuation">,</span>swidth=8192<span class="token punctuation">,</span>noquota<span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">/</span>dev/rbd0 on <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/kubelet/pods/006fb6bd-6623-4f29-88d9-53e6f4fe5222/volumes/kubernetes<span class="token punctuation">.</span>io~rbd/redis-cephrbd-vol <span class="token function">type</span> xfs <span class="token punctuation">(</span>rw<span class="token punctuation">,</span>relatime<span class="token punctuation">,</span>attr2<span class="token punctuation">,</span>inode64<span class="token punctuation">,</span>sunit=8192<span class="token punctuation">,</span>swidth=8192<span class="token punctuation">,</span>noquota<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看pod</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl get pod</span></span>
<span class="line">NAME                  READY   STATUS    RESTARTS   AGE</span>
<span class="line">redis-with-rdb-test   1/1     Running   0          7m39s</span>
<span class="line"></span>
<span class="line">进入pod查看效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl  exec -it redis-with-rdb-test -- bash</span></span>
<span class="line">root@redis-with-rdb-test:<span class="token operator">/</span><span class="token keyword">data</span><span class="token comment"># mount | grep rbd</span></span>
<span class="line"><span class="token operator">/</span>dev/rbd0 on <span class="token operator">/</span><span class="token keyword">data</span> <span class="token function">type</span> xfs <span class="token punctuation">(</span>rw<span class="token punctuation">,</span>relatime<span class="token punctuation">,</span>attr2<span class="token punctuation">,</span>inode64<span class="token punctuation">,</span>sunit=8192<span class="token punctuation">,</span>swidth=8192<span class="token punctuation">,</span>noquota<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">redis使用rdb效果</span>
<span class="line">root@redis-with-rdb-test:<span class="token operator">/</span><span class="token keyword">data</span><span class="token comment"># ls</span></span>
<span class="line">lost+found</span>
<span class="line">root@redis-with-rdb-test:<span class="token operator">/</span><span class="token keyword">data</span><span class="token comment"># redis-cli</span></span>
<span class="line">127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1:6379&gt; <span class="token function">set</span> nihao nihao</span>
<span class="line">OK</span>
<span class="line">127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1:6379&gt; <span class="token function">set</span> buhao buhao</span>
<span class="line">OK</span>
<span class="line">127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1:6379&gt; keys <span class="token operator">*</span></span>
<span class="line">1<span class="token punctuation">)</span> <span class="token string">&quot;buhao&quot;</span></span>
<span class="line">2<span class="token punctuation">)</span> <span class="token string">&quot;nihao&quot;</span></span>
<span class="line">127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1:6379&gt; BGSAVE</span>
<span class="line">Background saving started</span>
<span class="line">127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1:6379&gt; <span class="token keyword">exit</span></span>
<span class="line">root@redis-with-rdb-test:<span class="token operator">/</span><span class="token keyword">data</span><span class="token comment"># ls</span></span>
<span class="line">dump<span class="token punctuation">.</span>rdb  lost+found</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">宿主机确认效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-node1 ~]</span><span class="token comment"># ls /var/lib/kubelet/plugins/kubernetes.io/rbd/mounts/kube-rbddata-image-kubeimg</span></span>
<span class="line">dump<span class="token punctuation">.</span>rdb</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">收尾动作</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl  delete -f 01-ceph-k8s-pod-test.yaml</span></span>
<span class="line">pod <span class="token string">&quot;redis-with-rdb-test&quot;</span> deleted</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定制pod实践2</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建专属的镜像磁盘</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rbd create kube-rbddata/kubeimg02 <span class="token operator">--</span>size 2Gi</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rbd <span class="token function">ls</span> <span class="token operator">-</span>p kube-rbddata <span class="token operator">-</span>l</span>
<span class="line">NAME       SIZE   PARENT  FMT  PROT  LOCK</span>
<span class="line">kubeimg    2 GiB            2        excl</span>
<span class="line">kubeimg02  2 GiB            2</span>
<span class="line"></span>
<span class="line">清理磁盘格式</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ rbd feature disable kube-rbddata/kubeimg02 exclusive-lock object-map fast-<span class="token function">diff</span> deep-flatten</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看ceph的keyring的信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">cat</span> ceph<span class="token punctuation">.</span>client<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>keyring</span>
<span class="line"><span class="token namespace">[client.k8s]</span></span>
<span class="line">        key = AQDh47ZhqWklMRAAY+6UM0wkbSRc2DeLctQY+A==</span>
<span class="line">        </span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph auth print-key client<span class="token punctuation">.</span>k8s</span>
<span class="line">AQDh47ZhqWklMRAAY+6UM0wkbSRc2DeLctQY+A==</span>
<span class="line"></span>
<span class="line">生成对应的base64编码信息</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph auth print-key client<span class="token punctuation">.</span>k8s <span class="token punctuation">|</span> base64</span>
<span class="line">QVFEaDQ3WmhxV2tsTVJBQVkrNlVNMHdrYlNSYzJEZUxjdFFZK0E9PQ==</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制专属的pod测试资源清单文件 02-ceph-k8s-pod-secret<span class="token punctuation">.</span>yaml</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Secret</span>
<span class="line">metadata:</span>
<span class="line">  name: ceph-secret</span>
<span class="line"><span class="token function">type</span>: <span class="token string">&quot;kubernetes.io/rbd&quot;</span></span>
<span class="line"><span class="token keyword">data</span>:</span>
<span class="line">  key: QVFEaDQ3WmhxV2tsTVJBQVkrNlVNMHdrYlNSYzJEZUxjdFFZK0E9PQ==</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Pod</span>
<span class="line">metadata:</span>
<span class="line">  name: redis-with-secret-test</span>
<span class="line">spec:</span>
<span class="line">  nodeName: kubernetes-node1</span>
<span class="line">  containers:</span>
<span class="line">  <span class="token operator">-</span> name: redis</span>
<span class="line">    image: redis:6<span class="token punctuation">.</span>2<span class="token punctuation">.</span>5</span>
<span class="line">    imagePullPolicy: IfNotPresent</span>
<span class="line">    volumeMounts:</span>
<span class="line">    <span class="token operator">-</span> mountPath: <span class="token string">&quot;/data&quot;</span></span>
<span class="line">      name: redis-cephrbd-vol</span>
<span class="line">  volumes:</span>
<span class="line">  <span class="token operator">-</span> name: redis-cephrbd-vol</span>
<span class="line">    rbd:</span>
<span class="line">      monitors:</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:6789</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:6789</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>15:6789</span>
<span class="line">      pool: kube-rbddata</span>
<span class="line">      image: kubeimg02</span>
<span class="line">      fsType: xfs</span>
<span class="line">      readOnly: false</span>
<span class="line">      user: k8s</span>
<span class="line">      secretRef:</span>
<span class="line">        name: ceph-secret</span>
<span class="line">      </span>
<span class="line">应用资源清单文件</span>
<span class="line">kubectl apply <span class="token operator">-</span>f 02-ceph-k8s-pod-secret<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl  get pod -o wide</span></span>
<span class="line">NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE      <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">redis-with-secret-test   1/1     Running   0          13s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>3   k8s-node2 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">收尾动作</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl delete -f 02-ceph-k8s-pod-secret.yaml</span></span>
<span class="line">secret <span class="token string">&quot;ceph-secret&quot;</span> deleted</span>
<span class="line">pod <span class="token string">&quot;redis-with-secret-test&quot;</span> deleted</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-6-cephfs实践" tabindex="-1"><a class="header-anchor" href="#_1-5-6-cephfs实践"><span>1.5.6 CephFS实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>需求</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">k8s对ceph rbd模式不支持ReadWriteMany（RWX）<span class="token punctuation">,</span>为了满足k8s的灵活性需求<span class="token punctuation">,</span>采用支持多点挂载的cephfs工作模式</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查cephfs环境</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph  fs  <span class="token function">ls</span></span>
<span class="line">name: cephfs<span class="token punctuation">,</span> metadata pool: cephfs-metadata<span class="token punctuation">,</span> <span class="token keyword">data</span> pools: <span class="token namespace">[cephfs-data ]</span></span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph <span class="token operator">-</span>s <span class="token punctuation">|</span> grep mds</span>
<span class="line">    mds: cephfs:1 <span class="token punctuation">{</span>0=stor05=up:active<span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">保存用户账号的密钥信息于secret文件，用于客户端挂载操作认证之用</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ ceph auth print-key client<span class="token punctuation">.</span>fsclient &gt; fsclient<span class="token punctuation">.</span>key</span>
<span class="line"><span class="token namespace">[cephadm@admin ceph-cluster]</span>$ <span class="token function">cat</span> fsclient<span class="token punctuation">.</span>key</span>
<span class="line">AQBgdTJj+LVdFBAAZOjGIsw4t+o1swZlW4CvKQ==</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">将秘钥文件传递给所有的k8s节点主机</span>
<span class="line"><span class="token keyword">for</span> i in <span class="token punctuation">{</span>19<span class="token punctuation">.</span><span class="token punctuation">.</span>21<span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">do</span></span>
<span class="line">  scp fsclient<span class="token punctuation">.</span>key root@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span><span class="token variable">$i</span>:<span class="token operator">/</span>etc/ceph/</span>
<span class="line">done</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建专属的数据目录</span>
<span class="line"><span class="token namespace">[root@kubernetes-node2 ~]</span><span class="token comment"># mkdir /cephfs-data/</span></span>
<span class="line"></span>
<span class="line">挂载cephFS对象</span>
<span class="line"><span class="token namespace">[root@kubernetes-node2 ~]</span><span class="token comment"># mount -t ceph 10.0.0.13:6789,10.0.0.14:6789,10.0.0.15:6789:/ /cephfs-data/ -o name=fsclient,secretfile=/etc/ceph/fsclient.key</span></span>
<span class="line">注意：</span>
<span class="line">	内核空间挂载ceph文件系统，要求必须指定ceph文件系统的挂载路径</span>
<span class="line">	</span>
<span class="line">确认挂载效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-node2 ~]</span><span class="token comment"># mount | grep cephfs</span></span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:6789<span class="token punctuation">,</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:6789<span class="token punctuation">,</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>15:6789:<span class="token operator">/</span> on <span class="token operator">/</span>cephfs-<span class="token keyword">data</span> <span class="token function">type</span> ceph <span class="token punctuation">(</span>rw<span class="token punctuation">,</span>relatime<span class="token punctuation">,</span>name=fsclient<span class="token punctuation">,</span>secret=&lt;hidden&gt;<span class="token punctuation">,</span>acl<span class="token punctuation">,</span>wsize=16777216<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>创建资源清单文件</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取秘钥信息</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># cat /etc/ceph/fsclient.key</span></span>
<span class="line">AQDYCUpjmLjUDxAAYkfNGUG5FUYaFVE6jlFgrQ==</span>
<span class="line"></span>
<span class="line">生成专属的秘钥信息</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># echo -n &#39;AQDYCUpjmLjUDxAAYkfNGUG5FUYaFVE6jlFgrQ==&#39; | base64</span></span>
<span class="line">QVFEWUNVcGptTGpVRHhBQVlrZk5HVUc1RlVZYUZWRTZqbEZnclE9PQ==</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建secret资源清单文件 03-cephfs-k8s-test<span class="token punctuation">.</span>yaml</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Secret</span>
<span class="line">metadata:</span>
<span class="line">  name: ceph-secret</span>
<span class="line"><span class="token keyword">data</span>:</span>
<span class="line">  key: QVFEWUNVcGptTGpVRHhBQVlrZk5HVUc1RlVZYUZWRTZqbEZnclE9PQ==</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: PersistentVolume</span>
<span class="line">metadata:</span>
<span class="line">  name: cephfs-pv</span>
<span class="line">  labels:</span>
<span class="line">    pv: cephfs-pv</span>
<span class="line">spec:</span>
<span class="line">  capacity:</span>
<span class="line">    storage: 1Gi</span>
<span class="line">  accessModes:</span>
<span class="line">    <span class="token operator">-</span> ReadWriteMany</span>
<span class="line">  cephfs:</span>
<span class="line">    monitors:</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:6789</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:6789</span>
<span class="line">      <span class="token operator">-</span> 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>15:6789</span>
<span class="line">    user: fsclient</span>
<span class="line">    secretRef:</span>
<span class="line">      name: ceph-secret</span>
<span class="line">    readOnly: false</span>
<span class="line">  persistentVolumeReclaimPolicy: Delete</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">kind: PersistentVolumeClaim</span>
<span class="line">apiVersion: v1</span>
<span class="line">metadata:</span>
<span class="line">  name: cephfs-pvc</span>
<span class="line">spec:</span>
<span class="line">  accessModes:</span>
<span class="line">    <span class="token operator">-</span> ReadWriteMany</span>
<span class="line">  resources:</span>
<span class="line">    requests:</span>
<span class="line">      storage: 1Gi</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      pv: cephfs-pv</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制资源清单 04-cephfs-k8s-pod-redis<span class="token punctuation">.</span>yaml</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: Pod</span>
<span class="line">metadata:</span>
<span class="line">  name: superopsmsb-redis</span>
<span class="line">spec:</span>
<span class="line">  nodeName: kubernetes-node1</span>
<span class="line">  volumes:</span>
<span class="line">    <span class="token operator">-</span> name: redis-cephfs-vol</span>
<span class="line">      persistentVolumeClaim:</span>
<span class="line">        claimName: cephfs-pvc</span>
<span class="line">  containers:</span>
<span class="line">  <span class="token operator">-</span> name: redis</span>
<span class="line">    image: redis:6<span class="token punctuation">.</span>2<span class="token punctuation">.</span>5</span>
<span class="line">    imagePullPolicy: IfNotPresent</span>
<span class="line">    volumeMounts:</span>
<span class="line">    <span class="token operator">-</span> mountPath: <span class="token string">&quot;/data&quot;</span></span>
<span class="line">      name: redis-cephfs-vol</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">应用资源清单文件</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl  apply -f 03-cephfs-k8s-test.yaml -f 04-cephfs-k8s-pod-redis.yaml</span></span>
<span class="line"></span>
<span class="line">确认效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl describe pod superopsmsb-redis</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">客户端确认效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-node1 ~]</span><span class="token comment"># mount | grep ceph</span></span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:6789<span class="token punctuation">,</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:6789<span class="token punctuation">,</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>15:6789:<span class="token operator">/</span> on <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/kubelet/pods/41a1af23-da66-486c-b80d-a2e084f75edc/volumes/kubernetes<span class="token punctuation">.</span>io~cephfs/cephfs-pv <span class="token function">type</span> ceph <span class="token punctuation">(</span>rw<span class="token punctuation">,</span>relatime<span class="token punctuation">,</span>name=fsclient<span class="token punctuation">,</span>secret=&lt;hidden&gt;<span class="token punctuation">,</span>acl<span class="token punctuation">,</span>wsize=16777216<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">收尾操作</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph]</span><span class="token comment"># kubectl  delete -f 04-cephfs-k8s-pod-redis.yaml -f 03-cephfs-k8s-test.yaml</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-7-sc基础" tabindex="-1"><a class="header-anchor" href="#_1-5-7-sc基础"><span>1.5.7 SC基础</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>需求</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">    对于手工方式为应用提供指定的存储能力是可行的，但是在k8s动态变化的场景中，尤其是面对无状态的集群服务，如何自由的提供存储能力，是想当要考量的一个话题，对于这种场景，我们可以在<span class="token function">SC</span>的基础上，实现动态的为应用服务提供存储能力。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>ceph-csi</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	ceph-csi扩展各种存储类型的卷的管理能力，实现第三方存储ceph的各种操作能力与k8s存储系统的结合。调用第三方存储ceph的接口或命令，从而提供ceph数据卷的创建<span class="token operator">/</span>删除、挂载<span class="token operator">/</span>解除挂载的具体操作实现。前面分析组件中的对于数据卷的创建<span class="token operator">/</span>删除、挂载<span class="token operator">/</span>解除挂载操作，全是调用ceph-csi，然后由ceph-csi调用ceph提供的命令或接口来完成最终的操作。</span>
<span class="line">	自从kubernetes 1<span class="token punctuation">.</span>13版本之后，ceph-csi为k8s环境动态地提供相关的存储能力。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>版本支持</p><table><thead><tr><th>Ceph CSI Version</th><th>Container Orchestrator Name</th><th>Version Tested</th></tr></thead><tbody><tr><td>v3.7.1</td><td>Kubernetes</td><td>v1.22, v1.23, v1.24</td></tr><tr><td>v3.7.0</td><td>Kubernetes</td><td>v1.22, v1.23, v1.24</td></tr><tr><td>v3.6.1</td><td>Kubernetes</td><td>v1.21, v1.22, v1.23</td></tr><tr><td>v3.6.0</td><td>Kubernetes</td><td>v1.21, v1.22, v1.23</td></tr></tbody></table><p><strong>简单实践</strong></p><p>组件功能</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建 pvc:</span>
<span class="line">	external-provisioner组件监听到pvc创建事件后，负责拼接请求，然后调用ceph-csi的CreateVolume方法来创建存储；</span>
<span class="line">删除 pvc:</span>
<span class="line">	pv对象状态由bound变为release，external-provisioner监听到pv更新事件后，负责调用ceph-csi的DeleteVolume方法来删除存储。</span>
<span class="line"></span>
<span class="line">pod关联pvc:</span>
<span class="line">	kubelet会调用ceph-csi组件将创建好的存储从ceph集群挂载到pod所在的node上，然后再挂载到pod相应的目录上；</span>
<span class="line"></span>
<span class="line">pod断开pvc:</span>
<span class="line">	kubelet会调用ceph-csi组件相应方法，解除存储在pod目录上的挂载，再解除存储在node上的挂载。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务组成</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	ceph-csi含有rbdType、cephfsType、livenessType三大类型服务<span class="token punctuation">,</span>它们可以通过启动参数指定一种服务来进行启动。</span>
<span class="line">	<span class="token operator">-</span> rbdType主要进行rbd的操作完成与ceph的交互</span>
<span class="line">	<span class="token operator">-</span> cephfsType主要进行cephfs的操作完成与ceph交互</span>
<span class="line">	<span class="token operator">-</span> livenessType该服务主要是定时向csi endpoint探测csi组件的存活，然后统计到prometheus指标中。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">rbdType、cephfsType类型的服务可以细分为如下三个子服务：</span>
<span class="line">	<span class="token operator">-</span> ControllerServer：主要负责创建、删除cephfs/rbd存储等操作。</span>
<span class="line">	<span class="token operator">-</span> NodeServer：部署在k8s中的每个node上，主要负责cephfs、rbd在node节点上相关的操作。</span>
<span class="line">	<span class="token operator">-</span> IdentityServer：主要是返回自身服务的相关信息，如返回服务身份信息、服务能力、暴露存活探测接口等</span>
<span class="line">	</span>
<span class="line">注意：</span>
<span class="line">	其中NodeServer与ControllerServer只能选其一进行启动</span>
<span class="line">	IdentityServer会伴随着NodeServer或ControllerServer的启动而启动。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+O+`" alt="image-20221015174850734"></p><p>应用组件</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	ceph-csi 在部署的时候，主要涉及到以下组件</span>
<span class="line">external-provisioner（csi-provisioner）：</span>
<span class="line">	<span class="token operator">-</span> 创建provision环境，然后负责监听pvc是否需要动态创建和删除存储卷</span>
<span class="line">	</span>
<span class="line">external-attacher（csi-attacher）：</span>
<span class="line">	<span class="token operator">-</span> 负责获取PV的所有信息，然后判断是否调用CSI Plugin的ControllerPublish做attach，还是调用CntrollerUnpublish接口做detach</span>
<span class="line">	</span>
<span class="line">external-snapshotter：</span>
<span class="line">	<span class="token operator">-</span> 对镜像文件进行快照相关操作，同时负责判断PVC中是否调整需求的存储容量空间大小</span>
<span class="line">	</span>
<span class="line">node-driver-registrar</span>
<span class="line">	调用CSI Plugin的接口获取插件信息，通过Kubelet的插件注册机制将CSI Plugin注册到kubelet</span>
<span class="line"></span>
<span class="line">livenessprobe</span>
<span class="line">	调用CSI Plugin的Probe接口，同时在<span class="token operator">/</span>healthz暴露HTTP健康检查探针</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+G+`" alt="image-20221015175059810"></p><p>部署解读</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	对于ceph-csi环境的部署来说，主要涉及到两个文件：</span>
<span class="line">	csi-xxxplugin-provisioner<span class="token punctuation">.</span>yaml部署的相关组件：</span>
<span class="line">		csi-provisioner	 核心<span class="token function">sc</span>服务能力，负责根据pvc来管理pv对象，动态的管理ceph中的image</span>
<span class="line">		csi-snapshotter  负责处理存储快照相关的操作</span>
<span class="line">		csi-attacher	 负责操作VolumeAttachment对象，并没有操作存储。</span>
<span class="line">		csi-resizer		 负责处理存储扩容相关的操作</span>
<span class="line">		csi-xxxplugin	 核心的ceph-csi组件，负责与kubernetes对接存储相关的操作</span>
<span class="line">		liveness-prometheus	负责探测并上报csi-rbdplugin服务的存活情况</span>
<span class="line">	csi-xxxplugin<span class="token punctuation">.</span>yaml部署的相关组件：</span>
<span class="line">		driver-registrar 向kubelet传入csi-xxxplugin容器提供服务的socket地址等信息。</span>
<span class="line">		csi-xxxplugin	 负责与kubernetes对接存储相关的操作</span>
<span class="line">		liveness-prometheus  负责探测并上报csi-xxxplugin服务的存活情况	</span>
<span class="line">	注意：</span>
<span class="line">		xxx 主要有两类：rdb和cephfs</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-8-sc-rbd实践" tabindex="-1"><a class="header-anchor" href="#_1-5-8-sc-rbd实践"><span>1.5.8 SC-rbd实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础环境、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">参考资料：</span>
<span class="line">	https:<span class="token operator">/</span><span class="token operator">/</span>docs<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com/en/quincy/rbd/rbd-kubernetes/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取代码环境</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/</span>
<span class="line">git clone https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/ceph/ceph-csi<span class="token punctuation">.</span>git</span>
<span class="line">cd ceph-csi/deploy/rbd/kubernetes/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取基本状态信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mon dump</span>
<span class="line">epoch 3</span>
<span class="line">fsid d932ded6-3765-47c1-b0dc-e6957051e31a</span>
<span class="line">last_changed 2062-09-30 23:25:47<span class="token punctuation">.</span>516433</span>
<span class="line">created 2062-09-30 19:05:03<span class="token punctuation">.</span>907227</span>
<span class="line">min_mon_release 14 <span class="token punctuation">(</span>nautilus<span class="token punctuation">)</span></span>
<span class="line">0: <span class="token namespace">[v2:10.0.0.13:3300/0,v1:10.0.0.13:6789/0]</span> mon<span class="token punctuation">.</span>mon01</span>
<span class="line">1: <span class="token namespace">[v2:10.0.0.14:3300/0,v1:10.0.0.14:6789/0]</span> mon<span class="token punctuation">.</span>mon02</span>
<span class="line">2: <span class="token namespace">[v2:10.0.0.15:3300/0,v1:10.0.0.15:6789/0]</span> mon<span class="token punctuation">.</span>mon03</span>
<span class="line">这里重点关注：</span>
<span class="line">	fsid-ceph集群的id 和 mon节点的列表</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署rbd环境</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改核心配置文件 csi-config-map<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ConfigMap</span>
<span class="line">metadata:</span>
<span class="line">  name: <span class="token string">&quot;ceph-csi-config&quot;</span></span>
<span class="line"><span class="token keyword">data</span>:</span>
<span class="line">  config<span class="token punctuation">.</span>json: <span class="token punctuation">|</span><span class="token operator">-</span></span>
<span class="line">    <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">&quot;clusterID&quot;</span>: <span class="token string">&quot;d932ded6-3765-47c1-b0dc-e6957051e31a&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;monitors&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;10.0.0.13:6789&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string">&quot;10.0.0.14:6789&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string">&quot;10.0.0.15:6789&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">注意：</span>
<span class="line">	修改 clusterID 和 monitors 部分内容</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建依赖的configmap文件</span>
<span class="line"><span class="token function">cat</span> &lt;&lt;EOF &gt; ceph-config-map<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ConfigMap</span>
<span class="line"><span class="token keyword">data</span>:</span>
<span class="line">  config<span class="token punctuation">.</span>json: <span class="token punctuation">|</span><span class="token operator">-</span></span>
<span class="line">    <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">metadata:</span>
<span class="line">  name: ceph-csi-encryption-kms-config</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ConfigMap</span>
<span class="line"><span class="token keyword">data</span>:</span>
<span class="line">  ceph<span class="token punctuation">.</span>conf: <span class="token punctuation">|</span></span>
<span class="line">    <span class="token namespace">[global]</span></span>
<span class="line">    auth_cluster_required = cephx</span>
<span class="line">    auth_service_required = cephx</span>
<span class="line">    auth_client_required = cephx</span>
<span class="line">  keyring: <span class="token punctuation">|</span></span>
<span class="line">metadata:</span>
<span class="line">  name: ceph-config</span>
<span class="line">EOF</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改部署资源清单文件 csi-rbdplugin-provisioner<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">kind: Deployment</span>
<span class="line">apiVersion: apps/v1</span>
<span class="line">metadata:</span>
<span class="line">  name: csi-rbdplugin-provisioner</span>
<span class="line">  <span class="token comment"># replace with non-default namespace name</span></span>
<span class="line">  namespace: default</span>
<span class="line">spec:</span>
<span class="line">  replicas: 2   <span class="token comment"># 将3修改为2</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">部署资源清单文件</span>
<span class="line">kubectl apply <span class="token operator">-</span>f csi-config-map<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl apply <span class="token operator">-</span>f ceph-config-map<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl apply <span class="token operator">-</span>f csidriver<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl apply <span class="token operator">-</span>f csi-provisioner-rbac<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl apply <span class="token operator">-</span>f csi-nodeplugin-rbac<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl apply <span class="token operator">-</span>f csi-rbdplugin-provisioner<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl apply <span class="token operator">-</span>f csi-rbdplugin<span class="token punctuation">.</span>yaml</span>
<span class="line">注意：</span>
<span class="line">	csidriver<span class="token punctuation">.</span>yaml 对于pod挂载pvc是非常重要的，如果不执行会导致挂载失败</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确认效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/deploy/rbd/kubernetes]</span><span class="token comment"># kubectl  get pod</span></span>
<span class="line">NAME                                         READY   STATUS    RESTARTS   AGE</span>
<span class="line">csi-rbdplugin-8xq6m                          3/3     Running   0          53s</span>
<span class="line">csi-rbdplugin-nbf8g                          3/3     Running   0          53s</span>
<span class="line">csi-rbdplugin-provisioner-8599998d64-77zqd   7/7     Running   0          54s</span>
<span class="line">csi-rbdplugin-provisioner-8599998d64-p48wm   7/7     Running   0          54s</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>ceph环境准备</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建专属的存储池</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph osd pool create kubernetes 64</span>
<span class="line">pool <span class="token string">&#39;kubernetes&#39;</span> created</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rbd pool init kubernetes</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建专属的用户 <span class="token operator">--</span> 可选</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph auth <span class="token function">get-or</span><span class="token operator">-</span>create client<span class="token punctuation">.</span>kubernetes mon <span class="token string">&#39;profile rbd&#39;</span> osd <span class="token string">&#39;profile rbd pool=kubernetes&#39;</span> mgr <span class="token string">&#39;profile rbd pool=kubernetes&#39;</span></span>
<span class="line"><span class="token namespace">[client.kubernetes]</span></span>
<span class="line">        key = AQA7VUpjyHt/OxAAh1GTn8eWEWBmW2lJ61NmjQ==</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">我们这里以admin用户为例 </span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph auth get client<span class="token punctuation">.</span>admin</span>
<span class="line"><span class="token namespace">[client.admin]</span></span>
<span class="line">        key = AQByzTZjaEaCCRAAolAFknx1x/LgTYhNyy50cw==</span>
<span class="line">        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用测试</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">进入专属测试文件目录</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/ceph-csi/examples/rbd/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改secret文件  secret<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">stringData:</span>
<span class="line">  userID: admin</span>
<span class="line">  userKey: AQByzTZjaEaCCRAAolAFknx1x/LgTYhNyy50cw==</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">修改：</span>
<span class="line">	根据提示信息修改 userID 和 userKey 的信息</span>
<span class="line">	这里的userKey无需进行base64加密</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改<span class="token function">SC</span>配置 storageclass<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">parameters:</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">  clusterID: d932ded6-3765-47c1-b0dc-e6957051e31a</span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">  pool: kubernetes</span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">修改：</span>
<span class="line">	根据提示信息修改 clusterID 和 pool 的信息</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">应用资源清单文件</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f secret<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f storageclass<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f pvc<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f pod<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确定pvc和pv的效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/examples/rbd]</span><span class="token comment"># kubectl  get  pvc</span></span>
<span class="line">NAME      STATUS   VOLUME                                     CAPACITY   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rbd-pvc   Bound    pvc-441dbf43-5051-4130-b8d7-a539e5395ba1   1Gi        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/examples/rbd]</span><span class="token comment"># kubectl  get  pv</span></span>
<span class="line">NAME                                       CAPACITY   ACCESS MODES   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">pvc-441dbf43-5051-4130-b8d7-a539e5395ba1   1Gi        RWO            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确定pod效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/examples/rbd]</span><span class="token comment"># kubectl  describe pod csi-rbd-demo-pod  | grep -A3 Volumes:</span></span>
<span class="line">Volumes:</span>
<span class="line">  mypvc:</span>
<span class="line">    <span class="token function">Type</span>:       PersistentVolumeClaim <span class="token punctuation">(</span>a reference to a PersistentVolumeClaim in the same namespace<span class="token punctuation">)</span></span>
<span class="line">    ClaimName:  rbd-pvc</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">ceph环境中确认效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rbd <span class="token function">ls</span> <span class="token operator">--</span>pool kubernetes <span class="token operator">-</span>l</span>
<span class="line">NAME                                         SIZE  PARENT FMT PROT LOCK</span>
<span class="line">csi-vol-0a8bcde0-ddd0-4ca8-a194-70bf61aaf691 1 GiB          2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>移除应用</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">移除应用</span>
<span class="line">kubectl  delete <span class="token operator">-</span>f pod<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl  delete <span class="token operator">-</span>f pvc<span class="token punctuation">.</span>yaml</span>
<span class="line"></span>
<span class="line">ceph环境中确认效果</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ rbd <span class="token function">ls</span> <span class="token operator">--</span>pool kubernetes <span class="token operator">-</span>l</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>环境收尾</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">清理应用环境</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/ceph-csi/examples/rbd</span>
<span class="line">kubectl  delete <span class="token operator">-</span>f storageclass<span class="token punctuation">.</span>yaml <span class="token operator">-</span>f secret<span class="token punctuation">.</span>yaml</span>
<span class="line"></span>
<span class="line">清理<span class="token function">sc</span>环境</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/ceph-csi/deploy/rbd/kubernetes</span>
<span class="line">kubectl  delete <span class="token operator">-</span>f <span class="token punctuation">.</span><span class="token operator">/</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">清理ceph环境</span>
<span class="line">ceph osd pool <span class="token function">rm</span> kubernetes kubernetes <span class="token operator">--</span>yes-i-really-really-mean-it</span>
<span class="line">ceph auth <span class="token function">rm</span> client<span class="token punctuation">.</span>kubernetes</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-9-sc-cephfs实践" tabindex="-1"><a class="header-anchor" href="#_1-5-9-sc-cephfs实践"><span>1.5.9 SC-cephfs实践</span></a></h3><p>学习目标</p><p>这一节，我们从 基础环境、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取代码环境</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/ceph-csi/deploy/cephfs/kubernetes/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取基本状态信息</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph mon dump</span>
<span class="line">epoch 3</span>
<span class="line">fsid d932ded6-3765-47c1-b0dc-e6957051e31a</span>
<span class="line">last_changed 2062-09-30 23:25:47<span class="token punctuation">.</span>516433</span>
<span class="line">created 2062-09-30 19:05:03<span class="token punctuation">.</span>907227</span>
<span class="line">min_mon_release 14 <span class="token punctuation">(</span>nautilus<span class="token punctuation">)</span></span>
<span class="line">0: <span class="token namespace">[v2:10.0.0.13:3300/0,v1:10.0.0.13:6789/0]</span> mon<span class="token punctuation">.</span>mon01</span>
<span class="line">1: <span class="token namespace">[v2:10.0.0.14:3300/0,v1:10.0.0.14:6789/0]</span> mon<span class="token punctuation">.</span>mon02</span>
<span class="line">2: <span class="token namespace">[v2:10.0.0.15:3300/0,v1:10.0.0.15:6789/0]</span> mon<span class="token punctuation">.</span>mon03</span>
<span class="line">这里重点关注：</span>
<span class="line">	fsid-ceph集群的id 和 mon节点的列表</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署rbd环境</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改核心配置文件 csi-config-map<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ConfigMap</span>
<span class="line">metadata:</span>
<span class="line">  name: <span class="token string">&quot;ceph-csi-config&quot;</span></span>
<span class="line"><span class="token keyword">data</span>:</span>
<span class="line">  config<span class="token punctuation">.</span>json: <span class="token punctuation">|</span><span class="token operator">-</span></span>
<span class="line">    <span class="token punctuation">[</span></span>
<span class="line">      <span class="token punctuation">{</span></span>
<span class="line">        <span class="token string">&quot;clusterID&quot;</span>: <span class="token string">&quot;d932ded6-3765-47c1-b0dc-e6957051e31a&quot;</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">&quot;monitors&quot;</span>: <span class="token punctuation">[</span></span>
<span class="line">          <span class="token string">&quot;10.0.0.13:6789&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string">&quot;10.0.0.14:6789&quot;</span><span class="token punctuation">,</span></span>
<span class="line">          <span class="token string">&quot;10.0.0.15:6789&quot;</span></span>
<span class="line">        <span class="token punctuation">]</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">]</span></span>
<span class="line">注意：</span>
<span class="line">	修改 clusterID 和 monitors 部分内容</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建依赖的configmap文件</span>
<span class="line"><span class="token function">cat</span> &lt;&lt;EOF &gt; ceph-config-map<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: ConfigMap</span>
<span class="line"><span class="token keyword">data</span>:</span>
<span class="line">  ceph<span class="token punctuation">.</span>conf: <span class="token punctuation">|</span></span>
<span class="line">    <span class="token namespace">[global]</span></span>
<span class="line">    auth_cluster_required = cephx</span>
<span class="line">    auth_service_required = cephx</span>
<span class="line">    auth_client_required = cephx</span>
<span class="line">  keyring: <span class="token punctuation">|</span></span>
<span class="line">metadata:</span>
<span class="line">  name: ceph-config</span>
<span class="line">EOF</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改部署资源清单文件 csi-cephfsplugin-provisioner<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">kind: Deployment</span>
<span class="line">apiVersion: apps/v1</span>
<span class="line">metadata:</span>
<span class="line">  name: csi-cephfsplugin-provisioner</span>
<span class="line">spec:</span>
<span class="line">  selector:</span>
<span class="line">    matchLabels:</span>
<span class="line">      app: csi-cephfsplugin-provisioner</span>
<span class="line">  replicas: 2   <span class="token comment"># 将3修改为2</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">      containers:</span>
<span class="line">        <span class="token operator">-</span> name: csi-provisioner</span>
<span class="line">          <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">            <span class="token operator">-</span> <span class="token string">&quot;--extra-create-metadata=false&quot;</span></span>
<span class="line">        <span class="token operator">-</span> name: csi-snapshotter</span>
<span class="line">          <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">            <span class="token operator">-</span> <span class="token string">&quot;--extra-create-metadata=false&quot;</span></span>
<span class="line">注意：</span>
<span class="line">	一定要将 <span class="token operator">--</span>extra-create-metadata 的值设为 false，否则后续对于subvolume要求较高，报错信息：</span>
<span class="line">		API call not implemented server-side: No handler found <span class="token keyword">for</span> <span class="token string">&#39;fs subvolume metadata set&#39;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">部署资源清单文件</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f <span class="token punctuation">.</span><span class="token operator">/</span></span>
<span class="line"></span>
<span class="line">注意：</span>
<span class="line">	csidriver<span class="token punctuation">.</span>yaml 对于pod挂载pvc是非常重要的，如果不执行会导致挂载失败	</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确认效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/deploy/cephfs/kubernetes]</span><span class="token comment"># kubectl  get pod</span></span>
<span class="line">NAME                                            READY   STATUS    RESTARTS   AGE</span>
<span class="line">csi-cephfsplugin-dtdsn                          3/3     Running   0          27s</span>
<span class="line">csi-cephfsplugin-provisioner-65d8546b95-k2rzt   5/5     Running   0          27s</span>
<span class="line">csi-cephfsplugin-provisioner-65d8546b95-zwhws   5/5     Running   0          26s</span>
<span class="line">csi-cephfsplugin-sd9rk                          3/3     Running   0          27s</span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>ceph环境准备</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">如果没有cephfs环境的话，执行如下命令</span>
<span class="line">ceph osd pool create cephfs-<span class="token keyword">data</span> 16 16</span>
<span class="line">ceph osd pool create cephfs-metadata 16 16</span>
<span class="line">ceph fs new cephfs cephfs-metadata cephfs-<span class="token keyword">data</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确认当前的cephfs环境</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph fs <span class="token function">ls</span></span>
<span class="line">name: cephfs<span class="token punctuation">,</span> metadata pool: cephfs-metadata<span class="token punctuation">,</span> <span class="token keyword">data</span> pools: <span class="token namespace">[cephfs-data ]</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建专属的用户 <span class="token operator">--</span> 可选</span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph auth <span class="token function">get-or</span><span class="token operator">-</span>create client<span class="token punctuation">.</span>fsclient mon <span class="token string">&#39;allow r&#39;</span> mds <span class="token string">&#39;allow rw&#39;</span> osd <span class="token string">&#39;allow rwx pool=cephfs-data&#39;</span> <span class="token operator">-</span>o ceph<span class="token punctuation">.</span>client<span class="token punctuation">.</span>fsclient<span class="token punctuation">.</span>keyring</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">我们这里以admin 和 fsclient用户为例 </span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph auth <span class="token function">get-key</span> client<span class="token punctuation">.</span>fsclient</span>
<span class="line">AQDYCUpjmLjUDxAAYkfNGUG5FUYaFVE6jlFgrQ==</span>
<span class="line"></span>
<span class="line"><span class="token namespace">[cephadm@admin cephadm-cluster]</span>$ ceph auth <span class="token function">get-key</span> client<span class="token punctuation">.</span>admin</span>
<span class="line">AQByzTZjaEaCCRAAolAFknx1x/LgTYhNyy50cw==</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用测试</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">进入专属测试文件目录</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/ceph-csi/examples/cephfs/</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改secret文件  secret<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">stringData:</span>
<span class="line">  <span class="token comment"># Required for statically provisioned volumes</span></span>
<span class="line">  userID: fsclient</span>
<span class="line">  userKey: AQDYCUpjmLjUDxAAYkfNGUG5FUYaFVE6jlFgrQ==</span>
<span class="line"></span>
<span class="line">  <span class="token comment"># Required for dynamically provisioned volumes</span></span>
<span class="line">  adminID: admin</span>
<span class="line">  adminKey: AQByzTZjaEaCCRAAolAFknx1x/LgTYhNyy50cw==</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">修改：</span>
<span class="line">	根据提示信息修改 userID 和 userKey 的信息</span>
<span class="line">	这里的userKey无需进行base64加密</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">修改<span class="token function">SC</span>配置 storageclass<span class="token punctuation">.</span>yaml</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">parameters:</span>
<span class="line"><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">  clusterID: d932ded6-3765-47c1-b0dc-e6957051e31a</span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">  fsName: cephfs</span>
<span class="line">  <span class="token comment"># (optional) Ceph pool into which volume data shall be stored</span></span>
<span class="line">  pool: cephfs-<span class="token keyword">data</span></span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">  mounter: kernel</span>
<span class="line">  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">mountOptions:</span>
<span class="line">  <span class="token operator">-</span> discard</span>
<span class="line">修改：</span>
<span class="line">	根据提示信息修改 clusterID、fsName、pool、mounter 的信息</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">应用资源清单文件</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f secret<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f storageclass<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f pvc<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f pod<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确定pvc和pv的效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/examples/cephfs]</span><span class="token comment"># kubectl  get  pvc</span></span>
<span class="line">NAME             STATUS   VOLUME                                     CAPACITY   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-cephfs-pvc   Bound    pvc-6868b7d4-5daa-4c56-ba38-02334bc7a3aa   1Gi        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/examples/cephfs]</span><span class="token comment"># kubectl  get  pv</span></span>
<span class="line">NAME                                       CAPACITY   ACCESS MODES   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">pvc-6868b7d4-5daa-4c56-ba38-02334bc7a3aa   1Gi        RWX            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确定pod效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/examples/rbd]</span><span class="token comment"># kubectl  describe pod csi-cephfs-demo-pod  | grep -A3 Volumes:</span></span>
<span class="line">Volumes:</span>
<span class="line">  mypvc:</span>
<span class="line">    <span class="token function">Type</span>:       PersistentVolumeClaim <span class="token punctuation">(</span>a reference to a PersistentVolumeClaim in the same namespace<span class="token punctuation">)</span></span>
<span class="line">    ClaimName:  csi-cephfs-pvc</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">pod环境中确认效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/ceph-csi/deploy/cephfs/kubernetes]</span><span class="token comment"># kubectl  exec -it csi-cephfs-demo-pod -- mount | grep ceph</span></span>
<span class="line">10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>13:6789<span class="token punctuation">,</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>14:6789<span class="token punctuation">,</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>15:6789:<span class="token operator">/</span>volumes/csi/csi-vol-b7cd7860-8d68-4a20-91ee-b3031ef8c3a9/78b1871c-1274-4c47-8bd6-1f255a5275ed on <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/www <span class="token function">type</span> ceph <span class="token punctuation">(</span>rw<span class="token punctuation">,</span>relatime<span class="token punctuation">,</span>name=admin<span class="token punctuation">,</span>secret=&lt;hidden&gt;<span class="token punctuation">,</span>fsid=00000000-0000-0000-0000-000000000000<span class="token punctuation">,</span>acl<span class="token punctuation">,</span>mds_namespace=cephfs<span class="token punctuation">,</span>wsize=16777216<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>环境收尾</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">清理应用环境</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/ceph-csi/examples/rbd</span>
<span class="line">kubectl  delete <span class="token operator">-</span>f pod<span class="token punctuation">.</span>yaml <span class="token operator">-</span>f pvc<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl  delete <span class="token operator">-</span>f storageclass<span class="token punctuation">.</span>yaml <span class="token operator">-</span>f secret<span class="token punctuation">.</span>yaml</span>
<span class="line"></span>
<span class="line">清理<span class="token function">sc</span>环境</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes/ceph-csi/deploy/rbd/kubernetes</span>
<span class="line">kubectl  delete <span class="token operator">-</span>f <span class="token punctuation">.</span><span class="token operator">/</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">清理ceph环境</span>
<span class="line">ceph osd pool <span class="token function">rm</span> kubernetes kubernetes <span class="token operator">--</span>yes-i-really-really-mean-it</span>
<span class="line">ceph auth <span class="token function">rm</span> client<span class="token punctuation">.</span>kubernetes</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-5-10-集群部署" tabindex="-1"><a class="header-anchor" href="#_1-5-10-集群部署"><span>1.5.10 集群部署</span></a></h3><p>学习目标</p><p>这一节，我们从 基础知识、简单实践、小结 三个方面来学习。</p><p><strong>基础知识</strong></p><p>简介</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Rook 是 Kubernetes 的开源云原生存储编排器，为各种存储解决方案提供平台、框架和支持，以与云原生环境进行原生集成。</span>
<span class="line">	Rook 将存储软件转变为自我管理、自我扩展和自我修复的存储服务。它通过自动化部署、引导、配置、供应、扩展、升级、迁移、灾难恢复、监控和资源管理来实现这一点。Rook 使用底层云原生容器管理、调度和编排平台提供的设施来履行其职责。	Rook 利用扩展点深度集成到云原生环境中，并为调度、生命周期管理、资源管理、安全性、监控和用户体验提供无缝体验。</span>
<span class="line">	Rook 是用 golang 实现的。Ceph 是用 C+<span class="token operator">+</span> 实现的，其中数据路径经过高度优化。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">	Rook是一个自管理的分布式存储编排系统，可以为Kubernetes提供便利的存储解决方案，Rook本身并不提供存储，而是在Kubernetes和存储之间提供适配层，简化存储系统的部署和维护工作。目前，主要支持存储系统包括但不限于Ceph<span class="token punctuation">(</span>主推<span class="token punctuation">)</span>、Cassandra、NFS。</span>
<span class="line">	从本质上来说，Rook 是一个可以提供 Ceph 集群管理能力的 Operator。Rook 使用 CRD 一个控制器来对 Ceph 之类的资源进行部署和管理。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">最新版本: 1<span class="token punctuation">.</span>10<span class="token punctuation">.</span>3</span>
<span class="line">官方地址：https:<span class="token operator">/</span><span class="token operator">/</span>rook<span class="token punctuation">.</span>io/docs/rook/v1<span class="token punctuation">.</span>9/ceph-storage<span class="token punctuation">.</span>html</span>
<span class="line">github: https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/rook/rook</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+T+`" alt="img"></p><p>环境要求</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">1<span class="token punctuation">)</span> K8s集群，1<span class="token punctuation">.</span>16版本<span class="token operator">+</span></span>
<span class="line">2<span class="token punctuation">)</span> K8s至少3个工作节点</span>
<span class="line">3<span class="token punctuation">)</span> 每个工作节点有一块未使用的硬盘</span>
<span class="line">4<span class="token punctuation">)</span> Rook支持部署Ceph Nautilus以上版本</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>准备工作</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">查看master节点的污点</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubectl describe nodes kubernetes-master | grep Taints:</span></span>
<span class="line">Taints:             node-role<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/master:NoSchedule</span>
<span class="line"></span>
<span class="line">移除master节点的污点</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubectl taint nodes kubernetes-master node-role.kubernetes.io/master:NoSchedule-</span></span>
<span class="line">node/kubernetes-master untainted</span>
<span class="line"></span>
<span class="line">确认效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubectl describe nodes kubernetes-master | grep Taints:</span></span>
<span class="line">Taints:             &lt;none&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署环境</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取软件</span>
<span class="line">cd <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>kubernetes</span>
<span class="line">git clone https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/rook/rook<span class="token punctuation">.</span>git</span>
<span class="line">cd rook/deploy/examples</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">创建rook</span>
<span class="line">kubectl apply <span class="token operator">-</span>f crds<span class="token punctuation">.</span>yaml <span class="token operator">-</span>f common<span class="token punctuation">.</span>yaml <span class="token operator">-</span>f operator<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">部署ceph</span>
<span class="line">kubectl apply <span class="token operator">-</span>f cluster<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">部署Rook Ceph工具</span>
<span class="line">kubectl apply <span class="token operator">-</span>f toolbox<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">部署Ceph UI</span>
<span class="line">kubectl apply <span class="token operator">-</span>f dashboard-external-https<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>检查效果</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查pod</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl  get pod -n rook-ceph</span></span>
<span class="line">NAME                                                          READY   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-cephfsplugin-cs9z7                                        2/2     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-cephfsplugin-l2bgm                                        2/2     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-cephfsplugin-provisioner-657868fc8c-66nsc                 5/5     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-cephfsplugin-provisioner-657868fc8c-phdxm                 5/5     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-cephfsplugin-x7d7k                                        2/2     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-rbdplugin-425nc                                           2/2     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-rbdplugin-kthc2                                           2/2     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-rbdplugin-provisioner-9d6787bcd-4pzvf                     5/5     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-rbdplugin-provisioner-9d6787bcd-q6gnf                     5/5     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">csi-rbdplugin-zt2qc                                           2/2     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-crashcollector-kubernetes-master-6795cf77b5-k6m98   1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-crashcollector-kubernetes-node1-7986cf44b-m7fdv     1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-crashcollector-kubernetes-node2-7d666d4f7c-lhvcw    1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-mgr-a-567fc6fbf9-tr9kq                              2/2     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-mgr-b-56496f5b65-7mtzb                              2/2     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-mon-a-74dd858bcf-rn6bs                              1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-mon-b-7dbffc8dd8-ddvsl                              1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-mon-c-6f7567b6dc-n7c47                              1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-operator-785cc8f794-l8dc5                           1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-0-98876dbd6-49wl4                               1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-1-c867b6ddc-clc6c                               1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-2-d74bd646-rhwbs                                1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-3-779b6dc974-q6lbm                              1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-4-5646549855-crjqf                              1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-5-7b96ffbf6c-jsdsm                              1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-prepare-kubernetes-master-fxtbp                 0/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-prepare-kubernetes-node1-l4f2s                  0/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-osd-prepare-kubernetes-node2-k6wx4                  0/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-tools-7c8ddb978b-sqlj2                              1/1     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查svc</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl  get svc -n rook-ceph</span></span>
<span class="line">NAME                                     <span class="token function">TYPE</span>        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>             AGE</span>
<span class="line">rook-ceph-mgr                            ClusterIP   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  9283/TCP            26m</span>
<span class="line">rook-ceph-mgr-dashboard                  ClusterIP   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  8443/TCP            26m</span>
<span class="line">rook-ceph-mgr-dashboard-external-https   NodePort    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  8443:31825/TCP      44m</span>
<span class="line">rook-ceph-mon-a                          ClusterIP   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  6789/TCP<span class="token punctuation">,</span>3300/TCP   36m</span>
<span class="line">rook-ceph-mon-b                          ClusterIP   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  6789/TCP<span class="token punctuation">,</span>3300/TCP   35m</span>
<span class="line">rook-ceph-mon-c                          ClusterIP   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>  6789/TCP<span class="token punctuation">,</span>3300/TCP   29m</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看dashboard</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取Ceph Dashboard登录密码</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl -n rook-ceph get secret rook-ceph-dashboard-password -o jsonpath=&quot;{[&#39;data&#39;][&#39;password&#39;]}&quot; | base64 -d</span></span>
<span class="line">^B7+jmpcdh+<span class="token punctuation">}</span>u^<span class="token punctuation">[</span><span class="token operator">*</span>@n<span class="token punctuation">)</span>K</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">浏览器访问： https:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>19:31825，输入用户名admin，密码^B7+jmpcdh+<span class="token punctuation">}</span>u^<span class="token punctuation">[</span><span class="token operator">*</span>@n<span class="token punctuation">)</span>K</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+N+`" alt="image-20221016004235785"></p><p>命令环境监测</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取ceph-tools工具</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubectl  get pod -n rook-ceph  | grep tools</span></span>
<span class="line">rook-ceph-tools-7c8ddb978b-sqlj2     1/1     Running     0             18m</span>
<span class="line"></span>
<span class="line">进入到专用工具环境</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubectl -n rook-ceph exec -it rook-ceph-tools-7c8ddb978b-sqlj2 -- /bin/bash</span></span>
<span class="line">bash-4<span class="token punctuation">.</span>4$</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查ceph环境</span>
<span class="line"><span class="token namespace">[root@kubernetes-master ~]</span><span class="token comment"># kubectl -n rook-ceph exec -it rook-ceph-tools-7c8ddb978b-sqlj2 -- /bin/bash</span></span>
<span class="line">bash-4<span class="token punctuation">.</span>4$ ceph <span class="token operator">-</span>s</span>
<span class="line">  cluster:</span>
<span class="line">    id:     d20c23c6-4d4f-4926-a0ca-fed583a907a0</span>
<span class="line">    health: HEALTH_WARN</span>
<span class="line">            clock skew detected on mon<span class="token punctuation">.</span>c</span>
<span class="line"></span>
<span class="line">  services:</span>
<span class="line">    mon: 3 daemons<span class="token punctuation">,</span> quorum a<span class="token punctuation">,</span>b<span class="token punctuation">,</span>c <span class="token punctuation">(</span>age 17m<span class="token punctuation">)</span></span>
<span class="line">    mgr: b<span class="token punctuation">(</span>active<span class="token punctuation">,</span> since 19m<span class="token punctuation">)</span><span class="token punctuation">,</span> standbys: a</span>
<span class="line">    osd: 6 osds: 6 up <span class="token punctuation">(</span>since 18m<span class="token punctuation">)</span><span class="token punctuation">,</span> 6 in <span class="token punctuation">(</span>since 22m<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">data</span>:</span>
<span class="line">    pools:   1 pools<span class="token punctuation">,</span> 1 pgs</span>
<span class="line">    objects: 2 objects<span class="token punctuation">,</span> 449 KiB</span>
<span class="line">    usage:   92 MiB used<span class="token punctuation">,</span> 120 GiB <span class="token operator">/</span> 120 GiB avail</span>
<span class="line">    pgs:     1 active+clean</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">bash-4<span class="token punctuation">.</span>4$ ceph df</span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span> RAW STORAGE <span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line"><span class="token keyword">CLASS</span>     SIZE    AVAIL    USED  RAW USED  <span class="token operator">%</span>RAW USED</span>
<span class="line">hdd    120 GiB  120 GiB  92 MiB    92 MiB       0<span class="token punctuation">.</span>08</span>
<span class="line">TOTAL  120 GiB  120 GiB  92 MiB    92 MiB       0<span class="token punctuation">.</span>08</span>
<span class="line"></span>
<span class="line"><span class="token operator">--</span><span class="token operator">-</span> POOLS <span class="token operator">--</span><span class="token operator">-</span></span>
<span class="line">POOL  ID  PGS   STORED  OBJECTS     USED  <span class="token operator">%</span>USED  MAX AVAIL</span>
<span class="line"><span class="token punctuation">.</span>mgr   1    1  449 KiB        2  449 KiB      0     38 GiB</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署rbd 和 cephfs环境</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">部署rbd环境</span>
<span class="line">kubectl apply <span class="token operator">-</span>f csi/rbd/storageclass<span class="token punctuation">.</span>yaml</span>
<span class="line"></span>
<span class="line">部署cephfs环境</span>
<span class="line">kubectl apply <span class="token operator">-</span>f filesystem<span class="token punctuation">.</span>yaml</span>
<span class="line">kubectl apply <span class="token operator">-</span>f csi/cephfs/storageclass<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">检查环境</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl  get sc</span></span>
<span class="line">NAME              PROVISIONER                     RECLAIMPOLICY   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-ceph-block   rook-ceph<span class="token punctuation">.</span>rbd<span class="token punctuation">.</span>csi<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com      Delete          <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">rook-cephfs       rook-ceph<span class="token punctuation">.</span>cephfs<span class="token punctuation">.</span>csi<span class="token punctuation">.</span>ceph<span class="token punctuation">.</span>com   Delete          <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单实践</strong></p><p>存储测试</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">定制资源清单文件 pvc<span class="token punctuation">.</span>yaml</span>
<span class="line">apiVersion: v1</span>
<span class="line">kind: PersistentVolumeClaim</span>
<span class="line">metadata:</span>
<span class="line">  name: mysql-pv-claim</span>
<span class="line">  labels:</span>
<span class="line">    app: wordpress</span>
<span class="line">spec:</span>
<span class="line">  storageClassName: rook-ceph-block</span>
<span class="line">  accessModes:</span>
<span class="line">  <span class="token operator">-</span> ReadWriteOnce</span>
<span class="line">  resources:</span>
<span class="line">    requests:</span>
<span class="line">      storage: 20Gi</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">应用资源对象文件</span>
<span class="line">kubectl apply <span class="token operator">-</span>f pvc<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">确定效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl  get pvc</span></span>
<span class="line">NAME             STATUS        VOLUME                                     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line">mysql-pv-claim   Bound         pvc-fa8d837b-a087-471f-8d00-0c8a9fe65835   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl -n rook-ceph exec -it rook-ceph-tools-7c8ddb978b-sqlj2 -- rbd ls --pool replicapool -l</span></span>
<span class="line">NAME                                          SIZE    PARENT  FMT  PROT  LOCK</span>
<span class="line">csi-vol-c7d28742-4ca9-11ed-bffb-d22d32d7a8e9  20 GiB            2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>wordpress测试</p><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">应用资源对象文件</span>
<span class="line">kubectl  apply <span class="token operator">-</span>f mysql<span class="token punctuation">.</span>yaml <span class="token operator">-</span>f wordpress<span class="token punctuation">.</span>yaml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">获取pvc的效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl get pvc -l app=wordpress</span></span>
<span class="line">NAME             STATUS   VOLUME                                     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>   AGE</span>
<span class="line">mysql-pv-claim   Bound    pvc-38487272-e3cf-46a2-be06-0e20af42054f   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>   25s</span>
<span class="line">wp-pv-claim      Bound    pvc-17da7479-cb6d-46b5-a4fe-0f230f0ae780   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>   25s</span>
<span class="line"></span>
<span class="line">获取pod的效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl get pods -l app=wordpress</span></span>
<span class="line">NAME                               READY   STATUS    RESTARTS   AGE</span>
<span class="line">wordpress-b98c66fff-gbxbc          1/1     Running   0          38s</span>
<span class="line">wordpress-mysql-79966d6c5b-6g82t   1/1     Running   0          38s</span>
<span class="line"></span>
<span class="line">获取svc的效果</span>
<span class="line"><span class="token namespace">[root@kubernetes-master /data/kubernetes/rook/deploy/examples]</span><span class="token comment"># kubectl get svc -l app=wordpress</span></span>
<span class="line">NAME              <span class="token function">TYPE</span>           CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE</span>
<span class="line">wordpress         LoadBalancer   10<span class="token punctuation">.</span>98<span class="token punctuation">.</span>101<span class="token punctuation">.</span>125   &lt;pending&gt;     80:31606/TCP   47s</span>
<span class="line">wordpress-mysql   ClusterIP      None            &lt;none&gt;        3306/TCP       47s</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre><code class="language-powershell"><span class="line">浏览器访问： http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>19:31606，可以看到wordpress的部署页面</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><img src="`+I+`" alt="image-20221016011450922"></p><p><strong>小结</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,775)])])}const F=a(B,[["render",M]]),V=JSON.parse('{"path":"/store/%E7%AC%AC3%E5%8D%95%E5%85%83-%E7%BB%BC%E5%90%88%E5%AE%9E%E8%B7%B5/Ceph%E5%88%86%E5%B8%83%E5%BC%8F%E5%AD%98%E5%82%A8.html","title":"1 综合实践","lang":"zh-CN","frontmatter":{},"git":{},"filePathRelative":"store/第3单元-综合实践/Ceph分布式存储.md"}');export{F as comp,V as data};
