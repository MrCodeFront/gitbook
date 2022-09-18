# PDF预览、文本获取及处理

---

github：[GitHub - mozilla/pdf.js: PDF Reader in JavaScript](https://github.com/mozilla/pdf.js)

cdn地址：[https://cdnjs.com/libraries/pdf.js](https://cdnjs.com/libraries/pdf.js)

参考：https://qa.1r1g.com/sf/ask/2844518561/

注：pdf文件必须存放在服务器上，不能获取file://协议文件，会提示跨域。预览文件须以https开头的安全域名。

---

##### 预览

pdf文件：[Git Tutorial (gjtool.cn)](https://www.gjtool.cn/pdfh5/git.pdf)

github的pdf-viewer：[https://mozilla.github.io/pdf.js/web/viewer.html)](https://mozilla.github.io/pdf.js/web/viewer.html)

使用：

pdf路径使用 encodeURIComponent 进行编码。encodeURIComponent('https://www.gjtool.cn/pdfh5/git.pdf')

最终效果：[https://mozilla.github.io/pdf.js/web/viewer.html?file=https%3A%2F%2Fwww.gjtool.cn%2Fpdfh5%2Fgit.pdf)](https://mozilla.github.io/pdf.js/web/viewer.html?file=https%3A%2F%2Fwww.gjtool.cn%2Fpdfh5%2Fgit.pdf)

![](http://markdown.rossai.cn/data/image/2022/09/19/74827_qiqp_7228.png)

---

##### 文本获取

```js
<script src="https://cdn.bootcdn.net/ajax/libs/pdf.js/2.14.305/pdf.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/pdf.js/2.14.305/pdf.sandbox.min.js"></script>

const pdfUrl = 'https://www.gjtool.cn/pdfh5/git.pdf';

function getText(pdfUrl) {
  var loadingTask = pdfjsLib.getDocument(pdfUrl);
  return loadingTask.promise.then((pdf) => {
    // 获取页数
    const pageNum = pdf._pdfInfo.numPages;
    const countPromises = [];
    for (let index = 1; index <= pageNum; index++) {
      countPromises.push(pdf.getPage(index).then((res) => {
        // 获取文本
        const data = res.getTextContent();
        return data.then((text) => {
          return text.items.map((item, i) => { return item.str; }).join(``);
        });
      }));
    }
    console.log(countPromises);
    return Promise.all(countPromises).then((res) => {
      return res.join('');
    });
  });
}

getText(pdfUrl).then((res) => {
  console.log(res);
}, (err) => {
  console.log(err);
});
```

<img src="http://markdown.rossai.cn/data/image/2022/09/19/74984_yix3_2054.png"  />

---

##### 数据提取及处理

需处理的文件：

![](http://markdown.rossai.cn/data/image/2022/09/19/76002_seum_6730.png)
![](http://markdown.rossai.cn/data/image/2022/09/19/76002_rdeo_4025.png)
![](http://markdown.rossai.cn/data/image/2022/09/19/76002_bkh7_4771.png)
![](http://markdown.rossai.cn/data/image/2022/09/19/76002_tde2_3597.png)
![](http://markdown.rossai.cn/data/image/2022/09/19/76003_eqoo_2390.png)

处理方法：

```js
```



