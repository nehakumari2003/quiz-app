import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import the api instance

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      
      // Set the token in the api instance for subsequent requests
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      const decoded = JSON.parse(atob(res.data.token.split(".")[1]));
      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-2xl shadow-md w-full max-w-md border border-white/30">
        <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
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
            className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
