const inquirer = require('inquirer');
const express = require('express')
const { viewAllDepartments, viewAllEmployees, viewAllRoles, addDepartment, addEmployee, addRole, UpdateEmployeeRole } = require("./db/query.js")

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

          case "Add role":
            addRole();
            break;

          case "Add an employee":
              addEmployee();
              break;

          case "Update an employee role":
              UpdateEmployeeRole();
              break;
    }
  });
};
questionsOpening();

module.exports = { questionsOpening }