# 页面导入样式时，使用link和@import有什么区别？

## link
- link是HTML的标签，通过link引入的样式将在页面加载时同时加载。
- link没有兼容性的问题。
- link可以通过js操作dom动态修改和引入样式。

## @import
- @import是css提供的一个外部引入css的功能，通过@import引入的样式会等待页面加载完成后再加载。
- @import不能被js动态改变样式。
- less中的@import不是一回事，因为webpack会统一打包成link的模式去导入的。

# html的元素有哪些

## 分为行内和块级

## 行内

- span
- a
- button
- input
- label
- b
- i

## 块级

- div
- img
- p
- h1~h5
- ul
- li
- table
- tr
- th
- dl
- dt
- dd

# HTML全局属性(global attribute)有哪些（包含H5）

- accesskey：设置快捷键
- class：为元素设置类标识
- id：为元素添加唯一标识
- contenteditable: 指定元素内容是否可编辑
- contextmenu: 自定义鼠标右键弹出上下文菜单内容（仅firefox支持）
- data-*: 为元素增加自定义属性
- dir：设置文本方向（默认ltr）
- draggable: 设置元素是否可拖拽

# HTML5的文件离线储存怎么使用，工作原理是什么

## HTML5离线文件储存可以用manifest.appcache文件配置来实现

### 优点

- 没有网络时可以浏览，加快资源的加载速度，减少服务器负载

### 使用

- 只需要在页面头部引入manifest文件，然后在同目录下创建manifest.appcache文件便可以了。

### manifest文件配置

```bash
CACHE MANIFEST
# 要储存的文件名
/theme.css
/logo.gif
/main.js
···

NETWORK:
# 要网络才能使用的文件
login.asp
···
* # 全部
···

FALLBACK
# 用来配置没有网络时，某些文件夹文件可以用目标文件所替代
/html5/ /404.html
···
```