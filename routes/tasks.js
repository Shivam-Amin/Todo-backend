import express from 'express';
import  { 
  createTask,
  getMyTasks,
  updateTask,
  deleteTask } from '../controllers/tasks.js';
import { isAuthenticate } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/all')
    .get( isAuthenticate, getMyTasks )

router
  .route('/newTask')
    .post( isAuthenticate, createTask )

router
  .route('/:id')
    .patch(isAuthenticate, updateTask)
    .delete(isAuthenticate, deleteTask)

// router
//   .route('/:id')

export default router;