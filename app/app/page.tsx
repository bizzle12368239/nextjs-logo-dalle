"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Modern SVG Logo Component
function ModernLogo() {
  return (
    <div className="flex justify-center items-center mb-6">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        <rect x="4" y="4" width="48" height="48" rx="16" fill="#FAFAFA" />
        <path d="M18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28Z" fill="#fff" fillOpacity="0.85"/>
        <path d="M28 22V34" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M22 28H34" stroke="#222" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span className="ml-3 text-3xl font-extrabold text-black tracking-tight select-none font-sans" style={{letterSpacing: '0.05em'}}>LogoGen</span>
    </div>
  );
}

export default function LogoApp() {
  const router = useRouter();

  const [tab, setTab] = useState<'generate' | 'history'>('generate');
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Modern");
  const [palette, setPalette] = useState("Vibrant");
  const [aspect, setAspect] = useState("1:1");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{url: string, prompt: string, style: string, palette: string, aspect: string, date: string}>>([]);

  // Load history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hist = localStorage.getItem('logo_history');
      if (hist) setHistory(JSON.parse(hist));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('logo_history', JSON.stringify(history));
    }
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const res = await fetch("/api/generate-logo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, palette, aspect }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate logo");
      setImageUrl(data.url);
      // Add to history
      setHistory(prev => [{
        url: data.url,
        prompt,
        style,
        palette,
        aspect,
        date: new Date().toLocaleString()
      }, ...prev]);
    } catch (err: unknown) {
      let errorMessage = 'Unknown error';
      if (err && typeof err === 'object' && 'message' in err && typeof (err as unknown & { message?: unknown }).message === 'string') {
        errorMessage = (err as unknown & { message?: string }).message as string;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // UI for style tweaks
  const styleTweaks = (
    <div className="flex flex-col gap-3 md:flex-row md:gap-6 mb-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Style</label>
        <select className="rounded-lg border px-3 py-2 bg-gray-50" value={style} onChange={e => setStyle(e.target.value)}>
          <option>Modern</option>
          <option>Minimal</option>
          <option>Bold</option>
          <option>Retro</option>
          <option>Elegant</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Color Palette</label>
        <select className="rounded-lg border px-3 py-2 bg-gray-50" value={palette} onChange={e => setPalette(e.target.value)}>
          <option>Vibrant</option>
          <option>Pastel</option>
          <option>Monochrome</option>
          <option>Dark</option>
          <option>Neon</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Aspect Ratio</label>
        <select className="rounded-lg border px-3 py-2 bg-gray-50" value={aspect} onChange={e => setAspect(e.target.value)}>
          <option>1:1</option>
          <option>16:9</option>
          <option>4:5</option>
          <option>3:2</option>
        </select>
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 md:p-10 border border-gray-200 relative">
        <ModernLogo />
        {/* Onboarding Link */}
        <div className="absolute top-4 right-4">
          <a
            href="/app/onboarding"
            className="text-xs text-gray-500 underline hover:text-black font-sans transition"
          >
            Onboarding
          </a>
        </div>
        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 mb-6">
          <button onClick={() => setTab('generate')} className={`px-5 py-2 rounded-full font-semibold transition shadow-card border border-gray-200 ${tab==='generate' ? 'bg-background text-black scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Generate</button>
          <button onClick={() => setTab('history')} className={`px-5 py-2 rounded-full font-semibold transition shadow-card border border-gray-200 ${tab==='history' ? 'bg-background text-black scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>History</button>
        </div>
        {/* Tab Content */}
        {tab === 'generate' && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fade-in">
            {styleTweaks}
            <input
              type="text"
              className="border border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black text-base text-black placeholder-gray-400 font-sans"
              placeholder="Describe your logo (e.g. 'Minimal tech logo with blue gradient')"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              required
              autoFocus
            />
            <button
              type="submit"
              className="bg-black text-white py-3 rounded-xl font-bold text-lg shadow-card hover:bg-gray-900 transition disabled:opacity-60 font-sans"
              disabled={loading || !prompt}
            >
              {loading ? "Generating..." : "Generate Logo"}
            </button>
            {error && <div className="mt-2 text-red-600 text-center font-sans">{error}</div>}
            {imageUrl && (
              <div className="mt-6 flex flex-col items-center animate-fade-in">
                <img
                  src={imageUrl}
                  alt="Generated logo"
                  className="w-48 h-48 object-contain border rounded-xl shadow-card bg-white"
                  style={{backdropFilter: 'blur(8px)'}}
                />
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-black underline text-sm font-sans"
                >
                  Open Full Image
                </a>
              </div>
            )}
          </form>
        )}
        {tab === 'history' && (
          <div className="flex flex-col gap-4 animate-fade-in max-h-[32rem] overflow-y-auto pr-1">
            {history.length === 0 && <div className="text-gray-400 text-center py-8 font-sans">No history yet. Generate a logo to see it here!</div>}
            {history.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center bg-white rounded-xl shadow-card p-3 mb-1 border border-gray-100">
                <img src={item.url} alt="History logo" className="w-16 h-16 object-contain rounded-lg border" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-black truncate font-sans">{item.prompt}</div>
                  <div className="text-xs text-gray-400 mt-1 font-sans">{item.style}, {item.palette}, {item.aspect}</div>
                  <div className="text-xs text-gray-400 font-sans">{item.date}</div>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-black underline text-xs ml-2 font-sans">View</a>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="w-full py-6 text-center text-gray-400 text-xs select-none font-sans">
        &copy; {new Date().getFullYear()} LogoGen. All rights reserved.
      </footer>
    </main>
  );
}
