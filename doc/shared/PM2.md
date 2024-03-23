## PM2 流程管理器



官网地址：https://pm2.keymetrics.io/

github地址：https://github.com/Unitech/pm2



##### 概述

PM2是Node.js应用程序的生产流程管理器，具有内置的负载均衡器。它允许您永远保持应用程序的活力，在不停机的情况下重新加载应用程序，并促进常见的系统管理任务。



##### 安装

```bash
npm install pm2@latest -g
```

```bash
yarn global add pm2
```



##### 启动

```bash
pm2 start app.js
```



##### 管理

![img](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403231148147.png)

```bash
pm2 restart <app_name|namespace|id|'all'|json_conf>
pm2 reload <app_name|namespace|id|'all'|json_conf>
pm2 stop <app_name|namespace|id|'all'|json_conf>
pm2 delete <app_name|namespace|id|'all'|json_conf>
```



##### 查看状态

```bash
pm2 [list|ls|status]
```



##### 查看日志

```bash
pm2 logs
```

```bash
pm2 logs --lines 200
```



##### 监视日志、自定义指标和应用程序信息

```bash
pm2 monit
```









