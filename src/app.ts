import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger";
import userRoutes from "./routes/userRoutes";
import webinarRoutes from "./routes/webinarRoutes";
import newsletterRoutes from "./routes/newsletterRoutes";
import upcomingWebinarRoutes from "./routes/upcomingWebinarRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Morgan for HTTP request logging
app.use(
  morgan("combined", {
    stream: { write: (message: string) => logger.info(message.trim()) },
  })
);

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// User routes
app.use("/api/users", userRoutes);
app.use("/api/webinars", webinarRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/upcoming-webinars", upcomingWebinarRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
