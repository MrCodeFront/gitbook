### pdf文本获取

---

参考：https://qa.1r1g.com/sf/ask/2844518561/

work工作区配置：https://www.aciuz.com/tech/PDF-js-workerSrc.html

注：pdf文件必须存放在服务器上，不能获取file://协议文件，会提示跨域。

```js
<script src="https://cdn.bootcdn.net/ajax/libs/pdf.js/2.14.305/pdf.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/pdf.js/2.14.305/pdf.sandbox.min.js"></script>

const pdfUrl = 'http://192.168.1.71/files/c.pdf';

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

