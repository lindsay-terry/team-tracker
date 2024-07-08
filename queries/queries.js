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
    pool.query(`SELECT e.id, e.first_name, e.last_name, r.title AS role, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e JOIN roles r ON e.role_id = r.id LEFT JOIN employees m ON e.manager_id = m.id;`, (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return;
        }
        console.table(results.rows);
    })
}

const addDept = (addDept) => {
    pool.query(`INSERT INTO departments (name) VALUES ('${addDept}')`, (error, results) => {
        if (error) {
            console.error('Error executing query', error);
            return;
        }
        console.log('Department added successfully!');
    })
}

const createRole = (answers) => {
    const { roleTitle, roleSalary, roleDept } = answers;

    pool.query(`SELECT id FROM departments WHERE name = '${roleDept}'`, (error, results) => {
        if (error) {
            console.error('Error retrieving department id', error);
            return;
        }
        const departmentId = results.rows[0].id;

        pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${roleTitle}', '${roleSalary}', '${departmentId}')`, (error, results) => {
            if (error) {
                console.error('Error executing query', error);
                return;
            }
            console.log('Role added successfully!');
        })
    })

}

const createEmployee = async (answers) => {
    const { firstName, lastName, empRole, empManager } = answers;

    try {
        const roleQuery = await pool.query(`SELECT id FROM roles WHERE title = '${empRole}'`);
        const roleId = roleQuery.rows[0].id;

        if (empManager === 'None') {
            await pool.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', '${roleId}')`);
            console.log('Employee added successfully!');
        } else {
            const managerQuery = await pool.query(`SELECT id FROM employees WHERE CONCAT(first_name,' ', last_name) = '${empManager}'`);
            const managerId = managerQuery.rows[0].id;

            await pool.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleId}', '${managerId}')`);
            console.log('Employee added successfully!');
        }
     } catch (error) {
        console.error('Error:', error);
     }
}

const updateEmployeeRole = (answers) => {
    const { chooseEmp, chooseRole } = answers;

        //Finds roleID of chosen role
        pool.query(`SELECT id FROM roles WHERE title = '${chooseRole}'`, (error, results) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            const roleId = results.rows[0].id;

            //Updates roleId by name of employee chosen
            pool.query(`UPDATE employees SET role_id = '${roleId}' WHERE CONCAT(first_name,' ', last_name) = '${chooseEmp}'`);
            console.log('Employee role updated successfully!');
            
        });
   
}
            


module.exports = { viewDepartment, viewRoles, viewEmployees, addDept, createRole, createEmployee, updateEmployeeRole };
