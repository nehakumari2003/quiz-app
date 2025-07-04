import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 to-pink-200">
      <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl p-10 shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-700 mb-6">Manage quizzes and users here.</p>

        <div className="flex flex-col gap-4">
          <Link
            to="/admin/create"
            className="bg-purple-500 text-white py-2 rounded-xl hover:bg-purple-600 transition"
          >
            Create New Quiz
          </Link>
          <Link
            to="/"
            className="bg-white text-purple-700 border border-purple-500 py-2 rounded-xl hover:bg-purple-100 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
