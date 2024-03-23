官网：https://www.ag-grid.com/

中文网：https://www.itxst.com/ag-grid/tutorial.html

参考：

https://blog.csdn.net/Jane_2160/article/details/128468734

https://www.mianshigee.com/project/www.ag-grid.com

[AgGrid使用经验汇总](https://blog.fishedee.com/2022/05/13/AgGrid%E4%BD%BF%E7%94%A8%E7%BB%8F%E9%AA%8C%E6%B1%87%E6%80%BB/#valueparser%E4%B8%8Evaluesetter)

问题收集：

https://www.likecs.com/ask-4156049.html

https://blog.csdn.net/WQearl/article/details/120273977（设置行高）

##### 列表头

https://www.ag-grid.com/angular-data-grid/column-headers/

```
<ag-grid-angular
    [groupHeaderHeight]="groupHeaderHeight"
    [headerHeight]="headerHeight"
    [floatingFiltersHeight]="floatingFiltersHeight"
    [pivotHeaderHeight]="pivotHeaderHeight"
    [pivotGroupHeaderHeight]="pivotGroupHeaderHeight"
    /* other grid options ... */>
</ag-grid-angular>

// Group columns
this.groupHeaderHeight = 75;

// Label columns
this.headerHeight = 150;

// Floating filter
this.floatingFiltersHeight = 50;

// Pivoting, requires turning on pivot mode. Label columns
this.pivotHeaderHeight = 100;

// Pivoting, requires turning on pivot mode. Group columns
this.pivotGroupHeaderHeight = 50;
```



##### 列分组

https://www.ag-grid.com/angular-data-grid/column-groups/

对于可展开组，要保持打开/关闭状态，需要在列组定义中指定groupId。

```
this.columnDefs = [
    {
        headerName: 'Athlete Details',
        children: [
            { field: 'athlete' },
            { field: 'age' },
            { field: 'country' },
        ]
    },
    {
        headerName: 'Sports Results',
        groupId: 'Sports Results',
        children: [
            { field: 'sport' },
            { field: 'total', columnGroupShow: 'closed' },
            { field: 'gold', columnGroupShow: 'open' },
            { field: 'silver', columnGroupShow: 'open' },
            { field: 'bronze', columnGroupShow: 'open' },
        ]
    }
];
```



##### 列固定

https://www.ag-grid.com/angular-data-grid/column-pinning/

```
this.columnDefs = [
    { field: 'athlete', pinned: 'left' }
];
```



##### 列拖拽

https://www.ag-grid.com/angular-data-grid/column-moving/



##### 行标识

https://www.ag-grid.com/angular-data-grid/row-ids/

```
<ag-grid-angular
    [getRowId]="getRowId"
    /* other grid options ... */>
</ag-grid-angular>

// assumes each data item provided by the application has the ID stored in an attribute called id
this.getRowId = params => params.data.id;
```

##### null vs undefined

https://www.ag-grid.com/angular-data-grid/column-state/#null-vs-undefined

null与undefined对于所有的状态属性，undefine表示“不应用此属性”，null表示“清除此属性”。

例如，设置sort=null将清除列上的排序，而设置sort=undefined将保留当前存在的任何排序（如果有的话）。

唯一的例外是关于列宽。对于宽度，undefined和null都将跳过该属性。这是因为宽度是强制性的——不存在没有宽度的列。

