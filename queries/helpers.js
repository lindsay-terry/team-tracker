const { Pool } = require('pg');
require('dotenv').config();

// new instance of pool to connect to database for helper functions
const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME,
    }
);

//helper function to collect current list of departments
const readDepartments = () => {
    //get a result from the function to use in inquirer question
    return new Promise((resolve, reject) => {
        pool.query('SELECT * from departments', (error, result) => {
            const departmentList = result.rows;
            const departmentNames = departmentList.map(({ name }) => name);
            resolve(departmentNames);
        })

    })
};

//helper function to collect current list of roles
const readRoles = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM roles', (error, result) => {
            const roleList = result.rows;
            const roleNames = roleList.map(({ title }) => title);
            resolve(roleNames);
        })
    })
};

//helper function to collect current list of employees
const readEmployees = () => {
    //get a result from the function to use in inquirer question
    return new Promise((resolve, reject) => {
        pool.query('SELECT * from employees', (error, result) => {
            const employeeList = result.rows;
            const employeeNames = employeeList.map(({ first_name, last_name }) => `${first_name} ${last_name}`);
            resolve(employeeNames);
        })
    })
};

module.exports = { readDepartments, readRoles, readEmployees };