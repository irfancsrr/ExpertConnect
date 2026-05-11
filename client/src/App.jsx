import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpertList from "./screens/ExpertList";
import ExpertDetail from "./screens/ExpertDetail";
import BookingScreen from "./screens/BookingScreen";
import MyBookings from "./screens/MyBookings";
import { SocketProvider } from "./context/SocketContext";
import { CalendarDays, UserCircle2 } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <SocketProvider>
      <Router>
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold tracking-wide">
              Expert<span className="text-yellow-300">Connect</span>
            </Link>
            <div className="flex gap-6">
              <Link
                to="/"
                className="hover:text-yellow-300 transition font-medium"
              >
                Experts
              </Link>
              <Link
                to="/my-bookings"
                className="flex items-center gap-2 hover:text-yellow-300 transition font-medium"
              >
                <CalendarDays className="w-5 h-5" />
                My Bookings
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ExpertList />} />
          <Route path="/experts/:id" element={<ExpertDetail />} />
          <Route path="/booking/:id" element={<BookingScreen />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>

                {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}   // 5 sec
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </SocketProvider>
  );
};

export default App;
