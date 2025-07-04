import React from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

export default function ScorePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const score = 2;
  const total = 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-10 border border-white/20 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800">🎉 Quiz Complete!</h1>
        <p className="text-xl text-gray-700 mb-6">
          You scored <span className="font-bold">{score}</span> out of{" "}
          <span className="font-bold">{total}</span>
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-purple-500 text-white rounded-full font-bold hover:bg-purple-600 transition"
        >
          🔙 Go Home
        </button>
      </motion.div>
    </div>
  );
}
