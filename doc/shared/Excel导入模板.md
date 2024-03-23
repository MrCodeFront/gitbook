## Excel导入组件



针对不同模块使用不同的Excel模板导入问题进行组件重构，只需传入指定的Excel模板名称即可。



##### 组件名

excel-tmpl



##### 用法

默认返回

```
{
	isCover: boolean, // 是否覆盖
	dataList: any[]	  // 导入后的数组
}
```

使用服务方式调用

![image-20240321183841651](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/JKw7fSuQXD3cdoM.png)

![image-20240321183805090](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/SAOdnlp38HxLhzC.png)

确认导入处理

![image-20240322163917097](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221639220.png)



##### 表格配置

在 excel-tmpl\excel-tmpl-data.ts 中使用最新表格配置，需指定模板名称

![image-20240321183555260](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/XLRoNJAtP53S1Hc.png)



##### 添加各模块自定义模板

![image-20240321184906728](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221634124.png)

![image-20240321183046025](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/lKAbyRjNwDJOd5r.png)

例如当前模块需要对数据进行特殊处理等

![image-20240322163314697](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221633819.png)