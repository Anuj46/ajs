const obj = {
  name: "ANuj",
  city: "La",
  sing: function () {
    return `${this.name} LA lA LA ALAAL`;
  },
};

console.log("9", obj.sing()); // ANuj LA lA LA ALAAL

const aSing = obj.sing;

console.log("13", aSing()); // undefined LA lA LA ALAAL

class Cat {
  constructor(firstName) {
    this.firstName = firstName;
  }

  dance(style = "tango") {
    return `Meow, I am ${this.firstName}` + ` and I like to ${style}`;
  }
}

let fluffy = new Cat("Fluffy");

console.log("27", fluffy.dance("tango")); // Meow, I am Fluffy and I like to tango

let fDance = fluffy.dance;

// console.log("31", fDance("salsa")); // ERROR - Cannot read properties of undefined (reading 'firstName')

// JavaScript “Functions”
// In a sense, JavaScript doesn’t have functions.
// Everything is called on something, like a method.

function whatIsThis() {
  console.log("this =", this);
}

// whatIsThis();

// Global Object
// whenever you are calling an function its calling on global object.
// => In browser JS, that’s typically window (the browser window)
// => in NodeJS, that’s global (where some Node utilities are)
// console.log("Hi!");
// window.console.log("Hi!");  // <-- same thing!:
// Therefore, a “function” called at the top level is same as :- window.whatIsThis() [in browser]

// Explain

// fluffy.dance("tango") (Find the dance method on fluffy and then Find the dance method on fluffy)
// let fDance = fluffy.dance;  (Find the dance method on fluffy)
// fDance("tango");            (Call the dance method on… undefined? ut oh)
// When you call a function on nothing, but the function comes from inside a class, the value of this will be undefined, not the window.
// In either case, you’ll see this referred to as “losing the this context.”

// Fortunately, there are ways to force the value of this to be whatever we want.

// Call
// Sometimes, you’ll need to say “call this function on this object”
// That’s what call() is for!

class Cat2 {
  constructor(firstName) {
    this.firstName = firstName;
  }

  dance(style = "tango") {
    return `Meow, I am ${this.firstName}` + ` and I like to ${style}`;
  }
}

let billi = new Cat2("Desi Billi");

console.log("77", billi.dance("mooooooooo")); //Meow, I am Desi Billi and I like to mooooooooo

const bDance = billi.dance;

console.log(bDance.call(billi, "hahahaahah")); // Meow, I am Desi Billi and I like to hahahaahah

const person1 = {
  name: "Anuj",
  city: "La",
  sing: function (mood = "happy", surname = "naruka") {
    return `${this.name} ${surname} LA lA LA ALAAL and is ${mood}`;
  },
};

const person2 = {
  name: "Maya",
};

console.log("95", person1.sing()); // Anuj naruka LA lA LA ALAAL and is happy
console.log("96", person1.sing.call(person2, "sad", "singh")); //  Maya singh LA lA LA ALAAL and is sad

// Apply
// same as call but there is little difference i.e how it handle arguments, it takes array of arguments.

const asg = person1.sing.apply(person2, ["very sad", "Jaat"]);

console.log("101", person1.sing.apply(person2, ["very sad", "Jaat"])); //  Maya Jaat LA lA LA ALAAL and is very sad

// So, IF want to call sing function on person2 with different arguments then i've to call or aplly every time with person1
// and its a tedious task. So overcome this problem we have bind method.
// You can permanently bind a function to a context and it returns a new function.
// bind() is a method on functions that returns a bound copy of the function.

const newBindFunction = person1.sing.bind(person2);

console.log("112", newBindFunction("very very Happy", "Dillo")); //  Maya Dillo LA lA LA ALAAL and is very very Happy

// Binding Arguments
// You can also bind arguments to functions. That will bake them into the function.

const bindFun = person1.sing.bind(person2, "Always Happy"); // Now it creates a new function bindFun of sing which is bind to person2 and first argument is always "Always Happy"

console.log("120", bindFun("Gurjar")); //Maya Gurjar LA lA LA ALAAL and is Always Happy

// Example
function applySalesTax(taxRate, price) {
  return price + price * taxRate;
}

const newTax = applySalesTax.bind(null, 0.28);

console.log("128", newTax(100)); // 128

// So where we need these call,apply and bind methods
// When you do not directly call functions and instead JavaScript calls them, a keyword this is created for you.
// => Event Listeners
// => Timers
// => Callback functions (map, filter, etc)

// use cases of bind

class Counter {
  constructor(start, interval) {
    this.count = start;
    this.countInterval = interval;
  }

  start() {
    setInterval(this.increament, 1000);
  }

  increament() {
    console.log("149", this.count);
    this.count += this.countInterval;
  }
}

const badath = new Counter(100, 50);

// badath.start(); // undefined /n Nan /n Nan /n Nan /n Nan /n Nan /n Nan /n Nan /n Nan /n Nan /n Nan /n Nan /n Nan .........

// this happen because the 'this' in setInterval points to global object

class Counter2 {
  constructor(start, interval) {
    this.count = start;
    this.countInterval = interval;
  }

  start() {
    setInterval(this.increament.bind(this), 1000);
  }

  increament() {
    console.log("171", this.count);
    this.count += this.countInterval;
  }
}

