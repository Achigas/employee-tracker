USE employee_tracker

INSERT INTO departments (name)
VALUES
('Attackers'),
('Defense'),
('Setters'),
('Bench'),
('Coaching');

INSERT INTO roles (title, salary, department_id)
VALUES
('Outside Hitter', 75000, 1),
('Right-side Hitter', 75000, 1),
('Middle Hitter', 85000, 1), 
('Setter', 100000, 3),
('Back-row Setter', 85000, 3),
('Libero', 120000, 2),
('Defensive Specialist', 100000, 2),
('Serving Speciaist', 75000, 1),
('Cheerleader', 65000, 4),
('Statskeeper', 85000, 4),
('Head Coach', 150000, 5),
('Assitant Coach', 125000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Whitney', 'Houston', 1, NULL),
('Lady', 'Gaga', 1, 1),
('Mariah', 'Carey', 2, 1),
('Ariana', 'Grande', 3, 1),
('Dua', 'Lipa', 3, 1),
('Toni', 'Braxton', 4, NULL),
('Lana', 'DelRay', 5, 6),
('Sigrid', 'DaBest', 6, NULL),
('Meryl', 'Streep', 7, 8),
('James', 'Dean', 8, 8),
('Mamma', 'Mia', 9, NULL),
('Albert', 'Einstien', 10, 13),
('Alex', 'Chigas', 11, NULL),
('Power', 'Ranger', 12, 13);
