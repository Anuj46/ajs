// Goals
// 1. Examine callbacks in context of asynchronicity
// 2. Understand role of promises
// 3. Understand role of async / await
// 4. See common patterns and how to solve with async / await

// callbacks
// A callback is a function passed to another function, for it to call.
// => Functional Programming Patterns (like in map,filter,etc.) [Useful for separating processing patterns from business logic.]
// => Event-Driven Programming (Register a function to be called when an event happens.)
// => Asynchronous Code (Call those callbacks when asynchronous operation completes.)

// Why Not This?

// pause for a second
// stopHere(1000);
// now this code runs

// get via AJAX
// var response = ajaxLibrary.get("/page");
// now we have response

// Because
// => JS is single-threaded, only one bit of code can run at once
// => If JS actually stopped there, it couldn’t do other things
//      - Respond to events (clicks in browser, etc)
//      - Repaint DOM changes in browser

// So, by having a callback function for “once-async-thing-is-done”,
// JS can finish running your code as quickly as possible.
// This way it can get to those other waiting tasks ASAP.

// Sequential callbacks can lead to hard-to-understand code:

// eg- ajaxLib.get("/step-1", function f2(resp) {
//      ajaxLib.get("/step-2", {resp.body}, function f3(resp) {
//       ajaxLib.get("/step-3", {resp.body}, function done(resp) {
//        console.log("got final answer", resp.body);
//       });
//     });
//   });

// This is often called “callback hell” OR "Prymaid of doom"

// ****** PROMISES ************************************************
//Promises provide an alternate way to think about asynchronicity.
// A promise is one-time guarantee of future value.
// => Promises in JavaScript are objects
// => They are native to the language as of ES2015
// => A promise can be in one of three states:
//      - Pending - It doesn’t yet have a value
//      - Resolved - It has successfully obtained a value
//      - Rejected - It failed to obtain a value for some reason
// => The only way to access the resolved or rejected value is to chain a method on the end of the promise (or await it)

// .then and .catch
// => Promises provide a .then and a .catch, which both accept callbacks.
// => The callback to .then will run if the promise is resolved, and has access to the promise’s resolved value.
// => The callback to .catch will run if the promise is rejected, and typically has access to some reason behind the rejection.

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

const url = `${BASE_URL}/1`;

// fetch(url)
//   .then((data) => {
//     console.log("data", data);
//   })
//   .catch((error) => {
//     console.log("ERROR!!!", error);
//   });

//   suppose we want to call ${BASE_URL}/1 after its completion ${BASE_URL}/2 and so on

// fetch(`${BASE_URL}/1`)
//   .then((data) => {
//     console.log("POD1", data);
//     fetch(`${BASE_URL}/2`)
//       .then((data2) => {
//         console.log("POD2", data2);
//       })
//       .catch((error) => {
//         console.log("POD ERROR", error);
//       });
//   })
//   .catch((error) => {
//     console.log("POD ERROR", error);
//   });

// Now this is callback hell or Prymaid of doom
// Now we flaten this by using promise chaining.
// When calling .then on a promise, can return new promise in callback!
// Can chain asynchronous operations together with .then calls
// Only need one .catch at the end—don’t have to catch every promise

// fetch(`${BASE_URL}/1`)
//   .then((data) => {
//     console.log("promise chaining 1", data);
//     return fetch(`${BASE_URL}/2`);
//   })
//   .then((data2) => {
//     console.log("promise chaining 2", data2);
//     return fetch(`${BASE_URL}/3`);
//   })
//   .then((data3) => {
//     console.log("promise chaining 3", data3);
//   })
//   .catch((error) => {
//     console.log("EEEEEEEEEEEEERRRRRRRRRRRRRRRRRRR", error);
//   });

// Benefits of Promises Over Callbacks
// Easier to write good functions
// => Each step doesn’t have be tied directly to next step
// => With promises, .then method can just return value for next without having to itself know what comes next

// ******************** Async / Await *********************************
// async / await are language keywords for working with promises.
// You can declare any function in JavaScript as async
// async functions always return promises!
// In async function, you write code that looks synchronous But it doesn’t block JavaScript
// Inside an async function, we can use await
// await pauses execution
// await waits for promise to resolve & evaluates to its resolved value
// It then resumes execution
// Think of the await keyword like a pause button

