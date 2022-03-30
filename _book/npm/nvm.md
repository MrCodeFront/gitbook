##### 解决镜像下载过慢问题

参考：https://blog.csdn.net/qq_32754575/article/details/102412473

where nvm 找到nvm安装路径
找到settings.txt文件, 并添加以下代码

```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```
