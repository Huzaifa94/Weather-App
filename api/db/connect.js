import mongoose from "mongoose";
const uri = 'mongodb://127.0.0.1:27017/weatherApp';

async function connectDB() {
  try {
    await mongoose.connect(uri, {
    
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

export default connectDB;