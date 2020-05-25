---
title: javascript
# date: 2019-09-28 20:53:26
sidebarDepth: auto
---

## 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
```js
let dpTable = {}
let rList = []
function randomList (a) {
    if (a === 0) {
        return
    }
    let num = parseInt(Math.random() * 32)
    if (dpTable[num]) {
        randomList(a)
    } else {
        dpTable[num] = true
        randomList(a - 1)
        rList.push(num)
    }
}
randomList(5)
console.log(rList)
```
<hr>

## 写一个方法去掉字符串中的空格
```js
str.replace(/\s*/g, '') //去除所有空格
str.replace(/^\s*|\s*$/g, '') // 去除头尾空格
str.replace(/^\s*/, '') // 去除左边空格
str.replace(/\s*$/g, '') // 去除右边空格
```
<hr>

## 去除字符串中最后一个指定的字符
```js
function deleteLastChar (str, target) {
    for(let i = str.length; i > 0; i--) {
        if (str[i] === target) {
            return str.substring(0, i) + str.substring(i + 1)
        }
    }
    return str
}
```
<hr>

## 写一个方法把下划线命名转成大驼峰命名
```js
function toCamel (str) {
    str = replace(/([a-z]{1})/, (mathc, $1) => `${$1.toUpperCase()}`)
    str = replace(/_([a-z]{1})/g, (match, $1) => `${$1.toUpperCase()}`)
    return str
}
```
<hr>

## 写一个把字符串大小写切换的方法
```js
function upLowerCase (str) {
    return str.replace(/([a-z]*)([A-Z]*)/g, (m, s1, s2) => {
        return `${s1.toUpperCase()}${s2.toLowerCase()}`
    })
}
```
<hr>

## 写一个去除制表符和换行符的方法
```js
const remove = (str) => str.replace(/[\t\n\v\r\f]/g, '')
```
<hr>

