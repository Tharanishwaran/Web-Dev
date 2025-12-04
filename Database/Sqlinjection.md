# SQL Injection & Prevention Guide: Plain PHP + JS + MySQL

## **VULNERABLE CODE EXAMPLES**

### **1. Login Form - Vulnerable**
**HTML/JS (login.html):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Login - Vulnerable</title>
</head>
<body>
    <h2>Login (Vulnerable)</h2>
    <form id="loginForm" action="login.php" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>
    
    <script>
        // Client-side validation (easily bypassed)
        document.getElementById('loginForm').onsubmit = function() {
            const username = document.querySelector('[name="username"]').value;
            const password = document.querySelector('[name="password"]').value;
            
            if(username.trim() === '' || password.trim() === '') {
                alert('Please fill all fields');
                return false;
            }
            return true;
        };
    </script>
</body>
</html>
```

**PHP - Vulnerable (login.php):**
```php
<?php
// login.php - VULNERABLE VERSION
$host = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = 'testdb';

$conn = new mysqli($host, $dbuser, $dbpass, $dbname);

// Get user input directly
$username = $_POST['username'];  // DANGER: No sanitization
$password = $_POST['password'];  // DANGER: No sanitization

// EXTREMELY VULNERABLE QUERY
$sql = "SELECT * FROM users 
        WHERE username = '$username' 
        AND password = '$password'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Login successful! Welcome " . htmlspecialchars($username);
    // Start session, set cookies, etc.
} else {
    echo "Login failed!";
}

$conn->close();
?>
```

**Attack Payloads:**
```sql
Username: admin' --
Password: anything
Result: SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'

Username: ' OR '1'='1
Password: ' OR '1'='1
Result: Always returns true!
```

### **2. Search Function - Vulnerable**
**PHP (search.php):**
```php
<?php
// search.php - VULNERABLE
$conn = mysqli_connect("localhost", "root", "", "testdb");

$search = $_GET['q'];  // Directly from user input

// VULNERABLE: Direct concatenation
$query = "SELECT * FROM products 
          WHERE name LIKE '%$search%' 
          OR description LIKE '%$search%'";

echo "Executing: " . htmlspecialchars($query) . "<br><br>";

$result = mysqli_query($conn, $query);

while($row = mysqli_fetch_assoc($result)) {
    echo $row['name'] . ": " . $row['description'] . "<br>";
}

// UNION ATTACK EXAMPLE
// User inputs: ' UNION SELECT username, password FROM users --
// Shows all user credentials!
?>
```

### **3. User Registration - Vulnerable**
**PHP (register.php):**
```php
<?php
// register.php - VULNERABLE
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = new mysqli("localhost", "root", "", "testdb");
    
    $name = $_POST['name'];
    $email = $_POST['email'];
    $age = $_POST['age'];
    
    // MULTIPLE VULNERABILITIES
    $sql = "INSERT INTO users (name, email, age) 
            VALUES ('$name', '$email', $age)";
    
    // Attack payloads:
    // name: Robert'); DROP TABLE users; --
    // email: test@test.com
    // age: 0
}
?>
```

### **4. URL Parameters - Vulnerable**
**PHP (user.php):**
```php
<?php
// user.php - VULNERABLE
$user_id = $_GET['id'];  // Direct from URL

$conn = mysqli_connect("localhost", "root", "", "testdb");

// VULNERABLE: No validation
$sql = "SELECT * FROM users WHERE id = $user_id";
$result = mysqli_query($conn, $sql);

// Attack: user.php?id=1 OR 1=1
// Shows ALL users!
?>
```

---

## **SECURE IMPLEMENTATIONS**

### **1. PREVENTION: Parameterized Queries (Prepared Statements)**

**Secure Login System:**

**HTML/JS (secure_login.html):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Login - Secure</title>
    <script>
        function validateForm() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Client-side validation (UX only, not security)
            if(username.length < 3 || username.length > 50) {
                alert('Username must be 3-50 characters');
                return false;
            }
            
            if(!/^[a-zA-Z0-9_@.]+$/.test(username)) {
                alert('Invalid characters in username');
                return false;
            }
            
            // Password strength check
            if(password.length < 8) {
                alert('Password must be at least 8 characters');
                return false;
            }
            
            return true;
        }
        
        // Add CSRF token (simple implementation)
        window.onload = function() {
            const csrfToken = Math.random().toString(36).substring(2);
            document.getElementById('csrf_token').value = csrfToken;
            localStorage.setItem('csrf_token', csrfToken);
        };
    </script>
</head>
<body>
    <h2>Login (Secure)</h2>
    <form action="secure_login.php" method="POST" onsubmit="return validateForm()">
        <input type="hidden" id="csrf_token" name="csrf_token">
        
        <input type="text" id="username" name="username" 
               placeholder="Username" 
               pattern="[a-zA-Z0-9_@.]{3,50}" 
               title="3-50 characters, letters, numbers, @, ., _ only"
               required>
        
        <input type="password" id="password" name="password" 
               placeholder="Password" 
               minlength="8"
               required>
        
        <button type="submit">Login</button>
    </form>
</body>
</html>
```

