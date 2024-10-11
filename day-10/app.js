//backend handling
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/',(req,res) => {
//    const items = ['item1','item2','item3','item5'];
//    res.render('mytemplate',{items:items});
// });

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
      //to check if isDeleted column already exists
      db.all("PRAGMA table_info(subscribers)",(err,rows) => {
         if(rows.some(row => row.name === 'isDeleted')){
            console.log("Column alread exits.");
         }else{
            db.run(`ALTER TABLE subscribers ADD isDeleted BOOLEAN DEFAULT FALSE`);
         }
      });
      
   }
});

//general route
app.get('/',(req,res) => {
   res.render('form');
});

//post is the request and the data is sent through the body as a request
//handle post requests sent to the path /post-subscribe
//app.post -> sending data to the server
//(req,res) -> (data sent from client,response to the client from the backend)
app.post('/post-subscribe',(req,res) =>{
   //req.body is broken down to get the name and email
   //need json(a middleware) to parse the data
   
   const { name, email } = req.body;
   console.log(req.body);
   //javascript object called response
   const response = {
      message: `Thank you for subscribing, ${name}`,
      email: `${email}`
   };
   console.log(response);
   
   //execute on a database
   //? -> placeholder for user intput values 
   const query = `INSERT INTO subscribers (name, email) VALUES (?,?)`;
   //[name,email] - values that replace ?
   //calling err func, if it occurs its handled in the condition
   db.run(query, [name,email], function(err){
      if(err){
         //sending htps response
         //500 - server error
         console.error('Database error: ',err);
         return res.status(500).json({message:'Error inserting data'});

      }else{
         //have to send the object itself
         //previously I sent the object inside another object and the front end coudnt read the data
         //the json object response is sent from the back
         //and the function success catches it from the front
         res.status(200).json(response);
      }
      
   })
   

   
   
});

//Rout to fetch and display users
app.get('/dash',(req,res) => {
   db.all('SELECT name, email FROM subscribers',[],(err,rows) => {
      if(err){
         console.error(err.message);
         return res.status(500).send('Database query error');
      }
      // rows is the data called by select
      // rows is then = to users and sent to the ejs to be rendered
      //list is the ejs file 
      res.render('list',{users: rows}); 
   });
   
});

//Route to delete a user
app.post('dash/delete/:id',(req,res) => {
   const userId = req.params.id;

   db.run('DELETE FROM subscribers WHERE id = ?',[userId],(err) => {
      if (err) {
         console.error(err.message);
         return res.status(500).send('Error occured unable to delete.');
      }
      res.json({userId: this.lastID});
   });
})

//route to update table data
app.get('dash/update/:id',(req,res) => {
   const userId = req.params.id;
   const { name, email } = req.body;

   db.run('UPDATE subscribers SET name = ?,email = ? WHERE id = ?',[name,email],userId,(err) => {
      if(err){
         return res.status(500).json({message: 'Error updating data',error: err.message});

      }
      res.status(200).json({message: 'Data updated',userId: this.lastID});
      
   })
   
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
   console.log(`Server is running on http://localhost:${PORT}`);

});