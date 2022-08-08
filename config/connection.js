// Stores the connection to mysql2

// import packages
const mysql = require('mysql2');
require('dotenv').config();

// create a connection to my SQL database
const database = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.USER,
        password: process.env.PASSWORD
    }
)

// Create the company_db database if it doesnt exist.
const createDBString = 'CREATE DATABASE IF NOT EXISTS company_db';
database.query(createDBString, (err, res) => {
    err ? console.log('Error in creating company_db', err) : console.log('company_db Database Created!')
});

// Use the company_db database
database.query('USE company_db', (err, res) => {
    err ? console.log('Error in using company_db', err) : console.log('Using company_db Database');
});