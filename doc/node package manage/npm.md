# npm（Node Page Manage）

---

参考：

如何搭建一个本地/自己服务器私有的管理npm包的仓库：https://blog.csdn.net/weixin_54000091/article/details/125369014

npm包发布到私有npm服务器过程：https://blog.csdn.net/qq_34510843/article/details/125251921



##### 查看全局安装的依赖

```bash
npm list -g --depth 0
```

##### 镜像源（查看/设置）

```bash
# 查看
npm get registry

# 设置
npm set registry http://registry.npmjs.org	# npm源
npm set registry http://registry.npm.taobao.org	# 淘宝源
```

##### 查看包所有版本

```bash
npm view [包名] versions [--json]
```

##### 安装pkg

```bash
npm install (with no args, in package dir)
npm install [<@scope>/]<pkg>
npm install [<@scope>/]<pkg>@<tag>
npm install [<@scope>/]<pkg>@<version>
npm install [<@scope>/]<pkg>@<version range>
npm install <alias>@npm:<name>
npm install <folder>
npm install <tarball file>
npm install <tarball url>
npm install <git:// url>
npm install <github username>/<github project>

aliases: i, isntall, add
common options: [--save-prod|--save-dev|--save-optional] [--save-exact] [--no-save]
```

##### 卸载

```bash
npm uninstall [<@scope>/]<pkg>[@<version>]... [--save-prod|--save-dev|--save-optional] [--no-save]
```

##### 发布

```bash
# 默认到 github
npm publish

# 发布到本地npm源（私有服务器）
npm publish --registry [服务器地址]
# npm publish --registry http://localhost:4873
# 安装私有包
npm i --S [包名] --registry [服务器地址]
# npm i --S 包名 --registry http://localhost:4873
```

发布失败请参考：https://blog.51cto.com/kylebing/5430344

