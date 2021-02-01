// 形式
// foo(arr1, arr2, ..., arrN) => arr0

// 示例
function foo1() {}
function foo2() {}
const arr1 = [1, true, 'a', foo1, null, {"a": "A", "b": "B"}, [true]];
const arr2 = ['1', {"a": "A"}, 1, false, [true], ['true'], foo1, 1, foo2, null];
const arr3 = [{"a": "A"}, 1, foo2, ['true']];
const arr4 = [{"a": "A", "b": foo1}, 1, foo1, ['true']];
// 期望结果
// run(arr1, arr2) => [1, foo1, null, [true]];
// run(arr2, arr3) => [{"a": "A"}, 1, ['true'], foo2];
// run(arr1, arr2, arr3) => [1];

let JSONfnStringify = function(obj) {
    return JSON.stringify(obj,function(key, value){
        return (typeof value === 'function' ) ? value.toString() : value;
    });
}
// iterative reduction
let foo = function(arr1, arr2, ...arr3) {
    let arrs = [...arguments].reduce((prev, curr) => [...prev].filter(i =>
        (typeof i === 'object' && JSONfnStringify([...curr]).includes(JSONfnStringify(i))) || [...curr].includes(i)
    ))
    return [...new Set(arrs)]
}

console.log('foo(arr1, arr2) = ', foo(arr1, arr2))
console.log('foo(arr2, arr3) = ', foo(arr2, arr3))
console.log('foo(arr3, arr2) = ', foo(arr3, arr2))
console.log('foo(arr1, arr2, arr3) = ', foo(arr1, arr2, arr3))
console.log('foo(arr1, arr2, arr3, arr4) = ', foo(arr1, arr2, arr3, arr4))