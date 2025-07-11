import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async () => {
  try {
    logger.info("Attempting to connect to MongoDB...");

    

    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      logger.error('MONGO_URI is not defined in the environment variables.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri);

    logger.info(`MongoDB connected: ${conn.connection.host}`, {
      dbName: conn.connection.name,
      port: conn.connection.port,
    });

    // Log when connection is disconnected
    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    // Log when connection is reconnected
    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB reconnected");
    });

    // Log connection errors
    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error:", {
        error: err.message,
        stack: err.stack,
      });
    });

    return conn;
  } catch (error: any) {
    logger.error("MongoDB connection failed:", {
      error: error.message,
      stack: error.stack,
      uri: process.env.MONGO_URI
        ? `${process.env.MONGO_URI.substring(0, 15)}...`
        : "undefined",
    });
    process.exit(1);
  }
};

export { connectDB };