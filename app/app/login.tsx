"use client";

import React, { useState } from "react";

export default function Login({ onLogin }: { onLogin?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder login logic (replace with Supabase integration)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("is_logged_in", "true");
        if (onLogin) onLogin();
        window.location.href = "/app";
      } else {
        setError("Please enter email and password.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-4 font-sans">
      <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 relative">
        <div className="flex flex-col items-center mb-8">
          <svg width="48" height="48" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg mb-2">
            <rect x="4" y="4" width="48" height="48" rx="16" fill="url(#paint0_linear)" />
            <path d="M18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28Z" fill="#fff" fillOpacity="0.85"/>
            <path d="M28 22V34" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M22 28H34" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round"/>
            <defs>
              <linearGradient id="paint0_linear" x1="4" y1="4" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1"/>
                <stop offset="1" stopColor="#06B6D4"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-400 tracking-tight select-none">LogoGen</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-fade-in">
          <input
            type="email"
            className="border rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            className="border rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-cyan-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-indigo-700 hover:to-cyan-500 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <div className="text-red-600 text-center text-sm">{error}</div>}
        </form>
        <div className="mt-6 text-center text-xs text-gray-400 select-none">
          &copy; {new Date().getFullYear()} LogoGen. All rights reserved.
        </div>
      </div>
    </main>
  );
}
