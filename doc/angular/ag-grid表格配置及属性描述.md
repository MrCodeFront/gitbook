##### 内置表单控件

1.Text Field（文本输入框）：用于接收文本输入。
2.Numeric Text Field（数字输入框）：用于接收数字输入。
3.Text Area（文本域）：用于接收多行文本输入。
4.Select (Dropdown)（下拉选择框）：用于从预定义选项中选择一个值。
5.Checkbox（复选框）：用于表示二进制选项的状态。
6.Radio Button（单选按钮）：用于从一组选项中选择一个值。
7.Date Picker（日期选择器）：用于选择日期。
8.Range Slider（范围滑块）：用于通过滑动选择数值范围。

```js
agTextCellEditor 		// 输入框
agNumericCellEditor		// 数字输入框
agLargeTextCellEditor	// 多行文本框
agSelectCellEditor		// 下拉选择框
agCheckboxCellEditor	// 复选框
agRadioCellEditor		// 单选
agDateCellEditor		// 日期选择框
agRangeCellEditor		// 开关

// example
// 输入框
{
  headerName: 'Name',
  field: 'name',
  cellEditor: 'agTextCellEditor',
  editable: true
},
// 数字输入框
{
  headerName: 'Age',
  field: 'age',
  cellEditor: 'agNumericCellEditor',
  editable: true
},
// 多行文本框
{
  headerName: 'Description',
  field: 'description',
  cellEditor: 'agLargeTextCellEditor',
  editable: true
},
// 下拉选择框
{
  headerName: 'Status',
  field: 'status',
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['Active', 'Inactive']
  },
  editable: true
},
// 复选框
{
  headerName: 'Completed',
  field: 'completed',
  cellEditor: 'agCheckboxCellEditor',
  editable: true
},
// 单选
{
  headerName: 'Gender',
  field: 'gender',
  cellEditor: 'agRadioCellEditor',
  cellEditorParams: {
    values: ['Male', 'Female']
  },
  editable: true
},
// 日期选择框
{
  headerName: 'DOB',
  field: 'dob',
  cellEditor: 'agDateCellEditor',
  editable: true
},
// 开关
{
  headerName: 'Salary Range',
  field: 'salary',
  cellEditor: 'agRangeCellEditor',
  editable: true
},
```

