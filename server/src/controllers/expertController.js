import Expert from "../models/Expert.js";

// GET /experts (with pagination + filter + search)
export const getExperts = async (req, res) => {
  try {
    const { search = "", category = "", page = 1, limit = 6 } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    const experts = await Expert.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Expert.countDocuments(query);

    res.json({ experts, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching experts" });
  }
};

// GET /experts/:id
export const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: "Expert not found" });
    }
    res.json({ expert, slots: expert.slots });
  } catch (err) {
    res.status(500).json({ message: "Error fetching expert details" });
  }
};
