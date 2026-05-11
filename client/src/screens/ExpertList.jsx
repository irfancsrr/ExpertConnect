import React, { useEffect, useState } from "react";
import api from "../services/api";
import ExpertCard from "../components/ExpertCard";
import { Search, Filter } from "lucide-react";

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchExperts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/experts`, {
          params: { search, category, page },
        });
        setExperts(res.data.experts);
      } catch (err) {
        setError("Failed to load experts");
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, [search, category, page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Find Your Expert
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
          >
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
          </select>
        </div>
      </div>

      {/* Loading/Error */}
      {loading && <p className="text-indigo-600 text-center">Loading experts...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Expert List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <ExpertCard key={expert._id} expert={expert} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-5 py-2 bg-white border rounded-lg shadow hover:bg-indigo-50 transition"
        >
          Prev
        </button>
        <span className="px-5 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold">
          {page}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-5 py-2 bg-white border rounded-lg shadow hover:bg-indigo-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExpertList;
