# pnpm

---

官网地址：[https://www.pnpm.cn/](https://www.pnpm.cn/)

##### 节省磁盘空间并提升安装速度

![https://www.pnpm.cn/assets/images/cafs-illustration-7be6bd97e43ba11a031b099869321deb.jpg](https://www.pnpm.cn/assets/images/cafs-illustration-7be6bd97e43ba11a031b099869321deb.jpg)

##### 快速

比传统方案安装包的速度快了两倍，以下是官方给出的benchmarks，在多种常见情况下，执行install的速度比较。

![https://pic1.zhimg.com/80/v2-7df19d3adda82c366268b291e378bd8c_720w.jpg](https://pic1.zhimg.com/80/v2-7df19d3adda82c366268b291e378bd8c_720w.jpg)

##### 安装

```bash
npm install -g pnpm

注：全局安装的包，在同级包管理器下是共享访问的。
```

##### 升级

一旦安装完 pnpm 之后，就无需使用其它软件包管理器来更新 pnpm 了。 你可以让 pnpm 自己来更新自己，如下所示：

```bash
pnpm add -g pnpm
```

##### 兼容性

| Node.js    | pnpm 4 | pnpm 5 | pnpm 6 | pnpm 7 |
| ---------- | ------ | ------ | ------ | ------ |
| Node.js 10 | ✔️     | ✔️     | ❌      | ❌      |
| Node.js 12 | ✔️     | ✔️     | ✔️     | ❌      |
| Node.js 14 | ✔️     | ✔️     | ✔️     | ✔️     |
| Node.js 16 | ?️     | ?️     | ✔️     | ✔️     |
| Node.js 18 | ?️     | ?️     | ✔️     | ✔️     |