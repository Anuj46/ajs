// Classes - Classes are a “blueprint” of functionality:

// This is plain old js if i want multiple triangles then i've to make multiple myTri obj with different a and b
let myTri = {
  a: 3,
  b: 4,
  getAres: function () {
    return (this.a * this.b) / 2;
  },
  getHypotenuse: function () {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  },
};

// Defines the methods each instance of Triangle will have
// Class names should be UpperCamelCase
// Reduces confusion between tri1 (individual tri1) and Triangle (the class of all triangles)

class Triangle {
  getAre() {
    return (this.a * this.b) / 2;
  }
  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
}

// Make a new tri1 with new Triangle()
// Can still add/look at arbitrary properties
// this is “the actual triangle in question”
const tri1 = new Triangle(); // instantiation
console.log(tri1); // Triangle {}
tri1.a = 3;
tri1.b = 4;
console.log(tri1.getAre()); // 6
console.log(tri1.getHypotenuse()); // 5

// A tri1 is still fundamentally an object
console.log(typeof tri1); // 'object'

// JS knows it’s an “instance of” the Triangle class
console.log(tri1 instanceof Triangle); // true

// Now right now i've to manully set a and b every time for every instantiation.
// So, to overcome this we have concept of Constructors

class Triangle1 {
  constructor(sideA, sideB) {
    if (!Number.isFinite(sideA) || sideA <= 0)
      throw new Error(`Invalid sideA: ${sideA}`);

    if (!Number.isFinite(sideB) || sideB <= 0)
      throw new Error(`Invalid sideB: ${sideB}`);

    this.a = sideA;
    this.b = sideB;
  }
  getAre() {
    return (this.a * this.b) / 2;
  }
  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
  describe() {
    return "Hey There!!";
  }
}

// Any method named constructor will be called on making a new instance
const triangle = new Triangle1(3, 4); // <- calls constructor
console.log(triangle.getAre()); //6

// What can you do in the constructor?
// 1. Whatever you want!
// 2. Common things:
//    a. Validate data
//    b. Assign properties

// (Note that constructor functions always just return undefined)
console.log(Triangle1.constructor()); //[Function: anonymous]

// ********************************************************************************************************************************

// Practice
// BankAccount Class
// - Properties
//      - balance (default to 0 if not provided)
//      - accountHolder
//      - accountNumber
// - Methods
//      - deposit(amt) - increase balance by amt.
//      - withdraw(amt) - decrease balance by amt.

class BankAccount {
  constructor(accountNumber, accountHolder, balance = 0) {
    if (!Number.isFinite(accountNumber) || accountNumber <= 0)
      throw new Error(`Please enter the valid accountNumber`);

    if (typeof accountHolder !== "string" || !accountHolder)
      throw new Error(`Please enter the valid accountHolder name`);

    if (!Number.isFinite(balance) || balance < 0)
      throw new Error(`Please enter the valid balance`);

    this.b = balance;
    this.an = accountNumber;
    this.ah = accountHolder;
  }

  deposit(amt) {
    if (amt <= 0) return "Enter a valid amount to deposit";
    this.b += amt;
    return `Congrats, ${this.ah} your new Balance is ${this.b}`;
  }

  withdraw(amt) {
    if (amt <= 0) return "Enter a valid amount to withdraw";

    const newBalance = this.b - amt;

    if (newBalance < 0)
      return `Sorry, ${this.ah} you don't have enought balance to make this withdrawl. Balace = ${this.b}`;

    this.b = newBalance;
    return `${this.ah}, You have withdraw amount ${amt}. Balance = ${this.b}`;
  }
}

const bankAccount1 = new BankAccount(123, "Anuj", 1255);
console.log(bankAccount1.withdraw(100));
console.log(bankAccount1.deposit(200));
console.log(bankAccount1.withdraw(600));
console.log(bankAccount1.withdraw(100));
console.log(bankAccount1.deposit(-52));
console.log(bankAccount1.deposit(12));

// ********************************************************************************************************************************

// Methods
// Functions placed in a class are methods (formally, instance methods).
// They have access to properties of object with this.
// They take arguments/return data like any other function.
// In Triangle1 class getHypotenuse() and getAre() are methods.
// A method can call another method.
// Note: to call a method, you need to call it on this.
// Without this, calling getArea() throws a ReferenceError — it’s not in scope!

// ********************************************************************************************************************************

// Inheritance
// If I want an another class with all the same methods and proprties like Triangle1 class but
// only want to make some changes then I want to make a new class and repeat the common code. So, overcome
// this we have the Inheritance.

