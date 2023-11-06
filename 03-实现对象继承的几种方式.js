/**
 * 实现对象继承的几种方式，以及它们的优缺点
 */

/**
 * 原型链继承**：让子类的原型对象指向父类的实例对象，从而继承父类的属性和方法。
 *  - 优点：实现简单，实例可以继承父类构造函数属性，父类原型的属性和方法。
 *  - 缺点：无法向父类传递参数，继承单一，所有实例共享父类实例的属性，修改一个实例的属性会影响其他实例。
 */

// 定义一个动物类
{
  function Animal(name) {
    // 属性
    this.name = name || "Animal";
    // 实例方法
    this.sleep = function () {
      console.log(this.name + "正在睡觉！");
    };
  }
  // 原型方法
  Animal.prototype.eat = function (food) {
    console.log(this.name + "正在吃：" + food);
  };

  // 定义一个猫类
  function Cat() {}
  // 继承Animal
  Cat.prototype = new Animal();
  Cat.prototype.name = "cat";

  // 测试
  let cat = new Cat();
  console.log(cat.name); // cat
  console.log(cat.eat("fish")); // cat正在吃：fish
  console.log(cat.sleep()); // cat正在睡觉！
}

/**
 * 借用构造函数继承：在子类的构造函数中调用父类的构造函数，从而继承父类的属性。
 *  - 优点：可以向父类传递参数，每个实例都有自己的属性，不会相互影响。
 *  - 缺点：无法继承父类原型的属性和方法，每次创建实例都要重新调用父类的构造函数，造成性能损耗。
 */

// 定义一个动物类
{
  function Animal(name) {
    // 属性
    this.name = name || "Animal";
    // 实例方法
    this.sleep = function () {
      console.log(this.name + "正在睡觉！");
    };
  }
  // 原型方法
  Animal.prototype.eat = function (food) {
    console.log(this.name + "正在吃：" + food);
  };

  // 定义一个猫类
  function Cat(name) {
    // 继承属性
    Animal.call(this, name);
  }
  // 测试
  let cat = new Cat("Tom");
  console.log(cat.name); // Tom
  console.log(cat.sleep()); // Tom正在睡觉！
  console.log(cat instanceof Animal); // false
  console.log(cat instanceof Cat); // true
  console.log(cat.eat("fish")); // 报错，无法继承父类原型的方法
}
/**
 * 组合继承：结合原型链继承和借用构造函数继承，既能继承父类的属性，又能继承父类原型的属性和方法。
 *  - 优点：可以向父类传递参数，每个实例都有自己的属性，也可以继承父类原型的属性和方法，是最常用的继承方式之一。
 *  - 缺点：会调用两次父类的构造函数，造成一定的冗余和效率问题。
 */

// 定义一个动物类
{
  function Animal(name) {
    // 属性
    this.name = name || "Animal";
    // 实例方法
    this.sleep = function () {
      console.log(this.name + "正在睡觉！");
    };
  }
  // 原型方法
  Animal.prototype.eat = function (food) {
    console.log(this.name + "正在吃：" + food);
  };

  // 定义一个猫类
  function Cat(name) {
    // 继承属性
    Animal.call(this, name);
  }
  // 继承方法
  Cat.prototype = new Animal();
  Cat.prototype.constructor = Cat;

  // 测试
  let cat = new Cat("Tom");
  console.log(cat.name); // Tom
  console.log(cat.sleep()); // Tom正在睡觉！
  console.log(cat instanceof Animal); // true
  console.log(cat instanceof Cat); // true
  console.log(cat.eat("fish")); // Tom正在吃：fish
}
/**
 * 原型式继承：利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型，然后返回这个空对象的实例，从而实现对某个对象的继承。
 *  - 优点：不需要创建自定义的构造函数，可以实现对某个对象的浅复制。
 *  - 缺点：无法向父对象传递参数，所有实例共享父对象的属性，修改一个实例的属性会影响其他实例。
 */
// 定义一个对象
{
  let person = {
    name: "John",
    friends: ["Tom", "Jerry", "Bob"],
  };

  // 定义一个原型式继承的函数
  function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }

  // 测试
  let person1 = object(person);
  person1.name = "Tom";
  person1.friends.push("Lucy");

  let person2 = object(person);
  person2.name = "tom";
  person2.friends.push("Jack");

  console.log(person.friends); // ["Tom", "Jerry", "Bob", "Lucy", "Jack"]
}
/**寄生式继承**：在原型式继承的基础上，增强对象，返回构造函数的实例，从而实现对某个对象的继承。⁵
    - 优点：可以对继承的对象进行扩展，增加新的属性和方法。
    - 缺点：无法向父对象传递参数，所有实例共享父对象的属性，修改一个实例的属性会影响其他实例，每次创建实例都要创建新的方法，造成性能损耗。
*/
// 定义一个对象
{
  let person = {
    name: "web前端",
    friends: ["Tom", "Jerry", "Bob"],
  };

  // 定义一个原型式继承的函数
  function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }

  // 定义一个寄生式继承的函数
  function createAnother(original) {
    let clone = object(original); // 通过调用函数创建一个新对象
    clone.sayHi = function () {
      // 以某种方式来增强这个对象
      console.log("hi");
    };
    return clone; // 返回这个对象
  }

  // 测试
  let person1 = createAnother(person);
  person1.name = "Tom";
  person1.friends.push("Lucy");
  person1.sayHi(); // hi

  let person2 = createAnother(person);
  person2.name = "tom";
  person2.friends.push("Jack");
  person2.sayHi(); // hi

  console.log(person.friends); // ["Tom", "Jerry", "Bob", "Lucy", "Jack"]
}
/**
 * 寄生组合式继承：结合寄生式继承和组合继承，通过寄生方式，继承父类原型，然后将结果指定给子类原型，从而实现对父类的继承。
 *  - 优点：可以向父类传递参数，每个实例都有自己的属性，也可以继承父类原型的属性和方法，避免了调用两次父类构造函数的问题，是最理想的继承方式之一。
 *  - 缺点：实现较复杂，需要创建一个中间对象作为桥梁。
 */
// 定义一个动物类
{
  function Animal(name) {
    // 属性
    this.name = name || "Animal";
    // 实例方法
    this.sleep = function () {
      console.log(this.name + "正在睡觉！");
    };
  }
}
