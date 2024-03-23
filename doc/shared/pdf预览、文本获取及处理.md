## PDF预览、文本获取及处理



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

![](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221623089.png)

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

![](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221623944.png)

---

##### 数据提取及处理

需处理的文件：
![](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221624028.png)
![](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221624650.png)
![](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221624786.png)
![](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221624798.png)
![](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221624490.png)
处理方法：

```js
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import { PdfTmplListModalComponent } from '../components/pdf/pdf-tmpl-list-modal/pdf-tmpl-list-modal.component';
import { CommonService } from './common.service';

export interface PdfOption {
  title?: string,
  privige?: {

  },
  type: 'PDF';
  pdfTmplList?: {
    desction: string;
    fileCount: number;
    fileList: string[];
    function: string,
    id: number;
    name: string;
    isUsed: boolean;
    [key: string]: any;
  }[],
  reflesh?: boolean
}

// pdf服务

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  sectionSplitTag = '<section>'; // 区域分割标识
  contentSectionsplitTag = '<content>'; // 内容分块分隔表示
  contentSplitTag = '|'; // 内容分割标识
  pageSplitTag = '<page>'; // 页面分割标识

  constructor(
    private nzModalService: NzModalService,
    private http: HttpClient,
    private injector: Injector
  ) { }

  /** 获取模板数据 */
  getPdf() {
    return new Promise((resolve, reject) => {
      this.http.get(`assets/pdf/pdf.json?t=${Date.now()}`).subscribe((res: object) => {
        resolve(res);
      });
    });
  }

  /** 导入列表 */
  getPdfImportList(params: object) {
    return this.injector.get(CommonService).httpGet({ url: '/PdfImport/getPdfImportList', params });
  }

  /** 添加PDF数据 */
  addPdfImport(fd: FormData) {
    return this.injector.get(CommonService).httpPost({ url: '/PdfImport/addPdfImport', fd });
  }

  /** 编辑PDF导入数据 */
  editPdfImportList(fd: FormData) {
    return this.injector.get(CommonService).httpPost({ url: '/PdfImport/editPdfImportList', fd });
  }

  /** 上传文件 */
  uploadFiles(fd: FormData) {
    return this.injector.get(CommonService).httpPost({ url: '/base/uploadFiles', fd });
  }

  /** pdf模态框 */
  pdfModal(obj?: PdfOption) {
    const modal = this.nzModalService.create({
      nzContent: PdfTmplListModalComponent,
      nzComponentParams:
      {
        obj,
        type: obj ? obj.type : 'PDF'
      },
      nzWidth: '1600px',
      nzFooter: null,
      nzCentered: true,
      nzMaskClosable: false,
      nzClosable: false
    });
    return modal;
  }

  /** 获取pdf文本信息 */
  getText(obj: {
    pdfUrl: string,
    sectionList?: string[], // 区域标识文字
  }) {
    // 必须设定work工作区，否则会报错
    GlobalWorkerOptions.workerSrc = 'https://cdn.bootcdn.net/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';
    var loadingTask = getDocument(obj.pdfUrl);
    return loadingTask.promise.then((pdf) => {
      const pageNum = pdf._pdfInfo.numPages;
      const countPromises = [];
      for (let index = 1; index <= pageNum; index++) {
        countPromises.push(pdf.getPage(index).then((res) => {
          const data = res.getTextContent();
          return data.then((text) => {
            // console.log(text);
            const reg = /(^\s+)|(\s+$)|\s+/g;
            return text.items
              .filter((item: any) => item.str !== '')
              .map((item: any) => {
                const str = item.str;
                if ((obj.sectionList || []).some((i) => i.startsWith(str))) { // 区域标识
                  return `${this.sectionSplitTag}${str}[${item.transform[4]},${item.transform[5]},${item.width}]${this.contentSectionsplitTag}`;
                } else { // 内容标识
                  if (str.trim() !== '') { // 内容不为空添加标识
                    return `${str}[${item.transform[4]},${item.transform[5]},${item.width}]${this.contentSplitTag}`;
                  } else {
                    return str;
                  }
                }
              }).join('');
          });
        }));
      }
      return Promise.all(countPromises).then((res) => {
        return res.join(this.pageSplitTag); // 页面分割标识
      });
    }).catch((error) => {
      // 解析失败
      throw new Error(error);
    });
  }

  /** 删除前后分隔符 */
  delLRSplit(obj: { str: string }) {
    if (obj.str.startsWith(this.contentSplitTag)) {
      obj.str = obj.str.substring(1, obj.str.length);
    }
    if (obj.str.endsWith(this.contentSplitTag)) {
      obj.str = obj.str.substring(0, obj.str.length - 1);
    }
    return obj.str;
  }

  /** 删除所有分隔符 */
  delAllSplit(obj: { str: string }) {
    if (this.sectionSplitTag) {
      obj.str = obj.str.replaceAll(this.sectionSplitTag, this.contentSplitTag);
    }
    if (this.contentSectionsplitTag) {
      obj.str = obj.str.replaceAll(this.contentSectionsplitTag, this.contentSplitTag);
    }
    if (this.pageSplitTag) {
      obj.str = obj.str.replaceAll(this.pageSplitTag, this.contentSplitTag);
    }
    return obj.str;
  }

  /** 清除坐标 */
  clearPosition(obj: { str: string }) {
    return obj.str.replaceAll(/\[.*?\]/g, '');
  }

  /** 格式化回数组坐标 */
  positionReset(obj: { str: string }) {
    obj.str = this.delAllSplit({ str: obj.str });
    let list = this.delLRSplit({ str: obj.str })
      .split(this.contentSplitTag)
      .filter((item) => item !== '')
      .map((item, i) => {
        let width = 0;
        let p = item.match(/\[.*?\]/g);
        let position = [-1, -1];
        if (p) {
          position = JSON.parse(p[0]);
          width = JSON.parse(p[0]) && JSON.parse(p[0]).length > 2 ? JSON.parse(p[0])[2] : 0;
        }
        const index = item.indexOf('[');
        if (index > -1) {
          obj.str = item.substring(0, index);
        }
        return {
          str: obj.str,
          position,
          width
        }
      });
    return list;
  }

  /** 清除页头 */
  clearPageHeader(obj: { str: string, reg: RegExp | string, replaceText?: string }) {
    obj.str = obj.str.replaceAll(obj.reg, obj.replaceText || '');
    return obj.str;
  }

  /** 清除页脚 */
  clearPageFooter(obj: { str: string, reg: RegExp | string, replaceText?: string }) {
    obj.str = obj.str.replaceAll(obj.reg, obj.replaceText || '');
    return obj.str;
  }

  /** 坐标重排(降序) */
  // positionSort(obj: { str: string }) {
  //   // 清除所有标记
  //   obj.str = obj.str.replaceAll(this.sectionSplitTag, this.contentSplitTag);
  //   obj.str = obj.str.replaceAll(this.contentSectionsplitTag, this.contentSplitTag);
  //   let list = this.positionReset({ str: obj.str });
  //   // console.log(JSON.parse(JSON.stringify(list
  //   //   .sort((a, b) => {
  //   //     return b.position[1] - a.position[1];
  //   //   }))));
  //   list = list.sort((a, b) => {
  //     return b.position[1] - a.position[1];
  //   })
  //     .sort((a, b) => {
  //       return a.position[0] - b.position[0];
  //     })
  //   return obj.str;
  // }

  /** 根据坐标范围查找具体数据 */
  findInPosition(obj: { str: string, xStartPosition: number, xEndPosition: number, yStartPosition: number, yEndPosition: number }) {
    let list = this.positionReset({ str: obj.str });
    list = list.filter((item) =>
      item.position[0] >= obj.xStartPosition
      && item.position[0] <= obj.xEndPosition
      && item.position[1] >= obj.yStartPosition
      && item.position[1] <= obj.yEndPosition);
    return list;
  }

  /** 返回数组(有序、无序列表和表格处理同一单元格多行信息)。行坐标相邻节点合并，以第一个相邻的列数为准，xSiblingDiff：相邻差值，默认为5 */
  xSiblingHandle(obj: { str: string, xSiblingDiff?: number }) {
    // 抽取位置并计算合并
    let list = this.positionReset({ str: obj.str });
    const result = [];
    list.forEach((item, index) => {
      if (index === 0) {
        result.push(item);
      } else {
        // 相邻数组长度大于2才需要分开，否则会被拼接在一起
        if (list.length > 2 && Math.abs(list[index].position[0] - result[result.length - 1].position[0]) < (obj.xSiblingDiff && obj.xSiblingDiff > 0 ? obj.xSiblingDiff : 5)) {
          result[result.length - 1].str = result[result.length - 1].str + list[index].str;
        } else {
          result.push(item);
        }
      }
    });
    return result.map((item) => {
      return {
        ...item,
        str: item.str.trim()
      }
    });
  }

  /** 有序表格数据处理（属性在表头）ySiblingDiff：垂直差值，默认为5 */
  olTableHandle(obj: { str: string, col: number, xSiblingDiff?: number, ySiblingDiff?: number }) {
    const result = this.xSiblingHandle({ str: obj.str, xSiblingDiff: obj.xSiblingDiff });
    const list = [];
    // 初始化表格数据
    let row = 0;
    let position = 0;
    result.forEach((item, index) => {
      if (index >= obj.col) {
        if (index === obj.col) {
          position = item.position[1];
          row = 1;
        }
        if (item.position[1] !== -1 && Math.abs(item.position[1] - position) > (obj.ySiblingDiff && obj.ySiblingDiff > 0 ? obj.ySiblingDiff : 5)) {
          position = item.position[1];
          row += 1;
        }
      } else {
        list[row] = list[row] ? list[row] : [];
        list[row].push(item);
      }
    });
    // 组装表格数据
    for (let index = 1; index <= row; index++) {
      list[0].forEach((item: any) => {
        list[index] = list[index] ? list[index] : [];
        list[index].push({
          str: '',
          position: [-1, -1],
          width: 0
        });
      })
    }
    row = 0;
    result.forEach((item, index) => {
      if (index >= obj.col) {
        if (index === obj.col) {
          position = item.position[1];
          row = 1;
        }
        if (item.position[1] !== -1 && Math.abs(item.position[1] - position) > (obj.ySiblingDiff && obj.ySiblingDiff > 0 ? obj.ySiblingDiff : 5)) {
          position = item.position[1];
          row += 1;
        }
        // 初始算法
        // const i = list[0].findIndex((item2) => Math.abs(item2.position[0] - item.position[0]) < (obj.ySiblingDiff && obj.ySiblingDiff > 0 ? obj.ySiblingDiff : 5));
        // if (i > -1) {
        //   list[row][i] = item;
        // }
        // 算法升级，取区间内的数据进行拼接，不适用于表头属性文字居中或表头分组，因为区间范围无法计算
        const spaceList = list[0].map((item2) => item2.position[0]);
        spaceList.forEach((item2, index2) => {
          if (index2 !== (spaceList.length - 1) && spaceList[index2] <= item.position[0] && spaceList[index2 + 1] > item.position[0] || index2 === (spaceList.length - 1) && spaceList[index2] <= item.position[0]) {
            list[row][index2] = {
              ...item,
              str: list[row][index2].str + item.str
            };
          }
        })
        // 算法升级2，根据区间交集判断数据是否处于同一个单元格，不适用于表头属性文字居中或表头分组，除非表头属性与内容对齐方式一致，否则区间范围无法计算
        // const spaceList1 = [item.position[0], item.position[0] + item.position[2]];
        // const spaceList2 = list[0].map((item2) => [item2.position[0], item2.position[0] + item2.position[2]]);
        // console.log(spaceList1, spaceList2);
        // spaceList2.forEach((item2, index2) => {
        //   let start = [Math.min(...spaceList1), Math.min(...item2)]; //区间的两个最小值
        //   let end = [Math.max(...spaceList1), Math.max(...item2)]; //区间的两个最大值
        //   if (Math.max(...start) <= Math.min(...end)) {
        //     list[row][index2] = {
        //       ...item,
        //       str: list[row][index2].str + item.str
        //     };
        //   }
        // })
      }
    });
    return list.map((item) => {
      return item.map((item2) => {
        return item2.str;
      })
    });
  }

  /** 无序表格数据处理（属性在左侧） */
  ulTableHandle(obj: { str: string }) {
    const list = [];
    let row = -1;
    obj.str.split(this.contentSplitTag).forEach((item, index) => {
      if (index % 2 === 0 && item.trim()) {
        row += 1;
        list[row] = list[row] ? list[row] : [];
      }
      if (index % 2 === 0 && item.trim() || index % 2 === 1 && list[row].length > 0) {
        list[row].push(this.clearPosition({ str: item }).trim());
      }
    })
    return list;
  }

  /** 有序列表数据处理 */
  olListHandle(obj: { str: string, keyList: string[] }) {
    const list = [];
    let row = -1;
    obj.str.split(this.contentSplitTag).forEach((item, index) => {
      if (index % obj.keyList.length === 0) {
        row += 1;
      }
      list[row] = list[row] ? list[row] : [];
      list[row].push(this.clearPosition({ str: item }).trim());
    })
    return list;
  }

  /** oncekeyList 只寻找首次出现的section作为标题 */
  sectionHandle(obj: { list: string[], oncekeyList: string[] }) {
    obj.oncekeyList.forEach((item) => {
      const arr = obj.list.filter((item2) => item2.startsWith(item));
      if (arr.length > 1) {
        arr.shift();
        arr.forEach((item2) => {
          const index3 = obj.list.findIndex((item3) => item3 === item2);
          if (index3 > -1) {
            obj.list[index3] = obj.list[index3].replace(this.contentSectionsplitTag, this.contentSplitTag); // 处理非section后面第一个分割符
            obj.list[index3 - 1] = obj.list[index3 - 1] + obj.list[index3];
            obj.list.splice(index3, 1);
          }
        });
      }
    });
    return obj.list;
  }
}
```

