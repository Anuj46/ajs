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

// Make a new triangle with new Triangle()
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
