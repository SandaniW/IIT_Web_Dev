const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const db = new sqlite3.Database('your-database.db', (err) => {
    if (err) {
        console.error('Database opening error: ', err);
    } else {
        db.run('CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', (err) => {
            if (err) {
                console.error('Error creating table: ', err);
            }
        });
    }
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('layout', {
        formTitle: 'Add a name',
        btntxt: 'CLICK ME',
        color: req.query.color
    });
});

app.get('/class', (req, res) => {
    res.render('layout', {
        formTitle: 'Request a course',
        btntxt: 'Register'
    });
});

// Error handling: No route found
app.get('*', (req, res) => {
    res.status(404).send('404: Page Not Found');
});

// Handle form submission
app.post('/add-name', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('Name is required');
    }
    db.run('INSERT INTO names (name) VALUES (?)', [name], function(err) {
        if (err) {
            console.error('Error inserting name: ', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
