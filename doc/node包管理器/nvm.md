# nvm（Node Version Manage）

---

github releases 地址：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

> 注：不同版本对系统安装有影响，例如v1.1.7之后安装后会报错，提示安装路径不能含有空格等。



##### 查看所有版本

```bash
nvm ls
```

##### 添加/卸载指定版本

```bash
nvm install <version>
nvm uninstall <version>
```

##### 使用（切换）版本

```bash
nvm use [version]
```

##### 解决镜像下载过慢问题

参考：https://blog.csdn.net/qq_32754575/article/details/102412473

```
where nvm 找到nvm安装路径
找到settings.txt文件, 并添加以下代码

node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

