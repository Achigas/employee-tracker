const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = require('./db/database');

//Inquirer prompt and questions
const questionsOpening = function () {
  inquirer
  .prompt({
    type: "list",
    name: "search",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit"
  ]

  }).then (function (answer) {
    console.log(answer.search);
    switch (answer.search) {
          case "View all departments":
            viewAllDepartments();
            break;

          case "View all roles":
            viewAllRoles();
            break;

          case "View all employees":
             viewAllEmployees();
             break;

          case "Add a department":
            addDepartment();
            break;

          case "Add a role":
            addRole();
            break;

          case "Add an employee":
              addEmployee();
              break;

          case "Update an employee role":
              UpdateEmployeeRole();
              break;
    }
  })
};


function viewAllDepartments() {
  //query to view all departments
  const query = connection.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err
      console.log("\n Departments in database \n");
      console.table(res);
      questionsOpening();
  });
}

function viewAllRoles() {
  //query to view roles with department ID returned with name
  const query = connection.query("SELECT roles.id, roles.title, roles.salary, departments.name as department FROM roles JOIN departments ON roles.department_id = departments.id", function (err, res) {
      if (err) throw err
      console.log("\n All Roles \n")
      console.table(res);
      questionsOpening();
  });
}

function viewAllEmployees() {
  const query = connection.query("SELECT e1.id, e1.first_name, e1.last_name, roles.title as role, departments.name AS department, roles.salary, Concat(e2.first_name, ' ', e2.last_name) AS manager FROM employees e1 LEFT JOIN roles ON e1.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e2 ON e2.id = e1.manager_id", function (err, res) {
      if (err) throw err
      console.log ("\n All Employees \n");
      console.table(res);
      questionsOpening();
  });
}

function addDepartment() {
  inquirer.prompt ({
      type: 'input',
      name: 'department',
      message: 'What is the name of the new department?'
  }).then(function(input) {
      console.log('Inserting a new department...\n');
      const query = connection.query(
        'INSERT INTO departments SET ?',
        {
          name: input.department
        },
        function(err, res) {
          if (err) throw err;
          console.log('Department added!\n');
          questionsOpening();
        });
  });
  
};

function addRole() {
      inquirer.prompt([
        {
            // Prompt user role title
            type: "input",
            name: "roleTitle",
            message: "Enter the role title: "
        },
        {
            // Prompt user for salary
            type: "number",
            name: "salary",
            message: "Enter the role salary: "
        },
        {   
            // Prompt user to select department role is under
            type: "list",
            name: "department",
            message: "Enter the department of the role: ",
            choices: getDepartments()
        }]).then(function(response) {
           return Promise.all([
            response, 
            connection.promise().query('SELECT * FROM departments')
          ]);
        }).then(([response, departments]) => {

            //Establish ID variable
            let departmentID
            console.log(response.department)
            console.table(departments.rows)

            for (i=0; i < departments.length; i++) {
              if (response.department === departments[i].name){
                console.log(departments[i].name)
                 departmentID = departments[i].id;
                 console.log(departmentID)
              }
            }

          // Added role to role table
          connection.query(
            'INSERT INTO roles SET ?',
            {
              title: response.roleTitle,
              salary: response.salary,
              department_id: departmentID
            },
            function(err, res) {
              if (err) throw err;
              console.table(res)
              console.log(response.roleTitle + ' added to roles!\n');
              questionsOpening();
            });

        })
      };


// function addEmployee() {
//   //array for choices
//   let rolesArray = []
//   let managerArray = []

//   //connection with promist mysql2
//   connection.promise.all().query('SELECT title FROM roles')
//   .then ( (departments))
//     return res
//   })
//   //then get a roles array 
//   .then(function(roles){
//         for (let i = 0; i < res.length; i++) {
//         let role = res[i].title;
//         rolesArray.push(role)
//         }
//   }).then(function () {
//   inquirer.prompt ({
//     type: 'input',
//     name: 'firstName',
//     message: 'Enter the first name of the employee: '
//   },
//   {
//     type: 'input',
//     name:'lastName',
//     message: 'Enter the last name of the employee: '
//   },
//   {
//     type: 'list',
//     name: 'role',
//     message: 'Choose the role of the employee: ',
//     choices: rolesArray
//   },
//   {
//     type: 'list',
//     name: 'manager',
//     message: 'Choose the manager of the employee: ',
//     choices: managerArray
//   }).then(function(input) {
//     console.log('Adding a new employee...\n');
//     const query = connection.query(
//       'INSERT INTO Employees SET ?',
//       {
//         first_name: input.firstName,
//         last_name: input.lastName,
//         role

//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log('Department added!\n');
//       });
// });
// questionsOpening();
// }

function getDepartments() {
  let departmentArray = [];
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err
    for (var i=0; i < res.length; i++) {
       let department = res[i].name;
       departmentArray.push(department)
    }
  })
  return departmentArray
}

function getRoles() {
  let rolesArray = [];
  connection.query("SELECT * FROM roles", function(err, res) {
    for (let i = 0; i < res.length; i++) {
      let role = res[i].title;
      rolesArray.push(role)
    };
  });
  return rolesArray
};

// // function getEmployees () {
// //   let employeeArray = [];
// //   connection.query("SELECT * FROM employees", function(err,res) {
// //     for (let i = 0; i < res.length; i++) {
// //       let employeeName = res[i].first_name + " " + res[i].last_name;
// //       employeeArray.push(employeeName)
// //     }
// //   })
// //   return employeeArray
// // }

questionsOpening()
