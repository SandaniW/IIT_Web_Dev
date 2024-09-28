//arithmetic.js
const add = (a,b)=> a+b;
const substract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide =(a,b) => (b!= 0 ? a /b: "Cannot divide by zero");

module.exports = {
   add,
   substract,
   multiply,
   divide
};