**Secure PHP (secure_login.php):**
```php
<?php
// secure_login.php - SECURE VERSION
session_start();
header('Content-Type: text/html; charset=utf-8');

// 1. CSRF Protection
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || 
        $_POST['csrf_token'] !== ($_SESSION['csrf_token'] ?? '')) {
        die('CSRF validation failed');
    }
}

// 2. Database Connection with Error Handling
function getDBConnection() {
    $host = 'localhost';
    $dbuser = 'app_user';  // Limited privilege user
    $dbpass = 'StrongPassword123!';
    $dbname = 'secure_app';
    
    $conn = new mysqli($host, $dbuser, $dbpass, $dbname);
    
    if ($conn->connect_error) {
        error_log("Connection failed: " . $conn->connect_error);
        die("Database connection error. Please try later.");
    }
    
    // Set charset to prevent encoding issues
    $conn->set_charset("utf8mb4");
    
    return $conn;
}

// 3. Input Validation
function validateInput($data, $type = 'string') {
    $data = trim($data);
    $data = stripslashes($data);
    
    switch($type) {
        case 'username':
            // Allow only alphanumeric, underscore, @, and dot
            if (!preg_match('/^[a-zA-Z0-9_@.]{3,50}$/', $data)) {
                return false;
            }
            break;
            
        case 'email':
            if (!filter_var($data, FILTER_VALIDATE_EMAIL)) {
                return false;
            }
            // Additional check
            if (strlen($data) > 254) {
                return false;
            }
            break;
            
        case 'integer':
            if (!filter_var($data, FILTER_VALIDATE_INT)) {
                return false;
            }
            $data = (int)$data;  // Type casting
            break;
            
        case 'password':
            // Basic length check
            if (strlen($data) < 8) {
                return false;
            }
            break;
            
        default:
            // General string validation
            if (empty($data)) {
                return false;
            }
            // Prevent XSS
            $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    }
    
    return $data;
}

// 4. Main Login Logic
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn = getDBConnection();
    
    // Validate inputs
    $username = validateInput($_POST['username'] ?? '', 'username');
    $password = $_POST['password'] ?? '';
    
    if (!$username) {
        die("Invalid username format");
    }
    
    // 5. PREPARED STATEMENT (Parameterized Query)
    $stmt = $conn->prepare("SELECT id, username, password_hash FROM users WHERE username = ?");
    
    if (!$stmt) {
        error_log("Prepare failed: " . $conn->error);
        die("System error. Please try later.");
    }
    
    // Bind parameters
    $stmt->bind_param("s", $username);
    
    // Execute
    if (!$stmt->execute()) {
        error_log("Execute failed: " . $stmt->error);
        die("System error. Please try later.");
    }
    
    $result = $stmt->get_result();
    
    // 6. Password Verification
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verify password hash (never store plain passwords!)
        if (password_verify($password, $user['password_hash'])) {
            
            // Regenerate session ID to prevent fixation
            session_regenerate_id(true);
            
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['logged_in'] = true;
            $_SESSION['ip_address'] = $_SERVER['REMOTE_ADDR'];
            $_SESSION['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
            
            // Set secure cookie
            setcookie('session_id', session_id(), [
                'expires' => time() + 3600,
                'path' => '/',
                'domain' => $_SERVER['HTTP_HOST'],
                'secure' => true,  // HTTPS only
                'httponly' => true, // No JavaScript access
                'samesite' => 'Strict'
            ]);
            
            echo "Login successful!";
            // Redirect to dashboard
            header("Location: dashboard.php");
            exit;
        }
    }
    
    // Generic error message (don't reveal if user exists)
    echo "Invalid credentials";
    
    // Log failed attempt
    error_log("Failed login attempt for username: " . $username . " from IP: " . $_SERVER['REMOTE_ADDR']);
    
    $stmt->close();
    $conn->close();
}
?>
```