class ShyTriangle extends Triangle1 {
  // don't repeat if not different:
  // will "inherit" from "parent"
  describe() {
    return "(runs and hides)";
  }
}

let shy = new ShyTriangle(3, 4);
console.log("164", shy.getAre()); // 6
console.log("165", shy instanceof Triangle1); // true
console.log("166", shy instanceof ShyTriangle); // true

// Super

class Triangle2 {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  getArea() {
    return (this.a * this.b) / 2;
  }
  getHypotenuse() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
  describe() {
    return `Area is ${this.getArea()}.`;
  }
}

// This will not work
// ReferenceError!
// Must call parent’s constructor!
// But we want different logic here
// Also: half of describe() is duplicated

// class ColorTriangle extends Triangle2 {
//   constructor(a, b, color) {
//     this.a = a;
//     this.b = b;
//     this.color = color;
//   }

//   describe() {
//     return `Area is ${this.getArea()}.` + ` Color is ${this.color}!`;
//   }
// }

class ColorTriangle extends Triangle2 {
  constructor(a, b, color) {
    // call parent constructor w/(a, b)
    super(a, b);
    this.color = color;
  }
  // "inherits" getArea, getHypotenuse
  // "override" describe() w/new version
  describe() {
    return super.describe() + ` Color is ${this.color}!`;
  }
}

// ********************************************************************************************************************************

// Static properties
// Modern JS also offers “static properties”, where individual pieces of data are on the class, not on instances.
// other Other languages often call this idea a “class attribute”
class CatWithStaticProp {
  constructor(name) {
    this.name = name;
  }

  // good example of a static property --
  // all instances of cats are the same species;
  // it doesn't vary from one cat to another
  static genusSpecies = "feline catus";

  describe() {
    return `${this.name} is a ${CatWithStaticProp.genusSpecies}`;
  }
}

const poorCat = new CatWithStaticProp("Pussy");

console.log(CatWithStaticProp.genusSpecies); // feline catus
console.log("first", poorCat); // { name: 'Pussy' } it doesn't print genusSpecies because it doesn't exist with instance else it exist with class

CatWithStaticProp.genusSpecies = "feline catus nahi hai";

console.log("244", CatWithStaticProp.genusSpecies); // feline catus nahi hai

// Static methods
// JS gives us “static methods”, where the method is called on a Class, not an object
// — therefore it cannot have access to individual object attributes

class CatWithStaticMethod {
  constructor(fname) {
    this.fname = fname;
  }

  static myStaticMethod() {
    console.log("myStaticMethod this =", this);
  }

  myMethod() {
    console.log("myMethod this = ", this);
  }
}

const fluffyWithStatic = new CatWithStaticMethod("Fluffy");
fluffyWithStatic.myMethod();
CatWithStaticMethod.myStaticMethod();

// Almost every other Other language more properly calls this a “class method” not a static method – since it does have access to this class itself
// (that’s what the “this” is in a JS “static method”)

// More consistent Other languages, like C++/Java/Python, also have true static methods, where they don’t have access to the class itself.
// Common useCase for Static Methods

class MyMath {
  static add(a, b) {
    return a + b;
  }
  static sub(a, b) {
    return b - a;
  }
}

console.log("283", MyMath.add(2, 6)); // 8
console.log("284", MyMath.sub(2, 9)); // 7

const findIndex = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

class CatWithAnotherStaticMethod {
  constructor(fname) {
    this.fname = fname;
  }

  static myStaticMethod() {
    const names = ["a", "b", "c", "d"];
    const name = findIndex(names);
    return new CatWithAnotherStaticMethod(name, "PATA NAHI KYA HAI");
  }

  meow() {
    return `${this.fname} says meow`;
  }
}

const billi = new CatWithAnotherStaticMethod("Desi Billi");

console.log("308", billi.meow()); // Desi Billi says meow
console.log("309", CatWithAnotherStaticMethod.myStaticMethod());

// ********************************************************************************************************************************

// Implement a class named ArrayUtils that cannot be instantiated and contains static methods average and max. If the class is
// instantiated throw an error with the message 'ArrayUtils cannot be instantiated.'

// The average method should return the average of an array of numbers. If the array is empty, throw an error with the message
// 'Array cannot be empty.'

// The max method should return the largest number from an array of numbers. You can assume you will always get passed an
// arrray of numbers

class ArrayUtils {
  constructor() {
    throw new Error("ArrayUtils cannot be instantiated.");
  }
  static average(arr) {
    if (arr.length === 0) throw new Error("This can't take an empty arr");

    let sum = 0;
    for (let val of arr) {
      if (typeof val !== "number")
        throw new Error("All elements in an array must be a number");

      sum += val;
    }
    return sum / arr.length;
  }
}

