# Employee Tracker App

## Table of Contents
[Description](#description) <br />
[Installation](#installation) <br />
[Contribute](#contribute) <br />
[Test](#test) <br />
[Questions](#questions) <br />
<br />

## Description
A command line content management system utilizing Node.js and MYSQL to easily view and interact with company data from a database.   <br />

## Installation
First, run ```$ npm install``` to install all necessary dependencies used by the application. <br/> 

Then, create an ```.env``` file to store your login credentials for MYSQL. You can also manually input your MYSQL credentials within ```lines 11-12``` of the ```connection.js``` file. <br/> 

To run the application, you can simply run ```npm start``` to enter the main menu. <br/>

#### IMPORTANT: 
To use the feature which retrieves total utalized budget, you must <strong> disable </strong> ```sql_mode = 'ONLY_FULL_GROUP_BY'``` or an error will eccur. [Click here](https://stackoverflow.com/questions/23921117/disable-only-full-group-by) for a full guide for disabling only_full_group_by.

## Usage
[Click here to view a demonstration video!](https://watch.screencastify.com/v/C4aaqoPChpx7rwpoUQZD) <br/>

### Main Menu
![](./assets/imgs/main_menu.PNG) <br/>
When the user starts up the application, the user will be displayed a menu to navigate through different options. <br/>

### Selection
Using the up and down arrow keys, the user can select a multitude of different options, such as adding new roles, or viewing certain data. <br/>
![](./assets/imgs/selection.PNG) <br/>

## Contribute
To contribute to this project, fork the repository and send in a pull request! <br/>

## Test
Within the ```seed``` directory, run ```mysql -u root -p``` to enter the mysql service, then run ```use company_db;``` to select the database being used by the app. Lastly, run ```source seed.js``` to seed the database with test values. From there, one can test out the multitude of different features using seeded data. <br/>

## Questions? 
Reach me at the following with your questions: <br/>
Github Username: cagatin <br/>
Email:  cagatingilbert@gmail.com <br/>
<br/>
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)