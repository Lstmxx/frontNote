## vue flask nginx socketio实现服务器推送

### 前言

服务端推送是一种服务器主动给客户端发送的技术，主要用于实时对客户端进行消息推送，如天气预报、聊天功能等。

### HTTP 1.x

在websocket api出现之前，由于http1.x的缺陷，导致通信只能由客户端发起，用户想要获取到实时数据变化，就要不停的向服务器发送请求，这种方法我们一般称为轮询。这种方法在web端可以一用，但是在移动端就不行了，想一想你的app不停的消耗你的流量发请求到服务器，这会导致用户流量的大量浪费，体现极其差。

```js
setInterval(() => {
  axios()then((res) => {
    ···
  }).catch(err => {
    ···
  })
}, 3000)
```

### HTTP 2.0

为了解决这一问题，终于在http2.0协议里面增加了一个新特性——服务器推送。而Html5根据这一特性提供了一种在单个TCP连接上进行全双工通讯的协议——[WebSocket](https://www.runoob.com/html/html5-websocket.html)。

### Socketio

#### 一、描述

如果客户端想要使用websocket接受服务器推送的话，Socketio是一个不错的选择。Socket.io将Websocket、轮询机制以及其它的实时通信方式（ajax等）封装成了通用的接口，并且在服务端也实现了这些实时机制的相应代码。所以，使用Socket.io便不需要担心浏览器兼容问题。

#### 二、namespace和room

socketio有两个重要的概念——namespace和room。两者关系是namespace包含room。举个例子，你要通知某一个小区的某一个房间交管理费，你先找到了某一小区（namespace）然后再找到房间（room），然后给这个房间里面监听通知事件的人发送交管理费消息。

### Vue中使用Socketio

在Vue中有两种方式使用Socketio

#### 一、直接使用官方包
- 下载
```bash
npm install socket.io
```
- 引入
```js
import io from 'socket.io-client'
```
- 使用
```js
// 这里的namespace和后端设置的namespace是一样的
const socket = io.connect(`http://${域名}/${namespace}`)

// on函数是监听函数，接受两个参数，第一个是订阅名，第二个是接受订阅信息的回调
socket.on('chatMessage', res => {
  console.log(res)
})
socket.on('response', res => {
  console.log(res)
})
socket.on('connect', res => {
  console.log(res)
})
···
// emit是发送函数，第一个参数是后端的订阅名，第二个是数据，可以是任意类型
socket.emit('user_input', 'wdnmd')
```

#### 二、使用VueSocketio

- 下载
```bash
npm install vue-socket.io
```
- 引入
```js
// main.js
import VueSocketio from 'vue-socket.io'
···
Vue.use(new VueSocketio({
  debug: true,
  connection: `http://${域名}/${namespace}`
}))
```
- 使用
```js
// 在需要监听的vue引入
···
export default {
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    response: function (res) {
      console.log(res)
    },
    chatMessage: function (res) {
      console.log(res)
    }
  }
}
···
```




