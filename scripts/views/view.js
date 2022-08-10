// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const { capitalize, getTableArray, isEmpty } = require('../helpers/helpers');

// function to view ALL deparments
let deptQuery = `
SELECT dep.id as ID, dep.name as Name
FROM department as dep
`
async function viewDepartment() {
    console.log(isEmpty('department'));
    database.query(deptQuery, (err, res) => {
        err ? console.log("Error retrieving Department Table", err) : console.table('\n', res);
    });
    return;
}

// function to view ALL roles
let roleQuery = `
SELECT r.id as ID, r.title as Title, dep.name as Department, r.salary as Salary
FROM role as r
LEFT JOIN department as dep
ON r.department_id = dep.id
`
async function viewRole() {
    console.log(isEmpty('role'));
    database.query(roleQuery, (err, res) => {
        err ? console.log("Error retrieving Role Table", err) : console.table('\n', res);
    });
    return;
}

// function to view ALL roles
let empQuery = `
SELECT emp.id, emp.first_name AS First, emp.last_name AS Last, r.title AS Title, dep.name AS Department, r.salary AS Salary, emp.manager_id AS Manager
FROM employee as emp
LEFT JOIN role AS r
ON emp.role_id = r.id
LEFT JOIN department AS dep
ON r.department_id = dep.id
`
async function viewEmployee() {
    console.log(isEmpty('employee'));
    database.query(empQuery, (err, res) => {
        err ? console.log("Error retrieving Employee Table", err) : console.table('\n', res);
    });
    return;
}

module.exports = { viewDepartment, viewRole, viewEmployee }
