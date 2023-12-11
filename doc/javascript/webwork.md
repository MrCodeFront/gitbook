## WebWorker

Web Worker 是JavaScript提供的一种机制，用于在浏览器环境中执行长时间运行的脚本任务，以避免阻塞主线程的影响。它可以在后台运行，并与主线程进行通信。

使用 Web Worker 可以将耗时的计算密集型任务、大量数据处理或网络请求等放在独立的线程中执行，从而提高页面的响应性能和用户体验。

以下是使用 Web Worker 的基本示例：

1. 创建一个 JavaScript 文件（例如 `worker.js`），它包含要在 Web Worker 中执行的代码逻辑，例如：

```javascript
javascriptCopy Code// worker.js

self.addEventListener('message', function(event) {
  // 接收来自主线程的消息
  const message = event.data;

  // 执行耗时任务
  const result = performTask(message);

  // 将结果发送回主线程
  self.postMessage(result);
});

function performTask(message) {
  // 执行耗时任务
  // ...

  return '任务完成';
}
```

1. 在主线程中创建和使用 Web Worker。例如，在 HTML 文件中添加以下代码：

```html
htmlCopy Code<!DOCTYPE html>
<html>
<head>
  <title>Web Worker 示例</title>
</head>
<body>
  <button onclick="startWorker()">执行任务</button>
  <p id="result"></p>

  <script>
    var worker;

    function startWorker() {
      // 创建 Web Worker
      worker = new Worker('worker.js');

      // 监听消息事件
      worker.addEventListener('message', function(event) {
        // 接收来自 Web Worker 的消息
        var result = event.data;

        // 更新页面或进行其他操作
        document.getElementById('result').textContent = result;
        
        // 终止 Web Worker
        worker.terminate();
      });

      // 向 Web Worker 发送消息
      worker.postMessage('开始任务');
    }
  </script>
</body>
</html>
```

在上述示例中，当用户点击按钮时，`startWorker` 函数会创建一个 Web Worker 对象，并设置监听事件来接收来自 Web Worker 的消息。然后，通过 `postMessage` 方法向 Web Worker 发送消息。

Web Worker 中的 `performTask` 函数执行耗时任务，并将结果使用 `postMessage` 发送回主线程。主线程中的监听函数接收到消息后，更新页面的内容，并终止Web Worker。

这样，你就可以利用 Web Worker 在后台执行耗时任务，而不会阻塞主线程。请注意，Web Worker 不适用于所有情况，需根据具体需求和场景选择是否使用。





##### 案例：

worker.js

```javascript
// worker.js

self.addEventListener('message', function(event) {
  const message = event.data;

  // 在这里执行耗时任务，可以是计算密集型操作或者网络请求等

  // 模拟一个耗时的任务
  const result = simulateLongTask(message);

  // 将结果发送回主线程
  self.postMessage(result);
});

function simulateLongTask(message) {
  // 模拟耗时任务，这里延迟2秒钟
  const startTime = Date.now();
  while (Date.now() - startTime < 2000) {}

  return `任务 "${message}" 完成`;
}
```

主线程

```html
<!DOCTYPE html>
<html>
<head>
  <title>Web Worker Demo</title>
</head>
<body>
  <button onclick="executeTask()">执行任务</button>
  <p id="result"></p>

  <script>
    function executeTask() {
      // 创建 Web Worker
      const worker = new Worker('worker.js');

      worker.addEventListener('message', function(event) {
        // 处理来自 Web Worker 的消息
        const result = event.data;

        // 更新页面或进行其他操作
        document.getElementById('result').textContent = result;
        console.log(result)
        // 终止 Web Worker
        worker.terminate();
      });

      // 向 Web Worker 发送任务信息
      worker.postMessage('执行耗时任务');
    }
  </script>
</body>
</html>
```









