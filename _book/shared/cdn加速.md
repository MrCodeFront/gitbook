## CDN加速



使用jsdelivr对资源进行加速

官网地址：https://www.jsdelivr.com/

github地址：https://github.com/jsdelivr/jsdelivr

描述：

```
类似谷歌托管库，jsDelivr是一个开源[CDN] 6，它允许开发人员举办自己的项目 和任何链接到我们的托管文件，在他们的网站上。
我们提供了一个稳定的CDN，可以在生产中使用，即使与大量流量的热门网站。 有没有带宽限制或高级功能和它的完全自由任何人使用。
所有类型的文件是允许的，包括JavaScript库，jQuery插件，CSS框架，字体等等。
您可以使用此回购协议，使自己的变化和提高jsDelivr的CDN的内容。 随意打开问题和拉请求，如果你觉得有什么应该改变。
该回购协议的所有更改都会同步到CDN。 这可能需要几分钟的变化出现在网站上。
```



根路径始终是：`https://cdn.jsdelivr.net`



##### 使用

可加载npm上的任何项目

```
/npm/package@version/file
```

https://cdn.jsdelivr.net/npm/package@version/file

可精准到版本号或者范围内的版本

```
/npm/jquery@3.1.0/dist/jquery.min.js
/npm/jquery@3/dist/jquery.min.js
/npm/jquery@3.1/dist/jquery.min.js
```

https://cdn.jsdelivr.net/npm/jquery@3.1.0/dist/jquery.min.js

https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js

https://cdn.jsdelivr.net/npm/jquery@3.1/dist/jquery.min.js





##### 加载github资源

加载任何GitHub发布、提交或分支

```
/gh/user/repo@version/file
```

https://cdn.jsdelivr.net/gh/user/repo@version/file

可精准到版本号或者范围内的版本

```
/gh/jquery/jquery@3.1.0/dist/jquery.min.js
/gh/jquery/jquery@32b00373b3f42e5cdcb709df53f3b08b7184a944/dist/jquery.min.js
```

https://cdn.jsdelivr.net/gh/jquery/jquery@3.1.0/dist/jquery.min.js

https://cdn.jsdelivr.net/gh/jquery/jquery@32b00373b3f42e5cdcb709df53f3b08b7184a944/dist/jquery.min.js