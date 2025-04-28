"use client";

import React, { useState } from "react";

const FEATURES = [
  "AI-powered logo generation",
  "Unlimited logo ideas",
  "High-resolution downloads",
  "Commercial use license",
  "Modern, intuitive interface",
  "No design skills required",
  "Fast results (under 30 seconds)",
  "Custom branding options",
  "Secure and private"
];

const PRICING = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Up to 3 logos/month",
      "Standard resolution",
      "Basic support"
    ],
    cta: "Get Started"
  },
  {
    name: "Pro Monthly",
    price: "$12",
    period: "/month",
    features: [
      "Unlimited logos",
      "High-res downloads",
      "Priority support",
      "Commercial use"
    ],
    cta: "Start Monthly"
  },
  {
    name: "Pro Annual",
    price: "$99",
    period: "/year",
    features: [
      "All Pro Monthly features",
      "2 months free",
      "Early access to new features"
    ],
    cta: "Start Annual"
  }
];

export default function Home() {
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">Create Stunning Logos Instantly with AI</h1>
        <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">Harness the power of DALL·E to generate unique, professional logos for your brand in seconds. No design skills required!</p>
        <a href="#pricing" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-blue-50 transition">See Pricing</a>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4 flex flex-col items-center bg-white" id="features">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Our AI Logo Generator?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {FEATURES.map((feature, idx) => (
            <li key={idx} className="bg-gray-100 rounded-lg p-6 flex items-center justify-center text-lg shadow-sm">
              <span role="img" aria-label="check" className="mr-2 text-green-500">✔️</span> {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-16 px-4 flex flex-col items-center bg-gray-50" id="pricing">
        <h2 className="text-3xl font-bold mb-6 text-center">Flexible Pricing for Everyone</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {PRICING.map((plan, idx) => (
            <div key={plan.name} className={`flex flex-col items-center bg-white rounded-xl shadow-lg p-8 border-2 ${idx === 1 ? 'border-blue-600 scale-105 z-10' : 'border-gray-200'} transition`}>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-extrabold mb-1">{plan.price}<span className="text-lg font-normal">{plan.period}</span></div>
              <ul className="mb-6 mt-2 text-gray-700">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center mb-1"><span className="text-green-500 mr-2">✔️</span>{f}</li>
                ))}
              </ul>
              <button className={`px-6 py-2 rounded-full font-semibold ${idx === 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition`}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Try It Now Section */}
      {/* This section has been removed and is now paywalled at /app */}

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-100 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} AI Logo Generator. All rights reserved.
      </footer>
    </main>
  );
}
