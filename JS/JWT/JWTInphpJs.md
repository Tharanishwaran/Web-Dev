JWT (JSON Web Token) works the **same conceptually** in both stacks, but the **implementation differs** due to language and ecosystem variations. The core JWT flow remains identical - authentication generates a token that's validated on subsequent requests.[1][2][3][4]

## Core JWT Concept (Same in Both)

JWT consists of three parts: Header, Payload, and Signature encoded as `xxxxx.yyyyy.zzzzz`. Both stacks follow the same authentication flow where the client sends credentials, server validates them, generates a JWT token, and the client includes this token in subsequent requests.[2][3][4][1]

## Key Differences Between PHP and MERN

| Aspect | PHP + JS + MySQL | MERN Stack (Node.js) |
|--------|-----------------|---------------------|
| **JWT Library** | `firebase/php-jwt` package [1][5] | `jsonwebtoken` npm package [3] |
| **Token Generation** | Manual encoding with PHP functions [1] | `jwt.sign()` method [3] |
| **Token Verification** | Custom middleware or functions [1][6] | `jwt.verify()` or middleware like `express-jwt` [3] |
| **Async Handling** | Synchronous by default [7] | Asynchronous/Promise-based [7] |
| **Environment Variables** | Accessed via `$_ENV` or `getenv()` | `process.env` with dotenv package [3] |
| **Middleware Pattern** | Manual implementation in routing [6] | Built-in Express middleware support [3] |

## JWT Implementation in PHP

```php
<?php
// Install: composer require firebase/php-jwt

require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// Configuration
$secretKey = getenv('JWT_SECRET') ?: 'your-secret-key-here';
$issuer = 'your-domain.com';
$audience = 'your-audience';

// Generate JWT (Login endpoint)
function generateToken($userId, $email) {
    global $secretKey, $issuer, $audience;
    
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600; // 1 hour
    
    $payload = [
        'iss' => $issuer,
        'aud' => $audience,
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'userId' => $userId,
        'email' => $email
    ];
    
    return JWT::encode($payload, $secretKey, 'HS256');
}

// Login endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/api/login') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate credentials
    $stmt = $pdo->prepare("SELECT id, email, password FROM users WHERE email = ?");
    $stmt->execute([$data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($data['password'], $user['password'])) {
        $token = generateToken($user['id'], $user['email']);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => ['id' => $user['id'], 'email' => $user['email']]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
    exit;
}

// Verify JWT middleware function
function verifyToken() {
    global $secretKey;
    
    $headers = getallheaders();
    
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'No token provided']);
        exit;
    }
    
    $authHeader = $headers['Authorization'];
    $token = str_replace('Bearer ', '', $authHeader);
    
    try {
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token: ' . $e->getMessage()]);
        exit;
    }
}

// Protected endpoint
if ($_SERVER['REQUEST_URI'] === '/api/profile') {
    $user = verifyToken(); // Verify before accessing
    
    // Fetch user data
    $stmt = $pdo->prepare("SELECT id, email, name FROM users WHERE id = ?");
    $stmt->execute([$user->userId]);
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode($userData);
    exit;
}
?>
```

## JWT Implementation in MERN (Node.js)

```javascript
// Install: npm install jsonwebtoken bcrypt dotenv
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
const JWT_EXPIRES_IN = '1h';

// Generate JWT (Login route)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate credentials
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
        
        res.json({
            success: true,
            token,
            user: { id: user._id, email: user.email }
        });
        
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        req.user = decoded; // Attach user data to request
        next();
    });
};

// Protected route
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        // req.user contains decoded JWT payload
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
```

## Frontend JavaScript (Same for Both)

The frontend implementation is **identical** for both stacks since both use JavaScript/React:[3][4]

```javascript
// Login function
async function login(email, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (data.token) {
        // Store token in localStorage or cookie
        localStorage.setItem('token', data.token);
    }
    
    return data;
}

// Accessing protected routes
async function getProfile() {
    const token = localStorage.getItem('token');
    
    const response = await fetch('/api/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    return await response.json();
}

// Axios alternative
import axios from 'axios';

// Set default authorization header
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Or use interceptor
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

The main difference is that **Node.js has cleaner async/await syntax and built-in middleware patterns**, while **PHP requires more manual implementation**. However, the JWT concept, token structure, and frontend usage remain identical across both stacks.[6][7][4][1][2][3]

[1](https://www.freecodecamp.org/news/php-jwt-authentication-implementation/)
[2](https://www.sitepoint.com/php-authorization-jwt-json-web-tokens/)
[3](https://github.com/akash-coded/mern/discussions/199)
[4](https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/)
[5](https://github.com/firebase/php-jwt)
[6](https://www.loginradius.com/blog/engineering/guest-post/securing-php-api-with-jwt)
[7](https://distantjob.com/blog/nodejs-vs-php/)
[8](https://jwt-auth.readthedocs.io/en/develop/quick-start/)
[9](https://www.youtube.com/watch?v=Qw3XRpzVsUw)
[10](https://www.milesweb.in/blog/technology-hub/node-js-vs-php/)
