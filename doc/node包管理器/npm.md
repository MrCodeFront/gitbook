# npm（Node Page Manage）

---

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



