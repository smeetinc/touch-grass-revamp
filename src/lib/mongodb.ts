import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI!, {
      dbName: "touchgrass", // or your preferred DB name
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}
