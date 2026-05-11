import express from "express";
import {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail,
} from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/bookings
router.post("/", createBooking);

// PATCH /api/bookings/:id/status
router.patch("/:id/status", updateBookingStatus);

// GET /api/bookings?email=
router.get("/", getBookingsByEmail);

export default router;
