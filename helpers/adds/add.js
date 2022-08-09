// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { default: inquirer } = require('inquirer');

// Function to capitalize the first letter in the user input
function capitalize(str) {
    let arrStr = str.split(" ");
    for (let i = 0; i < arrStr.length; i++) {
        arrStr[i] = arrStr[i].charAt(0).toUpperCase() + arrStr[i].slice(1);
    }
    return arrStr.join(" ");
}

const addDeptQuestions = [{
    type: "input",
    message: "What is the name of the department?",
    name: 'deptName'
}]

// Function to add a department
async function addDepartment() {
    const deptToAddData = await Inquirer.prompt(addDeptQuestions);                         // prompt user what department to add.
    const deptToAdd = [capitalize(deptToAddData.deptName)];                                 // extract the department name from the prompt and format the string

    //determine if the department is already in the database
    let searchDept = `SELECT * FROM department WHERE name = ?`
    database.execute(searchDept, deptToAdd, (err, res) => {
        if (res.length >= 1) {
            console.log("\n Department is already in the Database!");
            return;
        } else {
            let deptQuery = `INSERT INTO department (name) VALUES (?);`
            database.execute(deptQuery, deptToAdd, (err) => {
                if (err) {
                    console.log('\n Issue in creating department', err);
                }
            });
            return;
        }
    });
}


module.exports = { addDepartment } 