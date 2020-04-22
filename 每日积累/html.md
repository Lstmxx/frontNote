<!-- TOC -->

- [页面导入样式时，使用link和@import有什么区别？](#页面导入样式时使用link和import有什么区别)
  - [link](#link)
  - [@import](#import)
- [html的元素有哪些](#html的元素有哪些)
  - [分为行内和块级](#分为行内和块级)
  - [行内](#行内)
  - [块级](#块级)
- [HTML全局属性(global attribute)有哪些（包含H5）](#html全局属性global-attribute有哪些包含h5)
- [HTML5的文件离线储存怎么使用，工作原理是什么](#html5的文件离线储存怎么使用工作原理是什么)
  - [HTML5离线文件储存可以用manifest.appcache文件配置来实现](#html5离线文件储存可以用manifestappcache文件配置来实现)
  - [优点](#优点)
  - [使用](#使用)
  - [manifest文件配置](#manifest文件配置)
- [简述超链接target属性的取值和作用](#简述超链接target属性的取值和作用)
  - [a标签的target属性一共有4个值](#a标签的target属性一共有4个值)
- [label都有哪些作用？并举相应的例子说明](#label都有哪些作用并举相应的例子说明)
  - [最常用是关联表单控件](#最常用是关联表单控件)
  - [也可以解决不同浏览器按钮不同的问题](#也可以解决不同浏览器按钮不同的问题)
- [iframe框架都有哪些优缺点](#iframe框架都有哪些优缺点)
  - [优点](#优点-1)
  - [缺点](#缺点)

<!-- /TOC -->
<hr>

## 页面导入样式时，使用link和@import有什么区别？

### link
- link是HTML的标签，通过link引入的样式将在页面加载时同时加载。
- link没有兼容性的问题。
- link可以通过js操作dom动态修改和引入样式。

### @import
- @import是css提供的一个外部引入css的功能，通过@import引入的样式会等待页面加载完成后再加载。
- @import不能被js动态改变样式。
- less中的@import不是一回事，因为webpack会统一打包成link的模式去导入的。

## html的元素有哪些

### 分为行内和块级

### 行内

- span
- a
- button
- input
- label
- b
- i

### 块级

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
<hr>

## HTML全局属性(global attribute)有哪些（包含H5）

- accesskey：设置快捷键
- class：为元素设置类标识
- id：为元素添加唯一标识
- contenteditable: 指定元素内容是否可编辑
- contextmenu: 自定义鼠标右键弹出上下文菜单内容（仅firefox支持）
- data-*: 为元素增加自定义属性
- dir：设置文本方向（默认ltr）
- draggable: 设置元素是否可拖拽
<hr>

## HTML5的文件离线储存怎么使用，工作原理是什么

### HTML5离线文件储存可以用manifest.appcache文件配置来实现

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
<hr>

## 简述超链接target属性的取值和作用

### a标签的target属性一共有4个值
- _self 默认属性。在当前窗口或者框架中加载目标文档。
- _blank 打开新的窗口或者新的标签页。在使用这个属性时，最好添加 rel="noopener norefferrer" 属性，防止打开的新窗口对原窗口进行篡改。防止 window.opener API 的恶意行为。
- _parent 在 frame 或者 iframe 中使用较多。在父级框架中载入目标文档，当 a 标签本身在顶层时，与 _self 相同。
- _top 在 frame 或者 iframe 中使用较多。直接在顶层的框架中载入目标文档，加载整个窗口。
<hr>

## label都有哪些作用？并举相应的例子说明
### 最常用是关联表单控件
```html
<label for="target">目标</lable>
<input id="target" type="checkbox" value="0">
```
### 也可以解决不同浏览器按钮不同的问题
<hr>

## iframe框架都有哪些优缺点

### 优点
- 可以实现异步刷新，单个 iframe 刷新不影响整体窗口的刷新（可以实现无刷新上传，在 FormData 无法使用时）
- 可以实现跨域，每个 iframe 的源都可以不相同（方便引入第三方内容）
- 多页面应用时，对于共同的 header, footer 可以使用 iframe 加载，拆分代码（导航栏的应用）
### 缺点
- 每一个 iframe 都对应着一个页面，也就意味着多余的 css, js 文件的载入，会增加请求的开销
- 如果 iframe 内还有滚动条，会严重影响用户体验
- window.onload 事件会在所有 iframe 加载完成后才触发，因此会造成页面阻塞