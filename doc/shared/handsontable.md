## HandsonTable 表格



官网地址：https://handsontable.com/

##### what?

Handsontable (pronounced "hands-on-table") is a JavaScript data grid component that brings the well-known look and feel of spreadsheets to your application.

Thousands of business apps depend on Handsontable for entering, editing, validating, and cleansing data that comes from remote sources such as databases and APIs, or from HTML documents, Excel files, Google Sheets, and manual input.

译文：

Handontable（发音为“hands-on-table”）是一个JavaScript数据网格组件，它为您的应用程序带来了众所周知的电子表格外观。

成千上万的商业应用程序依赖Handontable来输入、编辑、验证和清理来自数据库和API等远程源或HTML文档、Excel文件、Google Sheets和手动输入的数据。

![https://handsontable.com/docs/img/pages/introduction/introduction-drawing-light-min.png](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/ON2txlkKFERbr8h.png)



##### demo

- [JavaScript demo(opens new window)](https://codesandbox.io/s/handsontable-javascript-data-grid-hello-world-app-14-0-0-smp4xx)
- [React demo(opens new window)](https://codesandbox.io/s/handsontable-react-data-grid-hello-world-app-14-0-0-xr7mj2)
- [Angular demo(opens new window)](https://codesandbox.io/s/handsontable-angular-data-grid-hello-world-app-14-0-0-c54xw9)
- [Vue 2 demo(opens new window)](https://codesandbox.io/s/handsontable-vue-data-grid-hello-world-app-14-0-0-zm9nz6)
- [TypeScript demo](https://codesandbox.io/s/handsontable-typescript-data-grid-hello-world-app-14-0-0-3f4lss)

##### 流行功能

- [Cell types](https://handsontable.com/docs/javascript-data-grid/cell-type/)
- [Formula calculations](https://handsontable.com/docs/javascript-data-grid/formula-calculation/)
- [Column filter](https://handsontable.com/docs/javascript-data-grid/column-filter/)
- [Column groups](https://handsontable.com/docs/javascript-data-grid/column-groups/)
- [Column summary](https://handsontable.com/docs/javascript-data-grid/column-summary/)
- [Row parent-child](https://handsontable.com/docs/javascript-data-grid/row-parent-child/)
- [Context menu](https://handsontable.com/docs/javascript-data-grid/context-menu/)

##### 自定义网格

- [Create a custom renderer](https://handsontable.com/docs/javascript-data-grid/cell-renderer/)
- [Create a custom editor](https://handsontable.com/docs/javascript-data-grid/cell-editor/)
- [Create a custom validator](https://handsontable.com/docs/javascript-data-grid/cell-validator/)
- [Create a custom plugin](https://handsontable.com/docs/javascript-data-grid/custom-plugins/)
- [Translate the UI](https://handsontable.com/docs/javascript-data-grid/language/)



##### 安装

```bash
npm install handsontable @handsontable/angular
```

##### 导入样式

```scss
@import '~handsontable/dist/handsontable.full.css';
```

注意：样式文件中含有大量的@charset，而@charset只能在文件头第一行声明，否则会报错。解决方法拷贝样式文件放至assets文件夹下，删除所有@charset，并在文件第一行添加@charset，使用 `<link href="./assets/css/handsontable.css" rel="stylesheet">`进行导入即可。

```html
<link href="./assets/css/handsontable.css" rel="stylesheet">
```

##### 使用

```html
<hot-table #hotTable [settings]="hotSettings"></hot-table>
<div id="hotTable" style="display: none;"></div>
```

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HotTableComponent, HotTableModule } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { zhCN } from 'handsontable/i18n';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HotTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('hotTable', { static: false })
  hotTable!: HotTableComponent;

  count = 0;

  hotSettings: Handsontable.GridSettings = {
    data: [],
    colHeaders: [],
    rowHeaders: true,
    height: 800,
    rowHeights: 50, // 行高
    colWidths: 100, // 列宽
    wordWrap: false, // 是否换行
    persistentState: true, // 保存操作状态
    manualColumnResize: true, // 是否表头修改列宽
    manualColumnMove: true,
    contextMenu: true,
    columnSorting: true, // 列排序
    licenseKey: "non-commercial-and-evaluation"
  }

  constructor(
    public http: HttpClient,
    public el: ElementRef
  ) { }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    const url = '/assets/mock/data.json'
    this.http.get(url).subscribe((res: any) => {
      if (Number(res.code) === 1) {
        const list = res.data;
        this.count = res.count || 0;
        if (list.length > 0) {
          // 需要使用new Handsontable进行初始化,再进行更新
          Handsontable.languages.registerLanguageDictionary(zhCN);
          const hotTable = this.el.nativeElement.querySelector('#hotTable');
          const plugin = new Handsontable(hotTable, this.hotSettings);
          plugin.updateSettings(this.hotSettings);
          this.hotTable.updateHotTable({
            data: list,
            colHeaders: Object.keys(list[0]),
          });
        }
        console.log(res)
      } else {
        console.log('接口异常')
      }
    }, () => {
      console.log('网络异常');
    })
  }
}

```

##### 效果

![image-20231211110946645](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/1dJvRC8uheXbLBf.png)

##### gif效果图

![加载](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/g3mEuCrokfZYpnL.gif)

![拖拽](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/OvQVL9oaGN7isSA.gif)

![改变列宽](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/BzmRrxNehgq6lA2.gif)

![菜单](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/d17NyQaCtHKpJqj.gif)