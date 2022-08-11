// Application allows users to view the total utilized budget of a department
// in other words, the COMBINED SALARIES of all employees in THAT DEPARTMENT (8 points).

// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { capitalize, getTableArray, isEmpty } = require('../helpers/helpers');


async function getBudget() {
    if (await isEmpty('employee')) {
        console.log('🔴 No employees present in the database! Cannot retrieve Total Utilized Budget!');
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

    let joinQuery = `
    SELECT employee.first_name, employee.last_name,  SUM(role.salary) AS total_budget, department.name, department.id, role.department_id
    FROM department
    LEFT JOIN role
    ON department.id = role.department_id
    LEFT JOIN employee
    ON employee.role_id = role.id
    WHERE department_id = ?;
    `

    let budgetData = await database.promise().execute(joinQuery, [deptID]);
    let totalBudget = budgetData[0].map(item => item.total_budget)[0];

    totalBudget == 0 ? console.log('No Employee Salary Data in the Database!') : console.log(`🟢 Total Utalized Budget for ${bdgQuestioNData.department} is $${totalBudget}.`);
}

module.exports = getBudget;