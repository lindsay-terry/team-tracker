const inquirer = require('inquirer');
const { viewDepartment, viewRoles } = require('./queries');

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

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role
//  belongs to, and the salary for that role


function askQuestions() {
    inquirer.prompt(questions)
    .then(answers => {
        if (answers.options === 'View All Departments') {
            viewDepartment();
        } else if (answers.options === 'View All Roles') {
            viewRoles();
        }
    });
}

module.exports = { askQuestions };