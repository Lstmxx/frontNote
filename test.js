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