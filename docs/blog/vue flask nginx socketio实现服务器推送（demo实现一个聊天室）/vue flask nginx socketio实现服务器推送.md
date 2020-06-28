# vue flask nginx socketio实现服务器推送（demo实现一个聊天室）

demo演示地址：http://chat.lstmxx.cn

github地址：https://github.com/Lstmxx/chatroom

## 1. 前言

服务端推送是一种服务器主动给客户端发送的技术，主要用于实时对客户端进行消息推送，如天气预报、聊天功能等。

### 1.1 HTTP 1.x

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

### 1.2 HTTP 2.0

为了解决这一问题，终于在http2.0协议里面增加了一个新特性——服务器推送。而Html5根据这一特性提供了一种在单个TCP连接上进行全双工通讯的协议——[WebSocket](https://www.runoob.com/html/html5-websocket.html)。

### 1.3 Socketio

#### 1.3.1 描述

如果客户端想要使用websocket接受服务器推送的话，Socketio是一个不错的选择。Socket.io将Websocket、轮询机制以及其它的实时通信方式（ajax等）封装成了通用的接口，并且在服务端也实现了这些实时机制的相应代码。所以，使用Socket.io便不需要担心浏览器兼容问题。

#### 1.3.2 namespace和room

socketio有两个重要的概念——namespace和room。两者关系是namespace包含room。举个例子，你要通知北小区的4座的所有用户交管理费，你先找到了北小区（namespace）然后再找到4座（room），最后给4座里面的业主发送交管理费消息。

## 2. Socketio的安装与使用

### 2.1 Vue中使用Socketio

在Vue中有两种方式使用Socketio

#### 2.1.1 直接使用官方包

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

#### 2.1.2 使用VueSocketio

相较于socket.io-client，VueSocketio自带支持在vuex中使用，这使得多组件共用消息更加便利。npm地址：https://www.npmjs.com/package/vue-socket.io 。

- 下载

```bash
npm install vue-socket.io
```

- 引入

```js
// /fronted/src/main.js
import store from './store'
import VueSocketio from 'vue-socket.io'
···
Vue.use(new VueSocketio({
  debug: true,
  connection: `/${namespace}`,
  /* 推荐使用vuex引入，方便多组件状态共享 */
  vuex: {
    store,
    actionPrefix: 'SOCKET_' // 前缀，为了区分vuex文件中响应函数和普通函数
  }
}))
```

- 单组件使用

```js
// 在需要监听的vue引入
···
export default {
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    received: function (res) {
      console.log(res)
    }
  }
}
···
```

- vuex中使用

```js
// /store/module/room.js
···
// responseData 为响应数据
SOCKET_received ({ state, rootState, commit }, responseData) {
  // do something
},
SOCKET_join_one ({}, responseData) {
  // do something
}
```


### 2.2 flask中使用Socketio

flask中使用socketio主要用到Flask-SocketIO这个包，官网地址：https://flask-socketio.readthedocs.io/en/latest/ 。

- 下载

```python
pip install flask-socketio
```

- 使用

```python
···
# /backend/blueprint/socketio.py
from flask_cors import CORS # 跨域
from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect

# 初始化socketio
socketio = SocketIO(app, cors_allowed_origins="*")
# 第一个参数为事件名，第二个为namespace
# 通过监听namespace下的事件做出响应，这里的namespace和前面前端定义的namespace要相同
# message为请求参数
@socketio.on('test_input', namespace='/chatroom')
def test_input(message):
    # do someting
    socketio.emit('test_received', '收到啦', namespace='/chatroom')
```

- 在app.py中引入

```python
# /backend/app.py
from blueprint.socketio import app, socketio, db
···
if __name__ == "__main__":
    ···
    socketio.run(app, host="0.0.0.0", port=4999, debug=True)
```

### 2.3 nginx配置

既然是前后端分离，那当然要使用nginx啦~

- 配置chatroom.conf

```nginx
upstream chat_frontend {
    server 127.0.0.1:8181; # 前端工程运行的地址
}

upstream chat_backend {
    server 127.0.0.1:4999; # 后端工程运行的地址
}

server {
    listen       80; # 监听端口
    server_name  www.chatroom.com; #域名
        location ^~ /api { # 普通接口路由
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Server $host;
            proxy_pass http://chat_backend;
        }
        location /socket.io { # socketio的路由
            proxy_http_version 1.1;
            proxy_buffering off;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
            proxy_pass http://chat_backend;
        }
        location / { # 前端路由
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Server $host;
            proxy_pass http://chat_frontend;
        }
}
```

- 配置host

```conf
···
127.0.0.1 www.chatroom.com
```

### 2.4 通信

前面把flask和vue都配置好了，那么先测试一下。

整个流程非常简单，流程图如下：



#### 2.4.1 vue

- 获取用户输入后，向目标事件发送数据。这里我自己实现了一个简陋的rich-text，如果不追求效果直接用input标签就完事了。

```js
// /src/components/chat-room/message-box/message-box.vue
···
sendMessage (message) {
  // 第一个参数为事件名，第二个参数为要发送的数据
  this.$socket.emit('test_input', message)
}
```

- 在vuex中监听received事件获取服务器返回消息。

```js
// /src/store/module/room.js
export default {
  ···
  actions: {
    ···
    SOCKET_test_received ({ state, rootState, commit }, responseData) {
      console.log(responseData)
    }
  }
}

```

#### 2.4.2 flask

后端这边就非常简单了，增加一个消息回调函数就好了。

<image src="1.drawio.png">

```python
from flask_socketio import SocketIO, emit
socketio = SocketIO(app, cors_allowed_origins="*")
···
@socketio.on('test_input', namespace='/chatroom')
def test_input(message):
    # do someting
    socketio.emit('test_received', '收到啦', namespace='/chatroom')
    # 或者
    # emit('test_received', '收到啦', namespace='/chatroom')
```

要注意的是，这个emit没有指定某一个room，所以会广播给在这个namespace下的所有人。

打开谷歌浏览器，效果如下：

<image src="1.png">

## 3. 实现聊天室小demo

### 3.1 构思

一个简单的聊天室肯定会涉及到用户，房间和消息记录。

### 3.2 实现登录页面

首先解决一下用户，最核心的是登录。流程图如下：

<image src="./2.drawio.png">

- 建一个用户表

```sql
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_time` datetime(0) DEFAULT NULL,
  `avatar_image` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `room_id_set` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ix_user_username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
```

- 封装一下登录接口，使用vuex保存登录状态。因为关闭页面后vuex会清掉token使用cookie来保存（axios的封装就不说了，不是重点）

```js
// /fronted/src/libs/requestApi.js
···
export function baseLogin (config) {
  const request = {
    url: config.url,
    method: 'POST',
    data: config.data
  }
  return service.request(request)
}
```

```js
// /fronted/src/libs/request.js
export function login (config) {
  return new Promise((resolve, reject) => {
    baseLogin(config).then((response) => {
      resolve(response.data.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
```

- 保存token

```js
// /fronted/src/libs/utility/token.js
import Cookies from 'js-cookie'
const TOKEN_KEY = 'token'
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token !== 'null') return token
  else return false
}
```

- 编写vuex的user模块

```js
// /fronted/src/store/module/user.js
import { getToken, setToken } from '../../libs/utility/token'
import { login, getUserInfo, logout } from '@/libs/request'
export default {
  state: {
    token: getToken(),
    userName: null,
    userId: null,
    avatarImage: null
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getUserName (state) {
      return state.userName
    },
    getUserId (state) {
      return state.userId
    },
    getAvatarImage (state) {
      return state.avatarImage
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserName (state, name) {
      state.userName = name
    },
    setUserId (state, userId) {
      state.userId = userId
    },
    setAvatarImage (state, avatarImage) {
      state.avatarImage = avatarImage
    }
  },
  actions: {
    handleLogin ({ commit }, config) {
      return new Promise((resolve, reject) => {
        login(config).then((responseData) => {
          commit('setToken', responseData.token)
          resolve(responseData)
        }).catch((err) => {
          reject(err)
          console.log(err)
        })
      })
    },
    loadUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((responseData) => {
          commit('setToken', getToken())
          commit('setUserName', responseData.userInfo.name)
          commit('setUserId', responseData.userInfo.userId)
          commit('setAvatarImage', responseData.userInfo.avatar_image)
          resolve(responseData)
        }).catch((err) => {
          commit('setToken', null)
          reject(err)
          console.log(err)
        })
      })
    }
  }
}
```

- 在login组件中使用

```js
// /fronted/src/views/login/login.vue
import { mapActions } from 'vuex'
export default {
  ···
  methods: {
    ...mapActions([
      'handleLogin',
      'loadUserInfo'
    ]),
    checkCapslock (e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    // 登录，成功后跳转
    onLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$Loading.show()
          const config = {
            url: '/login',
            data: this.loginForm
          }
          this.handleLogin(config).then(() => {
            this.$Loading.hide()
            this.$router.push({
              name: 'ChatRoom'
            })
          }).catch((err) => {
            this.$Loading.hide()
            console.log(err)
          })
        }
      })
    },
    // 注册，成功后回调登录
    onRegister () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$Loading.show()
          const config = {
            url: '/register',
            data: this.loginForm
          }
          this.handleLogin(config).then(() => {
            this.$Loading.hide()
            this.onLogin()
          }).catch((err) => {
            this.$Loading.hide()
            console.log(err)
          })
        }
      })
    }
  }
}
```