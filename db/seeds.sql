INSERT INTO department(name)
values ("operations"), ("marketing"), ("sales"), ("legal"), ("tech");

INSERT INTO role(title, salary, department_id)
VALUES ("Operations Manager", 120000, 1),
("Associate", 75000, 1),
("Marketing Manager", 125000, 2),
("Salesman", 90000, 3),
("Lawyer", 180000, 4),
("Intern", 85000, 5),
("DevOps", 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, Manager_id)
VALUES ("Charles", "Hernandez", 1, null),
("Ryan", "Orona", 3, null),
("Marco", "Monreal", 5, 2),
("Devan", "Salas", 2, 3),
("Nate", "Hinojos", 3, 3),
("Colby", "Garrison", 4, 3);

CREATE VIEW employee_info AS
(SELECT
role.id AS role_id,
role.title,
role.salary,
department.name AS department_name
FROM role
JOIN department
on role.department_id = department.id);

CREATE VIEW employee_with_managers AS
(SELECT emp.id,
emp.first_name,
emp.last_name,
emp.role_id,
CONCAT(Manager.first_name, '', manager.last_name) AS manager_name
FROM employee AS manager RIGHT OUTER JOIN employee AS emp ON manager.id = emp.Manager_id);