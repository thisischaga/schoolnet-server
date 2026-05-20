const express = require('express');
const router = express.Router();
const { 
  getCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} = require('../controllers/course.controller');
const protect = require('../middleware/auth.middleware');

router.get('/', getCourses);
router.get('/:id', getCourseById);

// Admin-only (should add admin middleware later, for now just protected)
router.post('/', protect, createCourse);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);

module.exports = router;
