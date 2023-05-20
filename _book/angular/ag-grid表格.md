官网：https://www.ag-grid.com/

中文网：https://www.itxst.com/ag-grid/tutorial.html

参考：

https://blog.csdn.net/Jane_2160/article/details/128468734

https://www.mianshigee.com/project/www.ag-grid.com

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



