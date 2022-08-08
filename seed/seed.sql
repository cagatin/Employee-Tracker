INSERT INTO department
    (name)
VALUES
    ("Human Resources"),
    ("IT"),
    ( "Accounting"),
    ("Finance"),
    ( "Marketing");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Human Resource Specialist", 68000, 1),
    ("Human Resource Assistant", 45000, 1),
    ("Network Engineer", 120000, 2),
    ("IT Technician", 52000, 2),
    ("Senior Accountant", 95000, 3),
    ("Tax Manager", 95000, 3),
    ("Controller", 150000, 4),
    ("Financial Manager", 120000, 4),
    ("Chief Marketing Officer", 90000, 5),
    ("Brand Manager", 98000, 5);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Sandor", "Clegane", 1, null),
    ("Arya", "Stark", 2, 1),
    ("Tywin", "Lannister", 7, null),
    ("Tyrion", "Lannister", 6, 3);