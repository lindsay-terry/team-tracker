const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'team_tracker_db',
        password: '123'    
        // user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // host: 'localhost',
        // database: process.env.DB_NAME
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
}

module.exports = { viewDepartment };
// require('dotenv').config();
// // const { Pool } = require('pg');

// // const PORT = process.env.PORT || 3001;

// // const pool = new Pool(
// //     {
// //         user: process.env.DB_USER,
// //         password: process.env.DB_PASSWORD,
// //         host: 'localhost',
// //         database: process.env.DB_NAME
// //     },
// //     console.log('connected!')
// // );

// // pool.connect();

// function viewDepartment() {
//     pool.query('SELECT * FROM departments', (err, result) => {
//         console.log(result);
//         console.log('test');
//     })
// };

// module.exports = { viewDepartment };
// // module.exports = pool;