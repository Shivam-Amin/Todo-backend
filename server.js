import { app } from './app.js' 
import { connectDB } from './db/connect.js';


// MONGOOSE setup
const port = process.env.PORT || 5000;

const start = async () => {
  try {  
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`)
    })
  } catch (error) {
    console.log(error);
  }
}

start();


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     // console.log(path.resolve());
//     // console.log(path.resolve(__dirname, 'client', 'build', 'index.html'))
// }) 