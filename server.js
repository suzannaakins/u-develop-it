//import express
const express = require('express');
//add the port designation
const PORT = process.env.PORT || 3001;
//add the app expression
const app = express();
//express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//default response for any other request(Not Found) catch all
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});