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