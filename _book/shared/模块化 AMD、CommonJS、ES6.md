## 前端模块化发展历史 (CommonJS、AMD、CMD、UMD、ES6)

---

参考：

**https://zhuanlan.zhihu.com/p/337946057**
*https://blog.51cto.com/lengyuexin/4960989***
https://juejin.cn/post/6844903927104667662**
**https://zhuanlan.zhihu.com/p/55407719**
**https://www.cnblogs.com/dolphinX/p/4381855.html**
**https://juejin.cn/post/6844903848511799303**

视频：

https://www.bilibili.com/video/BV18s411E7Tj/?spm_id_from=333.337.search-card.all.click&vd_source=1390a41caddc0c842b1b8449237f0024



##### 模块化起源

JavaScript发展之初，只是为了解决基础的表单验证问题，以及基础的页面交互，代码非常简单，不存在模块化的概念和问题。但是随着ajax的发展，web进入2.0时代，JavaScript成为一门应用非常广泛的语言。

这个时候js作为一门嵌入型语言，劣势就展示出来了，没有一个权威的规范，问题总是要解决，在前端发展的这几十年，也就顺势而为的产生了很多的js规范。



##### 模块化规范是什么

将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起，完成指定工作。

##### 能做什么

能帮助我们更好的管理各个js文件，处理不同模块间的依赖关系。



##### 早期模块化三种方式：

##### 1.函数

在最早的js中，想要实现分模块开发，最简单的就是函数，因为函数能形成一个相对封闭的空间，通过函数来实现简单的模块化也是最早的解决方案

```text
function model1 = {

}

function model2 = {

}
```

##### 缺点

```text
1、污染全局作用域
2、维护成本高（命名容易冲突）
3、依赖关系不明显
```

##### 2.对象

对象里面可以包含属性和方法，就相当于一个容器了，我们可以把每个模块的代码写到一个对象里面，从而实现模块化的目的

```text
var model1 = {
    age: 11,
    say() {
        console.log(age)
    }
}

var model2 = {
    age: 15,
    say() {
        console.log(age)
    }
}
```

##### 缺点

```text
外部可以修改模块内部状态，可以随意修改每个模块的某个属性，有相当的安全隐患
```

##### 3.自执行函数

IIFE(immediately invoked function expression)，也就是我们说的自执行函数，通过定义一个匿名函数，创建了一个“私有”的命名空间，该命名空间的变量和方法，不会破坏全局的命名空间

```text
var module = (function(){
　　var age = 11
    var say = function(){
        console.log(age)
    }
    return {say};
})();

module.say();  //11
console.log(module.age)  //undefined
```

##### 缺点

```text
外部无法访问内部私有变量
```



##### 三种模块化规范：

##### 1.CommonJS（代表：node.js）

前端真正提出模块化的概念，就是从commonJs的诞生开始的， 因为js作为一门嵌入型语言，处理页面逻辑和交互，即使没有模块化也能运行，并不会出什么问题，但是服务端却必须要有模块的概念。所以commonJs的发扬光大和nodejs相关，尤其是近几年nodejs的应用越来越广泛，npm统治整个前端以后，commonJs规范因此被大家熟知。

##### 定义模块

根据CommonJS规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为global对象的属性

##### 模块输出

模块只有一个出口，module.exports对象，我们需要把模块希望输出的内容放入该对象

##### 加载模块

加载模块使用require方法，该方法读取一个文件并执行，返回文件内部的module.exports对象

```text
// model1.js
var age = 11

function say(){
    console.log(age);
}
module.exports = {
    say
}

// index.html
var wu = require('./index.js');

console.log(wu.say)
```

##### 优点

```
解决了依赖、全局变量污染的问题
```

##### 缺点

```
1.同步加载
CommonJS用同步的方式加载模块。在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，CommonJS不适合浏览器端模块加载，合理的方案是使用异步加载。

2.浏览器不能用
```



##### 2.AMD（代表：RequireJS）

AMD 即Asynchronous Module Definition，中文名是异步模块定义的意思。
AMD规范使用依赖注入的模式，所有当前模块依赖的模块，都要通过异步来调用，执行语句放在回调函数里面。不依赖其他模块的语句，就不要放在回调函数里面，不干扰其他模块的运行。

CommonJS 规范主要是为服务器端的 NodeJS 服务，服务器端加载模块文件无延时，但是在浏览器上就大不相同了。AMD 即是为了在浏览器宿主环境中实现模块化方案的规范之一。

由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎RequireJS，实际上AMD 是 RequireJS 在推广过程中对模块定义的规范化的产出。

下载地址：https://requirejs.org/docs/release/2.3.6/comments/require.js

