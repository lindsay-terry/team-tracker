const inquirer = require('inquirer');
const { viewDepartment, viewRoles, viewEmployees } = require('./queries');

//THEN I am presented with the following options: view all departments, 
//view all roles, view all employees, add a department, add a role, add 
//an employee, and update an employee role

const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Cancel'],
    }
]

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee 
//ids, first names, last names, job titles, departments, salaries, and managers that the 
//employees report to


function askQuestions() {
    inquirer.prompt(questions)
    .then(answers => {
        if (answers.options === 'View All Departments') {
            viewDepartment();
        } else if (answers.options === 'View All Roles') {
            viewRoles();
        } else if (answers.options === 'View All Employees') {
            viewEmployees();
        }
    });
}

module.exports = { askQuestions };