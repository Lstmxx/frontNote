---
title: 时间格式化函数
# date: 2019-09-28 20:53:26
sidebarDepth: auto
---
## 格式：刚刚，x分钟前，x小时前、x天前
```js
export function normalizeDateTime (time) {
  let date = new Date(time)
  let today = new Date()
  let diff = today - date
  let formatDateTime = ''
  let width = 58
  let diffDay = Math.floor(diff / 24 / 3600 / 1000)
  if (diffDay < 0) {
    formatDateTime = '刚刚'
  } else if (diffDay === 0) {
    let diffHour = Math.floor(diff / 3600 / 1000)
    if (diffHour === 0) {
      let diffMin = Math.floor(diff / 60 / 1000)
      if (diffMin < 3) {
        formatDateTime = '刚刚'
        width = 34
      } else {
        formatDateTime = `${diffMin}分钟前`
      }
    } else {
      formatDateTime = `${diffHour}小时前`
    }
  } else {
    if (diffDay >= 31) {
      let diffYear = today.getFullYear() - date.getFullYear()
      formatDateTime = `${normalizeNumber(date.getMonth() + 1)}-${normalizeNumber(date.getDate())}`
      width = 42
      if (diffYear > 0) {
        formatDateTime = `${date.getFullYear()}-${formatDateTime}`
        width = 72
      }
    } else {
      formatDateTime = `${diffDay}天前`
      width = 46
    }
  }
  return { formatDateTime, width }
}
```
## 格式：2019-10-31 10:23:24
```js
export function normalizeNumber (num) {
  return num > 9 ? num : `0${num}`
}
/*
  时间格式：2019-10-31 10:23:24
*/
export function normalizeTimeDetail (time) {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = normalizeNumber(date.getMonth() + 1)
  let days = normalizeNumber(date.getDate()) 
  let hour = normalizeNumber(date.getHours())
  let minutes = normalizeNumber(date.getMinutes())
  let seconds = normalizeNumber(date.getSeconds())
  return `${year}-${month}-${days} ${hour}:${minutes}:${seconds}`
}
```

## 格式：2019.10.31
```js
export function normalizeNumber (num) {
  return num > 9 ? num : `0${num}`
}
/*
  时间格式：2019.10.31
*/
export function normalizeTime (time) {
  let date = new Date(time)
  return `${date.getFullYear()}.${normalizeNumber(date.getMonth() + 1)}.${normalizeNumber(date.getDate())}`
}
```