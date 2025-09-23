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

// **************** PROMISES ********************
// 
