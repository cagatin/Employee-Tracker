// Import required packages
const cTable = require('console.table');
const database = require('../../config/connection');
const Inquirer = require('inquirer');
const { capitalize, getTableArray } = require('../helpers/helpers');
const e = require('express');

/* I am prompted to select an employee to update and their new role
 * and this information is updated in the database
 */

// retrieve an array of employee names to display to the user
// retrieve name

// retrieve array of all available roles to display to user
// retrieve desired new role

// update employee's role