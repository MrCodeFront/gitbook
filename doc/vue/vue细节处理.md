# Vue细节处理

---

##### 语法糖

```
v-bind:	:	// 绑定属性，如果属性有大写，需使用kebab-case方式绑定
v-on:	@	// 绑定事件
v-slot:	#	// 指定插槽名称，默认为#default，必须带参
```

##### 组件名大小写（2种）

```
kebab-case(短横线隔开式)
PascalCase(驼峰式)
```

##### v-model基本原理

```html
<input v-model="searchText">
```

等价于：

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

##### 将原生时间绑定到组件

```html
.native可直接监听原生事件
eg: <componentA @click.native="clickComponentA" style="height: 200px;"></componentA>
注意：在app、小程序端和h5端表现不一致，h5端获取到的是浏览器原生事件
```

##### 子组件数据同步更新到父组件

```html
当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定。 .sync 它会被扩展为一个自动更新父组件属性的 v-on 监听器
eg：<syncA :title.sync="title"></syncA>
```

##### 插槽（匿名插槽、具名插槽、作用于插槽）

```
子组件 template 中没有包含一个 <slot> 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃（即：子组件内容会被丢弃）

一个不带 name 的 <slot> 出口会带有隐含的名字 “default” 
```



