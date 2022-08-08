// Importing necessary packages
const express = require('express');
const database = require('./config/connection');

// Create instance of express.
const app = express();

// Port
const PORT = process.env.PORT || 3001;

// middlewear for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Cr5eate server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
