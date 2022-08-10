// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { capitalize, getTableArray, isEmpty } = require('../helpers/helpers');

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
        let firstNamesArr = namesData[0].map(item => item["first_name"]);
        let lastNamesArr = namesData[0].map(item => item["last_name"]);

        // Populate the names array
        for (let i = 0; i < firstNamesArr.length; i++) {
            // Combine first and last names into single string
            namesArray.push(`${firstNamesArr[i]} ${lastNamesArr[i]}`);

        }

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

        // prompt the user
        const updateData = await Inquirer.prompt(updateQuestions);
        let employeeName = updateData.fullName;
        let newTitle = updateData.newTitle;

        // Retrieve the first and last name of selected employee
        let firstName = employeeName.split(" ")[0];
        let lastName = employeeName.split(" ")[1];

        // Given the name of the role, retrieve the role ID
        let roleIDQuery = `
        SELECT * FROM role
        WHERE title = ?
        `
        let roleIDData = await database.promise().query(roleIDQuery, newTitle, (err) => console.log(err));
        let newRoleID = roleIDData[0].map(item => item.id)[0];      //stores the id of the new role

        console.log(newRoleID);

        // query to update the role of the employee
        let updateQuery = `
        UPDATE employee
        SET  role_id = ?
        WHERE first_name = ? AND last_name = ?;
        `;
        database.execute(updateQuery, [newRoleID, firstName, lastName], (err) => {
            err ? console.log('\n Error in updating Employee!', err) : console.log(`\n Role for ${firstName} ${lastName} updated to ${newTitle}!`);
        });

    }
    catch (err) {
        console.log(err);
    }
    return;
}


module.exports = updateEmployee;