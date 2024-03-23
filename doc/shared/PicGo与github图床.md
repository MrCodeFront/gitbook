## PicGo与github图床



参考：

http://michael007js.cn/news/shownews.php?id=346



##### 所谓图床，就是存储图片的服务器

我们写在线文档的时候，如果我们把图片仅仅存放在本地，那么别人来去访问这个文档的时候，图片就看不到了。

那么，为了避免这样一种情况，使得别人在访问我的文档的时候，图片不会丢失，那么我就需要将我的图片存放到别人也可以访问的服务器上。通常，我们就称这样的服务器为图床。



##### PicGO图床工具

PicGo是一个用于快速上传图片并获取图片 URL 链接的工具

下载页面：[https://github.com/Molunerfinn/picgo/releases](https://link.zhihu.com/?target=https%3A//github.com/Molunerfinn/picgo/releases)

下载地址：[https://github.com/Molunerfinn/](https://link.zhihu.com/?target=https%3A//github.com/Molunerfinn/PicGo/releases/download/v2.3.0-beta.4/PicGo-Setup-2.3.0-beta.4.exe)



##### github创建新仓库并设置为public

![](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221532503.png)



![image-20230311162718360](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221533198.png)



##### 生成令牌

![image-20230311162936164](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221534603.png)

![image-20230311163126355](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221534198.png)



![image-20230311163206985](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221535191.png)

选择永久性期限

![image-20230311163605132](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221536054.png)





##### 安装github-plus插件

![image-20240322152501940](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221525009.png)



##### 配置插件

![image-20240322154506678](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221545748.png)

cdn地址格式：https://cdn.jsdelivr.net/gh/ +你的账户名+你的仓库名@你的分支名

根据个人偏好进行设置

这里只设置为：https://cdn.jsdelivr.net/gh/MrCodeFront/assets



##### typora配置PicGo

![image-20230227005742635](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221548874.png)

![image-20230227010339237](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/d6A2mIc48HzrVbZ.png)

![image-20230227010403701](https://cdn.jsdelivr.net/gh/MrCodeFront/assets/md/202403221548890.png)

##### 