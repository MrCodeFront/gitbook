## NG-ALAIN



官网地址：https://ng-alain.com/zh

+ [介绍](#介绍)
+ [环境搭建、安装、运行](#环境搭建、安装、运行)
+ [体系架构](#体系架构)
  + [核心模块描述](#核心模块描述)
  + [项目结构](#项目结构)
+ [常用命令](#常用命令)
+ [基本使用](#基本使用)



######	<a id='介绍'>介绍</a>

> NG-ALAIN 是一个企业级中后台前端/设计解决方案脚手架，秉承 [Ant Design](https://ant.design/) 的设计价值观，目标是希望在Angular上面开发企业后台更简单、更快速。随着『设计者』的不断反馈，将持续迭代，逐步沉淀和总结出更多设计模式和相应的代码实现，阐述中后台产品模板/组件/业务场景的最佳实践。



###### <a id='环境搭建、安装、运行'>环境搭建、安装、运行</a>

> 安装并使用 node LTS 版

> 全局安装 ng 脚手架

```bash
npm install -g @angular/cli
```

> 创建 ng 项目 并 安装 ng-alain 脚手架

```bash
ng new my-project --style less --routing
```

```bash
ng add ng-alain
```

> 运行

```bash
ng serve 或 npm run start
```

> 版本升级

<a href='https://ng-alain.com/docs/upgrade-v11/zh'>https://ng-alain.com/docs/upgrade-v11/zh</a>

###### <a id='体系架构'>体系架构</a>

![https://ng-alain.com/assets/screenshot/architecture.png](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221625923.png)

| 类库               | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| **@delon/theme**   | 主题系统除了包含 NG-ALAIN 基础框架及所需样式（包含CSS工具集，一套类似Bootstrap）以外，还包含一些通用的数据渲染（Pipe）、服务工具类（页面标题、滚动条等）的集合，这些是日常必不可少的一些组成 |
| **@delon/abc**     | 脚手架内提供了一套默认业务组件，这些组件抽象了控制台业务中的一些常见区块。我们将持续维护和迭代这些组件，为中后台业务提供比 Ant Design 基础组件更高级别的抽象 |
| **@delon/chart**   | 基于 G2 的基础上二次封装，提供了业务中常用的图表套件，可以单独使用，也可以组合起来实现复杂的展示效果 |
| **@delon/form**    | 基于 [JSON Schema](http://json-schema.org/) 标准的动态构建表单 |
| **@delon/auth**    | 用户认证模块，用于解决如何获取、存取、使用这三个步骤的用户认证环节 |
| **@delon/acl**     | 访问控制列表，是一种非常简单的基于角色权限控制，甚至达到控制某个按钮显隐的粒度 |
| **@delon/cache**   | 将字典、城市数据等缓存至内存或持久化当中，有效减少 Http 请求 |
| **@delon/mock**    | Mock 会拦截 Angular Http 请求并返回测试数据，当后端未完成接口时 Mock 技术是一项不会影响前端开发进度的工具 |
| **@delon/util**    | 包含数组、延迟、字符串、日期、校验等常见工具集               |
| **@delon/testing** | 常用测试套件                                                 |
| **CLI Schematics** | 快速生成统一的模板、可插拔的插件等                           |

###### 项目结构

```null
├── _mock                                       # Mock 数据规则目录
├── angular.json                                # Angular 项目配置文件
├── src
│   ├── app
│   │   ├── core                                # 核心模块
│   │   │   ├── i18n
│   │   │   ├── net
│   │   │   │   └── default.interceptor.ts      # 默认HTTP拦截器
│   │   │   ├── services
│   │   │   │   └── startup.service.ts          # 初始化项目配置
│   │   │   └── core.module.ts                  # 核心模块文件
│   │   ├── layout                              # 通用布局
│   │   ├── routes
│   │   │   ├── **                              # 业务目录
│   │   │   ├── routes.module.ts                # 业务路由模块
│   │   │   └── routes-routing.module.ts        # 业务路由注册口
│   │   ├── shared                              # 共享模块
│   │   │   ├── shared-delon.module.ts          # @Delon/* 次级共享模块导入
│   │   │   ├── shared-zorro.module.ts          # NG-ZORRO 次级共享模块导入
│   │   │   └── shared.module.ts                # 共享模块文件
│   │   ├── app.component.ts                    # 根组件
│   │   └── app.module.ts                       # 根模块
│   │   └── global-config.module.ts             # @delon & ng-zorro 全局配置项
│   ├── assets                                  # 本地静态资源
│   ├── environments                            # 环境变量配置
│   ├── styles                                  # 样式目录
└── └── style.less                              # 样式引导入口
```

###### 补充

> 图表：Antv(G2 G6 F2 L7等)
>
> 项目脚手架跟随 Angular 及 NG-ZORRO 同步更新



###### <a id='常用指令'>常用指令</a>

> ```bash
> ng g ng-alain:module 模块名
> ```

> ```bash
> ng g ng-alain:list 列表名 -m 模块名
> ```

> ```bash
> ng g ng-alain:view 详情名 -m 模块名 -t 文件夹名称
> ```

###### 补充

> https://ng-alain.com/cli/plugin/zh
>
> 相关配置可到 angular.json 中配置



###### <a href='基本使用'>基本使用</a>

@delon

main.ts -> appModule -> 加载所有模块、组件、服务、指令等

appModule：通过 StartupService 服务，启动项目，Promise.resolve() 异步渲染视图，设置/存储处理项目基本信息

MenuService： 菜单服务，处理菜单列表

titleService：项目标题服务

ACLService：权限服务

ITokenService：token服务，token处理（设置）

SettingsService：系统设置服务，含项目登录信息、项目密钥信息等

_HttpClient：alain 封装的网络请求服务，含 token 校验等

















