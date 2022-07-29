# webcomponent 、angular的变化检测机制

---



#### webcomponent（网页组件）

参考文档：

https://developer.mozilla.org/en-US/docs/Web/Web_Components

[Web Components 入门实例教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2019/08/web_components.html)



##### 1.概念

> Web Components 是一套不同的技术，允许您创建可重用的自定义元素——它们的功能被封装在你的代码的其余部分之外——并在你的 Web 应用程序中使用它们。



Web Components旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。

+ **Custom elements（自定义元素）：**一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。

+ **Shadow DOM（影子DOM）**：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。

+ **HTML templates（HTML模板）：**  `<template>`和 `<slot>`元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用

实现web component的基本方法通常如下所示：

1. 创建一个类或函数来指定web组件的功能，如果使用类，请使用 ECMAScript 2015 的类语法(参阅[类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)获取更多信息)。
2. 使用 [`CustomElementRegistry.define()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define) 方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类、以及可选的其所继承自的元素。
3. 如果需要的话，使用[`Element.attachShadow()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow) 方法将一个shadow DOM附加到自定义元素上。使用通常的DOM方法向shadow DOM中添加子元素、事件监听器等等。
4. 如果需要的话，使用  定义一个HTML模板。再次使用常规DOM方法克隆模板并将其附加到您的shadow DOM中。
5. 在页面任何您喜欢的位置使用自定义元素，就像使用常规HTML元素那样。



##### 2.元素注册器

CustomElementRegistry：**`CustomElementRegistry`**接口提供注册自定义元素和查询已注册元素的方法。要获取它的实例，请使用 [`window.customElements`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/customElements)属性。

##### 3.语法

```js
customElements.define(name, constructor, options);
```

##### 4.[生命周期回调](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks)

定义在自定义元素的类定义中的特殊回调函数，影响其行为：

- `connectedCallback`: 当自定义元素第一次被连接到文档DOM时被调用。
- `disconnectedCallback`: 当自定义元素与文档DOM断开连接时被调用。
- `adoptedCallback`: 当自定义元素被移动到新文档时被调用。
- `attributeChangedCallback`: 当自定义元素的一个属性被增加、移除或更改时被调用。



##### 5.[Shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components#shadow_dom)

> Web components 的一个重要属性是封装——可以将标记结构、样式和行为隐藏起来，并与页面上的其他代码相隔离，保证不同的部分不会混在一起，可使代码更加干净、整洁。其中，Shadow DOM 接口是关键所在，它可以将一个隐藏的、独立的 DOM 附加到一个元素上。

