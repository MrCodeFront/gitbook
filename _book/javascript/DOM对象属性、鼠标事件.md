### DOM 对象属性

---

##### clientWidth、clientHeight

```
clientWidth：width(样式中设置的) + 左右padding - 垂直滚动条宽度
clientHeight：height(样式中设置的) + 上下padding - 水平滚动条宽度
```

##### offsetWidth、offsetHeight 只与当前元素有关，与其他元素无关

```
offsetWidth：width(样式中设置的) + 左右padding + 左右border
offsetHeight：height(样式中设置的) + 上下padding + 上下border
```

##### offsetParent 

```
offsetParent属性返回一个对象的引用，这个对象是距离调用offsetParent的元素最近的（在包含层次中最靠近的），并且是已进行过CSS定位的容器元素。 如果这个容器元素未进行CSS定位, 则offsetParent属性的取值为根元素的引用

1、如果当前元素的父级元素没有进行CSS定位（position为absolute或relative），offsetParent为body。
2、如果当前元素的父级元素中有CSS定位（position为absolute或relative），offsetParent取最近的那个父级元素。
```

##### offsetTop、offsetLeft 与 offsetWidth 和 offsetHeight不同的是，它们受到 offsetParent 的影响

```
offsetLeft：(offsetParent的padding-left) + (中间元素的offsetWidth) + (当前元素的margin-left)
offsetTop：(offsetParent的padding-top) +  (中间元素的offsetHeight) + (当前元素的margin-top)
```

##### scrollWidth、scrollHeight

```
scrollWidth 可视区域宽度 + 被隐藏区域宽度
scrollHeight 可视区域高度 + 被隐藏区域高度
```

##### scrollTop、scrollLeft

```
scrollTop：对象的最顶部到对象在当前窗口显示的范围内的顶边的距离，即在出现了纵向滚动条的情况下，滚动条拉动的距离
scrollLeft：对象的最左边到对象在当前窗口显示的范围内的左边的距离，即在出现了横向滚动条的情况下，滚动条拉动的距离
```

## 鼠标事件

##### 示例

![鼠标事件](https://s2.loli.net/2023/05/18/q9pIaRXBycwd8zb.png)

##### onclick 鼠标点击事件

```javascript
box.onclick = function(e){
     console.log(e)
}
```

##### onmousedown 鼠标按下事件

```javascript
box.onmousedown = function(e){
     console.log(e)
}
```

##### onmouseup 鼠标松开事件

```javascript
box.onmouseup = function(e){
     console.log(e)
}
```

##### onmousemove 鼠标移动事件

```javascript
box.onmousemove = function(e){
     console.log(e)
}
```

##### onmouseover 鼠标经过事件

```javascript
box.onmouseover = function(e){
     console.log(e)
}
```

##### onmouseout 鼠标划出事件

```javascript
box.onmouseout = function(e){
     console.log(e)
}
```

##### 一、clientX、clientY

> 点击位置距离当前body可视区域的x，y坐标

##### 二、pageX、pageY
> 对于整个页面来说，包括了被卷去的body部分的长度

##### 三、screenX、screenY
> 点击位置距离当前电脑屏幕的x，y坐标

##### 四、offsetX、offsetY
> 相对于带有定位的父盒子的x，y坐标

##### 五、x、y
> 和screenX、screenY一样
