import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error connecting to the database ${error.message}`);
  }
}
