const sqlite3 = require('sqlite3').verbose();


// Bug 2: 
const db = new sqlite3.Database('database.db', (err) =>{
    if(err) {
        console.error('Error opening database: ',err.message);
        return;
    }
    //to check if connected
    console.log('connected to database');

    //running sql
    db.serialize(() => {
        // Bug 3: 
        const sql = 'CREATE TABLE IF NOT EXISTS highscore (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,score INTEGER NOT NULL)';
        db.run(sql,(err) =>{
            if(err) {
                console.error('Error creating table: ',err.message);
            } else {
                console.log('Table created successfully');
            }
        });
        db.all("PRAGMA table_info(highscore)",(err,rows) => {
            if(rows.some(row => row.name === 'word')){
               console.log("Column alread exits.");
            }else{
               db.run(`ALTER TABLE highscore ADD word TEXT NOT NULL`);
            }
         });
});
});
module.exports = db;




