### css文件转行内样式（打印机使用）

---

https://github.com/jonkemp/inline-css

```js
var inlineCss = require('inline-css');
var html = ``;
inlineCss(html,{url:'/'}).then(function(html) { console.log(html); });
```

##### 