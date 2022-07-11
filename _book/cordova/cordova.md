# CORDOVA

---

官网：[https://cordova.apache.org/](https://cordova.apache.org/)

##### 安装

```bash
npm install -g cordova
```

##### 创建项目

```bash
cordova create [项目名]
```

##### 平台(browser/android/ios)

```bash
# 查看平台
cordova platform ls
# 安装平台
cordova platform add [平台名]
# 移除平台
cordova platform rm [平台名]
```

##### 运行

```bash
cordova run [平台名]
```

##### 插件

```bash
# 查看插件
cordova plugin ls
# 添加插件
cordova plugin add [插件名]
# 移除插件
cordova plugin rm [插件名]
```

##### 打包

```bash
cordova build android/ios
```

