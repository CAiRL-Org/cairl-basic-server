import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger";
import userRoutes from "./routes/userRoutes";
import webinarRoutes from "./routes/webinarRoutes";
import newsletterRoutes from "./routes/newsletterRoutes";
import upcomingWebinarRoutes from "./routes/upcomingWebinarRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import { setupSwagger } from "./config/swagger";

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "https://cairl-modern-client.vercel.app",
  "https://cairl.org",
  "https://www.cairl.org",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));

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
  <title>Welcome to CAiRL Foundation</title>
  <style>
    :root {
      --primary-color: #2c3e50;
      --secondary-color: #3498db;
      --accent-color: #e74c3c;
      --text-color: #333;
      --light-text: #7f8c8d;
      --background-color: #f8f9fa;
      --card-bg: #ffffff;
    }
    
    body {
      font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--background-color);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    .main-container {
      width: 100%;
      max-width: 900px;
      padding: 2rem;
    }
    
    .card {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      padding: 3rem;
      text-align: center;
    }
    
    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 1.5rem;
      object-fit: contain;
    }
    
    h1 {
      color: var(--primary-color);
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    
    .subtitle {
      font-size: 1.25rem;
      color: var(--secondary-color);
      font-weight: 400;
      margin-bottom: 2rem;
    }
    
    .content {
      font-size: 1.1rem;
      color: var(--text-color);
      margin-bottom: 2.5rem;
      text-align: left;
    }
    
    .cta-section {
      margin-top: 2rem;
    }
    
    .cta-button {
      display: inline-block;
      background-color: var(--secondary-color);
      color: white;
      padding: 0.8rem 2rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    
    .cta-button:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(41, 128, 185, 0.3);
    }
    
    .footer {
      margin-top: 3rem;
      font-size: 0.9rem;
      color: var(--light-text);
    }
    
    @media (max-width: 768px) {
      .card {
        padding: 2rem 1.5rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .subtitle {
        font-size: 1.1rem;
      }
      
      .logo {
        width: 70px;
        height: 70px;
      }
    }
  </style>
</head>
<body>
  <div class="main-container">
    <div class="card">
      <img 
        src="https://res.cloudinary.com/dnyouhvwj/image/upload/v1750176660/footer-logo_jgk1wb.png" 
        alt="CAiRL Logo" 
        class="logo"
      >
      
      <h1>Collaborative AI Research Labs Foundation</h1>
      <p class="subtitle">Advancing AI Research for the Benefit of Humanity</p>
      
      <div class="content">
        <p>The CAiRL Foundation is a non-profit organization dedicated to pioneering AI research and development through open collaboration. Our mission is to accelerate ethical AI innovation by fostering global partnerships between researchers, developers, and institutions.</p>
        
        <p>We provide resources, infrastructure, and a collaborative environment to support cutting-edge AI research that addresses real-world challenges while maintaining the highest standards of ethical practice.</p>
      </div>
      
      <div class="cta-section">
        <a href="/api-docs" class="cta-button">Explore Our API Documentation</a>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} CAiRL Foundation. All rights reserved.</p>
        <p>Contact: <a href="mailto:info@cairl.org">info@cairl.org</a></p>
      </div>
    </div>
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

setupSwagger(app);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
