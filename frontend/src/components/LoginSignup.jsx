import React, { useState } from "react";
import axios from "axios";
import { User, Lock } from "lucide-react";

const LoginSignup = ({ setToken }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
        const url = `https://excel-analytics-platform-jbt9.onrender.com/api/auth/${isLogin ? "login" : "register"}`;
        const payload = isLogin
            ? { email: form.email, password: form.password }
            : form;

        const res = await axios.post(url, payload);

        if (isLogin) {
            setToken(res.data.token);
        } else {
            setSuccess("Successfully registered! Redirecting to login...");
            setForm({ name: "", email: "", password: "" });

            setTimeout(() => {
            setSuccess("");
            setIsLogin(true);
            }, 2000);
        }
        } catch {
        setError("Invalid credentials or server error.");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-500">
            <div className="absolute top-6 right-6">
                <a
                    href="/admin-login"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition"
                >
                    Admin Login
                </a>
                </div>

        <div className="flex flex-col items-center mb-4">
            {isLogin ? (
            <Lock className="w-8 h-8 text-blue-500 mb-2" />
            ) : (
            <User className="w-8 h-8 text-green-500 mb-2" />
            )}
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-1">
            {isLogin ? "Login" : "register"}
            </h2>
            <div className="flex w-full justify-center mt-2 mb-2">
            <button
                className={`px-4 py-1 rounded-t-lg font-medium transition-colors duration-200 ${
                isLogin
                    ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
                onClick={() => {
                setIsLogin(true);
                setError("");
                setSuccess("");
                }}
                type="button"
            >
                Login
            </button>
            <button
                className={`px-4 py-1 rounded-t-lg font-medium transition-colors duration-200 ${
                !isLogin
                    ? "bg-green-100 dark:bg-gray-800 text-green-600 dark:text-green-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
                onClick={() => {
                setIsLogin(false);
                setError("");
                setSuccess("");
                }}
                type="button"
            >
                Sign Up
            </button>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700 mb-2" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
            <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white transition"
            />
            )}
            <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition"
            />
            <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition"
            />
            <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition"
            >
            {isLogin ? "Login" : "register"}
            </button>
        </form>
        {error && <div className="mt-3 text-red-500 text-sm text-center">{error}</div>}
        {success && <div className="mt-3 text-green-500 text-sm text-center">{success}</div>}
        </div>
    );
};

export default LoginSignup;