
# 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
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
# 写一个方法去掉字符串中的空格
```js
str.replace(/\s*/g, '') //去除所有空格
str.replace(/^\s*|\s*$/g, '') // 去除头尾空格
str.replace(/^\s*/, '') // 去除左边空格
str.replace(/\s*$/g, '') // 去除右边空格
```
# 去除字符串中最后一个指定的字符
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
# 写一个方法把下划线命名转成大驼峰命名
```js
function toCamel (str) {
    str = replace(/([a-z]{1})/, (mathc, $1) => `${$1.toUpperCase()}`)
    str = replace(/_([a-z]{1})/g, (match, $1) => `${$1.toUpperCase()}`)
    return str
}
```