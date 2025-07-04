import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      const decoded = JSON.parse(atob(res.data.token.split(".")[1]));

      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        alert("Not an admin account");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-2xl shadow-md w-full max-w-md border border-white/30">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="px-4 py-2 rounded-lg bg-white/60 placeholder-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg bg-white/60 placeholder-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Log In as Admin
          </button>
        </form>
      </div>
    </div>
  );
}
