## IM即时通讯（Instant Messenger）

---

概念：是一款跨平台（Linux Server，Windows Server），可定制的 P2P 即时通信系统（集成[多人视频会议](https://baike.baidu.com/item/多人视频会议/6541929)功能），为各行业门户网站和企事业单位提供“一站式”定制解决方案。



##### 功能描述

+ 客户端能随时主动发送数据给服务端。

+ 当客户端关注的内容在发生改变时，服务器能够实时地通知客户端。类比于传统的C/S请求模型，“实时通信”时客户端不需要主观地发送请求去获取自己关心的内容，而是由服务器端进行“推送”。

**注意：**上面的“推送”二字打了引号，实际上现有的几种技术实现方式中，并不是服务器端真正主动地推送，而是通过一定的手段营造了一种“实时通信”的假象。



##### 常用方式

1. [客户端轮询：传统意义上的短轮询（Short Polling）](#短轮询（Short Polling）)
2. [服务器端轮询：长轮询（Long Polling）](#长轮询（Long Polling）)
3. [单向服务器推送：Server-Sent Events（SSE）](#Server-Sent Events（SSE）)
4. [全双工通信：WebSocket](#WebSocket)



##### 短轮询（Short Polling）

1. 客户端向服务器端发送一个请求，服务器返回数据，然后客户端根据服务器端返回的数据进行处理；
2. 客户端继续向服务器端发送请求，继续重复以上的步骤，如果不想给服务器端太大的压力，一般情况下会设置一个请求的时间间隔。

使用场景：客户端通过定时器在规定时间内获取服务端的数据。如扫码。

优点：不需要额外的开发成本，请求数据，解析数据，作出响应，仅此而已，然后不断重复。

缺点：轮询的时间间隔不好控制。如果要求的实时性比较高，显然使用短轮询会有明显的短板，如果设置interval的间隔过长，会导致消息延迟，而如果太短，会对服务器产生压力。

![https://pic.rmb.bdstatic.com/bjh/down/f4affcebbc3d5b1724a876e648932e7a.gif](https://pic.rmb.bdstatic.com/bjh/down/f4affcebbc3d5b1724a876e648932e7a.gif)

![](https://pic.rmb.bdstatic.com/bjh/down/f5a0d3c3ca4e904b90d743fcd3a48c7e.gif)



##### 长轮询（Long Polling）

1. 客户端发送一个请求，服务器会hold住这个请求；
2. 直到监听的内容有改变，才会返回数据，断开连接（或者在一定的时间内，请求还得不到返回，就会因为超时自动断开连接）;
3. 客户端继续发送请求，重复以上步骤。

[【实时通讯】轮询与长轮询_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1C5411t7Nh)

使用场景：弹幕、心跳等

优点：新数据来了，连接断开后会释放客户端与服务器端的连接数，并产生新的连接。

缺点：阻塞服务器请求，依旧占用资源；如果客户端有新数据发送，但服务端没有再规定时间内返回，会导致响应失败。

![https://pic.rmb.bdstatic.com/bjh/down/2ded9fdd34f22d207ade6ca423f479d4.gif](https://pic.rmb.bdstatic.com/bjh/down/2ded9fdd34f22d207ade6ca423f479d4.gif)



##### Server-Sent Events（SSE）

[EventSource - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)

Server-Sent是[HTML5](https://so.csdn.net/so/search?q=HTML5&spm=1001.2101.3001.7020)提出一个标准。由客户端发起与服务器之间创建TCP连接，然后并维持这个连接，直到客户端或服务器中的任何一方断开，ServerSent使用的是"问"+"答"的机制，连接创建后浏览器会周期性地发送消息至服务器询问，是否有自己的消息。

![https://pics2.baidu.com/feed/7dd98d1001e93901f513dc30cc9cd9ef36d19620.png?token=963458d67131787ebddf9f4664aa5018](https://pics2.baidu.com/feed/7dd98d1001e93901f513dc30cc9cd9ef36d19620.png?token=963458d67131787ebddf9f4664aa5018)

SSE的本质其实就是一个HTTP的长连接，只不过它给客户端发送的不是一次性的数据包，而是一个stream流，格式为**text/event-stream**。所以客户端不会关闭连接，会一直等着服务器发过来的新的数据流，视频播放就是这样的例子。

兼容性：不兼容IE，其他现代浏览器基本都兼容

["Server-Sent-Events" | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/?search=Server-Sent-Events)

使用场景：处理社交媒体状态更新，新闻提要或将数据传递到客户端存储机制（如 IndexedDB 或 Web 存储）

特点：客户端只需连接一次，Server就定时推送，除非其中一端断开连接。并且SSE会在连接意外断开时自动重连。

缺点：并没有达到最新消息服务器端的实时推送。



##### WebSocket

概念：WebSocket是一种网络通信协议，是HTML5新增的特性，实现了基于浏览器的远程socket，使浏览器和服务器可以进行全双工通信，大部分浏览器都对此做了支持。

###### 与HTTP对比

不同点：

1. HTTP的协议标识符是http，WebSocket的是ws；

2. HTTP请求只能由客户端发起，服务器无法主动向客户端推送消息，而WebSocket可以；

3. HTTP请求有同源限制，不同源之间通信需要跨域，而WebSocket没有同源限制。

相同点：

1. 都是应用层的通信协议；

2. 默认端口一样，都是80或443；

3. 都可以用于浏览器和服务器间的通信；
4. 都基于TCP协议。

![https://upload-images.jianshu.io/upload_images/14151453-83f761a12847fa76.png?imageMogr2/auto-orient/strip|imageView2/2/w/1108/format/webp](https://upload-images.jianshu.io/upload_images/14151453-83f761a12847fa76.png?imageMogr2/auto-orient/strip|imageView2/2/w/1108/format/webp)

兼容性：IE10以下不支持，现代浏览器基本都支持

[WebSocket API | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/mdn-api_websocket)

使用场景：社交聊天、弹幕、多玩家游戏、协同编辑、股票基金实时报价、体育实况更新、视频会议/聊天、基于位置的应用、在线教育、智能家居等

特点：

1. 可双向通信，设计的目的主要是为了减少传统轮询时http连接数量的开销；
2. 建立在TCP协议之上，握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器；
3. 与HTTP兼容性良好，同样可以使用80和443端口；
4. 没有同源限制，客户端可以与任意服务器通信；
5. 可以发送文本，也可以发送二进制数据；
6. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL.



##### SSE与Websocket对比

1）SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。

2）SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。

3）SSE 默认支持断线重连，WebSocket 需要自己实现。

4）SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。

5）SSE 支持自定义发送的消息类型。