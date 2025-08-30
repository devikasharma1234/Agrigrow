import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./lib/db.js";
import { errorHandler } from "./middleware/validation.js";
import { handleDemo } from "./routes/demo.js";

// Import routes
import authRoutes from "./routes/auth.js";
import farmRoutes from "./routes/farms.js";
import cropRoutes from "./routes/crops.js";
import carbonCreditRoutes from "./routes/carbon-credits.js";
import industryProfileRoutes from "./routes/industry-profiles.js";

export async function createServer() {
  // Connect to MongoDB
  await connectDB();

  const app = express();

  // Security middleware
  app.use(helmet());
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use('/api/', limiter);

  // CORS configuration
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  }));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "OK", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // app.get("/api/demo", handleDemo);

  // API Routes
  app.use("/api/auth", authRoutes);
  // app.use("/api/farms", farmRoutes);
  // app.use("/api/crops", cropRoutes);
  // app.use("/api/carbon-credits", carbonCreditRoutes);
  // app.use("/api/industry-profiles", industryProfileRoutes);

  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      // This would typically require authentication
      // For now, return mock data
      res.json({
        totalFarms: 0,
        totalCrops: 0,
        totalCarbonCredits: 0,
        totalCreditsSold: 0,
        totalRevenue: 0
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // 404 handler for API routes
  app.use("/api/*", (req, res) => {
    res.status(404).json({ message: "API endpoint not found" });
  });

  // Error handling middleware (must be last)
  app.use(errorHandler);

  return app;
}
