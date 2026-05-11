import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import SlotList from "../components/SlotList";
import { SocketContext } from "../context/SocketContext";

import api from "../services/api";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

const BookingScreen = () => {
    const navigate = useNavigate();
  const { id } = useParams(); // expert id from route
  const [expert, setExpert] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
    const socket = useContext(SocketContext);
    
  

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        const { data } = await api.get(`/experts/${id}`);
        setExpert(data);
        setSlots(data.slots);
      } catch {
        alert("Failed to load expert details");
      }
    };
    fetchExpert();
  }, [id]);

    useEffect(() => {
      if (!socket) return;
      socket.emit("joinExpertRoom", id);
  
    socket.on("slotBooked", ({expertId,updatedSlot}) => {
      
      if(expertId==id){

   
      setSlots((prev) =>
        prev.map((slot) =>{
              console.log('ye dono mil rha ki nhi : ',slot._id===updatedSlot._id);
          return slot._id === updatedSlot._id ? { ...slot, booked: true } : slot}
        )
      );
      setSelectedSlot("");
      window.location.reload();
      }

    });
  
      return () => {
        socket.off("slotBooked");
      };
    }, [socket, id]);

const handleBooking = async (formData) => {
  try {
    await api.post("/bookings", {
      ...formData,
      expertId: id,
      date: formData.date,
      time: formData.time,
    });
    setSuccess(true);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {expert && (
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Book Session with {expert.name}
          </h2>
        )}

        {/* Slot Selection */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select a Slot
          </h2>
          <SlotList slots={slots} onSelect={(slot) => setSelectedSlot(slot)} />
        </div>

        {/* Booking Form */}
        {selectedSlot && !success && (
          <BookingForm
            onSubmit={(formData) =>
              handleBooking({ ...formData, date: selectedSlot.date, time: selectedSlot.time })
            }
          />
        )}

        {/* Success Message */}
        {success && (
          <div className="flex flex-col items-center bg-green-50 border border-green-200 p-6 rounded-xl shadow-md">
            <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
            <h3 className="text-lg font-semibold text-green-700">
              Booking Confirmed!
            </h3>
            <p className="text-gray-600 mt-2">
              Your slot has been reserved successfully.
            </p>
          </div>
        )}

        {/* errorMessage */}
        {errorMessage && (
          <div className="flex flex-col items-center bg-red-50 border border-red-200 p-6 rounded-xl shadow-md">
            <XCircle className="w-10 h-10 text-red-600 mb-2" />
            <h3 className="text-lg font-semibold text-red-700">{errorMessage}</h3>
            <p className="text-gray-600 mt-2">Redirecting to home...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingScreen;