const asliBadth = new Counter2(0, 100);

// asliBadth.start(); // 0 /n 100 /n 200 /n 300 /n 400 /n 500 .........

// Arrow function

class NewPerson {
  constructor(firstName) {
    this.firstName = firstName;
  }

  superGreet() {
    // Now here with arrow functions 'this' points to the the instance of the class
    setInterval(() => {
      console.log(`#3 I am ${this.firstName}`);
    }, 1000);
  }
}

let banda = new NewPerson("Anuj");
// banda.superGreet(); // I am Anuj /n I am Anuj /n I am Anuj /n I am Anuj /n I am Anuj /n I am Anuj /n I am Anuj /n I am Anuj .....

// ****************************************************************************************************************************************

// Key Takeaways
// 'this' is a reserved keyword whose value is determined only at the point of function execution.
// If you don’t call a function yourself (eg, it’s called by a callback), you need to ensure JS knows what the 'this' context should be.

// ****************************************************************************************************************************************

// JS OO under the hood
// => new
// => prototypes
// => constructor
// => Object.getPrototypeOf
// => prototypal inheritance

// new
// 1. Creates an empty object
// 2. Sets the keyword 'this' to be that object
// 3. Returns the object - return 'this'
// 4. Creates a link to the object’s prototype

function Dog(name, breed) {
  this.name = name;
  this.breed = breed;
}

console.log("224", Dog("kutta", "kala")); // undefined

function NayaDog(name, breed) {
  this.name = name;
  this.breed = breed;
}

console.log("231", new NayaDog("kutta", "kala")); //  NayaDog { name: 'kutta', breed: 'kala' } [so here what happen is new creates an empty object bind 'this' keyword to that object and returns the object]

// Prototype

class Dog2 {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  bark() {
    return `${this.name} of breed ${this.breed} is sleeping`;
  }
}

const desiKalu = new Dog2("kalu", "chitkabra"); // Dog2 { name: 'kalu', breed: 'chitkabra' } [where does bark() goes]
console.log("247", desiKalu.bark()); // kalu of breed chitkabra is sleeping [this works (cause instance of class ony have refrance of function bark)]
console.log("248", desiKalu);
const desiBhura = new Dog2("Bhura", "Desi");
console.log("250", desiKalu.bark === desiBhura.bark); // true [cause they are same functions]

function NewDog2(name, breed) {
  this.name = name;
  this.breed = breed;
  this.bark = function () {
    return `${this.name} of breed ${this.breed} is sleeping`;
  };
}

console.log("260", new NewDog2("Sam", "pug")); // NewDog2 { name: 'Sam', breed: 'pug', bark: [Function (anonymous)] } [this has bark cause bark sits in the object (or instance) which is made by the new keyword. So, if we make new NewDog2 10 times then we have 10 copies of bark function ]

console.log("262", new NewDog2("Sam", "pug") === new NewDog2("sally", "Boxer")); // false

// So how we can achive that happen in class in this NewDog2 constructor
// In JavaScript, every object has a special internal property called its prototype.
// This prototype is itself an object, and it serves as a blueprint or a parent from
// which the object inherits properties and methods. generally its __proto__

console.dir(desiBhura.__proto__, { showHidden: true });
// returns
{
  /* <ref *1> {
  [constructor]: [class Dog2] {
    [length]: 2,
    [name]: 'Dog2',
    [prototype]: [Circular *1]
  },
  [bark]: [Function: bark] { [length]: 0, [name]: 'bark' }
} */
}

function AbAurNayaDog(name, breed) {
  this.name = name;
  this.breed = breed;
}

// now the bark function sits on the contructor AbAurNayaDog not on the instance and with the help of new keyword we bind to the instance
// Every function has a property on it called prototype
// The prototype object has a property called constructor which points back to the function
// When the new keyword is used to invoke a function, a link between the object created from new and the prototype object is established
// This link is called the internal prototype and can be accessed using Object.getPrototypeOf()
AbAurNayaDog.prototype.bark = function () {
  return `${this.name} of breed ${this.breed} is sleeping`;
};

console.log("292", new AbAurNayaDog("kutta", "kala").bark()); // kutta of breed kala is sleeping

console.log(
  "294",
  new AbAurNayaDog("kutta", "kala").bark ===
    new AbAurNayaDog("bhura", "kala").bark
); // true

// prototype chain

const grandParent = {
  greet() {
    return "Hi there !!!";
  },
};

const parent = {
  color: "red",
  sing() {
    return "La La La La";
  },
  __proto__: grandParent,
};

const child = {
  num: 2,
  __proto__: parent,
};

console.log("325", child.greet()); // Hi there !!!

// The purpose of the prototype
// JavaScript uses this object to find methods and properties on everything in JS!
// If a property can not be found, JS works it’s way up the “prototype chain”, finding the prototype of every object
// If the property can not be found, undefined is returned

// __proto__ vs prototype
// __proto__ is an internal property.

console.log("335", Object.getPrototypeOf(child)); // { color: 'red', sing: [Function: sing] } // this is same as child.__proto__

Object.setPrototypeOf(child, { baccha: true }); // set the Prototype

console.log("339", Object.getPrototypeOf(child));
