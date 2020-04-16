# 圣杯布局和双飞翼布局的理解和区别，并用代码实现

## 圣杯布局和双飞翼布局应该算是比较常间的布局了，简单来说就是固比固

## 直接用flex实现：

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

# CSS3有哪些新增的特性？
## 边框(borders)
- border-radius 圆角
- box-shadow 盒阴影
- border-image 边框图像
## 背景
- background-size 背景图片的尺寸
- background_origin 背景图片的定位区域
- background-clip 背景图片的绘制区域
## 渐变
- linear-gradient 线性渐变
- radial-gradient 径向渐变
## 文本效果
- word-break
- word-wrap
- text-overflow
- text-shadow
- text-wrap
- text-outline
- text-justify
## 2D转换属性
- transform
- transform-origin
## 2D转换方法

- translate(x,y)
- translateX(n)
- translateY(n)
- rotate(angle)
- scale(n)
- scaleX(n)
- scaleY(n)
- rotate(angle)
- matrix(n,n,n,n,n,n)
## 3D转换：

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
## 过渡
- transition
## 动画
- @Keyframes规则
- animation
## 弹性盒子(flexbox)
## 多媒体查询@media

# 在页面上隐藏元素的方法有哪些？

## 隐藏元素的方法有两种，一种是不占位，一种是占位的

## 不占位的有：
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

# CSS选择器有哪些？哪些属性可以继承

## 选择器

- 伪类 ::hover, ::after, ::before
- 通配符*
- 后代 >
- 兄弟 +
- 属性 [type='input']

## 属性

- font-size
- line-height
- color
- text-align
- cursor