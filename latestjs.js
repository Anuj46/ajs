// ------------ Optional chaining ----------------------
// Optional chaining allows reading the value of a property located deep within a chain of connected
// objects without having to check each reference in the chain.

// ---------------- Nullish coalescing -----------------
// The nullish coalescing operator (??) is a logical operator that returns its right-hand operand when
// its left-hand operand is null or undefined, and otherwise returns its left-hand operand. This is a
// way to handle default values more predictably than using the OR (||) operator.

// --------------- Numeric separators -------------------
// Numeric separators enhance readability by allowing underscores (_) to be inserted between digits in
// numeric literals.

const withoutSeparator = 1000000000;
const withSeparator = 1_000_000_000;
console.log("16", withSeparator); // 1000000000

// ------------------ Array.prototype.at() ---------------------
// Allows you to get an item from an array, supporting negative indices to count back from the
// last item.

const arr = [10, 20, 30, 40, 50];
console.log("23", arr.at(-2)); // 40 (access from right hand side)

// ----------------- .replaceAll() method for strings -----------------
// This method allows you to replace all occurrences of a substring.

const string = "Hello world, world!";

console.log("30", string.replaceAll("world", "friend")); // 'Hello friend, friend!'

// ------------------------ Logical assignment -------------------------
// Logical assignments are a combination of logical operators (&&, ||, or ??) and assignment expressions.

let x = null;
let y = "default";

// OR assignment (x ||= y) is equivalent to x || (x = y)
x ||= y;
console.log("40", x); // Outputs: 'default'

let a = 1;
let b = 2;

// AND assignment (a &&= b) is equivalent to a && (a = b)
a &&= b;
console.log("47", a); // Outputs: 2

// ??= same as (a ?? a = b)
