const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (name, email, password_hash, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, hashedPassword, role || 'student'], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, result) => {
      if (err || result.length === 0)
        return res.status(401).json({ message: 'Invalid credentials' });

      const user = result[0];
      const isMatch = bcrypt.compareSync(password, user.password_hash);

      if (!isMatch)
        return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { user_id: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({ token, role: user.role });
    }
  );
};
