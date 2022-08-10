// Importing necessary packages
const Inquirer = require('inquirer');
const cTable = require('console.table');
const database = require('./config/connection');

// Importing helper functions
const { viewDepartment, viewRole, viewEmployee } = require('./scripts/views/view');
const { addDepartment, addRole, addEmployee } = require('./scripts/adds/add');
const updateEmployee = require('./scripts/update/update');

// Questions to prompt user upon starting the application
const options = ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Delete a Department", "Delete a Role", "Delete an Employee", "QUIT"];

// Main menu
const mainMenu = [{
    type: "list",
    message: "What would you like to do?",
    choices: options,
    pageSize: options.length,
    name: "menuChoice"
}];

let continuePrompt = true;

async function init() {
    while (continuePrompt) {
        let selectedOptionData = await Inquirer.prompt(mainMenu);
        let selectedOption = selectedOptionData.menuChoice;

        switch (selectedOption) {
            case "View All Departments":
                viewDepartment();
                init();
                return;
            case "View All Roles":
                viewRole();
                init();
                return;
            case "View All Employees":
                viewEmployee();
                init();
                return;
            case "Add a Department":
                await addDepartment();
                init();
                return;
            case "Add a Role":
                await addRole();
                init();
                return;
            case "Add an Employee":
                await addEmployee();
                init();
                return;
            case "Update an Employee Role":
                updateEmployee();
                init();
                return;
            // case "Delete a Department":
            //     // function to delete a department
            //     return;
            // case "Delete a Role":
            //     // function to delete a role
            //     return;
            // case "Delete an Employee":
            //     // function to delete a employee
            //     return;
            case "QUIT":
                continuePrompt = false;
                database.end();
                return;
        }
    }
}

init();