+ [`ShadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot) 表示shadow DOM子树的根节点。 

+ [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) extensions

  与shadow DOM有关的`Element` 接口的扩展:

  - [`Element.attachShadow()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow) 方法将shadow DOM树附加给特定元素。
  - [`Element.shadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/shadowRoot) 属性返回附加给特定元素的shadow root，或者 `null` 如果没有shadow root被附加。

+ [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 相关拓展

  与 shadow DOM 相关的 `Node` 接口的拓展:

  - [`Node.getRootNode()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/getRootNode) 方法返回上下文对象的根，可以选择包含shadow root，如果可用的话。
  - [`Node.isConnected`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isConnected) 属性返回一个布尔值表示节点是否连接（直接或间接）到上下文对象。例如，在普通DOM的情况下为[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 对象，或者在shadow DOM的情况下为 [`ShadowRoot`](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot) 

+ [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 拓展

  与shadow DOM相关的`Event` 接口的扩展：

  - [`Event.composed`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/composed): 返回 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 它表明事件是否会通过shadow DOM边界传播到标准DOM。
  - 返回事件的路径（侦听器将被调用的对象）。如果shadow root是使用[`ShadowRoot.mode`](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot/mode)为closed创建的，则不包括shadow树中的节点。



##### 6.[HTML templates](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components#html_templates)

+ [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template) 包含一个HTML片段，不会在文档初始化时渲染。但是可以在运行时使用JavaScript显示。主要用作自定义元素结构的基础。关联的DOM接口是[`HTMLTemplateElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTemplateElement)。

  **HTML 内容模板（`<template>`）元素**是一种用于保存客户端内容机制，该内容在加载页面时不会呈现，但随后可以 (原文为 may be) 在运行时使用 JavaScript 实例化。

+ [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) web component中的一个占位符，你可以填充自己的标记，这样你就可以创建单独的DOM树并将它们呈现在一起。关联的DOM接口是[`HTMLSlotElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSlotElement)。

  **HTML `<slot> `元素 ，**作为 [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 技术套件的一部分，是Web 组件内的一个占位符。该占位符可以在后期使用自己的标记语言填充，这样您就可以创建单独的 DOM 树，并将它与其它的组件组合在一起。



##### 7.示例

```js
class ElementA extends HTMLElement {
  constructor() {
      // 必须首先调用 super 方法
      super();

      // 元素的功能代码写在这里
      // ...
  }

  /** 生命周期 */
    
  connectedCallback() {
      // 自定义元素首次插入文档dom时调用
      // 相较于constructor只会执行一次，这个生命周期每次将节点连接到dom时都会调用
      // 可能会执行多次(比如同一个自定义元素remove, append多次)
  }

  disconnectedCallback() {
      // 自定义元素从文档中删除时，调用
  }

  adoptedCallback() {
      // 自定义元素移动到新的文档
      // 比如使用 adoptNode 方法在多iframe下移动元素
  }

  attributeChangedCallback(name, oldVal, newVal) {
      // 属性变更时调用：三个参数对应属性名，旧值，新值
  }
}

customElements.define(name, ElementA);
```

##### 8.实战

```js
class CodeFront extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    const span = document.createElement('span');
    span.setAttribute('class', 'code-front-text');
    setTimeout(() => {
      span.textContent = this.getAttribute('text') || '默认内容';
    }, 10);

    const style = document.createElement('style');
    style.textContent = `
      .code-front-text {
        font-family: 微软雅黑;
        font-weight: 400;
        font-size: 80px;
        margin: 0 auto;
        color: rgba(255, 255, 255, 0.1);    
        background: #ed8080;
        
        background: linear-gradient(to right, #ed8080 0%, #2a77d6 16%, #5eb524 32%, #eacd25 48%, #ed8080 64%, #2a77d6 80%, #5eb524 100%);
        
        filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#ed8080', endColorstr='#5eb524', GradientType=1);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        background-clip: text;
        animation: shimmer infinite 3s linear;
        -webkit-animation: shimmer infinite 3s linear;
        background-repeat: no-repeat;
        background-position: top left;
        background-color: #222;
      }
      @keyframes shimmer {
        0% {
            background-position: top left;
        }
        100% {
            background-position: top right;
        }
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(span);
  }
}

// Define the new element
customElements.define('code-front', CodeFront);


// class CodeFront extends HTMLElement {
//   constructor() {
//     // Always call super first in constructor
//     super();

//     // Create a shadow root
//     // open：shadow root元素可以从js外部访问根节点
//     // closed：拒绝从js外部访问关闭的shadow root节点
//     const shadow = this.attachShadow({
//       mode: 'open'
//     });

//     // Create div
//     const wrapper = document.createElement('div');
//     wrapper.setAttribute('class', 'wrapper');

//     // Create input
//     const input = document.createElement('input');

//     // Define Attribute
//     const placeholder = this.getAttribute('placeholder');
//     input.placeholder = placeholder || '暂无提示';

//     // Create some CSS to apply to the shadow dom
//     const style = document.createElement('style');
//     style.textContent = `
//       .wrapper{
//         display: inline-block;
//       }
//     `;

//     wrapper.appendChild(input);
//     shadow.appendChild(style);
//     shadow.appendChild(wrapper);
//   }
// }

// // Define the new element
// customElements.define('code-front', CodeFront);
```



---



#### angular的变化检测机制



参考：

https://blog.csdn.net/zyxzp2012/article/details/90208489



##### 什么是变更检测

变更检测的基本任务是获得程序的内部状态并使之在用户界面可见。这个状态可以是任意的数据类型。

##### 引起变更原因

异步（Event、xhr、定时器）操作改变了程序的状态，导致视图的更新。

##### Angular 内的处理

Angular 有着自己的zone，称为NgZone。Angular源码的某个地方，有一个东西叫做ApplicationRef，它监听NgZones的onTurnDone事件。只要这个事件发生了，它就执行tick()函数，这个函数执行变更检测

```ts
// 真实源码的非常简化版本。
class ApplicationRef { 
  changeDetectorRefs:ChangeDetectorRef[] = []; 
  constructor(private zone: NgZone) { 
  	this.zone.onTurnDone.subscribe(() => this.zone.run(() => this.tick()); 
  } 
  tick() { 
  	this.changeDetectorRefs .forEach((ref) => ref.detectChanges());
  }
}
```

##### 变更检测

在 Angular 中，每个组件都有它自己的 change detector (变更检测器)

[ChangeDetectorRef](https://angular.cn/api/core/ChangeDetectorRef#markForCheck)

> Angular 各种视图的基础类，提供变更检测功能。 变更检测树会收集要检查的所有视图。 使用这些方法从树中添加或移除视图、初始化变更检测并显式地把这些视图标记为*脏的*，意思是它们变了、需要重新渲染。

OnPush 的两种状态：https://angular.cn/api/core/ChangeDetectionStrategy

主要方法：

 [abstract markForCheck(): void](https://angular.cn/api/core/ChangeDetectorRef#markForCheck)

 [abstract detach(): void](https://angular.cn/api/core/ChangeDetectorRef#detach)

 [abstract detectChanges(): void](https://angular.cn/api/core/ChangeDetectorRef#detectChanges)

 [abstract checkNoChanges(): void](https://angular.cn/api/core/ChangeDetectorRef#checkNoChanges)

 [abstract reattach(): void](https://angular.cn/api/core/ChangeDetectorRef#reattach)



![https://img-blog.csdnimg.cn/20190514154723302.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70](https://img-blog.csdnimg.cn/20190514154723302.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70)

![https://img-blog.csdnimg.cn/20190514154734771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70](https://img-blog.csdnimg.cn/20190514154734771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70)



变更监听值变化及自定义变更：

> ngOnChanges：检测监听值的变更
>
> ngDoCheck：检测和处理 Angular 自己没有捕捉到的变化，可自定义变更检测逻辑



![https://img-blog.csdnimg.cn/20190514154956406.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70](https://img-blog.csdnimg.cn/20190514154956406.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70)

![https://img-blog.csdnimg.cn/20190514155100393.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70](https://img-blog.csdnimg.cn/20190514155100393.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70)



组件注入 ChangeDetectorRef，并调用 markForCheck 方法，会告诉Angular，标记整条路径，从这个组件到根组件都需要被checked，一旦变更检测结束，它就会恢复为整棵树恢复OnPush状态

![https://img-blog.csdnimg.cn/20190514155147384.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70](https://img-blog.csdnimg.cn/20190514155147384.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70)

![https://img-blog.csdnimg.cn/20190514155157678.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70](https://img-blog.csdnimg.cn/20190514155157678.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eHpwMjAxMg==,size_16,color_FFFFFF,t_70)

##### 示例

app.conponent.ts

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  text = '';

  constructor() { }

  ngOnInit(): void {

  }
}

```

app.conponent.html

```html
<app-child [(text)]="text"></app-child>
```

app-child.ts

```typescript
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ChildComponent implements OnInit {

  @Input() text = '';
  @Output() textChange = new EventEmitter();
  
  obj = {
    currentValue: '',
    previousValue: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.obj.currentValue = changes['text'].currentValue;
    this.obj.previousValue = changes['text'].previousValue;
  }

  change() {
    this.textChange.emit(this.text);
  }
}
```

app-child.html

```html
<input type="text" [(ngModel)]="text" (ngModelChange)="change()">
<br>
currentValue：{{obj.currentValue}}
<br>
previousValue： {{obj.previousValue}}
```

