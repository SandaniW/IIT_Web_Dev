//app.js
const express = require('express')
const mathOperations = require("./arithmetic");

const app = express();
const port = 3000;

app.get('/api/calculate',(req,res) =>{
   const num1=10;
   const num2 = 15;
   const result = {
      Addition: mathOperations.add(num1,num2),
   Substraction: mathOperations.substract(num1,num2),
   Multiply: mathOperations.multiply(num1,num2),
   Divide: mathOperations.divide(num1,num2)
   };
   //res.json((result));
   res.send("Youuu hoooo!");

});

app.listen(port, ()=> {
   console.log(`Server is running on http://localhost:${port}`)
});

const num1 = 10;
const num2 = 5;

console.log(`Addition: ${mathOperations.add(num1,num2)}`);
console.log(`Substraction: ${mathOperations.substract(num1,num2)}`);
console.log(`Multiply: ${mathOperations.multiply(num1,num2)}`);
console.log(`Divide: ${mathOperations.divide(num1,num2)}`);