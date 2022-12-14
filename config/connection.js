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
database.query(createDBString, (err) => {
    if (err) { console.log('Error in creating company_db', err) }
});

// Use the company_db database
database.query('USE company_db', (err) => {
    if (err) { console.log('Error in using company_db', err) }
});

// Create the department table
const createDPMNTTable = 'CREATE TABLE IF NOT EXISTS department(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(30) NOT NULL)';
database.query(createDPMNTTable, (err) => {
    if (err) { console.log('Error in creating Department Table', err) }
});

// Create the role table
const createRoleTable = 'CREATE TABLE IF NOT EXISTS role(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, title VARCHAR(30) NOT NULL, salary DECIMAL NOT NULL, department_id INT, FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE)';
database.query(createRoleTable, (err) => {
    if (err) { console.log('Error in creating Role Table', err) }
});

// Create the employee table
const createEmpTable = 'CREATE TABLE IF NOT EXISTS employee(id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, first_name VARCHAR(30) NOT NULL, last_name VARCHAR(30) NOT NULL, role_id INT, manager_id INT REFERENCES employee(id), FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE)';
database.query(createEmpTable, (err) => {
    if (err) { console.log('Error in creating Employee Table', err) }
});

// Export the connection
module.exports = database;