AngularJS+RequireJS是符合AMD规范的。

##### 引入依赖

```text
<script src="js/require.js" data-main="./main"></script>
```

##### 模块定义

由 define 方法来定义，在 define API 中：

id：模块名称，或者模块加载器请求的指定脚本的名字；

dependencies：是个定义中模块所依赖模块的数组，默认为 [“require”, “exports”, “module”]

factory：为模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值；

```text
// hello.js
define('hello', function (x, y){
  var add = function (x,y){
    console.log(x, y) // 1, 2
　  return x+y;
　};
  return {
　  add: add
　};
});
```

##### 模块引入

require()函数接受两个参数

第一个参数是一个数组，表示所依赖的模块

第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块

```text
// main.js

require.config({
    'baseUrl': './js',
    'paths': {
        'hello': './hello'
    }
})

define('main', function() {
    require(['hello'], function(hello) {
        console.log(hello.add(1, 2)) // 3
    })
})
```

require()函数在加载依赖的函数的时候是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。



##### 3.CMD（代表：Sea.js）

CMD 全称为 Common Module Definition，是 Sea.js 所推广的一个模块化方案的输出。

在 CMD define 的入参中，虽然也支持包含 id, deps 以及 factory 三个参数的形式，但推荐的是接受 factory 一个入参，然后在入参执行时，填入三个参数 require、exports 和 module：

##### 模块定义

require是可以把其他模块导入进来的一个参数;

而exports是可以把模块内的一些属性和方法导出的;

module 是一个对象，上面存储了与当前模块相关联的一些属性和方法。

```text
define(function(require, exports, module) {
  // 每个函数单独导出
  exports.add = function(x, y) {
    return x + y;
  }
});
```

##### 引用模块

```text
define(function(require, exports, module) {
    var hello = require('hello');
    console.log(hello.add(2,3));

    // 单独导出
    exports.init = function init() {
      console.log('init');
    }
});
```

##### html调用

```text
<script src="./js/sea.js"></script>
<script>
seajs.config({
  base: './js', // 后续引用基于此路径
  alias: {  // 别名，可以用一个名称 替代路径（基于base路径）
    hello: './js/hello.js'
  },
});

// 加载入口模块
seajs.use("./main.js", function(main) {
  main.init(); // init
});
</script>
```



##### AMD和CMD的区别

关于这两种的区别网上有很多版本，大体意思差不多：

```text
AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块
CMD推崇就近依赖，只有在用到某个模块的时候再去require
```

所以从这一点上来看，两者在性能上并没有太多差异。因为最影响页面渲染速度的当然是资源的加载速度，既然都是预加载，那么加载模块资源的耗时是一样的（网络情况相同时）。



##### UMD

UMD，全称 Universal Module Definition，即通用模块规范。

既然 CommonJs 和 AMD 风格一样流行，那么需要一个可以统一浏览器端以及非浏览器端的模块化方案的规范。

现在主流框架的源码都是用的UMD规范，因为它既可以兼容浏览器端又可以兼容node。

##### UMD的实现：

先判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块；

再判断是否支持 Node.js 模块格式（exports 是否存在），存在则使用 Node.js 模块格式；

前两个都不存在，则将模块公开到全局（window 或 global）；

##### 全局对象挂载属性

```text
(function(root, factory) {
    console.log('没有模块环境，直接挂载在全局对象上')
    console.log(factory())
    root.umdModule = factory();
}(this, function() {
    return {
        name: '我是一个umd模块'
    }
}))
```

我们把factory写成一个匿名函数，利用IIFE（立即执行函数）去执行工厂函数，返回的对象赋值给root.umdModule，这里的root就是指向全局对象this，其值可能是window或者global，视运行环境而定。

##### 兼容AMD环境

```text
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // 如果环境中有define函数，并且define函数具备amd属性，则可以判断当前环境满足AMD规范
        console.log('是AMD模块规范，如require.js')
        define(factory)
    } else {
        console.log('没有模块环境，直接挂载在全局对象上')
        root.umdModule = factory();
    }
}(this, function() {
    return {
        name: '我是一个umd模块'
    }
}))
```

##### 兼容commonJs和CMD

```text
(function(root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
      console.log('是commonjs模块规范，nodejs环境')
      module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
      console.log('是AMD模块规范，如require.js')
      define(factory)
  } else if (typeof define === 'function' && define.cmd) {
      console.log('是CMD模块规范，如sea.js')
      define(function(require, exports, module) {
          module.exports = factory()
      })
  } else {
      console.log('没有模块环境，直接挂载在全局对象上')
      root.umdModule = factory();
  }
}(this, function() {
  return {
      name: '我是一个umd模块'
  }
}))
```
