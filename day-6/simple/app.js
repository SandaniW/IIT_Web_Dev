const express = require('express');
const app = express();
const port = 4000;

app.get('/',(req,res) =>{
   res.send('Hello World!');
});
//req -request 
//res - response
app.get('/next',(req,res) =>{
   res.send('Cool af');
});
app.listen(port, () => {
   console.log(`web server started at http://localhost:${port}`); //using backtick to make the log go through the parser to read variables
});