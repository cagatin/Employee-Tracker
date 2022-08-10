// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { capitalize, getTableArray } = require('../helpers/helpers');
const e = require('express');

/* I am prompted to select an employee to update and their new role
 * and this information is updated in the database
 */
async function updateEmployee() {
    let namesArray = [];

    // retrieve an array of employee names to display to the user
    let namesQuery = `
    SELECT first_name, last_name FROM employee
    `;
    let namesData = await database.promise().query(namesQuery, (err) => console.log(err));
    let firstNames = namesData[0].map(item => item["first_name"]);
    let lastNames = namesData[0].map(item => item["last_name"]);

    console.log(firstNames, lastNames);

    // Populate the names array
    for (let i = 0; i < first.length; i++) {
        namesArray.push(`${firstNames[i]} ${lastNames[i]}`);
    }
    console.log(namesArray);

    // retrieve name

    // retrieve array of all available roles to display to user
    // retrieve desired new role

    // update employee's role
}


module.exports = updateEmployee;