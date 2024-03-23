## HTML转PDF

参考：https://www.jb51.net/javascript/296466dco.htm

##### cdn

下载：jspdf、html2canvas

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./jspdf.umd.min.js"></script>
  <script src="./html2canvas.min.js"></script>
</head>

<body>
  <div id="test">
    hello world
  </div>
</body>

</html>

<script>
  const pdf = jspdf.jsPDF();
  pdf.setProperties({
    title: '',
    subject: '',
    author: '',
    keywords: ''
  });
  html2canvas(document.querySelector('#test')).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('aaa.pdf');
  });
</script>
```

##### ES6

安装：jspdf、html2canvas

```bash
npm install --save jspdf
npm install --save html2canvas
```

```typescript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const pdf = new jsPDF();
pdf.setProperties({
  title: '',
  subject: '',
  author: '',
  keywords: ''
});
html2canvas(document.querySelector('#test')).then(canvas => {
  const imgData = canvas.toDataURL('image/png');
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('aaa.pdf');
});
```

