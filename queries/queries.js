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

//Query function to view id and name from department
const viewDepartment = async () => {
        try {
            const results = await pool.query('SELECT id, name FROM departments');
            console.table(results.rows); 
        }
        catch (error) {
            console.error(error);
        }    
    };

//Query function to view all roles and the department they belong to
const viewRoles = async () => {
    try {
        const results = await pool.query('SELECT roles.id, roles.title, departments.name as department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id');
        console.table(results.rows);
    }
    catch (error) {
        console.error(error);
    }
};

//query function to view all employees and their managers
const viewEmployees = async () => {
    try {
        const results = await pool.query(`SELECT e.id, e.first_name, e.last_name, r.title AS role, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e JOIN roles r ON e.role_id = r.id LEFT JOIN employees m ON e.manager_id = m.id;`);
        console.table(results.rows);
    }
    catch (error) {
        console.error(error);
    }
};

//Query function to add a new department
const addDept = async (addDept) => {
    try {
        const results = await pool.query(`INSERT INTO departments (name) VALUES ('${addDept}')`);
        console.log('Department added successfully!');
    }
    catch (error) {
        console.error('Error executing query', error);
    }
};

//Query function to add a new role
const createRole = async (answers) => {
    const { roleTitle, roleSalary, roleDept } = answers;

    try {
        //Get ID of department user selected
        const results = await pool.query(`SELECT id FROM departments WHERE name = '${roleDept}'`);
        const departmentId = results.rows[0].id;

        //create role using user selected information
        const roleResult = await pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${roleTitle}', '${roleSalary}', '${departmentId}')`);
        console.log('Role added successfully!');
    } 
    catch (error) {
        console.error('Error executing query', error);
    }
};

//Query function to create new employee
const createEmployee = async (answers) => {
    const { firstName, lastName, empRole, empManager } = answers;

    try {
        //get role ID to assign to employee
        const roleQuery = await pool.query(`SELECT id FROM roles WHERE title = '${empRole}'`);
        const roleId = roleQuery.rows[0].id;

        if (empManager === 'None') {
            //insert employee info with no manager
            await pool.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}', '${roleId}')`);
            console.log('Employee added successfully!');
        } else {
            //get ID from manager if there is one
            const managerQuery = await pool.query(`SELECT id FROM employees WHERE CONCAT(first_name,' ', last_name) = '${empManager}'`);
            const managerId = managerQuery.rows[0].id;
            //insert employee data into employees table
            await pool.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${roleId}', '${managerId}')`);
            console.log('Employee added successfully!');
        }
     } catch (error) {
        console.error('Error:', error);
     }
};

//query function to update an employee's role
const updateEmployeeRole = async (answers) => {
    const { chooseEmp, chooseRole } = answers;

    try {
        //finds roleID of chosen role
        const idQuery = await pool.query(`SELECT id FROM roles WHERE title = '${chooseRole}'`);
        const roleId = idQuery.rows[0].id;

        //Updates roleID by name of employee chosen
        await pool.query(`UPDATE employees SET role_id = '${roleId}' WHERE CONCAT(first_name,' ', last_name) = '${chooseEmp}'`);
        console.log('Employee role updated successfully!');
    } catch (error) {
        console.error('Error:', error);
    }   
};

//query function to update an employee's manager
const updateManager = async (answers) => {
    const {chooseEmp, chooseManager } = answers;
    
    try {
        //get ID of manager
        const idQuery = await pool.query(`SELECT id FROM employees WHERE CONCAT(first_name,' ', last_name) = '${chooseManager}'`);
        const managerId = idQuery.rows[0].id;

        //update managerId on employee
        await pool.query(`UPDATE employees SET manager_id = '${managerId}' WHERE CONCAT(first_name,' ', last_name) = '${chooseEmp}'`);
        console.log(`Employee manager updated successfully! ${chooseEmp} is now a direct report of ${chooseManager}`);
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = { 
    viewDepartment, 
    viewRoles, 
    viewEmployees, 
    addDept, 
    createRole, 
    createEmployee, 
    updateEmployeeRole, 
    updateManager };
