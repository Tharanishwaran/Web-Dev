-- ========================================
-- COMPLETE SQL INTERVIEW PREPARATION
-- Entry Level - E-Commerce Database
-- ========================================

-- 1. CREATE DATABASE
CREATE DATABASE ecommerce_db;
USE ecommerce_db;
SHOW DATABASES;

-- ========================================
-- 2. CREATE TABLES
-- ========================================

-- Users Table
CREATE TABLE users (
   user_id INT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(50) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees Table (for practice)
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30),
  department VARCHAR(20),
  salary INT,
  hire_date DATE
);

-- Categories Table
CREATE TABLE categories (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(50) NOT NULL
);

-- Products Table
CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Orders Table
CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total_amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending',
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Order Items Table
CREATE TABLE order_items (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Cart Table
CREATE TABLE cart (
  cart_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- ========================================
-- 3. INSERT SAMPLE DATA
-- ========================================

-- Insert Users
INSERT INTO users (name, email, password) VALUES 
('Alice', 'alice@example.com', 'pass123'),
('Bob', 'bob@example.com', 'bobpassword'),
('Charlie', 'charlie@example.com', 'charlie123'),
('David', 'david@example.com', 'david456'),
('Emma', 'emma@example.com', 'emma789');

-- Insert Employees
INSERT INTO employees (name, department, salary, hire_date) VALUES
('Alice', 'HR', 50000, '2023-01-15'),
('Bob', 'IT', 70000, '2022-05-20'),
('Charlie', 'IT', 60000, '2023-03-10'),
('David', 'Sales', 40000, '2024-01-05'),
('Emma', 'HR', 55000, '2023-08-22'),
('Frank', 'Sales', 45000, '2024-02-14');

-- Insert Categories
INSERT INTO categories (category_name) VALUES
('Electronics'),
('Furniture'),
('Clothing'),
('Books');

-- Insert Products
INSERT INTO products (name, description, price, stock, category_id) VALUES
('Laptop', 'High performance laptop', 45000.00, 10, 1),
('Mouse', 'Wireless mouse', 500.00, 50, 1),
('Keyboard', 'Mechanical keyboard', 1500.00, 30, 1),
('Monitor', '27 inch monitor', 12000.00, 15, 1),
('Office Chair', 'Ergonomic chair', 8000.00, 20, 2),
('Desk', 'Wooden desk', 15000.00, 5, 2),
('T-Shirt', 'Cotton t-shirt', 500.00, 100, 3),
('JavaScript Book', 'Learn JS', 800.00, 25, 4);

-- Insert Orders
INSERT INTO orders (user_id, total_amount, status, order_date) VALUES
(1, 45500.00, 'completed', '2025-01-15'),
(1, 1500.00, 'completed', '2025-01-20'),
(2, 12000.00, 'pending', '2025-02-01'),
(3, 8000.00, 'completed', '2025-02-10'),
(4, 500.00, 'shipped', '2025-02-15');

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 45000.00),
(1, 2, 1, 500.00),
(2, 3, 1, 1500.00),
(3, 4, 1, 12000.00),
(4, 5, 1, 8000.00),
(5, 7, 1, 500.00);

-- ========================================
-- 4. BASIC SELECT QUERIES
-- ========================================

-- Show all tables
SHOW TABLES;

-- Describe table structure
DESCRIBE users;
DESCRIBE employees;

-- Select all columns
SELECT * FROM users;
SELECT * FROM employees;

-- Select specific columns
SELECT name, email FROM users;
SELECT name, department, salary FROM employees;

-- ========================================
-- 5. WHERE CLAUSE (Filtering)
-- ========================================

-- Single condition
SELECT * FROM users WHERE name = 'Alice';
SELECT * FROM employees WHERE salary > 50000;

-- Multiple conditions with AND
SELECT * FROM users WHERE name = 'Bob' AND email = 'bob@example.com';
SELECT * FROM employees WHERE department = 'IT' AND salary > 60000;

-- Multiple conditions with OR
SELECT * FROM users WHERE name = 'Alice' OR name = 'Charlie';
SELECT * FROM employees WHERE department = 'HR' OR department = 'Sales';

-- NOT EQUAL (<> or !=)
SELECT * FROM employees WHERE department <> 'IT';

-- ========================================
-- 6. PATTERN MATCHING (LIKE)
-- ========================================

-- Starts with 'A'
SELECT * FROM employees WHERE name LIKE 'A%';

-- Ends with '@example.com'
SELECT * FROM users WHERE email LIKE '%@example.com';

-- Contains 'Bob'
SELECT * FROM users WHERE name LIKE '%Bob%';

-- ========================================
-- 7. IN, BETWEEN, NOT
-- ========================================

-- IN: Match multiple values
SELECT * FROM employees WHERE department IN ('IT', 'Sales');

-- BETWEEN: Range of values
SELECT * FROM employees WHERE salary BETWEEN 50000 AND 60000;

-- NOT IN
SELECT * FROM employees WHERE department NOT IN ('HR');

-- ========================================
-- 8. SORTING (ORDER BY)
-- ========================================

-- Ascending order (default)
SELECT * FROM employees ORDER BY name ASC;
SELECT * FROM employees ORDER BY salary ASC;

-- Descending order
SELECT * FROM employees ORDER BY salary DESC;

-- Sort by multiple columns
SELECT * FROM employees ORDER BY department ASC, salary DESC;

-- ========================================
-- 9. DISTINCT (Remove duplicates)
-- ========================================

-- Get unique departments
SELECT DISTINCT department FROM employees;

-- ========================================
-- 10. LIMIT & OFFSET
-- ========================================

-- Get first 3 rows
SELECT * FROM employees LIMIT 3;

-- Skip first 2, then show next 3
SELECT * FROM employees LIMIT 3 OFFSET 2;

-- Pagination example: Page 2, 3 items per page
SELECT * FROM products LIMIT 3 OFFSET 3;

-- ========================================
-- 11. AGGREGATE FUNCTIONS
-- ========================================

-- COUNT: Total number of rows
SELECT COUNT(*) AS total_employees FROM employees;
SELECT COUNT(*) AS it_employees FROM employees WHERE department = 'IT';

-- SUM: Add up values
SELECT SUM(salary) AS total_salary_budget FROM employees;

-- AVG: Calculate average
SELECT AVG(salary) AS average_salary FROM employees;

-- MAX & MIN: Highest and lowest
SELECT MAX(salary) AS highest_salary FROM employees;
SELECT MIN(salary) AS lowest_salary FROM employees;

-- Multiple aggregates together
SELECT 
  COUNT(*) AS total_employees,
  AVG(salary) AS avg_salary,
  MAX(salary) AS max_salary,
  MIN(salary) AS min_salary,
  SUM(salary) AS total_budget
FROM employees;

-- ========================================
-- 12. GROUP BY (Group rows)
-- ========================================

-- Count employees per department
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- Average salary per department
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- Total salary budget per department
SELECT department, SUM(salary) AS total_budget
FROM employees
GROUP BY department
ORDER BY total_budget DESC;

-- Multiple grouping columns
SELECT department, 
       COUNT(*) AS count,
       AVG(salary) AS avg_sal,
       MAX(salary) AS max_sal
FROM employees
GROUP BY department;

-- ========================================
-- 13. HAVING (Filter groups)
-- ========================================

-- Departments with more than 1 employee
SELECT department, COUNT(*) AS count
FROM employees
GROUP BY department
HAVING COUNT(*) > 1;

-- Departments with average salary > 50000
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;

-- WHERE vs HAVING
-- WHERE filters ROWS before grouping
-- HAVING filters GROUPS after grouping
SELECT department, AVG(salary) AS avg_sal
FROM employees
WHERE salary > 40000  -- Filter rows first
GROUP BY department
HAVING AVG(salary) > 50000;  -- Then filter groups

-- ========================================
-- 14. JOINS (Combine tables)
-- ========================================

-- INNER JOIN: Only matching rows from both tables
SELECT users.name, users.email, orders.order_id, orders.total_amount
FROM users
INNER JOIN orders ON users.user_id = orders.user_id;

-- Using table aliases (shorter syntax)
SELECT u.name, u.email, o.order_id, o.total_amount, o.status
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id;

-- LEFT JOIN: All from left table + matching from right
SELECT u.name, u.email, o.order_id, o.total_amount
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id;
-- Shows all users, even those without orders (NULL for orders)

-- RIGHT JOIN: All from right table + matching from left
SELECT u.name, o.order_id, o.total_amount
FROM users u
RIGHT JOIN orders o ON u.user_id = o.user_id;

-- Join with WHERE and ORDER BY
SELECT u.name, o.order_id, o.total_amount, o.status
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
WHERE o.total_amount > 5000
ORDER BY o.total_amount DESC;

-- Multiple JOINs
SELECT u.name AS customer, 
       o.order_id, 
       p.name AS product_name,
       oi.quantity,
       oi.price
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id;

-- Join products with categories
SELECT p.name AS product, p.price, c.category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.category_id
ORDER BY c.category_name, p.price DESC;

-- ========================================
-- 15. SUBQUERIES (Query inside query)
-- ========================================

-- Find employees earning more than average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Find products more expensive than average
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Using subquery with IN
SELECT name FROM employees
WHERE department IN (
  SELECT department FROM employees
  GROUP BY department
  HAVING COUNT(*) > 1
);

-- ========================================
-- 16. UPDATE (Modify data)
-- ========================================

-- Update single row
UPDATE employees
SET salary = 75000
WHERE id = 2;

-- Update multiple rows
UPDATE employees
SET salary = salary * 1.1  -- 10% raise
WHERE department = 'IT';

-- Update with multiple columns
UPDATE products
SET price = 46000.00, stock = 15
WHERE product_id = 1;

-- Update based on condition
UPDATE orders
SET status = 'completed'
WHERE order_id = 3;

-- ========================================
-- 17. DELETE (Remove data)
-- ========================================

-- Delete specific row
DELETE FROM cart WHERE cart_id = 1;

-- Delete with condition
DELETE FROM employees WHERE salary < 40000;

-- Delete all rows (DANGEROUS!)
SET SQL_SAFE_UPDATES = 0;
DELETE FROM cart;
SET SQL_SAFE_UPDATES = 1;

-- Better: Use TRUNCATE to delete all (faster)
TRUNCATE TABLE cart;

-- ========================================
-- 18. ALTER TABLE (Modify structure)
-- ========================================

-- Add new column
ALTER TABLE employees
ADD COLUMN phone VARCHAR(15);

-- Drop column
ALTER TABLE employees
DROP COLUMN phone;

-- Modify column type
ALTER TABLE employees
MODIFY COLUMN name VARCHAR(50);

-- Rename column
ALTER TABLE employees
CHANGE COLUMN name employee_name VARCHAR(30);

-- Add constraint
ALTER TABLE products
ADD CONSTRAINT chk_price CHECK (price > 0);

-- ========================================
-- 19. INDEXES (Speed up queries)
-- ========================================

-- Create index on single column
CREATE INDEX idx_email ON users(email);

-- Create index on multiple columns
CREATE INDEX idx_dept_salary ON employees(department, salary);

-- Show indexes
SHOW INDEX FROM users;

-- Drop index
DROP INDEX idx_email ON users;

-- ========================================
-- 20. NULL HANDLING
-- ========================================

-- Check for NULL
SELECT * FROM employees WHERE department IS NULL;

-- Check for NOT NULL
SELECT * FROM employees WHERE department IS NOT NULL;

-- Replace NULL with default value
SELECT name, COALESCE(department, 'Unassigned') AS dept
FROM employees;

-- Count only non-null values
SELECT COUNT(department) FROM employees;

-- ========================================
-- 21. CASE STATEMENT (Conditional logic)
-- ========================================

-- Categorize salary levels
SELECT name, salary,
  CASE
    WHEN salary >= 70000 THEN 'High'
    WHEN salary >= 50000 THEN 'Medium'
    ELSE 'Low'
  END AS salary_level
FROM employees;

-- Categorize order status
SELECT order_id, status,
  CASE status
    WHEN 'completed' THEN 'Done'
    WHEN 'pending' THEN 'Waiting'
    WHEN 'shipped' THEN 'In Transit'
    ELSE 'Unknown'
  END AS status_description
FROM orders;

-- Count by condition
SELECT 
  COUNT(CASE WHEN salary > 60000 THEN 1 END) AS high_earners,
  COUNT(CASE WHEN salary <= 60000 THEN 1 END) AS low_earners
FROM employees;

-- ========================================
-- 22. STRING FUNCTIONS
-- ========================================

-- CONCAT: Combine strings
SELECT CONCAT(name, ' - ', department) AS employee_info
FROM employees;

-- CONCAT with separator
SELECT CONCAT_WS(', ', name, department, salary) AS details
FROM employees;

-- UPPER & LOWER: Change case
SELECT UPPER(name) AS uppercase_name FROM employees;
SELECT LOWER(email) AS lowercase_email FROM users;

-- SUBSTRING: Extract part of string
SELECT name, SUBSTRING(email, 1, 5) AS email_prefix FROM users;

-- LENGTH: Get string length
SELECT name, LENGTH(name) AS name_length FROM employees;

-- TRIM: Remove spaces
SELECT TRIM('  hello  ') AS trimmed;

-- REPLACE: Replace text
SELECT REPLACE(email, '@example.com', '@newdomain.com') FROM users;

-- ========================================
-- 23. DATE FUNCTIONS
-- ========================================

-- Current date/time
SELECT NOW() AS current_datetime;
SELECT CURDATE() AS current_date;
SELECT CURTIME() AS current_time;

-- Extract parts
SELECT 
  order_date,
  YEAR(order_date) AS year,
  MONTH(order_date) AS month,
  DAY(order_date) AS day
FROM orders;

-- Date difference
SELECT order_id, 
       order_date, 
       DATEDIFF(NOW(), order_date) AS days_ago
FROM orders;

-- Add/subtract dates
SELECT order_date, 
       DATE_ADD(order_date, INTERVAL 7 DAY) AS estimated_delivery
FROM orders;

-- Format date
SELECT DATE_FORMAT(order_date, '%d-%m-%Y') AS formatted_date
FROM orders;

-- ========================================
-- 24. VIEWS (Virtual tables)
-- ========================================

-- Create view
CREATE VIEW employee_summary AS
SELECT department, 
       COUNT(*) AS count, 
       AVG(salary) AS avg_salary,
       MAX(salary) AS max_salary
FROM employees
GROUP BY department;

-- Use view like a table
SELECT * FROM employee_summary;

-- Create view for user orders
CREATE VIEW user_order_summary AS
SELECT u.user_id, u.name, COUNT(o.order_id) AS total_orders, 
       SUM(o.total_amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.name;

SELECT * FROM user_order_summary;

-- Drop view
DROP VIEW IF EXISTS employee_summary;

-- ========================================
-- 25. TRANSACTIONS (Multi-query operations)
-- ========================================

-- Start transaction
START TRANSACTION;

UPDATE products SET stock = stock - 1 WHERE product_id = 1;
INSERT INTO orders (user_id, total_amount, status) VALUES (1, 45000, 'pending');

-- If everything OK, save changes
COMMIT;

-- If error occurs, undo all changes
-- ROLLBACK;

-- ========================================
-- 26. COMMON INTERVIEW QUERIES
-- ========================================

-- Q1: Find users who never placed an order
SELECT u.name, u.email
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE o.order_id IS NULL;

-- Q2: Top 3 most expensive products
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 3;

-- Q3: Total revenue per user
SELECT u.name, 
       COUNT(o.order_id) AS total_orders,
       SUM(o.total_amount) AS total_spent
FROM users u
INNER JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.name
ORDER BY total_spent DESC;

-- Q4: Products never ordered
SELECT p.name, p.price
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL;

-- Q5: Department-wise salary vs company average
SELECT department, 
  AVG(salary) AS dept_avg,
  (SELECT AVG(salary) FROM employees) AS company_avg,
  AVG(salary) - (SELECT AVG(salary) FROM employees) AS difference
FROM employees
GROUP BY department;

-- Q6: Second highest salary
SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Q7: Find duplicate emails (if any)
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Q8: Products in each category with count
SELECT c.category_name, COUNT(p.product_id) AS product_count
FROM categories c
LEFT JOIN products p ON c.category_id = p.category_id
GROUP BY c.category_id, c.category_name;

-- Q9: Monthly order summary
SELECT 
  YEAR(order_date) AS year,
  MONTH(order_date) AS month,
  COUNT(*) AS total_orders,
  SUM(total_amount) AS monthly_revenue
FROM orders
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY year, month;

-- Q10: Employees hired in last 2 years
SELECT name, department, hire_date
FROM employees
WHERE hire_date >= DATE_SUB(CURDATE(), INTERVAL 2 YEAR);

-- ========================================
-- 27. DROP TABLES & DATABASE (Cleanup)
-- ========================================

-- Drop tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;

-- Drop database
DROP DATABASE IF EXISTS ecommerce_db;

-- ========================================
-- END OF SQL INTERVIEW PREP FILE
-- ========================================

/* 
PRACTICE TIPS:
1. Start with SELECT, WHERE, ORDER BY
2. Master JOINs - most asked in interviews
3. Practice GROUP BY with HAVING
4. Learn aggregate functions (COUNT, SUM, AVG)
5. Understand difference between WHERE and HAVING
6. Practice subqueries
7. Know when to use INNER vs LEFT JOIN

RUN THIS FILE:
mysql -u root -p < complete_sql_interview_prep.sql
OR
Copy sections and run in MySQL Workbench/terminal
*/

