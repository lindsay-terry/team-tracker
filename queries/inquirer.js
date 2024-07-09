const inquirer = require('inquirer');
const { viewDepartment, viewRoles, viewEmployees, addDept , createRole, createEmployee, updateEmployeeRole, updateManager } = require('./queries');
const { readDepartments, readRoles, readEmployees } = require('./helpers');

function init() {
    console.clear();
    console.log(`.--------------------------------------------------------------.`);
    console.log(`| _____                      _____               _             |`);
    console.log(`||_   _|__  __ _ _ __ ___   |_   _| __ __ _  ___| | _____ _ __ |`);
    console.log("|  | |/ _ \\/ _` | '_ ` _ \\    | || '__/ _` |/ __| |/ / _ \\ '__||");
    console.log("|  | |  __/ (_| | | | | | |   | || | | (_| | (__|   <  __/ |   |");
    console.log(`|  |_|\\___|\\__,_|_| |_| |_|   |_||_|  \\__,_|\\___|_|\\_\\___|_|   |`);
    console.log("'--------------------------------------------------------------'");
}

//All the questions based on starting app and user selection
const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', "Update Employee's Manager", 'Cancel'],
    }
]

//Prompt for adding department name
const addDepartment = [
    {
        type: 'input',
        name: 'addDept',
        message: 'Please enter department name:',
    }
]

//Prompt for adding new role information
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

//Prompt for adding new employee information
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

//Prompt to update role
const updateRole = [
    {
        type: 'list',
        name: 'chooseEmp',
        message: 'Which employee would you like to update?',
        choices: [],
    },
    {
        type: 'list',
        name: 'chooseRole',
        message: 'What role would you like to assign to the selected employee?',
        choices: [],
    }
]

const updateEmpManager = [
    {
        type: 'list',
        name: 'chooseEmp',
        message: 'Which employee would you like to update?',
        choices: [],
    },
    {
        type: 'list',
        name: 'chooseManager',
        message: 'Who is their new manager?',
        choices: [],
    }
]

function displayMenu() {
    inquirer.prompt(questions)
    .then((answer) => {
        handleChoice(answer);
    });
    
}

function handleChoice(answer) {
    let choice = answer.options;
    console.clear();
    init();
    
    switch (choice) {
        case 'View All Departments':
            viewDepartment().then(displayMenu);
        break;

        case 'View All Roles':
            viewRoles().then(displayMenu);
        break;

        case 'View All Employees':
            viewEmployees().then(displayMenu);
        break;

        case 'Add A Department':
            inquirer.prompt(addDepartment)
            .then(answers => {
                addDept(answers.addDept).then(displayMenu);
            })
        break;

        case 'Add A Role':
            //helper function to collect current list of departments
            readDepartments()
            .then(departmentNames => {
                addRole[2].choices = departmentNames;
                inquirer.prompt(addRole)
                .then(answers => {
                    createRole(answers).then(displayMenu);
                });
            });
        break;

        case 'Add An Employee':
            //helper functions to collect current list of employees and roles
            readRoles().then(roleNames => {
                addEmployee[2].choices = roleNames;
            })
            readEmployees().then(employeeNames => {
                employeeNames.unshift('None');
                addEmployee[3].choices = employeeNames;
            })
            inquirer.prompt(addEmployee).then(answers => {
                createEmployee(answers).then(displayMenu);
            })
        break;

        case 'Update An Employee Role':
            //get list of employees for choices on who to update
            readEmployees().then(employeeNames => {
                updateRole[0].choices = employeeNames;
                //get list of roles for choices on roles to select
                readRoles().then(roleNames => {
                    updateRole[1].choices = roleNames;
                    inquirer.prompt(updateRole).then(answers => {
                        updateEmployeeRole(answers).then(displayMenu);
                    })
                })
            })
        break;

        case "Update Employee's Manager":
            //get list of employees for choices on who to update and who manager is
            readEmployees().then(employeeNames => {
                updateEmpManager[0].choices = employeeNames;
                updateEmpManager[1].choices = employeeNames;
                inquirer.prompt(updateEmpManager).then(answers => {
                    updateManager(answers).then(displayMenu);
                })
                })
        break;

        case 'Cancel':
            //clears console and exits application
            console.clear();
            process.exit();
        break;

            
    }

}

module.exports = { displayMenu, init };