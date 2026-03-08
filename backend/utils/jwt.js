const jwt = require('jsonwebtoken');
const SECRET_KEY = 'my_secret_key_change_this_in_production';

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

module.exports = { generateToken, SECRET_KEY };
