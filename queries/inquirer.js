const inquirer = require('inquirer');
const { viewDepartment, viewRoles, viewEmployees, addDept , createRole, createEmployee, updateEmployeeRole } = require('./queries');
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
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Cancel'],
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
    }

}

// function mainMenu() {
//     setTimeout(() => {
//         askQuestions();
//     }, 1000);
//     };

// function askQuestions() {
//     inquirer.prompt(questions)
//     .then(answers => {
//         switch (answers.options) {
//             case 'View All Departments':
//                 //query function to view all departments
//                 viewDepartment()
//                 break;
//             case 'View All Roles':
//                 //query function to view all roles
//                 viewRoles();
//                 break;
//             case 'View All Employees':
//                 //query function to view all employees
//                 viewEmployees();
//                 break;
//             case 'Add A Department':
//                 inquirer.prompt(addDepartment) 
//                 .then(answers => {
//                     //query function 
//                     addDept(answers.addDept);
//                 })
//                 break;
//             case 'Add A Role':
//                 //helper function to collect current list of departments
//                 readDepartments()
//                 //use result of function as the choices for list prompt
//                 .then(departmentNames =>{
//                     addRole[2].choices = departmentNames;
//                     inquirer.prompt(addRole)
//                     .then(answers => {
//                         createRole(answers);
//                     });
//                 });
//                 break;
//             case 'Add An Employee':
//                 //helper function to collect current list of employees
//                 readRoles()
//                 .then(roleNames => {
//                     addEmployee[2].choices = roleNames;
//                 })
//                 readEmployees()
//                 .then(employeeNames => {
//                     employeeNames.unshift('None');
//                     addEmployee[3].choices = employeeNames;
//                 })
//                 inquirer.prompt(addEmployee)
//                 .then(answers => {
//                     createEmployee(answers);
//                 })
//                 break;
//             case 'Update An Employee Role':
//                 //get list of employees for choices on who to update
//                 readEmployees()
//                 .then(employeeNames => {
//                     updateRole[0].choices = employeeNames;
//                     //get list of roles for choices on roles to update
//                     readRoles()
//                     .then(roleNames => {
//                         updateRole[1].choices = roleNames;
//                         inquirer.prompt(updateRole)
//                         .then(answers => {
//                             updateEmployeeRole(answers);
//                         })
//                     })
//                 }) 
//                 break;


//         }
//     });
// }






module.exports = { displayMenu, init };