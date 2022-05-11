# MySQL学习

---

#### 数据库存储数据的特点

```html
1.将数据放到表中，表再放到库中
2.一个数据库中可以有多个表，每个表都有一个名字，用来标识自己，表明具有唯一性
3.表具有一些特性，这些特性定义了数据在表中如何存储，类似 java 中 ”类“ 的设计
4.表由列组成，我们也成为字段。所有表都由一个或多个列组成的，每一列类似 java 的 ”属性“
5.表中的数据是按行存储的，每一行类似于 java 的 ”对象“
```

#### 下载

```
https://dev.mysql.com/downloads/mysql
社区版（免费）
企业版（收费）
```

### MySQL 8.0 报错解决

```
参考：https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

express mysql

登录 mysql 并分别执行以下代码：
alter user 'root'@'localhost' identified with mysql_native_password by '密码';
flush privileges;
```



#### 启动和停止 mysql 服务

```shell
1.右击计算机 - 管理 - 服务和应用程序 - 服务
2.打开 cmd（管理员身份）
  开启：net start [mysql名称]
  停止：net stop [mysql名称]
```

#### 数据库连接和退出

```html
1.连接（cmd方式）
-h：主机	-P（必须大写）：端口	-u：用户名	-p	密码
方式一：mysql -h localhost -P 3306 -u root -p 密码
方式二（连本机，默认端口3306）： mysql -u root -p 密码
2.退出
方式一：exit
方式二：按 2 次 ctrl + c
```

#### MySQL的常见命令

```shell
1.查看当前所有的数据库
show databases;
2.打开指定的库
use 库名
3.查看当前库的所有表
show tables;
4.查看其他库的所有表
show tables form 库名；
5.创建表
create table 表名{
	列名 列类型,
	列名 列类型,
	...
};
6.查看表结构
desc 表名;
7.查看服务器的版本
方式一：登录到mysql服务端
select version();
方式二：没有登录到mysql服务端
mysql --version 或 mysql --V
```

#### MySQL的语法规范

```
1.不区分大小写，建议关键字大写，表名、列名小写
2.每条命令最好用分号结尾
3.每条命令根据需要，可进行缩进或换行
4.注释
	单行：#注释文字
	单行：-- 注释文字
	多行：/* 注释文字 */
```

#### DQL语言（数据查询语言）

```
基础查询
条件查询
排序查询
常见函数
分组函数
分组查询
链接查询
子查询
分页查询
union联合查询
```

#### DML语言（数据操作语言）

```
插入语句
修改语句
删除语句
```

#### DDL语言（数据定义语言）

```
库和表的管理
常见数据类型介绍
常见约束
```

#### TCL语言（事务控制语言）

```
事务和事务处理
```

#### SELECT

```
语法：SELECT 查询列表 FROM 表名;
特点：
1、查询列表可以是：表中的字段、常量值、表达式、函数
2、查询的结果是一个虚拟表格
```

##### 起别名
```sql
1.SELECT 字段名 AS 别名 FROM 表名;
2.使用空格：SELECT 字段名 别名 FROM 表名;
```

##### 去重(DISTINCT)

```sql
SELECT DISTINCT 字段名 FROM 表名;
```

##### 连接(CONCAT)

```sql
SELECT CONCAT(str1,str2,...) AS 别名 FROM 表名;
```

##### 判断(IFNULL)

```sql
SELECT IFNULL(expr1,expr2) AS 别名 FROM 表名;
```

##### 查看表结构

```sql
DESC 表名;
```

#### 条件查询

```
语法：
	SELECT
		查询列表
	FROM
		表名
	WHERE
		筛选条件;

分类：
	一、按条件表达式筛选
		> < = <> >= <=
	二、按逻辑表达式筛选
		and or not
	三、模糊查询
		like
		between and
		in
		is null
		
```

##### 查询第几个字符，使用 "_" 通配符

```sql
SELECT 查询列表 FROM 表名 WHERE 列名 LIKE '__n_l%';

查询含有 "_" 字符，需转义
SELECT 查询列表 FROM 表名 WHERE 列名 LIKE '_\_%';
或者
SELECT 查询列表 FROM 表名 WHERE 列名 LIKE '_$_%' ESCAPE '$';
```

##### IN

```bash
SELECT 查询列表 FROM 表名 WHERE 列名 IN (值1,值2,...);
```

##### ISNULL、IS NOT NULL

```sql
SELECT 查询列表 FROM 表名 WHERE ISNULL(列名);
SELECT 查询列表 FROM 表名 WHERE 列名 IS NOT NULL;
```

##### 安全等于 <=>

```sql
SELECT 列名 FROM 表名 WHERE 列名 <=> 值;
```

#### 排序

```sql
语法:
	SELECT 
    	查询列表
    FROM  
    	表名
    [WHERE 筛选条件]
    ORDER BY 
    	排序列表 
    [ASC|DESC],
    	排序列表
    [ASC|DESC],
    	...;
特点：
	1.ASC 代表升序，DESC 代表降序。不写默认升序。
	2.ORDER BY 子句支持单个字段、多个字段、表达式、函数、别名。
	3.ORDER BY 子句以一般是放在查询语句的最后，limit 子句除外。
```

#### 函数

