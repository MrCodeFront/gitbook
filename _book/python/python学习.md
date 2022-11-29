### Python学习

---

##### 下载地址

https://www.python.org/downloads/

##### pycharm下载地址(安装社区版)

https://www.jetbrains.com/pycharm/

##### 注释

```python
# 这是单行注释

"""
	这是多行注释
"""
```

##### type查看数据类型

```py
type(123)
```

##### 类型转换

```python
int(123)
float(12.3)
str(123)
```

##### 字符串拼接

注：python中的字符串拼接，不能直接拼接数字类型，需要转成字符类型才能拼接，或者通过 % 占位的方式拼接任意类型

占位类型3个：%s(字符)  %d(整数)  %f(浮点数)

```python
name = "小明"
age = 123
msg = "姓名：%s，年龄：%s" % (name, age)
print(msg)

***
姓名：小明，年龄：123
***
```

数字精度控制 m.n

```python
***
	m:控制宽度（设置宽度小于数字自身，不生效）
    .n:控制小数点精度（会进行小数的四舍五入）
***

num1 = 11
num2 = 123.2423
print("num1=%1d" % num1)
print("num1=%4d" % num1)
print("num2=%6.1f" % num2)
print("num2=%.3f" % num2)

***
num1=11
num1=  11
num2= 123.2
num2=123.242
***
```

快速格式化 f"{占位}"

可以是任意类型，不做精度控制，原来怎么样就是怎么样

```python
name = "小明"
age = 123
msg = f"姓名：{name}，年龄：{age}"
print(msg)

***
姓名：小明，年龄：123
***

price = "%.2f" % ((1 * 1.2) ** 7 * 19.99)
msg = f"值为：{price}"
print(msg)

***
值为：71.63
***
```

##### input()获取键盘输入数据

```python
content = input(f"请输入任意内容：")
print(f"您输入的内容是：{content}")

***
请输入任意内容：你好
您输入的内容是：你好
***
```

##### bool布尔类型

```python
bool1 = True
bool2 = False

print(f"bool1={bool1}")
print(f"bool2={bool2}")
print(f"bool1={type(bool1)}")
print(f"bool2={type(bool2)}")

***
bool1=True
bool2=False
bool1=<class 'bool'>
bool2=<class 'bool'>
***
```

##### 条件判断

```python
***
基本格式：
if 判断的条件：
	条件成立时...
elif
	条件成立时...
else:
    条件不成立时...

注： 1.条件判断末尾要加冒号
	2.归属于if语句的代码块，前面需填充4个空格缩进
***

num = 85
if num > 90:
    print(f"秀啊!")
elif num > 80 & num <= 90:
    print(f"优秀!")
else:
    print(f"low!")
    
***
优秀!
***
```

##### while循环

```python
i = 1
sum = 0
while i <= 100:
    sum += i
    i += 1
print(f"1-100的和为：{sum}")

***
1-100的和为：5050
***
```

##### for循环

```python
name = "CodeFront"
num = 0;
for item in name:
    if item == "o":
        num += 1
print(f"一共有{num}个‘o’")

***
一共有2个‘o’
***
```

##### range生成序列

```python
***
语法：
range(num)：生成0~num(不包含num)的序列
range(num1,num2)：生成num1~num2(不包含num2)的序列
range(num1,num2,step)：生成num1~num2(不包含num2)且步进为step的序列
***

for item in range(10):
    print(f"{item} ", end="")
print()
for item in range(5, 10):
    print(f"{item} ", end="")
print()
for item in range(5, 10, 2):
    print(f"{item} ", end="")
    
***
0 1 2 3 4 5 6 7 8 9 
5 6 7 8 9 
5 7 9 
***
```

##### continue、break

```python
***
continue：结束当前循环，继续下一次循环
break：结束所有循环
***
```

##### 函数

```python
***
def 函数名(传入参数):
    ***
    说明文档
    :params 传入参数:
    :return:
    ***
    函数体
    return 返回值
注：默认返回None
***

def say(msg):
    """
    say函数接收一个参数，返回说出的信息
    :param msg:形参msg表示所说的内容
    :return:返回值是说所的内容
    """
    print(f"{msg}")
    
say("hello CodeFront")

***
hello CodeFront
***
```

##### 作用域

```python
***
局部变量：作用域函数内部的变量
全局变量：在函数内及函数外都能使用的变量
注：局部变量通过global关键字可声明为全局变量
***

num = 100
def a():
    # 通过global关键字将num声明为全局变量
    global num
    num = 10
    print(num)

a()

***
10
***
```

##### 数组操作

index

```python
***
返回元素在数组中的索引，找不到会报错
语法：数组.index(元素)
***

stringList = ['a', 'b', 'c']
index = stringList.index('b')
print(index)

***
1
***
```

insert

