const inquirer = require('inquirer');
const { viewDepartment, viewRoles, viewEmployees, addDept , createRole, createEmployee} = require('./queries');
const { readDepartments, readRoles, readEmployees } = require('./helpers');

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

const addRole = [
    {
        type: 'input',
        name: 'roleTitle',
        message: 'Please enter a title for the new role:',
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for the role?',
    },
    {
        type: 'list',
        name: 'roleDept',
        message: 'What department does this role belong to?',
        choices: [],
    }
]

const addEmployee = [
    {
        type: 'input',
        name: 'firstName',
        message: "Enter employee's first name:",
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Enter employee's last name:",
    },
    {
        type: 'list',
        name: 'empRole',
        message: "What is the employee's role?",
        choices: [],
    },
    {
        type: 'list',
        name: 'empManager',
        message: "Who is the employee's manager?",
        choices: [],
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
            case 'Add A Role':
                //helper function to collect current list of departments
                readDepartments()
                //use result of function as the choices for list prompt
                .then(departmentNames =>{
                    addRole[2].choices = departmentNames;
                    inquirer.prompt(addRole)
                    .then(answers => {
                        createRole(answers);
                    });
                });
                break;
            case 'Add An Employee':
                //helper function to collect current list of employees
                readRoles()
                .then(roleNames => {
                    addEmployee[2].choices = roleNames;
                })
                readEmployees()
                .then(employeeNames => {
                    employeeNames.unshift('None');
                    addEmployee[3].choices = employeeNames;
                })
                inquirer.prompt(addEmployee)
                .then(answers => {
                    createEmployee(answers);
                })


        }
    });
}

module.exports = { askQuestions };