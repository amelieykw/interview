// 实现一个可以缓存其他函数的高阶函数memoize。能够实现：当入参相同时，可以不经过计算，直接返回结果。
/** 求平方根 */
function sqrt(n) {
  return Math.sqrt(n);
}
const memoize = (fn) => {
  // 实现
  this._cache = new Map();
  return function (...params) {
    const key = params[0];
    if (this._cache.has(key)) {
      console.log("get result directly from cache ?", this._cache.has(key));
      return this._cache.get(key);
    }
    const resultOfThisKey = fn.apply(this, params);
    this._cache.set(key, resultOfThisKey);
    console.log("need to calculate the result");
    return resultOfThisKey;
  };
};
const cachedSqrt = memoize(sqrt);
const resultOfStepOne = cachedSqrt(4); // 2
const resultOfStepTwo = cachedSqrt(4); // 不经过计算，直接输出结果2