### **2. Secure Search Function**
**PHP (secure_search.php):**
```php
<?php
// secure_search.php
function secureSearch($searchTerm, $conn) {
    // 1. Input validation
    $searchTerm = trim($searchTerm);
    
    // Allow only safe characters for search
    if (!preg_match('/^[a-zA-Z0-9\s\-@.\']{1,100}$/', $searchTerm)) {
        return [];  // Return empty array for invalid input
    }
    
    // 2. Prepared statement
    $stmt = $conn->prepare("
        SELECT id, name, description, price 
        FROM products 
        WHERE name LIKE CONCAT('%', ?, '%') 
        OR description LIKE CONCAT('%', ?, '%')
        LIMIT 50  -- Prevent too many results
    ");
    
    // 3. Bind parameters
    $stmt->bind_param("ss", $searchTerm, $searchTerm);
    
    // 4. Execute
    $stmt->execute();
    $result = $stmt->get_result();
    
    $products = [];
    while($row = $result->fetch_assoc()) {
        // Escape output
        $row['name'] = htmlspecialchars($row['name'], ENT_QUOTES, 'UTF-8');
        $row['description'] = htmlspecialchars($row['description'], ENT_QUOTES, 'UTF-8');
        $products[] = $row;
    }
    
    $stmt->close();
    return $products;
}
?>
```

### **3. Secure User Registration**
**PHP (secure_register.php):**
```php
<?php
// secure_register.php
session_start();

function registerUser($name, $email, $password, $conn) {
    // 1. Validate all inputs
    $name = validateInput($name, 'name');
    $email = validateInput($email, 'email');
    
    if(!$name || !$email) {
        return "Invalid input data";
    }
    
    // 2. Check if email exists (Prepared Statement)
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    
    if($stmt->get_result()->num_rows > 0) {
        return "Email already registered";
    }
    $stmt->close();
    
    // 3. Hash password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    
    // 4. Insert with prepared statement
    $stmt = $conn->prepare("
        INSERT INTO users (name, email, password_hash, created_at) 
        VALUES (?, ?, ?, NOW())
    ");
    
    $stmt->bind_param("sss", $name, $email, $password_hash);
    
    if($stmt->execute()) {
        // Log successful registration
        error_log("New user registered: " . $email);
        return "Registration successful";
    } else {
        error_log("Registration failed: " . $stmt->error);
        return "Registration failed";
    }
}
?>
```

### **4. Secure Database Setup Script**
**SQL (setup_secure_db.sql):**
```sql
-- Create database
CREATE DATABASE IF NOT EXISTS secure_app 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE secure_app;

-- Create limited privilege user
CREATE USER IF NOT EXISTS 'app_user'@'localhost' 
IDENTIFIED BY 'StrongPassword123!';

-- Grant minimal privileges
GRANT SELECT, INSERT, UPDATE ON secure_app.users TO 'app_user'@'localhost';
GRANT SELECT, INSERT ON secure_app.logs TO 'app_user'@'localhost';
-- NO DROP, NO DELETE, NO GRANT privileges!

-- Create users table with secure design
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(254) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    -- Add security fields
    failed_attempts INT DEFAULT 0,
    locked_until DATETIME NULL,
    last_login DATETIME NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    
    -- Add indexes
    INDEX idx_email (email),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create login attempts log
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ip_address VARCHAR(45) NOT NULL,
    username VARCHAR(50) NOT NULL,
    attempt_time DATETIME NOT NULL,
    success BOOLEAN NOT NULL
) ENGINE=InnoDB;

-- Insert admin user with hashed password
INSERT INTO users (username, email, password_hash, created_at, updated_at) 
VALUES (
    'admin', 
    'admin@example.com',
    -- Hash for 'Admin@123'
    '$2y$10$YourHashedPasswordHere',
    NOW(),
    NOW()
);
```

