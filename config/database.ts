import mongoose from "mongoose";

let connected = false;
const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If database already connected
  if (connected) {
    console.log("MongoDB is connected");
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
