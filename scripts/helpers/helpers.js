// Import the database
const database = require('../../config/connection');

// Function to capitalize the first letter in the user input
function capitalize(str) {
    let arrStr = str.split(" ");
    for (let i = 0; i < arrStr.length; i++) {
        arrStr[i] = arrStr[i].charAt(0).toUpperCase() + arrStr[i].slice(1);
    }
    return arrStr.join(" ");
}

// Function to generate an array of Department names
async function getTableArray(table, property) {
    let query = `
    SELECT * FROM ${table}
    `;
    // Query for department table
    const data = await database.promise().query(query);

    // Extract table from query results
    const tableData = data[0];

    // Use array.map to retrieve only name: property values from the query result
    return tableData.map((item) => item[`${property}`]);
}

// Function which checks if the table contains no values
async function isEmpty(table) {
    try {
        let query = `
        SELECT * FROM ${table}
        `;

        let data = await database.promise().query(query);

        const tableData = data[0];
        return tableData.length == 0;
    }
    catch (err) {
        console.log(err);
        return;
    }
}

module.exports = { capitalize, getTableArray, isEmpty }