### **5. Additional Security Functions**
**PHP (security_functions.php):**
```php
<?php
// security_functions.php

// Rate limiting function
function checkRateLimit($ip, $action, $limit = 5, $timeWindow = 300) {
    $conn = getDBConnection();
    $timeAgo = date('Y-m-d H:i:s', time() - $timeWindow);
    
    $stmt = $conn->prepare("
        SELECT COUNT(*) as attempts 
        FROM rate_limits 
        WHERE ip_address = ? AND action = ? AND attempt_time > ?
    ");
    
    $stmt->bind_param("sss", $ip, $action, $timeAgo);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    
    return $result['attempts'] < $limit;
}

// Log security events
function logSecurityEvent($event, $details, $userId = null) {
    $conn = getDBConnection();
    $ip = $_SERVER['REMOTE_ADDR'];
    $userAgent = $_SERVER['HTTP_USER_AGENT'];
    
    $stmt = $conn->prepare("
        INSERT INTO security_logs 
        (event_type, details, ip_address, user_agent, user_id, created_at) 
        VALUES (?, ?, ?, ?, ?, NOW())
    ");
    
    $stmt->bind_param("ssssi", $event, $details, $ip, $userAgent, $userId);
    $stmt->execute();
}

// Secure file upload
function secureUpload($file, $allowedTypes = ['image/jpeg', 'image/png']) {
    // Check file type
    if(!in_array($file['type'], $allowedTypes)) {
        return false;
    }
    
    // Check file extension
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedExt = ['jpg', 'jpeg', 'png'];
    if(!in_array($ext, $allowedExt)) {
        return false;
    }
    
    // Check file size (max 2MB)
    if($file['size'] > 2097152) {
        return false;
    }
    
    // Generate safe filename
    $newFilename = uniqid() . '.' . $ext;
    
    // Move to secure location (outside web root if possible)
    $uploadPath = '/var/www/uploads/' . $newFilename;
    
    if(move_uploaded_file($file['tmp_name'], $uploadPath)) {
        return $newFilename;
    }
    
    return false;
}
?>
```

### **6. JavaScript Security Helpers**
**JS (security.js):**
```javascript
// Client-side security helpers (UX only, not for real security)

// Sanitize input for display
function sanitizeForDisplay(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Validate email format
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate password strength
function isStrongPassword(password) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

// Prevent form double submission
function preventDoubleSubmit(formId) {
    const form = document.getElementById(formId);
    let submitted = false;
    
    form.addEventListener('submit', function(e) {
        if(submitted) {
            e.preventDefault();
            return false;
        }
        submitted = true;
        
        // Disable submit button
        const submitBtn = form.querySelector('[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
        
        return true;
    });
}

// Add CSRF token to AJAX requests
function addCSRFToken(xhr) {
    const token = localStorage.getItem('csrf_token') || 
                  document.querySelector('meta[name="csrf-token"]')?.content;
    
    if(token) {
        xhr.setRequestHeader('X-CSRF-Token', token);
    }
}
```

### **7. Secure Configuration File**
**PHP (config.php):**
```php
<?php
// config.php - Secure configuration

// Disable error display in production
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);  // In production
// error_reporting(E_ALL);  // In development only

// Session security
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);  // HTTPS only
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_lifetime', 3600);

// Prevent information leakage
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Content Security Policy (CSP)
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted.cdn.com; style-src 'self' 'unsafe-inline';");

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'app_user');
define('DB_PASS', getenv('DB_PASSWORD'));  // From environment variable
define('DB_NAME', 'secure_app');

// Application settings
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOCKOUT_TIME', 900);  // 15 minutes
define('SESSION_TIMEOUT', 1800);  // 30 minutes
?>
```

---

## **ATTACK PREVENTION CHECKLIST**

### ✅ **ALWAYS DO:**
1. **Use prepared statements** for ALL database queries
2. **Validate AND sanitize** all user inputs
3. **Use parameterized queries** (bind_param in MySQLi)
4. **Hash passwords** with password_hash()
5. **Escape output** with htmlspecialchars()
6. **Use HTTPS** for all pages
7. **Set secure cookie flags** (HttpOnly, Secure, SameSite)
8. **Implement CSRF tokens**
9. **Use principle of least privilege** for database users
10. **Log security events**

### ❌ **NEVER DO:**
1. ❌ Direct string concatenation in SQL
2. ❌ Trust ANY user input (GET, POST, COOKIE, HEADERS)
3. ❌ Display raw database errors to users
4. ❌ Store plain text passwords
5. ❌ Use root database user for web app
6. ❌ Disable input validation for "convenience"
7. ❌ Use addslashes() for SQL injection prevention
8. ❌ Allow unlimited login attempts
9. ❌ Use GET for sensitive operations
10. ❌ Forget to update PHP and MySQL regularly

### **Quick Reference: Secure Query Pattern**
```php
// BAD: Concatenation (VULNERABLE)
$sql = "SELECT * FROM users WHERE id = $id";

// GOOD: Prepared Statement (SECURE)
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("i", $id);  // "i" for integer, "s" for string
$stmt->execute();
```

### **Testing Your Security:**
```php
// Test your code with these attack strings:
$testInputs = [
    "admin' --",
    "' OR '1'='1",
    "1; DROP TABLE users; --",
    "<script>alert('xss')</script>",
    "../../etc/passwd",
    "' UNION SELECT * FROM users --"
];

// If any of these work, you have vulnerabilities!
```

**Remember:** Client-side JavaScript validation is for UX only. **ALWAYS validate on server-side in PHP.** SQL injection prevention is 100% a server-side responsibility.
