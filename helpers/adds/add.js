// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { default: inquirer } = require('inquirer');

const addDeptQuestions = [{
    type: "input",
    message: "What is the name of the department?",
    name: 'deptName'
}]

// Function to add a department
async function addDepartment() {
    const deptToAddData = await Inquirer.prompt(addDeptQuestions);      // prompt user what department to add.
    const deptToAdd = deptToAddData.deptName;                                 //extract the department name from the prompt

    let deptQuery = `INSERT INTO department (name) VALUES (?);`
    database.query(deptQuery, deptToAdd, (err) => {
        if (err) {
            console.log('Issue in creating department', err);
        }
    });
    return;
}


module.exports = { addDepartment } 