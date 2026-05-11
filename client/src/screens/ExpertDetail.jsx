import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import SlotList from "../components/SlotList";
import BookingForm from "../components/BookingForm";
import { SocketContext } from "../context/SocketContext";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

import { Calendar, User } from "lucide-react";

const ExpertDetail = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [slots, setSlots] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    const fetchExpert = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/experts/${id}`);
        setExpert(res.data.expert);
        setSlots(res.data.slots);
      } catch (err) {
        setError("Failed to load expert details");
      } finally {
        setLoading(false);
      }
    };
    fetchExpert();
  }, [socket,id]);

  // Real-time slot updates
  useEffect(() => {
    if (!socket) return;
    socket.emit("joinExpertRoom", id);

    socket.on("slotBooked", ({expertId,updatedSlot}) => {
      
      if(expertId==id){
              setSlots((prev) =>
        prev.map((slot) =>
          slot._id === updatedSlot._id ? { ...slot, booked: true } : slot
        )
      );
      setSelectedSlot("");
      window.location.reload();
      }

    });

    return () => {
      socket.off("slotBooked");
    };
  }, [socket,id]);

const handleBooking = async (formData) => {
  try {
    await api.post("/bookings", {
      ...formData,
      expertId: id,
      date: formData.date,
      time: formData.time,
    });
    setSuccessMessage("Booking Confirmed!");
    toast.success("Booking Confirmed! Redirecting to home...");
        setSlots(
      slots.map((slot) =>
        slot.date === formData.date && slot.time === formData.time
          ? { ...slot, booked: true }
          : slot
      )
    );

        // 🔑 Emit socket event so other clients update
    if (socket) {
      socket.emit("slotBooked", {
        expertId: id,
        slot: { date: selectedSlot.date, time: selectedSlot.time },
      });
    }
    
    setTimeout(() => navigate("/"), 5000);
  } catch (err) {
   setErrorMessage(err.response?.data?.message || "Booking failed. Try again.");
   toast.error(err.response?.data?.message || "Booking failed. Redirecting...");
   setTimeout(() => navigate("/"), 5000);
  }
};


  if (loading) return <p className="text-indigo-600 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
      {expert && (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Expert Info */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <User className="w-6 h-6 text-indigo-600" />
              {expert.name}
            </h2>
            <p className="text-indigo-600 font-medium">{expert.category}</p>
            <p className="text-gray-700">Experience: {expert.experience} yrs</p>
            <p className="text-yellow-500">⭐ {expert.rating}</p>
          </div>

          {/* Slots */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-purple-600" />
              Available Slots
            </h3>
          <SlotList slots={slots} onSelect={(slot) => setSelectedSlot(slot)} />
          </div>

          {/* Booking Form */}
          {selectedSlot && !successMessage && (
            <BookingForm
              selectedSlot={selectedSlot}   // pass slot info
              onSubmit={(formData) =>
                handleBooking({
                  ...formData,
                  date: selectedSlot.date,
                  time: selectedSlot.time,
                })
              }
            />
          )}

                  {successMessage && (
          <div className="flex flex-col items-center bg-green-50 border border-green-200 p-6 rounded-xl shadow-md">
            <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
            <h3 className="text-lg font-semibold text-green-700">{successMessage}</h3>
            <p className="text-gray-600 mt-2">Redirecting to home...</p>
          </div>
        )}

        {errorMessage && (
          <div className="flex flex-col items-center bg-red-50 border border-red-200 p-6 rounded-xl shadow-md">
            <XCircle className="w-10 h-10 text-red-600 mb-2" />
            <h3 className="text-lg font-semibold text-red-700">{errorMessage}</h3>
            <p className="text-gray-600 mt-2">Redirecting to home...</p>
          </div>
        )}
        </div>
      )}
    </div>
  );
};

export default ExpertDetail;
