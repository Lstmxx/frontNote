const reg = /(?=(\d{3})+(?!\d))/g
const str = '20190214'
console.log(str.replace(reg, (match, $1) => {
    return ','
}))

const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)
const start = StartScore(0)
console.log(start)

var waysToChange = function(n) {
    let res = 0
    function count (target) {
        if (target === 0) {
            res++
            return true
        }
        if (target < 0) {
            return false
        }
        count(target - 25)
        count(target - 10)
        count(target - 5)
        count(target - 1)
    }
    count(n)
    return res
};
waysToChange(10)

let arr = [[1, 2, 3], [2, 4, 5], [7, 8, 9]]

arr = arr[0].map(function(col, i) {
    return arr.map(function(row) {
        return row[i]
    })
})


/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.minList = {
        val: null,
        next: null
    }
    this.stackArray = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stackArray.push(x)
    if (this.minList.val === null) {
        this.minList.val = x
    } else {
        let pre = this.minList
        let back = pre.next
        while (pre) {
            if (pre.val > x) {
                const newPre = {
                    val: x,
                    next: pre
                }
                pre = newPre
                this.minList = pre
                break
            } else if (back === null) {
                pre.next = {
                    val: x,
                    next: null
                }
                break
            } else if (back.val >= x) {
                const next = {
                    val: x,
                    next: back
                }
                pre.next = next
                break
            }
            pre = pre.next
            back = pre.next || null
        }
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    const last = this.stackArray.pop()
    let pre = this.minList
    let back = pre.next
    if (pre.val === last) {
        this.minList = this.minList.next || {
            val: null,
            next: null
        }
    } else {
        while (back) {
            if (back.val === last) {
                pre.next = back.next
                break
            }
            pre = pre.next
            back = pre.next
        }
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stackArray[this.stackArray.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.minList.val
};
