// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { default: inquirer } = require('inquirer');

// Function to generate an array of Department names
async function getDeptArray() {
    let query = `
    SELECT * FROM department
    `;
    // Query for department table
    const data = await database.promise().query(query);

    // Extract table from query results
    const tableData = data[0];

    // Use array.map to retrieve only name: property values from the query result
    return tableData.map((item) => item['name']);
}

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

const addRoleQuestions = [
    {
        type: "input",
        message: "What is the name of the role?",
        name: 'name'
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: 'salary'
    },
]


// Function to add a department
async function addDepartment() {
    const deptToAddData = await Inquirer.prompt(addDeptQuestions);                         // prompt user what department to add.
    const deptToAdd = [capitalize(deptToAddData.deptName)];                                 // extract the department name from the prompt and format the string

    //determine if the department is already in the database
    let searchDept = `SELECT * FROM department WHERE name = ?`
    database.execute(searchDept, deptToAdd, (err, res) => {
        // If the department is already present in the database, return
        if (res.length >= 1) {
            console.log("\n Department is already in the Database!");
            return;
        } else {
            // Otherwise, add the department
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

async function addRole() {
    getDeptArray();
}


module.exports = { addDepartment, addRole } 