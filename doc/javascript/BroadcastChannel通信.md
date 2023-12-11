## BroadcastChannel 通信



BroadcastChannel是一个HTML5 API，它提供了一种方法来在同源的多个浏览器窗口、标签页或Frame之间进行实时通信。这意味着您可以创建一个“频道”，并在这个频道上发布消息，所有订阅该频道的窗口都会收到这些消息。与WebSocket不同，BroadcastChannel只能进行单向通信，即只能发布消息，而不能收到回复。BroadcastChannel是一种非常有用的工具，可以用于各种应用程序，例如多个聊天窗口之间的通信，以及在Web应用程序中进行分布式计算等。值得注意的是，使用BroadcastChannel时需要注意安全性，因为未经身份验证的消息可能会被传输到敌对方，并且会破坏应用程序的完整性和机密性。



可以使用这些方法和事件来创建、发布和订阅消息频道，并在不同的浏览器窗口或标签页之间进行实时通信。

#####BroadcastChannel(name)

构造函数，用于创建一个BroadcastChannel实例。它需要一个字符串参数`name`，代表频道的名称。该实例可以用来发布和订阅消息。

```
javascriptCopy Codeconst channel = new BroadcastChannel('myChannel');
```

##### postMessage(message)

向该频道发布消息。消息可以是任何JavaScript可序列化的对象。

```javascript
Codechannel.postMessage('Hello, world!');
```

#####close()

关闭该频道，释放相关资源。

```javascript
Codechannel.close();
```

#####onmessage

当订阅该频道的窗口收到一条新消息时，会触发该事件。可以通过监听该事件来处理接收到的消息。

```javascript
Codechannel.onmessage = function(event) {
  console.log(event.data); // 输出收到的消息
};
```

#####onmessageerror

当尝试解析从其他源发送的消息时遇到错误时，会触发该事件。可以通过监听该事件来进行错误处理。

```javascript
Codechannel.onmessageerror = function(event) {
  console.log(event.message); // 输出错误信息
}
```

BroadcastChannel还支持以下属性：

#####name

频道的名称，只读属性。

```javascript
console.log(channel.name); // 输出 'myChannel'
```



##### 示例

```javascript
// 在发送消息的窗口或标签页中
const channel = new BroadcastChannel('myChannel');
channel.postMessage('Hello, world!');

// 在接收消息的窗口或标签页中
const channel = new BroadcastChannel('myChannel');
channel.onmessage = function(event) {
  console.log(event.data); // 输出收到的消息
};
```

