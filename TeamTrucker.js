const mysql = require("mysql2/promise");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_db"
});

async function start() {
  const { action } = await inquirer.prompt({
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "Add employee",
      "Add department",
      "Update employee role",
      "Exit"
    ]
  });

  switch (action) {
    case "View all employees":
      viewAllEmployees();
      break;
    case "View all departments":
      viewAllDepartments();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Add department":
      addDepartment();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
    case "Exit":
      connection.end();
      process.exit(0);
  }
}

async function viewAllEmployees() {
  const [rows] = await connection.query("SELECT * FROM employee");
  console.table(rows);
  start();
}

async function viewAllDepartments() {
  const [rows] = await connection.query("SELECT * FROM department");
  console.table(rows);
  start();
}

async function viewAllRoles() {
  const [rows] = await connection.query("SELECT * FROM role");
  console.table(rows);
  start();
}

async function addEmployee() {
  const [rows] = await connection.query("SELECT title FROM role");
  const choicesArray = rows.map(row => row.title);

  const { firstName, lastName, role } = await inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "First Name:"
    },
    {
      name: "lastName",
      type: "input",
      message: "Last Name:"
    },
    {
      name: "role",
      type: "list",
      message: "Which Role:",
      choices: choicesArray
    }
  ]);

  const [[{ id: roleId }]] = await connection.query(
    `SELECT id FROM role WHERE title = ?`,
    role
  );

  const [managerRows] = await connection.query(
    "SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee"
  );
  const managerChoices = managerRows.map(row => row.name);
  managerChoices.push("None");

  const { managerName } = await inquirer.prompt([
    {
      name: "managerName",
      type: "list",
      message: "Employee Manager:",
      choices: managerChoices
    }
  ]);

  let managerId = null;
  if (managerName !== "None") {
    const [[{ id }]] = await connection.query(
      `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`,
      managerName
    );
    managerId = id;
  }

  await connection.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
     VALUES (?, ?, ?, ?)`,
    [firstName, lastName, roleId, managerId]
  );

  console.log("** Employee Created **");
  start();
}

async function addDepartment() {
  const { newDepartment } = await inquirer.prompt({
    name: 'newDepartment',
    type: 'input',
    message: 'What is the new department name? '
  })
}