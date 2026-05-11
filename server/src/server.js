import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import { initSocket } from "./socket.js";
import { errorHandler } from "./utils/errorHandler.js";
import expertRoutes from "./routes/expertRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({
  origin:process.env.CLIENT_URL,
  methods:['GET','POST','PATCH','PUT']
}));
app.use(express.json());

// Routes
app.use("/api/experts", expertRoutes);
app.use("/api/bookings", bookingRoutes);

// MongoDB Connection
connectDB();

// health check endpoint
app.get("/api/health",(req,res)=>{
  res.status(200).json({
    status:"Ok",
    server:"server is healthy",
    timestamp:new Date().toISOString()
  })
})

// Socket.io
const io = initSocket(httpServer);
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.set("io", io); // so controllers can access via req.app.get("io")

// error handler
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running on ${process.env.CLIENT_URL}:${PORT}`)
);
