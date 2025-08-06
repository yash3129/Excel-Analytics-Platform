import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://excel-analytics-platform-jbt9.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin-dashboard"); // redirect to admin panel
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-700 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-700 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded transition"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <a
            href="/admin-register"
            className="text-purple-400 hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default AdminLoginPage;