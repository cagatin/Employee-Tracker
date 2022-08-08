// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');

// function to view ALL deparments
function viewDepartment() {
    database.query('SELECT * FROM department', (err, res) => {
        err ? console.log("Error retrieving Department Table", err) : console.table('\n', res);
    });
    return;
}

// function to view ALL roles
/*THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
*/
let roleQuery = `
SELECT r.id as ID, r.title as Title, dep.name as Department, r.salary as Salary
FROM role as r
LEFT JOIN department as dep
ON r.department_id = dep.id
`
function viewRole() {
    database.query(roleQuery, (err, res) => {
        err ? console.log("Error retrieving Role Table", err) : console.table('\n', res);
    });
    return;
}

// function to view ALL roles

/* WHEN I choose to view all employees
 * THEN I am presented with a formatted table showing employee data, including:
 *      employee ids, first names, last names, 
 *      job titles, departments, salaries, and managers that the employees report to.
*/
let empQuery = `
SELECT emp.id, emp.first_name AS First, emp.last_name AS Last, r.title AS Title, dep.name AS Department, r.salary AS Salary, emp.manager_id AS Manager
FROM employee as emp
LEFT JOIN role AS r
ON emp.role_id = r.id
LEFT JOIN department AS dep
ON r.department_id = dep.id
`
function viewEmployee() {
    database.query(empQuery, (err, res) => {
        err ? console.log("Error retrieving Employee Table", err) : console.table('\n', res);
    });
    return;
}

module.exports = { viewDepartment, viewRole, viewEmployee }
