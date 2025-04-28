"use client";

import React, { useState } from "react";

export default function LogoApp() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const res = await fetch("/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate logo");
      setImageUrl(data.url);
    } catch (err: unknown) {
      let errorMessage = 'Unknown error';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
        errorMessage = (err as any).message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Logo Generator with DALL·E</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="border rounded p-2"
            placeholder="Describe your logo (e.g. 'Modern tech startup logo with blue tones')"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            disabled={loading || !prompt}
          >
            {loading ? "Generating..." : "Generate Logo"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
        {imageUrl && (
          <div className="mt-6 flex flex-col items-center">
            <img
              src={imageUrl}
              alt="Generated logo"
              className="w-64 h-64 object-contain border rounded shadow"
            />
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-600 underline"
            >
              Open Full Image
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
