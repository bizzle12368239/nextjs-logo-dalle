"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ONBOARDING_STEPS = [
  {
    title: "Welcome to LogoGen!",
    description: "Effortlessly generate modern, professional logos with AI. No design skills required.",
    illustration: null, // Add SVG or img if available from Figma
  },
  {
    title: "Unlimited Ideas",
    description: "Explore endless logo concepts tailored to your brand style and preferences.",
    illustration: null,
  },
  {
    title: "High-Resolution Downloads",
    description: "Download crisp, scalable logos ready for web, print, and everywhere you need.",
    illustration: null,
  },
  {
    title: "Get Started!",
    description: "Let’s create your first logo. It’s fast, fun, and free to try!",
    illustration: null,
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const isLast = step === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.push("/app");
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    router.push("/app");
  };

  const { title, description, illustration } = ONBOARDING_STEPS[step];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card p-8 md:p-10 border border-gray-200 relative flex flex-col items-center">
        {illustration && (
          <div className="mb-8">{illustration}</div>
        )}
        <h1 className="text-3xl font-extrabold text-black mb-4 text-center">{title}</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">{description}</p>
        <div className="flex gap-2 w-full">
          <button
            onClick={handleSkip}
            className="flex-1 py-3 rounded-xl font-semibold text-gray-500 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-black hover:bg-gray-900 transition"
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
