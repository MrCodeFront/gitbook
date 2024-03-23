## Linux sshd服务

参考：

Linux服务篇-sshd服务：https://blog.csdn.net/qianshuiliyu/article/details/108664983



##### 介绍

SSH 协议：安全外壳协议，为 Secure Shell 的缩写。SSH 为建立在应用层和传输层基础上的安全协议。



##### 作用

sshd服务使用SSH协议可以用来进行远程控制， 或在计算机之间传送文件，相比较之前用telnet方式来传输文件要安全很多，因为telnet使用明文传输，ssh是加密传输。



##### 检查是否安装 ssh 服务，部分系统可能会原装

```shell
rpm -qa | grep ssh
```

![image-20230625010959450](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/zNlSsuQERJ6gtqA.png)



