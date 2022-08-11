// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { capitalize, getTableArray } = require('../helpers/helpers');

// Questions to ask for adding department
const addDeptQuestions = [{
    type: "input",
    message: "What is the name of the department?",
    name: 'deptName'
}];


// Function to add a department
async function addDepartment() {
    const deptToAddData = await Inquirer.prompt(addDeptQuestions);                         // prompt user what department to add.
    const deptToAdd = [capitalize(deptToAddData.deptName)];                                 // extract the department name from the prompt and format the string

    //determine if the department is already in the database
    let searchDept = `SELECT * FROM department WHERE name = ?`
    database.execute(searchDept, deptToAdd, (err, res) => {
        // If the department is already present in the database, return
        if (res.length >= 1) {
            console.log("\n 🔴 Department is already in the Database!");
            return;
        } else {
            // Otherwise, add the department
            let deptQuery = `INSERT INTO department (name) VALUES (?);`
            database.execute(deptQuery, deptToAdd, (err) => {
                if (err) {
                    console.log('\n 🔴 Issue in creating department', err);
                }
                console.log(`\n🟢 Department successfully added to the database!`)
            });
            return;
        }
    });
}

// Function to add a role
async function addRole() {
    let deptArray = await getTableArray('department', 'name');
    const addRoleQuestions = [
        {
            type: "input",
            message: "What is the name of the role?",
            name: 'role'
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What department does the role belong to?',
            choices: deptArray,
            name: 'dept'
        }
    ];

    // Prompt user on add role info
    const roleData = await Inquirer.prompt(addRoleQuestions);

    // extract info from data
    let role = capitalize(roleData.role);
    let salary = roleData.salary;
    let dept = capitalize(roleData.dept);

    // retrieve the department ID
    let deptIDArr = await database.promise().query('SELECT * FROM department WHERE name = ?', dept, err => console.log(err));
    let deptID = deptIDArr[0].map(item => item["id"])[0];

    // check if the role exists in the table
    let existQuery = "SELECT * FROM role WHERE title = ?";
    database.execute(existQuery, [role], (err, res) => {
        if (res.length >= 1) {
            console.log('\n 🔴 Role already exists within the database!');
            return;
        } else {
            let createQuery = 'INSERT INTO role (title, salary, department_id) values (?, ?, ?);';
            database.execute(createQuery, [role, salary, deptID], (err) => {
                if (err) {
                    console.log('🔴 Error in creating role!', err);
                }
                console.log(`\n 🟢 Role successfully added to the database!`)
            });
            return;
        }
    });
}

async function addEmployee() {
    // retrieve array of job titles
    roleArray = await getTableArray('role', 'title');

    // retrieve an array of manager names
    let managerQuery = `SELECT * FROM employee WHERE manager_id IS NULL`;
    let managerData = await database.promise().query(managerQuery);
    let managerArr = managerData[0].map(item => item["first_name"]);

    //append a null choice to manager array (Employee is a manager) to prompt the user
    managerArr.push('None');

    // questions to prompt user
    const addEmpQuestions = [
        {
            type: 'input',
            message: 'What is the FIRST NAME of the employee?',
            name: 'first',
        },
        {
            type: 'input',
            message: 'What is the LAST NAME of the employee?',
            name: 'last'
        },
        {
            type: 'list',
            message: 'What is the ROLE of the employee?',
            choices: roleArray,
            name: 'role'
        },
        {
            type: 'list',
            message: 'Who is the MANAGER of the employee?',
            choices: managerArr,
            name: 'manager'
        }
    ];

    // prompt the user
    const empData = await Inquirer.prompt(addEmpQuestions);

    // extract the data
    let first_name = empData.first;     //first name
    let last_name = empData.last;       //last name
    let role = empData.role;            //role of employee
    let manager = empData.manager;      //name of manager

    let managerID;                      //ID of the manager
    let roleID;                         //ID of the role 

    // Employee is a manager, assign the manager_id a null value
    if (manager == 'None') {
        managerID = null;
    } else {
        //  Given name of manager, query to retrieve the ID.
        let mngrIDQuery = `
        SELECT * FROM employee
        WHERE first_name = ?
        `;
        let managerIDData = await database.promise().query(mngrIDQuery, manager, (err) => console.log(err));
        managerID = managerIDData[0].map(item => item.id)[0];      //stores the manager ID
    }

    // Given the name of the role, retrieve the role ID
    let roleIDQuery = `
    SELECT * FROM role
    WHERE title = ?
    `
    let roleIDData = await database.promise().query(roleIDQuery, role, (err) => console.log(err));
    roleID = roleIDData[0].map(item => item.id)[0];


    // Check to see if the employee is already in the Database
    let checkQuery = `
    SELECT * FROM employee WHERE first_name = ? AND last_name = ?;
    `
    database.execute(checkQuery, [first_name, last_name], (err, res) => {
        if (err) {
            console.log(err)
        }
        if (res.length >= 1) {
            console.log("🔴 Employee is already in the Database! Please update employee instead.");
            return;
        } else {
            // If the employee is NOT already in the database, add the employee
            let insertQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            database.execute(insertQuery, [first_name, last_name, roleID, managerID], (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`\n 🟢 Sucessfully added ${first_name} ${last_name} to the database.`);
                }
            });
            return;
        }
    });
}


module.exports = { addDepartment, addRole, addEmployee } 