import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFE6DC] px-6">

      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md border-t-8 border-[#D32F2F]">

        <h2 className="text-3xl font-bold text-center text-[#D32F2F] mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Admin Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[#D32F2F] text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}