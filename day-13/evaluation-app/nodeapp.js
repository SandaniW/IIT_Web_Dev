const express = require('express');
const path = require('path');
const db = require('./db'); // Import SQLite db setup

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/game', (req, res) => {
    res.render('game');
});

app.post('/submit-score', (req, res) => {
    const { name,scoreInput,wordInput } = req.body;
    console.log('Body data: ',req.body);
    console.log('Name:',name);
    console.log('Score: ',scoreInput);

    // Bug 1: the data inputed and placeholders for the query and '' , tablename
    db.run('INSERT INTO highscore (name,score,word) VALUES(?,?,?)', [name, scoreInput,wordInput], function(err) {
        if (err) {
            console.error("Error inserting data: ", err)
            return res.status(500).send("Error saving score");
        }
        setTimeout(() => {
            res.redirect('/'); // Redirect to the home page after a delay
        }, 3000);
        
    });
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
