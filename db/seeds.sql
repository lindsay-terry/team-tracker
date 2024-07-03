INSERT INTO departments (name)
VALUES ('Sales'),
       ('Marketing'),
       ('Research & Development');

INSERT INTO roles (title, salary, department_id)
VALUES ('Manager', 45.60, 1),
       ('Supervisor', 24.85, 1),
       ('Manager', 54.28, 2),
       ('Supervisor', 34.10, 2),
       ('Sales Associate', 15.75, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Suzanne', 'Hanks', 1), 