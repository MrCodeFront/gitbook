### Vue 3.0

---



官网：https://v3.cn.vuejs.org/guide/migration/introduction.html



+ 冷启动/热启动

+ [vite 介绍](#vite 介绍)

+ [安装/起步](#安装/起步)
+ [新特性](#新特性)



#### <a id='冷启动/热启动'>冷启动/热启动</a>

+ 冷启动

  >  当启动应用时，后台没有该应用的进程，这时系统会重新创建一个新的进程分配给该应用，这个启动方式就是冷启动。

+ 热启动

  > 当启动应用时，后台已有该应用的进程（例：按home键回到桌面，但是该应用的进程是依然会保留在后台，可进入任务列表查看），所以在已有进程的情况下，这种启动会从已有的进程中来启动应用，这个方式叫热启动。



#### <a id='vite 介绍'>vite 介绍</a>

参考地址：https://baijiahao.baidu.com/s?id=1684779666333900793&wfr=spider&for=pc

> Vite是Vue的作者尤雨溪开发的Web开发构建工具，它是一个基于浏览器原生ES模块导入的开发服务器，在开发环境下，利用浏览器去解析import，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随启随用。同时不仅对Vue文件提供了支持，还支持热更新，而且热更新的速度不会随着模块增多而变慢。在生产环境下使用Rollup打包。

+ vite 特点
  + 快速的冷启动
  + 即时热模块更新（HMR，Hot Module Replacement）
  + 真正按需编译

> Vite是在推出Vue 3的时候开发的，目前仅支持Vue 3.x，这意味着与Vue 3不兼容的库也不能与Vite一起使用。



#### <a id='安装/起步'>安装/起步</a>

通过脚手架 [Vite](https://github.com/vitejs/vite)

> ```bash
> npm init @vitejs/app hello-vue3 # OR yarn create @vitejs/app hello-vue3
> ```

通过脚手架 [vue-cli](https://cli.vuejs.org/)

> ```bash
> npm install -g @vue/cli # 或 yarn global add @vue/cli
> vue create hello-vue3
> # 选择 vue 3 preset
> ```



#### <a id='新特性'>新特性</a>

- [组合式 API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)
- [Teleport](https://v3.cn.vuejs.org/guide/teleport.html)
- [片段](https://v3.cn.vuejs.org/guide/migration/fragments.html)
- [触发组件选项](https://v3.cn.vuejs.org/guide/component-custom-events.html)
- [来自 `@vue/runtime-core` 的 `createRenderer` API](https://github.com/vuejs/vue-next/tree/master/packages/runtime-core) 创建自定义渲染器
- [单文件组件组合式 API 语法糖 (`<script step>`)](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md)
- [单文件组件状态驱动的 CSS 变量 (`<script vars>`)](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md)
- [单文件组件 `` 现在可以包含全局规则或只针对插槽内容的规则](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md)





























