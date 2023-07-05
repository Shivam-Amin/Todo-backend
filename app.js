import express  from 'express';
import {config} from 'dotenv';
import taskRouter from './routes/tasks.js';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/err.js';
import cors from 'cors';

export const app = express();
config({
  path: '.env'
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "POST", "DELETE"],
  credentials: true
}))
// app.use(express.static("client/build"));

// Using routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

// app.get('/api/v1/tasks')          - get all the tasks
// app.post('/api/v1/tasks')         - create a new task
// app.get('/api/v1/tasks/:id')      - get single task
// app.patch('/api/v1/tasks/:id')    - update task
// app.delete('/api/v1/tasks/:id')   - delete task

// Using next() middleware
app.use(errorMiddleware)

