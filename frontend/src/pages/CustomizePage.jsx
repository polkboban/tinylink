import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import QRCustomizer from "../components/QRCustomizer";

export default function CustomizePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.state?.url || "https://google.com";

  return (
    <div className="min-h-screen bg-[#001837] text-white font-sans overflow-hidden mt-[-0.3rem]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-10">
        <header className="max-w-8xl ml-[0.5rem] mx-auto mb-8 flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
            Customize Your QR Code
          </h1>
          
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-0 px-4 py-2 text-sm font-semibold text-purple-300 bg-gray-800/50 border border-purple-500/20 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </header>

        <main>
          <QRCustomizer url={url} />
        </main>

        <footer className="text-center mt-8 text-xs text-gray-500">
          <p>Powered by TnyLnk</p>
        </footer>
      </div>
    </div>
  );
}
