// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');

// function to view ALL deparments
function viewDepartment() {
    database.query('SELECT * FROM department', (err, res) => {
        err ? console.log("Error retrieving Department Table", err) : console.table(res);
    });
}

// function to view ALL roles
function viewRole() {
    database.query('SELECT * FROM roles', (err, res) => {
        err ? console.log("Error retrieving Role Table", err) : console.table(res);
    });
}

// function to view ALL roles
function viewEmployee() {
    database.query('SELECT * FROM employee', (err, res) => {
        err ? console.log("Error retrieving Employee Table", err) : console.table(res);
    });
}

module.exports = { viewDepartment, viewRole, viewEmployee }
