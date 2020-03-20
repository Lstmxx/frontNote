## 最小的K个数

## 解题思路
### 这道题一共有三种解题方法
### **一、快排**
#### 利用快排找标杆值的做法可以不用排序完整个数组就能找到需要的范围值。找到标杆位置等于k时便跳出循环即可。
### **找标杆位置**
### 把标杆位置的左右划分好，返回标杆位置的下标。双指针遍历前后，当right找到比标杆值小，left找到比标杆值大，并且left >= right时，left和right交换。
```js
function partition (arr, start, end) {
  let left = start + 1
  let right = end
  const k = arr[start]
  while(1) {
      while(left <= end && arr[left] <= k) left++
      while(start + 1 <= right && arr[right] >= k) right--
      if (left >= right) {
          break
      }
      const temp = arr[left]
      arr[left] = arr[right]
      arr[right] = temp
      left++
      right--
  }
  arr[start] = arr[right]
  arr[right] = k
  return right
}
```
### 找到标杆位置index后，因为标杆位置左边的肯定比标杆位置小，右边肯定比标杆位置大，所以，如果目标k和index不等，k > index时，证明只需要排剩下的index + 1到right的值，如果k < index的时候，只需要排left到index - 1的值就好了。
```js
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    if (k >= arr.length) return arr
    let left = 0
    let right = arr.length - 1
    let index = partition(arr, left, right)
    while(index !== k) {
        if (index < k) {
            left = index + 1
            index = partition(arr, left, right)
        } else if (index > k) {
            right = index - 1
            index = partition(arr, left, right)
        }
    }
    return arr.slice(0, k)
};

```
### **二、堆**
#### 待续。

### **三、先排序再取值**
#### sort一下去前K个就好了。
