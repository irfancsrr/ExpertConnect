import express from "express";
import { getExperts, getExpertById } from "../controllers/expertController.js";

const router = express.Router();

// GET /api/experts
router.get("/", getExperts);

// GET /api/experts/:id
router.get("/:id", getExpertById);

export default router;
