const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/jwtUtils');

// Mock user database
const users = []; // Replace with a real database in production

const register = (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = { id: users.length + 1, username, password: hashedPassword };

  users.push(user);
  res.status(201).json({ message: 'User registered successfully' });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user);
  res.status(200).json({ token });
};

module.exports = {
  register,
  login,
};
