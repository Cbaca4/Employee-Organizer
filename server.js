const mysql = require('mysql2')
const inquirer = require('inquirer');
const table = require('console.table');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'staff_db'
},
console.log('connected to the staff_db database.')
);

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
        type: 'list',
        message: "which action would you like to take?",
        name: 'selection',
        choices: [
            "View all departments",
            "view all roles",
            "View all employees",
            "add a department",
            " add a role",
            "add an employee",
            "Update an employee role"
        ]
        }
    ])
    .then((data) => {
        switch (data.selection) {
            case "View all department":
                viewAllDepartments();
                breaks;

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
                updateEmployeeRole();
                break;
        }
    })
};

promptUser();

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}

const viewAllRoles = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}

const viewAllEmployees = () => {
    db.query(`
    SELECT
    employees_with_managers.id AS employee_id,
    employees_with_managers.first_name,
    employees_with_managers.last_name,
    employee_info.title,
    employee_info.salary,
    employee_info.department_name,
    employees_with_managers.manager_name
    FROM employee_info
    JOIN employees_with_managers on employee_info.role_id = employees_with_managers.role_id;`,
    function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "what is the name of the new department?",
            name: 'name'
        }
    ])
    .then((data) =>{
        db.query(`INSERT INTO department (name) VALUES (?)`, data.name, (err, results) => {
            console.log("\nNew department added. See below:");
            viewAllDepartments();
        })
    })
}
const addRole = () => {
    let departmentArray = [];
    db.query(`SELECT * FROM department`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
departmentArray.push(results[i].name);
 }
return inquirer.prompt([
{
    type: 'input',
    message: "what is the name of the role?",
    name: 'title',
},
{
    type: 'input',
    message: "what is the salary of the role?",
    name: 'salary',
},
{
    type: 'list',
    message: "what department is the role?",
    name: 'department',
    choices: departmentArray
}
])
.then((data) => {
    db.query(`SELECT id FROM department.name =?`, data.addDepartment, (err, results) => {
let department_id = results[0].id;
db.query(`INSERT INTO role(title, salary, department_id)
VALUES (?,?,?)`, [data.title, data.salary], (err, results) => {
    console.log("\nNew role added. see below");
    viewAllRoles();
})
    });
})
    })
}

const addEmployee = () => {
    const roleArray= [];
    const employeeArray= [];

    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].title);
        }
        db.query(`SELECT * FROM employee`, function (err, results) {
            for (let i = 0; i < results.length; i++) {
                let employeeName = `${results[i].first_name} ${results[i].last_name}`
                employeeArray.push(employeeName);
            }
            return inquirer.prompt([
                {
                    type: 'input',
                    messaage: "what is the employee's first name?",
                    name: 'first_name',
                },
                {
                    type: 'input',
                    messaage: "what is the employee's last name?",
                       name: 'last_name',
                },
                {
                    type: 'list',
                    messaage: "what is the employee's role?",
                    name: 'role',
                    choices: roleArray
                },
                {
                    type: 'list',
                    messaage: "does the employee have a manager?",
                    name: ["Yes", "No"]
                },
            ]).then((data) => {
                let roleName = data.role;
                let first_name = data.first_name;
                let last_name = data.last_name;
                let roles_id = '';
                let manager = '';
                db.query(`SELECT id FROM role WHERE role.title = ?`, data.role, (err, results) => {
                    role_id = results[0].id;
                });
                if (data.has_manager === "yes") {
                    return inquirer.prompt([
                        {
                            type: 'list',
                            message: "Please select the employees manager",
                            name: 'manager',
                            choices: employeeArray
                        }                    
                    ]).then((data) => {
                        db.query
                    })
                }
            })
            ])
        })
    })
}

