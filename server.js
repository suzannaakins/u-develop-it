//import express
const express = require('express');
const { ppid } = require('process');
//import db module
const db = require('./db/database');
//import routes
const apiRoutes = require('./routes/apiRoutes');
//add the port designation
const PORT = process.env.PORT || 3001;
//add the app expression
const app = express();
//import inputCheck module to verify data
const inputCheck = require('./utils/inputCheck');

//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

//view parties and their descriptions
app.get('/parties', (req, res) => {
    const sql = `SELECT * FROM parties`;
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: rows
        });
    });
});

//view a party based on id
app.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json({
            message: 'success',
            data: row
        });
    });
});

//delete a party from the candidates table, by party id
app.delete('/party/:id', (req, res) => {
    const sql = `DELETE FROM parties WHERE id = ?`;
    const params = [req.params.id];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: res.message });
            return;
        }

        res.json({
            message: 'successfully deleted', changes: this.changes
        });
    });
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