const cTable = require('console.table');
const connection = require('./database');
const { questionsOpening } = require('../app.js')

function viewAllDepartments() {
    const query = connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err
        console.log("\n Departments in database \n");
        console.table(res);
    });
}

function viewAllRoles() {
    const query = connection.query("SELECT roles.id, roles.title, roles.salary, departments.name as department FROM roles JOIN departments ON roles.department_id = departments.id", function (err, res) {
        if (err) throw err
        console.log("\n All Roles \n")
        console.table(res);
    });
}

function viewAllEmployees() {
    const query = connection.query("SELECT e1.id, e1.first_name, e1.last_name, roles.title as role, departments.name AS department, roles.salary, Concat(e2.first_name, ' ', e2.last_name) AS manager FROM employees e1 LEFT JOIN roles ON e1.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e2 ON e2.id = e1.manager_id", function (err, res) {
        if (err) throw err
        console.log ("\n All Employees \n");
        console.table(res);
    });
}

module.exports = { viewAllDepartments,
    viewAllEmployees,
    viewAllRoles }
    // addDepartment, 
    // addEmployee, 
    // addRole, 
    // UpdateEmployeeRole 