import mongoose from "mongoose";
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("💥 MongoDB connection failed", err);
    process.exit(1);
  }
}

export default connectDB;
