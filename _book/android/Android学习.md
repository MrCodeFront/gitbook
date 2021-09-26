### Android 学习

---

词汇：

AVD（安卓虚拟设备）



##### 应用组件(共4种)

+ Activity
+ 服务
+ 广播接收器
+ 内容提供程序

[https://developer.android.google.cn/guide/components/fundamentals](https://developer.android.google.cn/guide/components/fundamentals)

> *Activity* 是与用户交互的入口点。它表示拥有界面的单个屏幕.
>
> *服务* 是一个通用入口点，用于因各种原因使应用在后台保持运行状态。它是一种在后台运行的组件，用于执行长时间运行的操作或为远程进程执行作业。服务不提供界面。
>
> 借助*广播接收器*组件，系统能够在常规用户流之外向应用传递事件，从而允许应用响应系统范围内的广播通知。
>
> *内容提供程序*  管理一组共享的应用数据，您可以将这些数据存储在文件系统、SQLite 数据库、网络中或者您的应用可访问的任何其他持久化存储位置。

在 Android 系统启动应用组件之前，系统必须通过读取应用的*清单*文件 (`AndroidManifest.xml`) 确认组件存在。您的应用必须在此文件中声明其所有组件，该文件必须位于应用项目目录的根目录中。

##### Android API

[https://developer.android.google.cn/guide/topics/manifest/uses-sdk-element#ApiLevels](https://developer.android.google.cn/guide/topics/manifest/uses-sdk-element#ApiLevels)

> 什么是API级别
>
> API 级别是对 Android 平台版本提供的框架 API 修订版进行唯一标识的整数值。
>
> Android 平台提供一种框架 API，应用可利用它与底层 Android 系统进行交互。该框架 API 由以下部分组成：
>
> - 一组核心软件包和类
> - 一组用于声明清单文件的 XML 元素和属性
> - 一组用于声明和访问资源的 XML 元素和属性
> - 一组 Intent
> - 一组应用可请求的权限，以及系统中包括的权限强制执行
>
> Android 平台的每个后续版本均可包括其提供的 Android 应用框架 API 的更新。
>
> 框架 API 更新的设计用途是使新 API 与早期版本的 API 保持兼容。换言之，大多数 API 更改都是新增更改，并且会引入新功能或替代功能。在 API 的某些部分得到升级时，系统会弃用经替换的旧版部分，但不会将其移除，以便其仍可供现有应用使用。在极少数情况下，系统可能会修改或移除 API 的某些部分，但通常只有在为确保 API 稳健性以及应用或系统安全性时，才需要进行此类更改。所有其他来自早期修订版的 API 部分都将继续保留，不做任何修改。
>
> Android 平台提供的框架 API 使用称为“API 级别”的整数标识符指定。每个 Android 平台版本恰好支持一个 API 级别，但隐含对所有早期 API 级别（低至 API 级别 1）的支持。Android 平台初始版本提供的是 API 级别 1，后续版本的 API 级别则依次增加。

##### Android Studio 与 逍遥模拟器 连接

> 查看Microvirt\MEmu\MemuHyperv VMs\MEmu目录下MEmu.memu的端口号。cmd 到逍遥模拟器Microvirt\MEmu目录下，运行:adb.exe connect 127.0.0.1<:prot>
>
> 看见 connected to 127.0.0.1:21503 表示连接成功

官方demo讲解: [https://www.it610.com/article/1297923636153360384.htm](https://www.it610.com/article/1297923636153360384.htm)