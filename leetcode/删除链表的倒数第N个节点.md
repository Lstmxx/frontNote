# 删除链表的倒数第N个节点

## 链接：https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/
## 解题思路
### 大体框架：指针。
### 细节
- 设定一个指针second为头结点的后N个，指针first为头结点指针
- 当second为null的时候，直接返回first.next便可
- 然后同时移动指针second和指针first，当指针second移动到末尾时候便可以修改移动后的first指针了
## 解题答案
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    if (!head.next) {
        return head.next
    }
    let first = head
    let back = head
    for (let i = 0; i < n; i++) {
        back = back.next
    }
    if (back === null) {
        return first.next
    } else {
        while(back.next) {
            first = first.next
            back = back.next
        }
        first.next = first.next.next
    }
    return head
}; 
```