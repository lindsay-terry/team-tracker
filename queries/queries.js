const { Pool } = require('pg');
require('dotenv').config();
const cTable = require('console.table');

const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME,
    }
);

pool.connect();

const viewDepartment = () => {
    pool.query('SELECT id AS ID, name as Name FROM departments', (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return;
        }
        console.table(results.rows);
    })
};

const viewRoles = () => {
    pool.query('SELECT roles.id, roles.title, departments.name as department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id', (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return;
        }
        console.table(results.rows);
    })
}

const viewEmployees = () => {
    pool.query('SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary FROM employees e JOIN roles r ON r.id = e.role_id JOIN departments d ON r.department_id = d.id JOIN employees m ON e.manager_id = m.id', (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return;
        }
        console.table(results.rows);
    })
}



module.exports = { viewDepartment, viewRoles, viewEmployees };
