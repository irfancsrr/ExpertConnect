import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Clock, CheckCircle, CalendarCheck } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/bookings`, { params: { email } });
      setBookings(res.data.bookings);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          My Bookings
        </h1>

        {/* Email Input */}
        <div className="flex gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
          />
          <button
            onClick={fetchBookings}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            View
          </button>
        </div>

        {/* Loading/Error */}
        {loading && <p className="text-indigo-600 text-center">Loading bookings...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Booking List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {booking.expertName}
              </h2>
              <p className="text-sm text-gray-600">
                {booking.date} at {booking.time}
              </p>
              <p className="text-sm text-gray-700 mt-1">Notes: {booking.notes}</p>

              {/* Status */}
              <div className="mt-3 flex items-center gap-2">
                {booking.status === "Pending" && (
                  <Clock className="w-5 h-5 text-yellow-500" />
                )}
                {booking.status === "Confirmed" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {booking.status === "Completed" && (
                  <CalendarCheck className="w-5 h-5 text-blue-600" />
                )}
                <span
                  className={`font-medium ${
                    booking.status === "Pending"
                      ? "text-yellow-600"
                      : booking.status === "Confirmed"
                      ? "text-green-600"
                      : "text-blue-600"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
