const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
   res.send(`Hello ${req.query.name} (${req.query.Age})`);
});
app.post('/calc',(req,res)=>{
   a = parseInt(req.query.num1);
   b = parseInt(req.query.num2);
   c = req.query.operand;
   switch(true){
      case (c=="p"): ans = a + b;
      res.send(`Hello ${a} + ${b} = ${ans}`);
      break;
      case (c=="m"): ans = a - b;
      res.send(`Hello ${a} - ${b} = ${ans}`);
      break;
      case (c=="t"): ans = a *b;
      res.send(`Hello ${a} * ${b} = ${ans}`);
      break;
      case (c=="d"): ans = a /b;
      res.send(`Hello ${a} / ${b} = ${ans}`);
      break;
      default: res.send("Not a valid input");
      break;
   }
   
});
app.post('/mice',(req,res)=>{
   res.send('Yoo hoo')
});

app.listen(port, ()=>{
   console.log(`Web server started at http://localhost:${port}`)
});