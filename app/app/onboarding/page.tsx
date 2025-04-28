"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const BRAND_STYLES = ["Modern", "Minimal", "Bold", "Retro", "Elegant"];
const PALETTES = ["Vibrant", "Muted", "Monochrome", "Pastel"];
const ASPECTS = ["1:1", "16:9", "4:3", "3:2"];

const ONBOARDING_STEPS = [
  {
    title: "Welcome to LogoGen!",
    description: "Effortlessly generate modern, professional logos with AI. No design skills required.",
    type: "info",
  },
  {
    title: "What's your brand name?",
    description: "Enter the name you want to appear in your logo.",
    type: "input",
    inputLabel: "Brand Name",
    inputPlaceholder: "e.g. Acme Corp",
  },
  {
    title: "Pick your style",
    description: "Choose a logo style that fits your brand.",
    type: "select",
    options: BRAND_STYLES,
    inputLabel: "Style",
  },
  {
    title: "Choose a color palette",
    description: "Pick a color palette for your logo.",
    type: "select",
    options: PALETTES,
    inputLabel: "Palette",
  },
  {
    title: "Select aspect ratio",
    description: "Choose the shape of your logo.",
    type: "select",
    options: ASPECTS,
    inputLabel: "Aspect Ratio",
  },
  {
    title: "You're ready!",
    description: "Let's create your first logo.",
    type: "info",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState(BRAND_STYLES[0]);
  const [palette, setPalette] = useState(PALETTES[0]);
  const [aspect, setAspect] = useState(ASPECTS[0]);
  const router = useRouter();
  const isLast = step === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      // Optionally, persist onboarding choices here (e.g., localStorage)
      router.push("/app");
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    router.push("/app");
  };

  const curr = ONBOARDING_STEPS[step];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 md:p-10 border border-gray-200 relative flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-black mb-4 text-center">{curr.title}</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">{curr.description}</p>
        {curr.type === "input" && (
          <input
            type="text"
            value={brand}
            onChange={e => setBrand(e.target.value)}
            placeholder={curr.inputPlaceholder}
            className="w-full border border-gray-300 rounded-xl p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black text-base text-black placeholder-gray-400 font-sans mb-6"
            autoFocus
          />
        )}
        {curr.type === "select" && (
          <div className="w-full flex flex-col gap-3 mb-6">
            <label className="font-semibold mb-1">{curr.inputLabel}</label>
            <div className="flex flex-wrap gap-2">
              {curr.options.map((opt: string) => (
                <button
                  key={opt}
                  type="button"
                  className={`px-4 py-2 rounded-full border font-semibold transition ${
                    (curr.inputLabel === "Style" && style === opt) ||
                    (curr.inputLabel === "Palette" && palette === opt) ||
                    (curr.inputLabel === "Aspect Ratio" && aspect === opt)
                      ? "bg-black text-white border-black scale-105"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    if (curr.inputLabel === "Style") setStyle(opt);
                    if (curr.inputLabel === "Palette") setPalette(opt);
                    if (curr.inputLabel === "Aspect Ratio") setAspect(opt);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 w-full mt-2">
          <button
            onClick={handleSkip}
            className="flex-1 py-3 rounded-xl font-semibold text-gray-500 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-900 transition"
            disabled={curr.type === "input" && !brand}
          >
            {isLast ? "Start" : "Next"}
          </button>
        </div>
        <div className="flex justify-center gap-1 mt-6">
          {ONBOARDING_STEPS.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${idx === step ? "bg-black" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
