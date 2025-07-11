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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to CAiRL Server</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f2f5;
        }
        .container {
          text-align: center;
          padding: 40px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 2.5em;
          color: #333;
        }
        p {
          font-size: 1.2em;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to the CAiRL Server</h1>
        <p>Your gateway to our services.</p>
      </div>
    </body>
    </html>
  `);
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
