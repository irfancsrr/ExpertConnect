// socket.js
import { Server } from "socket.io";

export const initSocket = (httpServer) => {
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST","PUT","PATCH"] }
});

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinExpertRoom", (expertId) => {
      socket.join(expertId);
    });

socket.on("slotBooked", (data) => {
  io.to(data.expertId).emit("slotBooked", {
    expertId: data.expertId,
    updatedSlot: data.slot,
  });
});


    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};
