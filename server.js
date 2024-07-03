require('dotenv').config();
const { askQuestions } = require('./queries/inquirer');
const { Pool } = require('pg');

// const PORT = process.env.PORT || 3001;

const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME
    }
);

pool.connect();

function init() {
    askQuestions();
}

init();