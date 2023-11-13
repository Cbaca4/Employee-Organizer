const mysql = require('mysql2')
const inquirer = require('inquirer');
const table = require('console.table');
require('dotenv').config()
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pw: process.env.MYSQL_PW
})