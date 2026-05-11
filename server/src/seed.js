import mongoose from "mongoose";
import dotenv from "dotenv";
import Expert from "./models/Expert.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
};

const seedExperts = async () => {
  await connectDB();

  try {
    await Expert.deleteMany(); // clear old data

    const experts = [
           {
        name: "Dr. Aditi Sharma",
        category: "Health",
        experience: 8,
        rating: 4.7,
        slots: [
          { date: "2026-05-10", time: "10:00 AM", booked: false },
          { date: "2026-05-10", time: "11:00 AM", booked: false },
        ],
      },
      {
        name: "Prof. Rajesh Kumar",
        category: "Business",
        experience: 12,
        rating: 4.9,
        slots: [
          { date: "2026-05-11", time: "3:00 PM", booked: false },
          { date: "2026-05-11", time: "5:00 PM", booked: false },
        ],
      },
      {
        name: "Dr. Neha Verma",
        category: "Health",
        experience: 6,
        rating: 4.6,
        slots: [
          { date: "2026-05-12", time: "9:00 AM", booked: false },
          { date: "2026-05-12", time: "10:30 AM", booked: false },
        ],
      },
      {
        name: "Dr. Arjun Mehta",
        category: "Health",
        experience: 10,
        rating: 4.8,
        slots: [
          { date: "2026-05-13", time: "11:00 AM", booked: false },
          { date: "2026-05-13", time: "12:00 PM", booked: false },
        ],
      },
      {
        name: "Dr. Sneha Kapoor",
        category: "Health",
        experience: 7,
        rating: 4.5,
        slots: [
          { date: "2026-05-14", time: "2:00 PM", booked: false },
          { date: "2026-05-14", time: "4:00 PM", booked: false },
        ],
      },
      {
        name: "Prof. Anil Gupta",
        category: "Business",
        experience: 15,
        rating: 4.9,
        slots: [
          { date: "2026-05-15", time: "10:00 AM", booked: false },
          { date: "2026-05-15", time: "11:30 AM", booked: false },
        ],
      },
      {
        name: "Dr. Kavita Joshi",
        category: "Health",
        experience: 9,
        rating: 4.6,
        slots: [
          { date: "2026-05-16", time: "1:00 PM", booked: false },
          { date: "2026-05-16", time: "2:30 PM", booked: false },
        ],
      },
      {
        name: "Dr. Manish Tiwari",
        category: "Health",
        experience: 14,
        rating: 4.8,
        slots: [
          { date: "2026-05-17", time: "9:00 AM", booked: false },
          { date: "2026-05-17", time: "10:00 AM", booked: false },
        ],
      },
      {
        name: "Dr. Priya Nair",
        category: "Health",
        experience: 11,
        rating: 4.7,
        slots: [
          { date: "2026-05-18", time: "3:00 PM", booked: false },
          { date: "2026-05-18", time: "4:00 PM", booked: false },
        ],
      },
      {
        name: "Prof. Vivek Singh",
        category: "Tech",
        experience: 13,
        rating: 4.9,
        slots: [
          { date: "2026-05-19", time: "5:00 PM", booked: false },
          { date: "2026-05-19", time: "6:00 PM", booked: false },
        ],
      },
      {
        name: "Dr. Ritu Malhotra",
        category: "Health",
        experience: 16,
        rating: 4.8,
        slots: [
          { date: "2026-05-20", time: "10:00 AM", booked: false },
          { date: "2026-05-20", time: "11:00 AM", booked: false },
        ],
      },
      {
        name: "Dr. Sanjay Patel",
        category: "Health",
        experience: 18,
        rating: 4.9,
        slots: [
          { date: "2026-05-21", time: "2:00 PM", booked: false },
          { date: "2026-05-21", time: "3:00 PM", booked: false },
        ],
      },
      {
        name: "Dr. Meera Chawla",
        category: "Health",
        experience: 8,
        rating: 4.6,
        slots: [
          { date: "2026-05-22", time: "9:30 AM", booked: false },
          { date: "2026-05-22", time: "10:30 AM", booked: false },
        ],
      },
      {
        name: "Prof. Ashok Yadav",
        category: "Tech",
        experience: 20,
        rating: 5.0,
        slots: [
          { date: "2026-05-23", time: "11:00 AM", booked: false },
          { date: "2026-05-23", time: "12:00 PM", booked: false },
        ],
      },
      {
        name: "Dr. Shalini Rao",
        category: "Health",
        experience: 12,
        rating: 4.7,
        slots: [
          { date: "2026-05-24", time: "1:00 PM", booked: false },
          { date: "2026-05-24", time: "2:00 PM", booked: false },
        ],
      },
      {
        name: "Dr. Deepak Mishra",
        category: "Health",
        experience: 10,
        rating: 4.5,
        slots: [
          { date: "2026-05-25", time: "10:00 AM", booked: false },
          { date: "2026-05-25", time: "11:00 AM", booked: false },
        ],
      },
      {
        name: "Dr. Ananya Sen",
        category: "Health",
        experience: 9,
        rating: 4.6,
        slots: [
          { date: "2026-05-26", time: "3:00 PM", booked: false },
          { date: "2026-05-26", time: "4:00 PM", booked: false },
        ],
      },
      {
        name: "Prof. Karan Malhotra",
        category: "Business",
        experience: 7,
        rating: 4.4,
        slots: [
          { date: "2026-05-27", time: "5:00 PM", booked: false },
          { date: "2026-05-27", time: "6:00 PM", booked: false },
        ],
      },
      {
        name: "Dr. Sunita Agarwal",
        category: "Health",
        experience: 15,
        rating: 4.8,
        slots: [
          { date: "2026-05-28", time: "9:00 AM", booked: false },
          { date: "2026-05-28", time: "10:00 AM", booked: false },
        ],
      },
      {
  name: "Prof. Ramesh Yadav",
  category: "Business",
  experience: 14,
  rating: 4.7,
  slots: [
    { date: "2026-05-29", time: "11:00 AM", booked: false },
    { date: "2026-05-29", time: "12:00 PM", booked: false },
  ],
},
{
  name: "Dr. Meena Sethi",
  category: "Health",
  experience: 10,
  rating: 4.6,
  slots: [
    { date: "2026-05-30", time: "2:00 PM", booked: false },
    { date: "2026-05-30", time: "3:00 PM", booked: false },
  ],
},
{
  name: "Prof. Alok Sharma",
  category: "Tech",
  experience: 9,
  rating: 4.5,
  slots: [
    { date: "2026-06-01", time: "4:00 PM", booked: false },
    { date: "2026-06-01", time: "5:00 PM", booked: false },
  ],
},
{
  name: "Dr. Pooja Bansal",
  category: "Health",
  experience: 12,
  rating: 4.8,
  slots: [
    { date: "2026-06-02", time: "9:00 AM", booked: false },
    { date: "2026-06-02", time: "10:00 AM", booked: false },
  ],
},
{
  name: "Prof. Sameer Khan",
  category: "Business",
  experience: 11,
  rating: 4.6,
  slots: [
    { date: "2026-06-03", time: "1:00 PM", booked: false },
    { date: "2026-06-03", time: "2:00 PM", booked: false },
  ],
},



    
    ];

    await Expert.insertMany(experts);
    console.log("🌱 20 Dummy experts seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
    process.exit(1);
  }
};

seedExperts();
