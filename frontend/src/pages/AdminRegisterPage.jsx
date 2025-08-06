import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegisterPage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully. Please log in.");
        navigate("/admin-login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Register</h1>
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <input
          type="text"
          placeholder="username"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-700 focus:outline-none"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
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
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already an admin?{" "}
          <a
            href="/admin-login"
            className="text-purple-400 hover:underline"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default AdminRegisterPage;