import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../middleware/err.js';
import { Task } from '../models/task.js';
import { User } from '../models/user.js';


const createTask = async (req, res, next) => {
  try {
    const {name, isCompleted} = req.body;
    const { token } = req.cookies;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log({user: decoded._id, name});

    const task = await Task.findOne({user: decoded._id, name})
    if (task) {
      return next(new ErrorHandler("Task already exist...", 400));
    }

    await Task.create({
      name,
      isCompleted,
      user: req.user,
      createAt: new Date(Date.now()),
    });

    res.status(201).json({
      success: true,
      message: "Tasks added successfully!",
    })
  } catch (error) {
    next(error)
  }
}

const getMyTasks = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({user: userid});

    return res.status(200).json({
      success: true,
      tasks
    })
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) { return next(new Error("Invalid Id...")) }

    task.isCompleted = !task.isCompleted;

    task.save();

    res.status(200).json({
      success: true,
      task
    })
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) { return next( new ErrorHandler("Invalid Id...")) }

    task.deleteOne();

    res.status(200).json({
      success: true,
      task
    })
  } catch (error) {
    next(error);
  }
}

export {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
}