```SQL
概念：将一组逻辑语句封装在方法体中，对外暴露方法名。
好处：
	1.隐藏了实现细节
	2.提高代码的重用性
调用：SELECT 函数名(参数列表) [FROM 表名];
分类：
	1.普通函数
		字符函数
		数学函数
		日期函数
		其他函数
		流程控制函数
	2.分组函数
	功能：做统计使用，又称为统计函数、聚合函数、组函数
		
```

```sql
查看字符集：
SHOW VARIABLES LIKE '%char%';
```

##### 字符函数

```sql
-- LENGTH 长度
SELECT LENGTH(str);

-- UPPER 转大写
SELECT UPPER(str);

-- LOWER 转小写
SELECT LOWER(str);

-- CONCAT 拼接
SELECT CONCAT(str,str,...);

-- SUBSTR 字符串截取
SELECT SUBSTR(str,start,[end]);

-- INSTR 获取字符所在位置
SELECT INSTR(str,str);

-- TRIM 去左右字符
SELECT TRIM(str);

-- LPAD 左填充
SELECT LPAD(str,填充个数,填充字符);

-- RPAD 右填充
SELECT RPAD(str,填充个数,填充字符);

-- EPLACE 替换
SELECT EPLACE(str,需要替换的字符,替换后的字符);
```

##### 数学函数

```sql
-- ROUND 四舍五入
SELECT ROUND(数值);
SELECT ROUND(数值,保留位数);

-- CEIL 向上取整
SELECT CEIL(数值);

-- FLOOR 向下取整
SELECT FLOOR(数值);

-- TRUNCATE 截断
SELECT TRUNCATE(小数,截断位数);

-- MOD 取余
SELECT MOD(被除数,除数);
```

##### 日期函数

```sql
%Y：年（4位）
%y：年（2位）
%m：月（2位）(01,02...11,12)
%c：月（1位）(1,2...11,12)
%d：日（2位）(01,02...)
%H：小时（24小时制）
%h：小时（12小时制）
%i：分钟(01,02...)
%s：秒(01,02...)

-- 返回当前系统日期+时间
SELECT NOW();

-- CURDATE 返回当前系统日期，不包含时间
SELECT CURDATE();

-- CURTIME 返回当前时间，不包含日期
SELECT CURTIME();

-- 获取指定的部分，年月日时分秒
SELECT YEAR(NOW()) 年;
SELECT YEAR('1994-9-28') 年;
SELECT MONTH(NOW()) 月;
-- 英文名
SELECT MONTHNAME(NOW()) 月;

-- STR_TO_DATE 将日期格式的字符转换成指定的日期格式 YYYY-MM-DD
SELECT STR_TO_DATE('1994-9-28','%Y-%c-%d');
SELECT STR_TO_DATE('9-28 1994','%c-%d %Y');

-- DATE_FORMAT 将日期转换成字符串
SELECT DATE_FORMAT(NOW(),'%Y年%m月%d日');
```

##### 其他函数

```sql
SELECT VERSION();	// 查看mysql版本
SELECT DATABASE();	// 查看当前数据库
SELECT USER();		// 查看当前库的用户
```

##### 流程控制函数

```sql
-- IF 函数
SELECT IF(10>5,'大','小');

-- CASE 函数
/* 
用法一：(类同 switch)
case 要判断的字段或表达式
when 常量1 then 要显示的值1或语句1;
when 常量2 then 要显示的值2或语句2;
...
else 要显示的值n或语句n;
end

用法二：（类同 if）
case
when 条件1 then 要显示的值1或语句1;
when 条件2 then 要显示的值2或语句2;
...
else 要显示的值n或语句n;
end
*/
SELECT salary,department_id,
CASE department_id
	WHEN 30 THEN salary*1.1
	WHEN 40 THEN salary*1.2
	WHEN 50 THEN salary*1.3
END AS 新工资
FROM employees;

SELECT salary,
CASE
	WHEN salary>20000 THEN 'A'
	WHEN salary>15000 THEN 'B'
	WHEN salary>10000 THEN 'C'
	ELSE 'D'
END AS 工资等级
FROM employees;
```

##### 分组函数

```sql
/*
功能：用作统计使用，又称为聚合函数或统计函数或组函数
分类：
sum 求和、avg 平均值、max 最大值、min 最小值、count 计算个数
特点：
1、sum、avg 一般用于处理数值型
   max、min、count 可以处理任何类型
2、以上文组函数都忽略 null 值
3、可以和 DISTINCT 搭配实现去重
4、count 函数单独介绍
一般使用count(*)用作统计行数
5、和分组函数一同查询的字段要求是 group by 后的字段
*/
SELECT SUM(字段名) FROM 表名;
SELECT AVG(字段名) FROM 表名;
SELECT MIN(字段名) FROM 表名;
SELECT MAX(字段名) FROM 表名;
SELECT COUNT(字段名) FROM 表名;

# 配合 DISTINCT 实现去重
SELECT SUM(DISTINCT 字段名) FROM 表名;
SELECT COUNT(DISTINCT 字段名) FROM 表名;

# count 函数的详细介绍
# 当前行任意一个属性部位null，则统计当前行，以下效果一样
SELECT COUNT(*) FROM 表名;
SELECT COUNT(1) FROM 表名;
SELECT COUNT(2) FROM 表名;
# 效率
MYISAM 存储引擎下，COUNT(*) 的效率高
INNODB 存储引擎下，COUNT(*) 和 COUNT(1) 的效果差不多，比 COUNT(字段) 要高一些
```





