// const arrayUtilsKaInstanceBaneKiKosis = new ArrayUtils(); // throws error ArrayUtils cannot be instantiated.

console.log("339", ArrayUtils.average([52]));

// ********************************************************************************************************************************

// Getters and Setters
// JavaScript provides special methods, termed “getters” and “setters”, which allow you to
//  define the ways to retrieve or change the values of object properties respectively.

class Circle {
  constructor(radius) {
    this._radius = radius;
    this._diameter = this._radius * 2;
  }
}

const gola = new Circle(2);

console.log("359", gola._radius); // 2
console.log("360", gola._diameter); // 4
gola._radius = 5;
console.log("362", gola._radius); // 5
console.log("363", gola._diameter); // 4 (THis gets updated but _diameter depends on radius always)

class NayaCircle {
  constructor(radius) {
    this._radius = radius;
  }

  get diameter() {
    return this._radius * 2;
  }

  get radius() {
    return this._radius;
  }
}

const nayaGola = new NayaCircle(2);

console.log("381", nayaGola.radius); // 2
console.log("381", nayaGola.diameter); // 4
nayaGola._radius = 10; // and the variable with name starting with _ tells other developer that this vaiable is not for change directly. (just a naming convention)
console.log("384", nayaGola.radius); // 10
console.log("385", nayaGola.diameter); // 20
// console.log("386", nayaGola.diameter()); // throws error (nayaGola.diameter is not a function)

// Setters
// Allow you to set the value of an object’s property.

class AurNayaCircle {
  constructor(radius) {
    this._radius = radius;
  }

  set radius(value) {
    if (value < 0) throw new Error("Radius must be grater than 0");
    this._radius = value;
  }
}

const aurNayaGola = new AurNayaCircle(2);
this.radius = 10; // Now we are not directly updating the _radius
console.log("401", aurNayaGola._radius); // 10

// ********************************************************************************************************************************
// Example :-

class User {
  constructor(fname, lname) {
    this._fName = fname;
    this._lastName = lname;
  }

  get fullName() {
    return `${this._fName} ${this._lastName}`;
  }

  set fullName(val) {
    const nameArr = val.split(" ");
    this._fName = nameArr[0];
    this._lastName = nameArr[1];
  }
}

const naam = new User("Anuj", "Naruka");

console.log("428", naam.fullName); // Anuj Naruka
naam.fullName = "Andu Pandu";
console.log("433", naam._fName); // Andu
console.log("431", naam._lastName); //Pandu

// ********************************************************************************************************************************

// Class Fields (public and private)
// Private instance class fields provide a way to maintain encapsulation and not allow external access.

class MyClass {
  // Public field
  publicField = "Public Field";

  // Private field (this can't be accesses outside the class)
  #privateField = "Private Field";

  getPrivateField() {
    return this.#privateField;
  }
}

const instance = new MyClass();
console.log(instance.publicField); // 'Public Field'
console.log(instance.getPrivateField()); // 'Private Field'
// console.log(instance.#privateField()); // Error

class NayiCat {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  // Getter for the cat's age
  get age() {
    return this.#age;
  }
}

const whiskers = new NayiCat("Pickle", 3);
console.log(whiskers.age); // 3 (Here, the age getter allows us to access the value of the private #age field indirectly.)

class AurNayiCat {
  #name;

  constructor(name) {
    this.#name = name;
  }

  // Setter to change the cat's name
  set name(newName) {
    if (newName.trim().length === 0) {
      throw new Error("Name cannot be empty!");
    } else {
      this.#name = newName;
    }
  }

  // Getter to retrieve the cat's name
  get name() {
    return this.#name;
  }
}

const blue = new AurNayiCat("blue");
blue.name = "Furry";
console.log(blue.name); // Furry
// blue.name = ""; // Name cannot be empty! (The name setter validates that the name isn’t an empty string before updating the private #name field. The name getter then allows us to retrieve the current name.)

// ********************************************************************************************************************************

// Static Initalization Block
// A static initialization block in JavaScript is a block of code inside a class that executes once when the
//  class is defined (evaluated), not when an instance of the class is created.
// 1. A static block runs only once per class, when the class itself is evaluated, not when an instance is created.
// 2. The static block is useful for initializing static fields or performing setup work that belongs to the class itself.

class Config {
  static settings;

  static {
    this.settings = { theme: "dark", version: 1 };
  }
}

console.log("516", Config.settings); // { theme: "dark", version: 1 }

// ********************************************************************************************************************************
