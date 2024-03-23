## Git分享



Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。

Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

Git 与常用的版本控制工具 CVS, Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。


Git 与 SVN 区别
Git 不仅仅是个版本控制系统，它也是个内容管理系统(CMS)，工作管理系统等。

如果你是一个具有使用 SVN 背景的人，你需要做一定的思想转换，来适应 Git 提供的一些概念和特征。

Git 与 SVN 区别点：

1、Git 是分布式的，SVN 不是：这是 Git 和其它非分布式的版本控制系统，例如 SVN，CVS 等，最核心的区别。

2、Git 把内容按元数据方式存储，而 SVN 是按文件：所有的资源控制系统都是把文件的元信息隐藏在一个类似 .svn、.cvs 等的文件夹里。

3、Git 分支和 SVN 的分支不同：分支在 SVN 中一点都不特别，其实它就是版本库中的另外一个目录。

4、Git 没有一个全局的版本号，而 SVN 有：目前为止这是跟 SVN 相比 Git 缺少的最大的一个特征。

5、Git 的内容完整性要优于 SVN：Git 的内容存储使用的是 SHA-1 哈希算法。这能确保代码内容的完整性，确保在遇到磁盘故障和网络问题时降低对版本库的破坏。


git init

git add <文件名>  /  git add .

git pull

- git fetch + git merge

git fetch

git status

git commit -m <内容>

git push

- --set-upstream origin 远程分支名：创建远程不存在的分支



commitID 只需要前7位即可锁定 版本

git log

- 显示所有提交过的版本信息

git reflog

- 可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）

git remote

- add <远程版本库(origin)> <git的url地址> 
- git push -u origin master

git clone

git reset <commitID> --hard

- --hard：不保存所有变更
- --soft：保留变更且变更内容处于 Staged
- --mixed（默认）：保留变更且变更内容处于 Modified

git merge

git branch

git checkout -b <name> <template>

- git checkout -b <name> origin <template>：拉取远程仓库

+ 子分支 commit 记录会继承过来
+ 分支改动与其他分支不再有关系

git rebase <分支名称>

- 类似于merge，会将2个分支的 commit 记录重写排列
- git rebase --continue：解决冲突后，继续下一个节点的 rebase





### 文件的四种状态：

初始：Untracked

添加：Staged	绿色

文件一致/提交：Unmodified

修改：Modified	红色



用 alias 简写命令

git的config文件中：

[alias]

	ad = add .
	
	cmm = commit -m
	
	rlg = reflog