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
    pool.query('SELECT * FROM roles', (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return;
        }
        console.table(results.rows);
    })
}



module.exports = { viewDepartment, viewRoles };
