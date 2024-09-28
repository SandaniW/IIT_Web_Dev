const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/',(req,res) => {
//    const items = ['item1','item2','item3','item5'];
//    res.render('mytemplate',{items:items});
// });
app.get('/',(req,res) => {
   res.render('form');
});
app.post('/post-subscribe',(req,res) =>{
   const { name, email } = req.body;

   const query = `INSERT INTO subscribers (name, email) VALUES (?,?)`;
   db.run(query, [name,email], function(err){
      if(err){
         return res.status(500).json({message: 'Error inserting data',error: err.message});

      }
      res.status(200).json({message: 'Subscription successful',subscriberId: this.lastID});
   })

   const response = {
      message: `Thank you for subscribing, ${name}`,
      email: email
   };
   res.json(response);
});
app.get('/subscribers',(req,res) => {
   
})
// connect to the SQLite3 database
const db = new sqlite3.Database('./subscribers.db',(err) => {
   if(err) {
      console.error('Error opening database: ',err.message);
   }else{
      db.run(`CREATE TABLE IF NOT EXISTS subscribers (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         email TEXT NOT NULL
         )`);
   }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
   console.log(`Server is running on http://localhost:${PORT}`);

});