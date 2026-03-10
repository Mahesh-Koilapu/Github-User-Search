const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const db = require('../db/setup'); 
// handle user registration and login logic.

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, hashedPassword], function (err) {
      if (err) {
        console.error('Registration error:', err.message);
        return res.status(400).json({ message: 'User already exists' });
      }
      
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Server error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  // Find user in database
  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], async (err, user) => {
    if (err) {
      console.error('Login error:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ token });
  });
};

module.exports = { register, login };
