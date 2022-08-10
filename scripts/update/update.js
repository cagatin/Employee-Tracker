// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { capitalize, getTableArray } = require('../helpers/helpers');
const e = require('express');

// Function to update employee role
async function updateEmployee() {
    try {
        // Array containing First Last names.
        let namesArray = [];

        // retrieve an array of employee names to display to the user
        let namesQuery = `
        SELECT first_name, last_name FROM employee
        `;
        let namesData = await database.promise().query(namesQuery);
        let firstNames = namesData[0].map(item => item["first_name"]);
        let lastNames = namesData[0].map(item => item["last_name"]);

        // Populate the names array
        for (let i = 0; i < firstNames.length; i++) {
            // Combine first and last names into single string
            namesArray.push(`${firstNames[i]} ${lastNames[i]}`);

        }
        console.log(namesArray);

        // retrieve array of all available roles to display to user
        let rolesData = await database.promise().query(`SELECT title FROM role`);
        let titlesArray = rolesData[0].map(item => item["title"]);          //array of job titles

        // Array of questions to ask user
        const updateQuestions = [
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: namesArray,
                name: 'fullName'
            },
            {
                type: 'list',
                message: 'What is the updated Job Title of the employee?',
                choices: titlesArray,
                name: 'newTitle'
            }
        ];




        return;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = updateEmployee;