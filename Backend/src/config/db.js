import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB Connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;