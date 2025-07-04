import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-purple-200 flex items-center justify-center p-6">
      <div className="backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl p-10 max-w-md w-full text-center border border-white/40">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz App</h1>
        <p className="mb-8 text-gray-700">Welcome! Please choose an option:</p>

        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="bg-white/40 hover:bg-white/60 text-gray-800 font-semibold py-3 px-6 rounded-xl backdrop-blur-md border border-white/50 transition"
          >
            Login as User
          </Link>
          <Link
            to="/admin-login" // 🔁 Updated to point to actual Admin Login page
            className="bg-white/40 hover:bg-white/60 text-gray-800 font-semibold py-3 px-6 rounded-xl backdrop-blur-md border border-white/50 transition"
          >
            Login as Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
