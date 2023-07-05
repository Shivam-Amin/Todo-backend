import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      dbName: "backend",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Database is connected...')
  } catch (error) {
    console.log(error)
  }
}

