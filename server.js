//import express
const express = require('express');
//add the port designation
const PORT = process.env.PORT || 3001;
//add the app expression
const app = express();

//import the sqlite3 package
const sqlite3 = require('sqlite3').verbose();

//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//connect the app to the SQLite database
const db = new sqlite3.Database('./db/election.db', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the election database.');
});

//default response for any other request(Not Found) catch all
app.use((req, res) => {
    res.status(404).end();
});

// start server AFTER db connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});