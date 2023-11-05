/**
 * JS 箭头函数的 this 是指向定义时的 this，而不是执行时的 this。这意味着箭头函数不会根据调用者的不同而改变 this 的指
 * 向，而是继承了外层作用域的 this 值。
 */

// 定义一个对象，有一个 name 属性和一个 sayHello 方法
const obj = {
  name: "Alice",
  sayHello: function () {
    console.log("Hello, I am " + this.name);

    const arrowFunc = () => {
      console.log("This is " + this.name);
    };
    arrowFunc();
  },
};

// 调用 obj 的 sayHello 方法
obj.sayHello();
// 输出：
// Hello, I am Alice
// This is Alice

// 将 obj 的 sayHello 方法赋值给一个变量
let func = obj.sayHello;
// 调用这个变量
func();
// 输出：
// Hello, I am undefined
// This is undefined
