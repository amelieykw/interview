// 实现自定义事件
// 编写一个简单的自定义事件处理器
// 1. 具备 on 方法绑定事件
// 2. 具备 off 方法解绑事件
function EventEmitter() {
  // TODO
  this._events = {};
  console.log("this._events = ", this._events);
}
EventEmitter.prototype.on = function (eventType, callback) {
  let callbacksOfThisEventType = this._events[eventType] || [];
  callbacksOfThisEventType.push(callback);
  this._events[eventType] = callbacksOfThisEventType;
  return this;
};
EventEmitter.prototype.off = function (eventType) {
  if (eventType === undefined) {
    this._events = {};
  } else if (this._events && this._events.hasOwnProperty(eventType)) {
    delete this._events[eventType];
  }
  console.log("this._events = ", this._events);
  return this;
};
EventEmitter.prototype.trigger = function (eventType, ...restArgs) {
  let callbacksOfThisEventType = this._events[eventType];
  callbacksOfThisEventType.forEach((fn) => fn.apply(this, ...restArgs));
  if (eventType !== "*") {
    this._events["*"].forEach((fn) => fn.apply(this, ...restArgs));
  }
  return this;
};
var emitter = new EventEmitter();
emitter.on("foo", function (e) {
  console.log("listening foo event 1", e);
});
emitter.on("foo", function (e) {
  console.log("listening foo event 2", e);
});
emitter.on("bar", function (e) {
  console.log("listening bar event", e);
});
// 监听全部事件
emitter.on("*", function (e) {
  console.log("listening all events");
});

console.log('=======> trigger foo');
emitter.trigger("foo", { name: "John" });

console.log('=======> trigger bar');
emitter.trigger("bar", { name: "Sun" });

console.log('=======> trigger all events');
emitter.trigger("*", { name: "Sun" });

console.log('=======> off one event');
emitter.off("foo");
emitter.off("bar");
emitter.off("*");
emitter.off("foo");

console.log('=======> off all events');
emitter.off();
