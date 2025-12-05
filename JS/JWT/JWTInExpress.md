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


Session Workflow:
Login: User submits credentials → Server validates → Creates session → Sends cookie

Storage: Session data stored on SERVER (files, DB, Redis)

Authentication: Browser sends cookie → Server looks up session data

State: Stateful (server maintains state)

Logout: Destroy session on server

JWT Workflow:
Login: User submits credentials → Server validates → Creates JWT → Sends token

Storage: Token stored on CLIENT (localStorage, cookies, memory)

Authentication: Client sends token → Server verifies signature

State: Stateless (all data in token)

Logout: Simply discard token (no server cleanup needed)
