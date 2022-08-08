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