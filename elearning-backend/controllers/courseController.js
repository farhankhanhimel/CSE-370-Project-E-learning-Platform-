const db = require('../config/db');

exports.createCourse = (req, res) => {
  const { title, description, category_id, difficulty } = req.body;

  const sql = `
    INSERT INTO courses
    (title, description, category_id, instructor_id, difficulty)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, category_id, req.user.user_id, difficulty],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Course created (pending approval)' });
    }
  );
};

exports.getAllCourses = (req, res) => {
  const sql = `
    SELECT c.*, u.name AS instructor, cat.category_name
    FROM courses c
    JOIN users u ON c.instructor_id = u.user_id
    JOIN categories cat ON c.category_id = cat.category_id
    WHERE c.status = 'published'
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
