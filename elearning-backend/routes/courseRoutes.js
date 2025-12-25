const express = require('express');
const router = express.Router();
const course = require('../controllers/courseController');
const { verifyToken, isInstructor } = require('../middleware/authMiddleware');

router.post('/', verifyToken, isInstructor, course.createCourse);
router.get('/', course.getAllCourses);

module.exports = router;
