// Importing necessary packages
const Inquirer = require('inquirer');
const cTable = require('console.table');
const database = require('./config/connection');

// Importing helper functions
const { viewDepartment, viewRole, viewEmployee } = require('./helpers/views/view');

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
                init()
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
                // function to add a department
                return;
            case "Add a Role":
                // function to add a role
                return;
            case "Add an Employee":
                // function to add an employee
                return;
            case "Update an Employee Role":
                // function to update an employee role
                return;
            case "Delete a Department":
                // function to delete a department
                return;
            case "Delete a Role":
                // function to delete a role
                return;
            case "Delete an Employee":
                // function to delete a employee
                return;
            case "QUIT":
                continuePrompt = false;
                database.end();
                return;
        }
    }
}

init();