import Booking from "../models/Booking.js";
import Expert from "../models/Expert.js";

// POST /bookings
export const createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, date, time, notes } = req.body;

    // Validation
    if (!expertId || !name || !email || !phone || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent double booking
    const existing = await Booking.findOne({ expertId, date, time });
    if (existing) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    const booking = new Booking({
      expertId,
      name,
      email,
      phone,
      date,
      time,
      notes,
      status: "Pending",
    });
    await booking.save();

    // Mark slot as booked in Expert model
    await Expert.updateOne(
      { _id: expertId, "slots.date": date, "slots.time": time },
      { $set: { "slots.$.booked": true } }
    );

    // Emit socket event (only if io attached)
    if (req.io) {
      req.io.to(expertId).emit("slotBooked", { _id: booking._id, date, time });
    }

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(500).json({ message: err.message || "Error creating booking" });
  }
};


// PATCH /bookings/:id/status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: "Error updating booking status" });
  }
};

// GET /bookings?email=
export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const bookings = await Booking.find({ email }).populate("expertId", "name");
    res.json({
      bookings: bookings.map((b) => ({
        _id: b._id,
        expertName: b.expertId.name,
        date: b.date,
        time: b.time,
        notes: b.notes,
        status: b.status,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};
