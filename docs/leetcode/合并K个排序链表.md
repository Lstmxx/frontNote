
# 合并K个排序链表

链接：<a href='https://leetcode-cn.com/problems/merge-k-sorted-lists/'>https://leetcode-cn.com/problems/merge-k-sorted-lists/</a>
## 解题思路
### 大体框架：暴力破解。

## 解题答案
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    let res = new ListNode()
    if (lists.length === 0) {
        return res.next
    }
    let head = res
    let newList = []
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] && lists.length !== 0) {
            newList.push(lists[i])
        }
    }
    if (newList.length === 0) {
        return res.next
    }
    while(newList.length > 1) {
        let selectIndex = -1
        let min = Number.MAX_VALUE
        head.next = new ListNode(0)
        head = head.next
        for (let i = 0; i < newList.length; i++) {
            if (min > newList[i].val) {
                min = newList[i].val
                selectIndex = i
            }
        }
        head.val = min
        if (newList[selectIndex].next) {
            newList[selectIndex] = newList[selectIndex].next
        } else {
            newList.splice(selectIndex, 1)
        }
    }
    head.next = newList[0]
    return res.next
};
```