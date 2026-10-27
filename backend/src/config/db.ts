import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/islah_db";

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Connected successfully to ${conn.connection.host}/${conn.connection.name}`);
    
    // Seed initial patients if collection is empty
    const { seedInitialPatients } = await import("../utils/seedPatients.js");
    await seedInitialPatients();
  } catch (error) {
    console.error("[MongoDB] Connection error:", error);
    // In local dev, allow server to continue running if MongoDB is not yet started
    console.warn("[MongoDB] Please ensure MongoDB is running or configure MONGODB_URI in .env");
  }
}

