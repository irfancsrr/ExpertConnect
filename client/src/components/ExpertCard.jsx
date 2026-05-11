import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ExpertCard = ({ expert }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <h2 className="text-xl font-semibold text-gray-900">{expert.name}</h2>
      <p className="text-sm text-indigo-600 font-medium">{expert.category}</p>
      <p className="text-sm text-gray-700 mt-1">Experience: {expert.experience} yrs</p>
      <div className="flex items-center mt-2 text-yellow-500">
        <Star className="w-4 h-4 mr-1" />
        <span>{expert.rating}</span>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-3">
        <Link
          to={`/experts/${expert._id}`}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
        >
          View Details
        </Link>
        <Link
          to={`/booking/${expert._id}`}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ExpertCard;
