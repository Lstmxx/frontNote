
<!-- TOC -->

- [圣杯布局和双飞翼布局的理解和区别，并用代码实现](#圣杯布局和双飞翼布局的理解和区别并用代码实现)
  - [圣杯布局和双飞翼布局应该算是比较常间的布局了，简单来说就是固比固](#圣杯布局和双飞翼布局应该算是比较常间的布局了简单来说就是固比固)
  - [直接用flex实现：](#直接用flex实现)
- [CSS3有哪些新增的特性？](#css3有哪些新增的特性)
  - [边框(borders)](#边框borders)
  - [背景](#背景)
  - [渐变](#渐变)
  - [文本效果](#文本效果)
  - [2D转换属性](#2d转换属性)
  - [2D转换方法](#2d转换方法)
  - [3D转换：](#3d转换)
  - [过渡](#过渡)
  - [动画](#动画)
  - [弹性盒子(flexbox)](#弹性盒子flexbox)
  - [多媒体查询@media](#多媒体查询media)
- [在页面上隐藏元素的方法有哪些？](#在页面上隐藏元素的方法有哪些)
  - [隐藏元素的方法有两种，一种是不占位，一种是占位的](#隐藏元素的方法有两种一种是不占位一种是占位的)
  - [不占位的有：](#不占位的有)
- [占位的有：](#占位的有)
- [CSS选择器有哪些？哪些属性可以继承](#css选择器有哪些哪些属性可以继承)
  - [选择器](#选择器)
  - [属性](#属性)
- [CSS3新增伪类有哪些并简要描述](#css3新增伪类有哪些并简要描述)
- [CSS3 画三角形](#css3-画三角形)
  - [[效果](https://codepen.io/Lstmxx/pen/RwWoJRR)](#效果httpscodepeniolstmxxpenrwwojrr)

<!-- /TOC -->
<hr>
## 圣杯布局和双飞翼布局的理解和区别，并用代码实现

### 圣杯布局和双飞翼布局应该算是比较常间的布局了，简单来说就是固比固

### 直接用flex实现：

```html
<div id="container">
  <div id="center" class="column">1111</div>
  <div id="left" class="column">222</div>
  <div id="right" class="column">333</div>
</div>
```
```less
.row{
  display: flex;
  flex-direction: row;
}
.container{
  .row;
  width: 100vw;
  height: 100vh;
  align-items: center;
}
.center{
  flex: 1;
}
.left{
  height: 100%;
  width: 100px;
}
.rigth{
  height: 100%;
  width: 100px;
}
```
<hr>

## CSS3有哪些新增的特性？
### 边框(borders)
- border-radius 圆角
- box-shadow 盒阴影
- border-image 边框图像
### 背景
- background-size 背景图片的尺寸
- background_origin 背景图片的定位区域
- background-clip 背景图片的绘制区域
### 渐变
- linear-gradient 线性渐变
- radial-gradient 径向渐变
### 文本效果
- word-break
- word-wrap
- text-overflow
- text-shadow
- text-wrap
- text-outline
- text-justify
### 2D转换属性
- transform
- transform-origin
### 2D转换方法

- translate(x,y)
- translateX(n)
- translateY(n)
- rotate(angle)
- scale(n)
- scaleX(n)
- scaleY(n)
- rotate(angle)
- matrix(n,n,n,n,n,n)
### 3D转换：

- transform
- transform-origin
- transform-style
- translate3d(x,y,z)
- translateX(x)
- translateY(y)
- translateZ(z)
- scale3d(x,y,z)
- scaleX(x)
- scaleY(y)
- scaleZ(z)
- rotate3d(x,y,z,angle)
- rotateX(x)
- rotateY(y)
- rotateZ(z)
- perspective(n)
### 过渡
- transition
### 动画
- @Keyframes规则
- animation
### 弹性盒子(flexbox)
### 多媒体查询@media
<hr>

## 在页面上隐藏元素的方法有哪些？

### 隐藏元素的方法有两种，一种是不占位，一种是占位的

### 不占位的有：
```css
.one{
  height: 0px;
  width: 0px;
  overflow: hidden;
}
.two{
  display: none;
}
```
## 占位的有：
```less
.two{
  position: fixed;
  top: -100%; // bottom、left、right皆可
}
.three{
  visibility: hidden;
}
```
<hr>
## CSS选择器有哪些？哪些属性可以继承

### 选择器

- 伪类 ::hover, ::after, ::before
- 通配符*
- 后代 >
- 兄弟 +
- 属性 [type='input']

### 属性

- font-size
- line-height
- color
- text-align
- cursor
<hr>

## CSS3新增伪类有哪些并简要描述

- :first-child / :last-child 表示该元素的第一个或者最后一个
```html
<div class="now"></div> // now:first-child
<div class="now"></div>
···
<div class="now"></div>
<div class="now"></div> // now:last-child
```
- :nth-child() / nth-last-child() 控制基偶行的，前一个是顺数，后一个是倒数， 行序号是包括父元素或同级元素的。[效果](https://codepen.io/Lstmxx/pen/vYNyjLb)
- :first-of-type / :last-of-type 表示指定元素内第一个或最后一个，如果指定元素内有多个嵌套的话，嵌套里面的第一个也会被指定
- :root html的根元素
- :not() 否定选择器
- :only-child 只有一个子元素才会生效
- :empty 选择连空格都没有的元素
<hr>

## CSS3 画三角形

### [效果](https://codepen.io/Lstmxx/pen/RwWoJRR)

## 简述你对BFC规范的理解