```python
***
在指定的下标位置，插入指定元素
语法：数组.insert(索引,元素)
***

stringList = ['a', 'b', 'c']
stringList.insert(1, 'd')
print(stringList)

***
['a', 'd', 'b', 'c']
***
```

append

```python
***
在数组末尾追加元素
语法：数组.append(元素)
***

stringList = ['a', 'b', 'c']
stringList.append('d')
print(stringList)

***
['a', 'b', 'c', 'd']
***
```

extend

```python
***
在数组末尾追一批元素
语法：数组.extend(元素)
***

stringList = ['a', 'b', 'c']
stringList.extend(['d', 'e', 'f'])
print(stringList)

***
['a', 'b', 'c', 'd', 'e', 'f']
***
```

del

```python
***
删除索引元素
语法：del 数组[索引]
***

stringList = ['a', 'b', 'c']
del stringList[1]
print(stringList)

***
['a', 'c']
***
```

pop

```python
***
删除索引元素
语法：数组.pop(索引)
***

stringList = ['a', 'b', 'c']
element = stringList.pop(2)
print(f"删除后的数据：{stringList}，获取的数据：{element}")

***
删除后的数据：['a', 'b']，获取的数据：c
***
```

remove

```python
***
删除第一个出现的指定元素
语法：数组.remove(元素)
***

stringList = ['a', 'b', 'c']
stringList.remove('b')
print(stringList)

***
['a', 'c']
***
```

clear

```python
***
删除所有元素
语法：数组.clear()
***

stringList = ['a', 'b', 'c']
stringList.clear()
print(stringList)

***
[]
***
```

count

```python
***
统计元素出现的次数
语法：数组.count(元素)
***

stringList = ['a', 'b', 'c', 'a', 'e']
count = stringList.count('a')
print(count)

***
2
***
```

len

```python
***
返回数组长度
语法：len(数组)
***

stringList = ['a', 'b', 'c']
print(len(stringList))

***
3
***
```

##### 元组

不可修改元素，但拥有数组的操作(除添加、删除)

```python
t1 = (1, 2, ['1', '2'])
t2 = tuple()
print(t1)
print(t2)
print(type(t1))
print(type(t2))

t1[2][0] = '3'
t1[2][1] = '4'
print(t1)

***
(1, 2, ['1', '2'])
()
<class 'tuple'>
<class 'tuple'>
(1, 2, ['3', '4'])
***
```

##### 字符串

字符串也是不可修改的元组

```python
***
根据索引获取字符
语法：字符串[索引]
***

s = "Hello CodeFront"
print(f"{s[2]}")

***
l
***
```

index

```py
***
获取第一个出现的字符索引
语法：字符串.index(字符串)
***

s = "Hello CodeFront"
index = s.index('o')
print(f"{index}")

***
4
***
```

replace

```python
***
字符串替换
语法：字符串.replace(字符串1,字符串2)
***

s = "Hello CodeFront"
s = s.replace('F', 'f')
print(f"{s}")

***
Hello Codefront
***
```

split

```py
***
分割字符串
语法：字符串.split(字符串)
***

s = "Hello CodeFront"
my_list = s.split(' ')
print(f"{my_list}")

***
['Hello', 'CodeFront']
***
```

strip

```python
***
去除首尾的空格和换行符或自定字符串(不分先后顺序)
语法：字符串.strip(字符串)
***

s = "12Hello CodeFront21"
s = s.strip('12')
print(f"{s}")

***
Hello CodeFront
***
```

count

```py
***
统计字符串内某字符串出现次数
语法：字符串.count(字符串)
***

s = "Hello CodeFront"
count = s.count('o')
print(f"{count}")

***
3
***
```

len

```python
***
统计字符串长度
语法：len(字符串)
***

s = "Hello CodeFront"
length = len(s)
print(f"{length}")

***
15
***
```

##### 序列

内容连续、有序、支持下标索引的一类数据容器

如：列表、元组、字符串

##### 切片

```python
***
语法：序列[起始:结束:步长]
起始可以省略，省略从头开始
结束可以省略，省略到尾结束
步长可以省略，省略步长为1(可以为负数，表示倒序执行)
***

a = [0, 1, 2, 3, 4, 5, 6]
b = a[1:4]
print(b)

a = (0, 1, 2, 3, 4, 5, 6)
b = a[:]
print(b)

a = '0123456'
b = a[::2]
print(b)

a = '0123456'
b = a[::-1]
print(b)

a = (0, 1, 2, 3, 4, 5, 6)
b = a[::-2]
print(b)

a = '学Python，来黑马程序员，月薪过万'
b = a[::-1]
c = b[-10:4:-1]
print(b)
print(c)

***
[1, 2, 3]
(0, 1, 2, 3, 4, 5, 6)
0246
6543210
(6, 4, 2, 0)
万过薪月，员序程马黑来，nohtyP学
黑马程序员
***
```

































