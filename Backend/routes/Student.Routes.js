import express from 'express';
import {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from '../controllers/Student.controller.js';

const router = express.Router();

router.post('/', createStudent);
router.get('/:id', getStudentById);
router.get('/', getAllStudents);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
