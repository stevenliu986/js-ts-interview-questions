/**
 * 在JavaScript中，有多种方法可以创建对象。以下是常见的方法。
 */

// 1. 使用对象字面量（Object Literal）
const obj01 = {};

// 2. 使用构造函数（Constructor Functions）
function Person01(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new Person("John", 30);

// 3. 使用Object.create()
const obj02 = Object.create(null); // 创建一个空对象，没有原型

// 4. 使用工厂函数（Factory Functions）
function createPerson(name, age) {
  const person = {};
  person.name = name;
  person.age = age;
  return person;
}
const person01 = createPerson("John", 30);

// 5. 使用ES6类（Class）
class Person02 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}
const person02 = new Person("John", 30);
console.log(person02.getName(), person02.getAge());

// 6. 使用Object.assign()
const obj1 = { name: "John" };
const obj2 = { age: 30 };
const obj03 = Object.assign({}, obj1, obj2);
// 也可以使用...运算符来创建，但此时要注意key不能重复，否则会将前面的替换掉
const obj05 = { ...obj1, ...obj2 };

// 7. 使用对象的原型
const obj04 = Object.prototype; // 创建一个空对象，其原型为Object.prototype
