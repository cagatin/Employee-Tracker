// Application allows users to view the total utilized budget of a department
// in other words, the COMBINED SALARIES of all employees in THAT DEPARTMENT (8 points).

// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { capitalize, getTableArray, isEmpty } = require('../helpers/helpers');


async function getBudget() {
    if (await isEmpty('employee')) {
        console.log('No employees present in the database! Cannot retrieve Total Utilized Budget!');
        return;
    }

    //create an array of department names
    let deptArray = await getTableArray('department', 'name');

    // Ask the user which Department's budget would they like to view
    const bdgQuestion = [
        {
            type: 'list',
            message: 'Which Department\'s budget would you like to view?',
            choices: deptArray,
            name: 'department'
        }
    ];

    // prompt the user which department's budget to view
    const bdgQuestioNData = await Inquirer.prompt(bdgQuestion);
    let dept = bdgQuestioNData.department;

    // retrieve the department ID
    let deptIDArr = await database.promise().query('SELECT * FROM department WHERE name = ?', dept, err => console.log(err));
    let deptID = deptIDArr[0].map(item => item["id"])[0];

    // filter role data to only view titles of that department
    let roleFilter = `
    SELECT * FROM role 
    WHERE department_id = ?
    `;
    let filteredRoleData = await database.promise().execute(roleFilter, [deptID]);
    let matchedRoles = filteredRoleData[0];

    // If no roles exist in that department, return. 
    if (matchedRoles.length == 0) {
        console.log('No employees in chosen Department!');
        return;
    }

    //create an array of roleIDs
    let roleIDArr = matchedRoles.map(item => item.id);

    let conditionStr = '';
    for (let i = 0; i < roleIDArr.length; i++) {
        conditionStr += `role_id = ${roleIDArr[i]} OR `;
        if (i == roleIDArr.length - 1) {
            // remove the comma at the end of the condition string
            conditionStr = conditionStr.substring(0, conditionStr.length - 3);
        }
    }

    // filter employee table to only view ids of that role --> left join on role?
    let empFilter = `
    SELECT * FROM employee
    WHERE ${conditionStr}
    `;

    let filteredEmployees = await database.promise().query(empFilter);
    console.log(filteredEmployees[0]);

}

module.exports = getBudget;