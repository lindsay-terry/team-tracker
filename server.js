require('dotenv').config();
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;

const pool = new Pool(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

pool.connect();