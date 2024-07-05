const inquirer = require('inquirer');
const { viewDepartment, viewRoles, viewEmployees, addDept } = require('./queries');

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

const addDepartment = [
    {
        type: 'input',
        name: 'addDept',
        message: 'Please enter department name:',
    }
]

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee 
//ids, first names, last names, job titles, departments, salaries, and managers that the 
//employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is 
//added to the database



function askQuestions() {
    inquirer.prompt(questions)
    .then(answers => {
        switch (answers.options) {
            case 'View All Departments':
                viewDepartment();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add A Department':
                inquirer.prompt(addDepartment) 
                .then(answers => {
                    addDept(answers.addDept);
                })
                break;
        }
    });
}

module.exports = { askQuestions };