// const fetApiFunction = async () => {
//   try {
//     const response = await fetch(url);
//     console.log("await response", response);
//   } catch (error) {
//     console.log("ereedcfecdfvdc", error);
//   }
// };

// fetApiFunction();

// const result = [];

// fetch(`${BASE_URL}/1`).then((data) => result.push(data));

// fetch(`${BASE_URL}/2`).then((data) => result.push(data));

// fetch(`${BASE_URL}/3`).then((data) => result.push(data));

// const functioasa = () => {
//   setTimeout(() => {
//     console.log("result", result);
//   }, 5000);
// };

// functioasa();

// --------------------------------- Promise.all() ---------------------------------------
// Promise.all() returns a single promise and as you can see in eg if one of the promise
// fails then it will be catch in promise.all()
// => Promise.all accepts an array of promises and returns a new promise
// => New promise will resolve when every promise in array resolves, and will be rejected if any promise in array is rejected

const lotsOfFetchCalls = [
  fetch(`${BASE_URL}/1`),
  fetch(`${BASE_URL}/2`),
  fetch(`${BASE_URL}/3`),
  fetch(`${BASE_URL}/4`),
  fetch(`${BASE_URL}/5`),
  fetch(`${BASE_URL}/6`),
];

// with help of promises
// Promise.all(lotsOfFetchCalls)
//   .then((data) => {
//     console.log("sab khatam ho gaya");
//     console.log("asasasa", data.length);
//   })
//   .catch((error) => {
//     console.log("Error", error);
//   });

//   with help of async await

// const saareResolved = async () => {
//   try {
//     const results = await Promise.all(lotsOfFetchCalls);
//     console.log("sdsdsds", results);
//   } catch (error) {
//     console.log("Error", error);
//   }
// };

// saareResolved();

// ---------------------------Promise.allSettled---------------------

// => Promise.allSettled accepts an array of promises and returns a new promise
// => The promise resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

// const allSettleFun = async () => {
//   const data1 = fetch(`${BASE_URL}/1`);
//   const data2 = fetch(`${BASE_URL}/2`);
//   const data3 = fetch(`sdgfh/3`);
//   const data4 = fetch(`${BASE_URL}/4`);
//   const data5 = fetch(`${BASE_URL}/5`);
//   const data6 = fetch(`${BASE_URL}/6`);

//   try {
//     const response = await Promise.allSettled([
//       data1,
//       data2,
//       data3,
//       data4,
//       data5,
//       data6,
//     ]);

//     console.log(response);
//   } catch (error) {
//     console.log("error");
//   }
// };

// allSettleFun();

// -------------------------------- Promise.race() --------------------------------------
// Many Calls, First One Wins
// Can get answer from any call; stop after any responds (either the first one fulfilled or rejected)
// => Promise.race accepts an array of promises and returns a new promise
// => This new promise will resolve or reject as soon as one promise in the array resolves or rejects

// Promise.race(lotsOfFetchCalls)
//   .then((data) => {
//     console.log("winner", data);
//   })
//   .catch((error) => {
//     console.log("error", error);
//   });

//   --------------------------------------- Building Own Promises ----------------------------------
// => You can use Promise with the new keyword to make your own promises
// => Unfortunately, the syntax here takes some getting used to
// => Promise accepts a single function (call it fn) as an argument
//     - fn accepts two functions as arguments, resolve and reject
//     - Pass resolve a value for the promise to resolve to that value
//     - Pass reject a value for the promise to reject to that value


const wait = (duration) => {
  const p = new Promise((resolve, reject) => {
    if (typeof duration === "number")
      setTimeout(() => {
        resolve("This is the reolved value");
      }, duration);
    else {
      reject("Bhai tu kya kar raha hai");
    }
  });
  return p;
};

const apnaPromise = async () => {
  try {
    const response = await wait("sd");
    console.log("response", response);
  } catch (error) {
    console.log("error", error);
  }
};

apnaPromise();


