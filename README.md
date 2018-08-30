## 利用pre-commit和commit-msg来做提交控制

### 前言
目前项目开发中，存在一些流程不规范的问题。<br>
例如
 - git 提交信息意图不清晰，接手代码的同事无法领会项目迭代的过程
 - 代码风格没有强约束条件，导致项目代码风格不一致，协作困难等问题

### 主要原理
> Git 钩子<br>
和其它版本控制系统一样，Git 能在特定的重要动作发生时触发自定义脚本。 有两组这样的钩子：客户端的和服务器端的。 客户端钩子由诸如提交和合并这样的操作所调用，而服务器端钩子作用于诸如接收被推送的提交这样的联网操作。 你可以随心所欲地运用这些钩子。

本次主要使用到了 pre-commit 和 commit-msg

|钩子|解释|使用场景|
|:--|:--||
|pre-commit|钩子在键入提交信息前运行。 它用于检查即将提交的快照，例如，检查是否有所遗漏，确保测试运行，以及核查代码。 如果该钩子以非零值退出，Git 将放弃此次提交，不过你可以用 git commit --no-verify 来绕过这个环节。 你可以利用该钩子，来检查代码风格是否一致（运行类似 lint 的程序）、尾随空白字符是否存在（自带的钩子就是这么做的），或新方法的文档是否适当|eslint 验证|
|commit-msg|钩子接收一个参数，此参数即上文提到的，存有当前提交信息的临时文件的路径。 如果该钩子脚本以非零值退出，Git 将放弃提交，因此，可以用来在提交通过前验证项目状态或提交信息。 在本章的最后一节，我们将展示如何使用该钩子来核对提交信息是否遵循指定的模板|提交消息验证|

### 一些扩展
随着项目规模的增大，源文件数量会越来越多，当达到一定的规模时，eslint完成一次验证会耗费大量的时间。

其实对开发者而言，自己没有改动的源码可以认为是不存在代码格式问题的。

所以，可以考虑使用只验证自己修改的文件

### 参考文档
[自定义 Git - Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
