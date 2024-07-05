const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME,
    }
);



const readDepartments = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * from departments', (error, result) => {
            const departmentList = result.rows;
            const departmentNames = departmentList.map(({ name }) => name);
            resolve(departmentNames);
        })

    })
}

module.exports = { readDepartments };