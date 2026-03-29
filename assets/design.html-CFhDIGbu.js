import{_ as s,c as a,a as i,o as l}from"./app-ZssbyP6J.js";const e="/assets/img-DsyXuI3Y.png",p="/assets/img_1-CAXsDu3G.png",t={};function c(u,n){return l(),a("div",null,[...n[0]||(n[0]=[i('<h2 id="设计流程" tabindex="-1"><a class="header-anchor" href="#设计流程"><span>设计流程</span></a></h2><h3 id="_6-详细设计" tabindex="-1"><a class="header-anchor" href="#_6-详细设计"><span>6.详细设计</span></a></h3><blockquote><p>详细设计: 具体指导开发的设计部分，包括流程、数据模型、具体用到的算法、和客户端的接口，等等.这一部分很重要，如果没做好，没对齐，那么搞不好就要返工，耽误进度。</p></blockquote><ol><li>流程设计 2. 流程图或时序图描述业务流程</li><li>算法设计</li><li>数据模型设计</li><li>接口设计</li><li>异常处理</li></ol><h2 id="任务管理器" tabindex="-1"><a class="header-anchor" href="#任务管理器"><span>任务管理器</span></a></h2><h3 id="ovirt-engine-任务流程" tabindex="-1"><a class="header-anchor" href="#ovirt-engine-任务流程"><span>ovirt-engine 任务流程</span></a></h3><ol><li>bll 每个操作在ActionType 枚举中都有一个值.每个枚举值都有一个对应的类，类由工厂通过反射实例化。</li><li>Backend.RunAction：入口，通过 CommandFactory.CreateCommand 接收枚举值和命令参数，并实例化相应的命令。然后，该命令实例通过command.executeAction（）运行， <ol><li>首先运行所有命令的基类：CommandBase的executeAction初始实现。</li><li>CommandBase.executeAction 首先检查命令范围的验证，然后运行派生的命令实现。</li><li>在验证阶段，填充字段“returnValue”，包括其子字段“canDoAction”和“errorMessage”。</li><li>命令的行为与函数非常相似，因此其“returnValue”字段充当函数实际返回值的隐喻。如果验证成功，则开始执行阶段，其中填充“成功”和“异常”。</li></ol></li><li>当用户一次运行多个命令时，后端使用MultipleActionsRunner，execute方法同时异步运行所有命令的验证，然后等待所有验证线程，完成所有验证后，两种：1.全部通过 2.每个命令执行通过验证</li><li>internalValidate() 验证命令 和 execute() 执行命令</li><li><img src="'+e+'" alt="img.png"></li><li><img src="'+p+`" alt="img_1.png"></li></ol><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code class="language-markdown"><span class="line"><span class="token title important"><span class="token punctuation">###</span> 主线程（接受请求并响应）</span></span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">1.</span> 判断删除虚拟机操作是否可以执行</span>
<span class="line">   <span class="token list punctuation">1.</span> 通过命令工厂创建删除虚拟机命令(RemoveVmCommand)实例(实例化和创建命令上下文)</span>
<span class="line">   <span class="token list punctuation">2.</span> 判断删除虚拟机命令是否可以执行，判断失败返回</span>
<span class="line">      <span class="token list punctuation">1.</span> 判断虚拟机信息是否存在，失败返回</span>
<span class="line">      <span class="token list punctuation">2.</span> 判断虚拟机类型是否可以执行删除命令，失败返回</span>
<span class="line">      <span class="token list punctuation">3.</span> 通过虚拟机id从数据库获取中更新示例虚拟机实例信息</span>
<span class="line">      <span class="token list punctuation">4.</span> 判断虚拟机是否运行（Unassigned，Down，ImageIllegal，ImageLocked），失败返回</span>
<span class="line">      <span class="token list punctuation">5.</span> 判断虚拟机是否绑定池，失败返回</span>
<span class="line">      <span class="token list punctuation">6.</span> 判断虚拟机是否正在进行快照，失败返回</span>
<span class="line">      <span class="token list punctuation">7.</span> 判断存储池是否可用，失败返回</span>
<span class="line">      <span class="token list punctuation">8.</span> 判断虚拟机是否正在进行备份，失败返回</span>
<span class="line">   <span class="token list punctuation">3.</span> 将删除虚拟机命令和关联id提交到EngineThreadPool线程池中。</span>
<span class="line"><span class="token list punctuation">2.</span> 返回删除虚拟机操作是否可以执行的结果给前端</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">###</span> EngineThreadPool 线程池（执行删除虚拟机操作）</span></span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">1.</span> 对删除虚拟机命令进行监控 (prepareCommandForMonitoring())</span>
<span class="line">   <span class="token list punctuation">1.</span> 判断删除虚拟机命令是否可以监控，判断失败返回</span>
<span class="line">   <span class="token list punctuation">2.</span> 持久化删除虚拟机作业到数据库job表中。名称：RemoveVm，状态：STARTED</span>
<span class="line"><span class="token list punctuation">2.</span> 执行删除虚拟机操作 (executeAction())</span>
<span class="line">   <span class="token list punctuation">1.</span> 生成删除虚拟机命令的参数对象 RemoveVmParameters</span>
<span class="line">   <span class="token list punctuation">2.</span> 设置删除虚拟机操作状态为EXECUTE</span>
<span class="line">   <span class="token list punctuation">3.</span> 新增删除虚拟机作业的验证步骤</span>
<span class="line">      <span class="token list punctuation">1.</span> 持久化新增删除虚拟机作业验证步骤到数据库step表中。名称：VALIDATING，状态：STARTED</span>
<span class="line">   <span class="token list punctuation">4.</span> 判断删除虚拟机命令是否可以执行（通过主线程验证结果可跳过）</span>
<span class="line">   <span class="token list punctuation">5.</span> 完成删除虚拟机作业的验证步骤</span>
<span class="line">      <span class="token list punctuation">1.</span> 持久化更新删除虚拟机作业验证步骤到数据库step表中。名称：VALIDATING，状态：FINISHED</span>
<span class="line">   <span class="token list punctuation">6.</span> 判断5的验证结果，如果验证失败则终止删除虚拟机命令，返回执行结果false</span>
<span class="line">      <span class="token list punctuation">1.</span> 执行删除虚拟机 (execute())</span>
<span class="line">         <span class="token list punctuation">1.</span> 更新删除虚拟机命令状态为ACTIVE</span>
<span class="line">         <span class="token list punctuation">2.</span> 判断是否持久化命令，如果删除虚拟机命令包含callback或父命令包含callback</span>
<span class="line">            <span class="token list punctuation">1.</span> true：持久化新增删除虚拟机命令实体到数据库command_entities表中。名称：RemoveVm，状态：ACTIVE</span>
<span class="line">            <span class="token list punctuation">2.</span> 将新增删除虚拟机命令实体添加到commandsCache中</span>
<span class="line">            <span class="token list punctuation">3.</span> 将<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>删除虚拟机命令id,定时器</span><span class="token punctuation">&gt;</span></span>添加到callbacksTiming中，后续由定时任务invokeCallbackMethods更新该命令状态</span>
<span class="line">         <span class="token list punctuation">3.</span> 新增删除虚拟机作业的执行步骤</span>
<span class="line">            <span class="token list punctuation">1.</span> 持久化新增删除虚拟机作业执行步骤到数据库step表中。名称：EXECUTING，状态：STARTED</span>
<span class="line">         <span class="token list punctuation">4.</span> 处理删除虚拟机命令步骤</span>
<span class="line">            <span class="token list punctuation">1.</span> 判断删除虚拟机命令参数对象中是否包含步骤</span>
<span class="line">            <span class="token list punctuation">2.</span> 关联删除虚拟机命令和相关步骤</span>
<span class="line">         <span class="token list punctuation">5.</span> 获取删除虚拟机命令参数中事务的范围</span>
<span class="line">         <span class="token list punctuation">6.</span> 根据事务范围执行删除虚拟机命令 (executeInScope)(Suppress)</span>
<span class="line">            <span class="token list punctuation">1.</span> 如果当前存在事务，暂停事务</span>
<span class="line">            <span class="token list punctuation">2.</span> 判断删除虚拟机操作的状态，执行操作或终止操作</span>
<span class="line">               <span class="token list punctuation">1.</span> EXECUTE</span>
<span class="line">                  <span class="token list punctuation">1.</span> 执行删除虚拟机（RemoveVm）操作(executeActionInTransactionScope())(executeAction())</span>
<span class="line">                     <span class="token list punctuation">1.</span> 执行删除虚拟机命令(executeCommand())</span>
<span class="line">                        <span class="token list punctuation">1.</span> 判断虚拟机是否锁定</span>
<span class="line">                           <span class="token list punctuation">1.</span> false: 锁定当前虚拟机</span>
<span class="line">                           <span class="token list punctuation">2.</span> 创建数据库事务1将虚拟机状态更新为lock</span>
<span class="line">                           <span class="token list punctuation">3.</span> 通过vds更新vm的状态</span>
<span class="line">                           <span class="token list punctuation">4.</span> 更新business_entity_snapshot表</span>
<span class="line">                           <span class="token list punctuation">5.</span> 提交数据库事务1</span>
<span class="line">                        <span class="token list punctuation">2.</span> 删除虚拟机（removeVM()）</span>
<span class="line">                           <span class="token list punctuation">1.</span> 执行删除虚拟机快照操作，如果失败记录日志</span>
<span class="line">                           <span class="token list punctuation">2.</span> 创建数据库事务2</span>
<span class="line">                           <span class="token list punctuation">3.</span> 删除数据库中虚拟机相关信息(Users,Network,Snapshots,Static,Icons)</span>
<span class="line">                           <span class="token list punctuation">4.</span> 判断是否删除虚拟机关联的磁盘</span>
<span class="line">                              <span class="token list punctuation">1.</span> 更新数据库中images虚拟机关联的磁盘状态为LOCKED</span>
<span class="line">                           <span class="token list punctuation">5.</span> 提交数据库事务2</span>
<span class="line">                           <span class="token list punctuation">6.</span> 执行删除虚拟机所有磁盘（RemoveAllVmImages）操作(runInternalActionWithTasksContext())</span>
<span class="line">                              <span class="token list punctuation">1.</span> 设置删除虚拟机所有磁盘操作状态为EXECUTE</span>
<span class="line">                              <span class="token list punctuation">2.</span> 判断删除虚拟机所有磁盘命令是否可以执行</span>
<span class="line">                              <span class="token list punctuation">3.</span> 执行删除虚拟机所有磁盘(execute())</span>
<span class="line">                                 <span class="token list punctuation">1.</span> 持久化删除虚拟机任务删除所有磁盘命令到数据库command_entities表中。名称：RemoveAllVmImages ，状态：ACTIVE</span>
<span class="line">                                 <span class="token list punctuation">2.</span> 将<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>删除虚拟机所有磁盘命令id,定时器</span><span class="token punctuation">&gt;</span></span>添加到callbacksTiming中，后续由定时任务invokeCallbackMethods更新该命令状态</span>
<span class="line">                                 <span class="token list punctuation">3.</span> 执行删除虚拟机所有磁盘命令(executeCommand())</span>
<span class="line">                                    <span class="token list punctuation">1.</span> 执行删除磁盘(RemoveImage)操作(runAction())</span>
<span class="line">                                       <span class="token list punctuation">1.</span> 设置删除磁盘操作状态为EXECUTE</span>
<span class="line">                                       <span class="token list punctuation">2.</span> 判断删除磁盘命令是否可以执行</span>
<span class="line">                                       <span class="token list punctuation">3.</span> 执行删除磁盘(execute())</span>
<span class="line">                                          <span class="token list punctuation">1.</span> 持久化删除磁盘命令（RemoveImage）到数据库command_entities表中。名称：RemoveImages ，状态：ACTIVE</span>
<span class="line">                                          <span class="token list punctuation">2.</span> 执行删除磁盘命令(executeCommand())</span>
<span class="line">                                             <span class="token list punctuation">1.</span> 持久化vdsm删除磁盘异步任务到数据库async_tasks表中。</span>
<span class="line">                                             <span class="token list punctuation">2.</span> 添加vdsm删除磁盘异步任务到任务管理器中。</span>
<span class="line">                                             <span class="token list punctuation">3.</span> 获取vdsm删除磁盘命令vdsmTaskId添加vdsmTask列表中<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>命令id，删除磁盘异步任务</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">                                          <span class="token list punctuation">3.</span> 判断删除磁盘命令是否成功</span>
<span class="line">                                             <span class="token list punctuation">1.</span> true：将删除磁盘命令关联的vdsm任务状态置为polling，后续由定时任务timerElapsed更新任务状态</span>
<span class="line">                                       <span class="token list punctuation">4.</span> 根据命令执行结果数据库command_entities表命令状态</span>
<span class="line">                                    <span class="token list punctuation">2.</span> 返回删除磁盘操作结果</span>
<span class="line">                                 <span class="token list punctuation">4.</span> 判断删除虚拟机所有磁盘命令是否成功</span>
<span class="line">                                    <span class="token list punctuation">1.</span> true：将删除虚拟机所有磁盘命令关联的vdsm任务状态置为polling，后续由定时任务timerElapsed更新任务状态startPollingAsyncTasks()</span>
<span class="line">                              <span class="token list punctuation">4.</span> 根据命令执行结果数据库command_entities表命令状态</span>
<span class="line">                           <span class="token list punctuation">7.</span> vmDeleted fire 事件</span>
<span class="line">                        <span class="token list punctuation">3.</span> 设置删除虚拟机执行结果</span>
<span class="line">                     <span class="token list punctuation">2.</span> 根据命令执行结果数据库command_entities表命令状态</span>
<span class="line">                  <span class="token list punctuation">2.</span> 判断删除虚拟机操作结果</span>
<span class="line">                     <span class="token list punctuation">1.</span> true：返回执行结果</span>
<span class="line">                     <span class="token list punctuation">2.</span> false：通过任务管理器执行任务的stop命令，返回执行结果</span>
<span class="line">               <span class="token list punctuation">2.</span> 非EXECUTE</span>
<span class="line">                  <span class="token list punctuation">1.</span> 执行终止删除虚拟机操作(endActionInTransactionScope())</span>
<span class="line">            <span class="token list punctuation">3.</span> 如果当前存在事务，恢复事务</span>
<span class="line">         <span class="token list punctuation">7.</span> 判断删除虚拟机命令是否成功</span>
<span class="line">            <span class="token list punctuation">1.</span> true：将删除虚拟机命令关联的vdsm任务状态置为polling，后续由定时任务timerElapsed更新任务状态startPollingAsyncTasks()</span>
<span class="line">   <span class="token list punctuation">7.</span> 更新数据库删除虚拟机命令信息</span>
<span class="line">   <span class="token list punctuation">8.</span> 返回执行删除虚拟机结果</span>
<span class="line">   <span class="token list punctuation">9.</span> 创建并提交事务3 删除数据库中的异步任务</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">###</span> CommandCallbacksPoller 定时任务 invokeCallbackMethods</span></span>
<span class="line"></span>
<span class="line"><span class="token list punctuation">1.</span> 定时任务-》获取callbacksTiming中所有命令</span>
<span class="line">   <span class="token list punctuation">1.</span> 获取删除虚拟机所有磁盘命令的id</span>
<span class="line">      <span class="token list punctuation">1.</span> 通过命令id获取删除虚拟机所有磁盘(RemoveAllVmImages)命令实体</span>
<span class="line">      <span class="token list punctuation">2.</span> 判断删除虚拟机所有磁盘命令的状态</span>
<span class="line">         <span class="token list punctuation">1.</span> FAILED、SUCCEEDED</span>
<span class="line">            <span class="token list punctuation">1.</span> 执行命令的endCallback方法</span>
<span class="line">               <span class="token list punctuation">1.</span> 执行删除虚拟机所有磁盘命令的结束操作(endAction)</span>
<span class="line">         <span class="token list punctuation">2.</span> ACTIVE</span>
<span class="line">            <span class="token list punctuation">1.</span> 执行命令对应回调类的doPolling方法</span>
<span class="line">               <span class="token list punctuation">1.</span> 通过coco获取删除虚拟机所有磁盘命令状态</span>
<span class="line">               <span class="token list punctuation">2.</span> 遍历获取删除虚拟机所有磁盘命令的子命令的状态</span>
<span class="line">                  <span class="token list punctuation">1.</span> ACTIVE：记录日志</span>
<span class="line">                  <span class="token list punctuation">2.</span> SUCCEEDED：持久化更新删除所有磁盘命令到数据库command_entities表中。名称：RemoveAllVmImages ，状态：SUCCEEDED</span>
<span class="line">   <span class="token list punctuation">2.</span> 获取删除虚拟机命令的id</span>
<span class="line">      <span class="token list punctuation">1.</span> 通过命令id获取删除虚拟机(RemoveVm)命令实体</span>
<span class="line">      <span class="token list punctuation">2.</span> 判断删除虚拟机命令的状态</span>
<span class="line">         <span class="token list punctuation">1.</span> FAILED、SUCCEEDED</span>
<span class="line">            <span class="token list punctuation">1.</span> 执行命令的endCallback方法</span>
<span class="line">               <span class="token list punctuation">1.</span> 执行删除虚拟机所有磁盘命令的结束操作(endAction)</span>
<span class="line">               <span class="token list punctuation">2.</span> 终止删除虚拟机作业</span>
<span class="line">                  <span class="token list punctuation">1.</span> 持久化删除虚拟机作业到数据库job表中。名称：RemoveVm，状态：FINISHED</span>
<span class="line">               <span class="token list punctuation">3.</span> 更新删除虚拟机命令</span>
<span class="line">                  <span class="token list punctuation">1.</span> 更新数据库command_entities表中删除虚拟机命令状态。名称：RemoveVm ，状态：ENDED_SUCCESSFULLY</span>
<span class="line">               <span class="token list punctuation">4.</span> 清理删除虚拟机命令</span>
<span class="line">                  <span class="token list punctuation">1.</span> 删除数据库command_entities表中删除虚拟机和相关子命令</span>
<span class="line">               <span class="token list punctuation">5.</span> 从callbacksTiming移除命令</span>
<span class="line">         <span class="token list punctuation">2.</span> ACTIVE</span>
<span class="line">            <span class="token list punctuation">1.</span> 执行命令对应回调类的doPolling方法</span>
<span class="line">               <span class="token list punctuation">1.</span> 通过coco获取删除虚拟机状态</span>
<span class="line">               <span class="token list punctuation">2.</span> 遍历获取删除虚拟机的子命令（RemoveAllVmImages和RemoveImage）的状态</span>
<span class="line">                  <span class="token list punctuation">1.</span> ACTIVE：记录日志</span>
<span class="line">                  <span class="token list punctuation">2.</span> SUCCEEDED：持久化更新删除虚拟机命令到数据库command_entities表中。名称：RemoveVm ，状态：SUCCEEDED</span>
<span class="line"><span class="token list punctuation">2.</span> 判断未完成命令处理后的状态</span>
<span class="line">   <span class="token list punctuation">1.</span> FAILED、SUCCEEDED：从callbacksTiming删除当前命令</span>
<span class="line">   <span class="token list punctuation">2.</span> ACTIVE：继续下次循环</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">###</span> AsyncTaskManager 定时任务 timerElapsed</span></span>
<span class="line"><span class="token list punctuation">1.</span> 定时任务-》获取vdsmTask列表中的处于polling状态的所有任务</span>
<span class="line">   <span class="token list punctuation">1.</span> 获取删除磁盘对应的storage_pool下所有的任务</span>
<span class="line">   <span class="token list punctuation">2.</span> 通过执行vds命令SPMGetAllTasksStatuses 获取SPM中任务的状态</span>
<span class="line">   <span class="token list punctuation">3.</span> 遍历更新任务状态(updateTaskStatuses)</span>
<span class="line">      <span class="token list punctuation">1.</span> 判断vdsm删除磁盘命令状态</span>
<span class="line">         <span class="token list punctuation">1.</span> Polling</span>
<span class="line">            <span class="token list punctuation">1.</span> 判断任务是否完成</span>
<span class="line">               <span class="token list punctuation">1.</span> 完成：</span>
<span class="line">                  <span class="token list punctuation">1.</span> 更新删除磁盘任务状态为Ended</span>
<span class="line">                  <span class="token list punctuation">2.</span> 判断删除磁盘任务是否成功</span>
<span class="line">                     <span class="token list punctuation">1.</span> 成功：</span>
<span class="line">                        <span class="token list punctuation">1.</span> 获取删除磁盘任务对应的步骤step，持久化更新step表中DELETE_IMAGE行的状态STARTED-》FINISHED</span>
<span class="line">                        <span class="token list punctuation">2.</span> 判断删除磁盘命令和删除磁盘命令子命令是否完成</span>
<span class="line">                        <span class="token list punctuation">3.</span> 完成。线程池执行endCommandAction()</span>
<span class="line">                           <span class="token list punctuation">1.</span> 持久化更新删除磁盘命令（RemoveImage）到数据库command_entities表中。名称：RemoveImages ，状态：SUCCESSED</span>
<span class="line">                           <span class="token list punctuation">2.</span> 新增删除磁盘的结束步骤到数据库step表中。名称：FINALIZING，状态：STARTED</span>
<span class="line">                           <span class="token list punctuation">3.</span> 根据事务范围执行删除虚拟机命令 (executeInScope)(Required)</span>
<span class="line">                              <span class="token list punctuation">1.</span> 非EXECUTE</span>
<span class="line">                                 <span class="token list punctuation">1.</span> 执行终止删除虚拟机操作(endActionInTransactionScope())</span>
<span class="line">                                 <span class="token list punctuation">2.</span> 更新删除磁盘的结束步骤到数据库step表中。名称：FINALIZING，状态：FINISHED</span>
<span class="line">                           <span class="token list punctuation">4.</span> 持久化更新删除磁盘命令（RemoveImage）到数据库command_entities表中。名称：RemoveImages ，状态：ENDED_SUCCESSFULLY</span>
<span class="line">                           <span class="token list punctuation">5.</span> 删除async_tasks异步任务表中数据</span>
<span class="line">                     <span class="token list punctuation">2.</span> 失败：</span>
<span class="line">                        <span class="token list punctuation">1.</span> 获取删除磁盘任务对应的步骤step，持久化更新step表中DELETE_IMAGE行的状态STARTED-》FAILED</span>
<span class="line">                        <span class="token list punctuation">2.</span> 调用clearAsyncTask()清理方法，删除数据库中删除磁盘异步任务数据。</span>
<span class="line">               <span class="token list punctuation">2.</span> 未完成</span>
<span class="line">                  <span class="token list punctuation">1.</span> 继续下次循环</span>
<span class="line">         <span class="token list punctuation">2.</span> Ended</span>
<span class="line">            <span class="token list punctuation">1.</span> 获取删除磁盘异步任务对应的步骤，更新状态STARTED-》FINISHED</span>
<span class="line">            <span class="token list punctuation">2.</span> 删除async表中异步任务记录</span>
<span class="line">         <span class="token list punctuation">3.</span> ClearFailed</span>
<span class="line">            <span class="token list punctuation">1.</span> 调用clearAsyncTask()清理方法，删除数据库中删除磁盘异步任务数据。</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)])])}const d=s(t,[["render",c]]),v=JSON.parse('{"path":"/standard/design.html","title":"","lang":"zh-CN","frontmatter":{},"git":{},"filePathRelative":"standard/design.md"}');export{d as comp,v as data};