---

##### 最终数据处理
```js
import { Injectable, Injector } from '@angular/core';
import moment from 'moment';
import { PdfService } from 'src/app/shared/services/pdf.service';

@Injectable({
  providedIn: 'root'
})
export class HmService {

  orderNoCollectList = [];
  productNoCollectList = [];
  productName = ''; // 产品名称
  seasonCollectList = []; // 采购单季节
  optionCollectList = []; // 信息表的option分组
  noOfPieces = ''; // 每卡支数
  miscellaneousStr = ''; // 包材信息
  compositionCollectList = []; // 信息表的成分
  colorNameCollectList = []; // 颜色名称信息
  invoiceAveragePriceCollectList = []; // 平均单价、走货方式
  termsDeliveryCollectList = []; // 走货方式详情
  colorCollectList = []; // 三维表对应的颜色组
  colorTableCollectList = []; // 三维表（颜色、走货方式、数量）
  timeDeliveryCollectList = [];
  sizePerColourBreakdownResultList = []; // SizePerColourBreakdown的结果集（Article No、H&M Colour Code、Option No、Quantity）

  constructor(
    private injector: Injector
  ) { }

  get pdfService() {
    return this.injector.get(PdfService);
  }

  /** Supplementary Product Information.PDF */
  handle1(res: string) {
    res = this.pdfService.clearPageHeader({ str: res, reg: /HLW\s\S+-\S+\s\S+\s\S+\s-\s\d+-\d+.*?\]\|{0,1}/g });
    res = this.pdfService.clearPageFooter({ str: res, reg: /(Created).*?(?=Page)/g });
    res = this.pdfService.clearPageFooter({ str: res, reg: /(Page).*?\]\|{0,1}/g });

    res = res.split(this.pdfService.pageSplitTag).join(this.pdfService.contentSplitTag);

    // Order NO
    const orderNoResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 220,
      xEndPosition: 230,
      yStartPosition: 530,
      yEndPosition: 540,
    });
    const orderNoValue = orderNoResultList.length > 0 ? orderNoResultList[0].str.trim() : '';
    this.orderNoCollectList.push(orderNoValue);
    console.log(orderNoValue);

    // Product No
    const productNoResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 625,
      xEndPosition: 635,
      yStartPosition: 535,
      yEndPosition: 545,
    });
    const productNoValue = productNoResultList.length > 0 ? productNoResultList[0].str.trim() : '';
    this.productNoCollectList.push(productNoValue);
    console.log(productNoValue);

    // Product Name
    const productNameResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 625,
      xEndPosition: 635,
      yStartPosition: 520,
      yEndPosition: 530,
    });
    const productNameValue = productNameResultList.length > 0 ? productNameResultList[0].str.trim() : '';
    console.log(productNameValue);
    this.productName = productNameValue;

    // Option
    const optionResultList = (res.match(new RegExp('(?<=Option:)((?!Remarks).)*', 'g')) || [])
      .map((item) => {
        return this.pdfService.clearPosition({ str: item.replaceAll(this.pdfService.contentSplitTag, '') }).trim();
      });
    console.log(optionResultList);
    this.optionCollectList = optionResultList;

    // Composition
    const compositionList = (res.match(new RegExp('(?<=Bill of Material: Materials and Trims)((?!Bill of Material: Production Units and Processing Capabilities).)*', 'g')) || [])
      .map((item) => {
        const tableList = this.pdfService.olTableHandle({ str: item, col: 13 });
        if (tableList.length > 0) {
          const i = tableList[0].findIndex((item2) => item2.indexOf('Composition') > -1);
          tableList.shift();
          return i > -1 ? tableList.map((item2) => item2[i]) : [];
        } else {
          return [];
        }
      });
    console.log(compositionList);
    this.compositionCollectList = compositionList;

    // Colour Name
    const colorNameTableRegList = (res.match(new RegExp(`((?<=Development Appearance).*(?=Option:))|((?<=Development Appearance).*(?=Miscellaneous))`, 'g')) || []).map((item) => {
      let list = item.split(this.pdfService.contentSplitTag);
      list.splice(0, 1);
      return this.pdfService.delLRSplit({ str: list.join(this.pdfService.contentSplitTag) });
    });
    let colorNameList = [];
    colorNameTableRegList.forEach((item) => {
      let list = this.pdfService.olTableHandle({ str: item, col: 11 });
      list.splice(0, 1);
      colorNameList = colorNameList.concat(list);
    });
    console.log(colorNameList);
    this.colorNameCollectList = colorNameList;

    // Miscellaneous
    const miscellaneousRegList = (res.match(new RegExp('(?<=Labels.*?\]).*', 'g')) || []);
    const miscellaneousList = miscellaneousRegList.length > 0 ? this.pdfService.olTableHandle({ str: miscellaneousRegList[0], col: 6 }) : [];
    miscellaneousList.length > 0 && miscellaneousList.shift();
    const miscellaneous = miscellaneousList.map((item) => {
      return item[0];
    }).join(',');
    console.log(miscellaneous);
    this.miscellaneousStr = miscellaneous;
  }

  /** PurchaseOrder.PDF */
  handle2(res: string) {
    // Order NO
    let orderNoValue = '';
    const orderNoResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 95,
      xEndPosition: 105,
      yStartPosition: 755,
      yEndPosition: 765,
    });
    if ([...new Set(orderNoResultList.map((item) => item.str))].length !== 1) {
      throw new Error('Order NO不一致');
      return;
    } else {
      orderNoValue = orderNoResultList.length > 0 ? orderNoResultList[0].str : '';
    }
    this.orderNoCollectList.push(orderNoValue);
    console.log(orderNoValue);

    // Product No
    let productNoValue = '';
    const productNoResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 335,
      xEndPosition: 345,
      yStartPosition: 755,
      yEndPosition: 765,
    });
    if ([...new Set(productNoResultList.map((item) => item.str))].length !== 1) {
      throw new Error('Product No不一致');
      return;
    } else {
      productNoValue = productNoResultList.length > 0 ? productNoResultList[0].str : '';
    }
    this.productNoCollectList.push(productNoValue);
    console.log(productNoValue);

    // Season
    const seasonResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 335,
      xEndPosition: 345,
      yStartPosition: 715,
      yEndPosition: 725,
    }).map((item) => (item.str));
    console.log(seasonResultList);
    this.seasonCollectList = seasonResultList;

    // No of Pieces
    const noOfPiecesResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 335,
      xEndPosition: 345,
      yStartPosition: 640,
      yEndPosition: 650,
    }).map((item) => (item.str.trim()));
    console.log(noOfPiecesResultList);
    this.noOfPieces = noOfPiecesResultList.length > 0 ? noOfPiecesResultList[0] : '';

    // Terms of Delivery
    const termsDeliveryResultList = (res.match(new RegExp('(?<=Terms of Delivery)((?!Country of Production).)*', 'g')) || [])
      .map((item) => {
        return this.pdfService.delLRSplit({ str: this.pdfService.clearPosition({ str: item }) }).split(this.pdfService.contentSplitTag);
      });
    console.log(termsDeliveryResultList);
    this.termsDeliveryCollectList = termsDeliveryResultList.length > 0 ? termsDeliveryResultList[0] : [];

    // Time of Delivery
    let timeDeliveryResultList = [];
    const timeDeliveryRegList = (res.match(new RegExp('Time of Delivery((?!Terms of Delivery).)*', 'g')) || []);
    if (timeDeliveryRegList.length > 0) {
      timeDeliveryResultList = this.pdfService.olTableHandle({ str: timeDeliveryRegList[0], col: 4 });
      timeDeliveryResultList.pop();
    }
    this.timeDeliveryCollectList = timeDeliveryResultList;
    console.log(timeDeliveryResultList);

    // Invoice Average Price
    const invoiceAveragePriceResultList = (res.match(new RegExp('Invoice Average Price((?!By accepting and performing under this Order).)*', 'g')) || [])
      .map((item) => {
        return this.pdfService.olTableHandle({ str: item, col: 2 });
      });
    console.log(invoiceAveragePriceResultList);
    this.invoiceAveragePriceCollectList = invoiceAveragePriceResultList;
  }

  /** SizePerColourBreakdown.PDF */
  handle3(res: string) {
    res = this.pdfService.clearPageHeader({ str: res, reg: /(Page).*?(?=Created)/g, replaceText: this.pdfService.sectionSplitTag });
    res = this.pdfService.clearPageFooter({ str: res, reg: /(Created).*?(?=Telephone)/g, replaceText: this.pdfService.sectionSplitTag });

    // Order NO
    let orderNoValue = '';
    const orderNoResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 95,
      xEndPosition: 105,
      yStartPosition: 760,
      yEndPosition: 770,
    });
    if ([...new Set(orderNoResultList.map((item) => item.str))].length !== 1) {
      throw new Error('Order NO不一致');
      return;
    } else {
      orderNoValue = orderNoResultList.length > 0 ? orderNoResultList[0].str : '';
    }
    this.orderNoCollectList.push(orderNoValue);
    console.log(orderNoValue);

    // Product No
    let productNoValue = '';
    const productNoResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 320,
      xEndPosition: 330,
      yStartPosition: 760,
      yEndPosition: 770,
    });
    if ([...new Set(productNoResultList.map((item) => item.str))].length !== 1) {
      throw new Error('Product No不一致');
      return;
    } else {
      productNoValue = productNoResultList.length > 0 ? productNoResultList[0].str : '';
    }
    this.productNoCollectList.push(productNoValue);
    console.log(productNoValue);

    // Colour / Country Breakdown
    const colorCountryBreakdownRegList = res.match(/^((?!Colour \/ Country Breakdown).)*/g) || [];
    const colorCountryBreakRegStr = colorCountryBreakdownRegList.length > 0 ? colorCountryBreakdownRegList[0] : '';
    const colorTableRegList = colorCountryBreakRegStr.match(/(?=Article:).*(?=Total)/g) || [];
    const colorTableRegStr = colorTableRegList.length > 0 ? colorTableRegList[0] : '';
    const colorRegList = colorTableRegStr.match(/(?<=Article:)(.*?\|)(.*?(?=\|))/g) || [];
    const colorList = colorRegList.map((item) => {
      return this.pdfService.clearPosition({ str: item })
        .split(this.pdfService.contentSplitTag)
        .map((item2) => item2.trim());
    });
    console.log(colorList)
    this.colorCollectList = colorList;
    // 表格内容数据
    const colorRegList2 = colorTableRegStr.match(/Article:(.*?\|)(.*?\|)/g) || [];
    let tableStr = colorTableRegStr;
    colorRegList2.forEach((item) => {
      tableStr = tableStr.replace(item, '');
    });
    const tableList = this.pdfService.olTableHandle({ str: this.pdfService.delLRSplit({ str: tableStr }), col: 3 + colorList.length });
    console.log(tableList);
    this.colorTableCollectList = tableList;
  }

  /** TotalCountryBreakdown.PDF */
  handle4(res: string) {
    res = this.pdfService.clearPageHeader({ str: res, reg: /(Page).*?(?=Created)/g, replaceText: this.pdfService.sectionSplitTag });
    res = this.pdfService.clearPageFooter({ str: res, reg: /(Created).*?(?=Telephone)/g, replaceText: this.pdfService.sectionSplitTag });

    const pageList = res.split(this.pdfService.pageSplitTag);

    // Order NO
    let orderNoValue = '';
    const orderNoResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 95,
      xEndPosition: 105,
      yStartPosition: 760,
      yEndPosition: 770,
    });
    if ([...new Set(orderNoResultList.map((item) => item.str))].length !== 1) {
      throw new Error('Order NO不一致');
      return;
    } else {
      orderNoValue = orderNoResultList.length > 0 ? orderNoResultList[0].str : '';
    }
    this.orderNoCollectList.push(orderNoValue);
    console.log(orderNoValue);

    // Product No
    let productNoValue = '';
    const productNoResultList = this.pdfService.findInPosition({
      str: res,
      xStartPosition: 320,
      xEndPosition: 330,
      yStartPosition: 760,
      yEndPosition: 770,
    });
    if ([...new Set(productNoResultList.map((item) => item.str))].length !== 1) {
      throw new Error('Product No不一致');
      return;
    } else {
      productNoValue = productNoResultList.length > 0 ? productNoResultList[0].str : '';
    }
    this.productNoCollectList.push(productNoValue);
    console.log(productNoValue);


    const countryReg = `(?<=\\* Sizes in brackets indicate general European sizes.*?\\${this.pdfService.contentSplitTag}).*(?=\\${this.pdfService.contentSplitTag}Size / Colour breakdown)`;
    const articleNoReg = `(?<=Article No.*?\\${this.pdfService.contentSplitTag}).*(?=\\${this.pdfService.contentSplitTag}H&M Colour Code)`;
    const HMColourCodeReg = `(?<=H&M Colour Code.*?\\${this.pdfService.contentSplitTag}).*(?=\\${this.pdfService.contentSplitTag}Colour Name)`;
    const optionNoReg = `(?<=Option No.*?\\${this.pdfService.contentSplitTag}).*(?=\\${this.pdfService.contentSplitTag}\\* Sizes in brackets indicate general European sizes)`;
    const quantityReg = `(?<=Quantity.*?\\${this.pdfService.contentSplitTag}).*(?=\\${this.pdfService.contentSplitTag}No of Asst)`;
    const resultList = [];
    pageList.forEach((item) => {
      const country = item.match(new RegExp(countryReg)) && item.match(new RegExp(countryReg))[0] || '';
      const articleNo = item.match(new RegExp(articleNoReg)) && item.match(new RegExp(articleNoReg))[0] || '';
      const HMColourCode = item.match(new RegExp(HMColourCodeReg)) && item.match(new RegExp(HMColourCodeReg))[0] || '';
      const optionNo = item.match(new RegExp(optionNoReg)) && item.match(new RegExp(optionNoReg))[0] || '';
      const quantity = item.match(new RegExp(quantityReg)) && item.match(new RegExp(quantityReg))[0] || '';
      const list = [];
      if (country) {
        list.push(this.pdfService.clearPosition({ str: country }));
      }
      if (articleNo) {
        list.push(
          this.pdfService.clearPosition({ str: articleNo })
            .split(this.pdfService.contentSplitTag)
            .map((item2) => (item2.trim()))
        );
      } else {
        list.push([])
      }
      if (HMColourCode) {
        list.push(
          this.pdfService.clearPosition({ str: HMColourCode })
            .split(this.pdfService.contentSplitTag)
            .map((item2) => (item2.trim()))
        );
      } else {
        list.push([])
      }
      if (optionNo) {
        list.push(
          this.pdfService.clearPosition({ str: optionNo })
            .split(this.pdfService.contentSplitTag)
            .map((item2) => (item2.trim()))
        );
      } else {
        list.push([])
      }
      if (quantity) {
        list.push(
          this.pdfService.clearPosition({ str: quantity })
            .split(this.pdfService.contentSplitTag)
            .map((item2) => (item2.trim()))
        );
      } else {
        list.push([])
      }
      resultList.push(list);
    });
    this.sizePerColourBreakdownResultList = resultList;
    console.log(resultList);
  }

  mergeHandle(obj: {
    pdfUrl1: string,
    sectionList1?: string[],
    pdfUrl2: string,
    sectionList2?: string[],
    pdfUrl3: string,
    sectionList3?: string[],
    pdfUrl4: string,
    sectionList4?: string[]
  }) {
    return Promise.all([
      // this.pdfService.getText({ pdfUrl: 'http://localhost:4200/assets/pdf/hm/Supplementary Product Information.pdf', sectionList: obj.sectionList1 }),
      // this.pdfService.getText({ pdfUrl: 'http://localhost:4200/assets/pdf/hm/PurchaseOrder.PDF', sectionList: obj.sectionList2 }),
      // this.pdfService.getText({ pdfUrl: 'http://localhost:4200/assets/pdf/hm/TotalCountryBreakdown.PDF', sectionList: obj.sectionList3 }),
      // this.pdfService.getText({ pdfUrl: 'http://localhost:4200/assets/pdf/hm/SizePerColourBreakdown.PDF', sectionList: obj.sectionList4 })
      this.pdfService.getText({ pdfUrl: obj.pdfUrl1, sectionList: obj.sectionList1 }),
      this.pdfService.getText({ pdfUrl: obj.pdfUrl2, sectionList: obj.sectionList2 }),
      this.pdfService.getText({ pdfUrl: obj.pdfUrl3, sectionList: obj.sectionList3 }),
      this.pdfService.getText({ pdfUrl: obj.pdfUrl4, sectionList: obj.sectionList4 })
    ]).then((res) => {
      // 数据处理及校验
      res.forEach((item, index) => {
        switch (index + 1) {
          case 1: this.handle1(item); break;
          case 2: this.handle2(item); break;
          case 3: this.handle3(item); break;
          case 4: this.handle4(item); break;
        }
        console.log('----------------------------');
      })

      let orderNo = '';
      let productNo = '';
      let orderNoList = [...new Set(this.orderNoCollectList)];
      let productNoList = [...new Set(this.productNoCollectList)];
      if (orderNoList.length !== 1) {
        throw new Error('Order No不一致');
      }
      orderNo = orderNoList[0];
      if (productNoList.length !== 1) {
        throw new Error('Product No不一致');
      }
      productNo = productNoList[0];

      console.log('数据组装------------------');
      const colorList = this.colorCollectList.map((item) => {
        return {
          colorNo: item.length > 1 ? item[1] : ''
        }
      })
      let resultList = [];
      this.sizePerColourBreakdownResultList.forEach((item1, index1) => {
        if (item1[0]) {
          item1[1].forEach((item2, index2) => {
            const planningMarkets = item1[0].match(/(?<=\s{1})\S+\s{1}\(\S+\)/g) ? item1[0].match(/(?<=\s{1})\S+\s{1}\(\S+\)/g)[0] : ''
            // 颜色名称匹配
            const colorNameIndex = this.colorNameCollectList.findIndex((item3) => item3.length > 3 && item3[1] === item1[2][index2]);

            // 数量匹配
            const country = planningMarkets.match(/(?<=\().*(?=\))/g) ? planningMarkets.match(/(?<=\().*(?=\))/g)[0] : '';
            const countryIndex = this.colorTableCollectList.map((item3) => (item3[1])).findIndex((item3) => item3.indexOf(country) > -1);
            const colorIndex = colorList.findIndex((item3) => item3.colorNo === item1[2][index2]);

            // 走货方式详情
            const countryShort = planningMarkets.match(/.+(?=\s\()/g) ? planningMarkets.match(/.+(?=\s\()/g)[0] : '';
            const trimsOfDelivery = this.termsDeliveryCollectList.filter((item3, index3) => index3 % 2 === 0).join(',');

            resultList.push({
              SoId: '',
              MatId: '',
              orderNo, // 客户订单号
              productNo, // 客户产品编号
              productName: this.productName, // 产品名称
              season: '', // 季节
              colorNo: item1[2][index2], // 颜色编号
              colorName: colorNameIndex > -1 ? this.colorNameCollectList[colorNameIndex][2] : '', // 颜色名称
              optionNo: item1[3][index2], // 分组号
              composition: '', // 成分
              price: '', // 单价
              costType: '', // 币种
              invoiceAveragePrice: '', // 平均单价
              timeDelivery: '', // 交期
              planningMarkets: planningMarkets ? planningMarkets.replace(/\s+\(.*?\)/g, '') : '', // 走货国家
              noOfPieces: this.noOfPieces, // 每卡支数
              termsOfDelivery: trimsOfDelivery.indexOf(countryShort) > -1 ? this.termsDeliveryCollectList.join(' ') : '', // 走货方式
              qty: countryIndex > -1 && colorIndex > -1 ? this.colorTableCollectList[countryIndex][3 + colorIndex] : '', // 走货数量
              quantity: item1[4][index2], // 入袋数
              labelCode: this.miscellaneousStr // 包材信息
            });
          });
        }
      })

      this.timeDeliveryCollectList.shift();
      resultList = resultList.map((item) => {
        // 获取分组索引
        const i = this.optionCollectList.findIndex((item2) => item2.startsWith(item.optionNo));
        let season = '';
        let composition = '';
        let price = '';
        let costType = '';
        let invoiceAveragePrice = this.invoiceAveragePriceCollectList.length > 0 && this.invoiceAveragePriceCollectList[0].length > 0 && this.invoiceAveragePriceCollectList[0][1].length > 0 ? this.invoiceAveragePriceCollectList[0][1][0] : '';
        let timeDelivery = '';
        if (i > -1 && this.seasonCollectList.length >= i) {
          season = this.seasonCollectList[i] || '';
        }
        if (i > -1 && this.compositionCollectList.length >= i) {
          composition = this.compositionCollectList[i].length > 0 ? this.compositionCollectList[i][0] : ''
        }
        if (invoiceAveragePrice) {
          price = invoiceAveragePrice.match(/.+(?=\s)/g) ? invoiceAveragePrice.match(/.+(?=\s)/g)[0] : '';
          costType = invoiceAveragePrice.match(/(?<=\s).*/g) ? invoiceAveragePrice.match(/(?<=\s).*/g)[0] : '';
        }
        return {
          ...item,
          season,
          composition,
          price,
          costType,
          invoiceAveragePrice,
          timeDelivery
        }
      }).map((item) => {
        const i = this.timeDeliveryCollectList.map((item2) => (item2[1])).findIndex((item2) => item.planningMarkets.match(/(?<=\().*(?=\))/g) ? item2.indexOf(item.planningMarkets.match(/(?<=\().*(?=\))/g)[0]) > -1 : false);
        item.timeDelivery = i > -1 ? this.timeDeliveryCollectList[i][0] : '';
        return {
          ...item,
          timeDelivery: moment(new Date(item.timeDelivery)).subtract('3', 'days').format('YYYY/MM/DD')
        };
      });
      console.log(resultList);
      return Promise.resolve(resultList);
    }).catch((error) => {
      // 上传失败
      // throw new Error(error);
      console.log(error);
    });
  }
}
```