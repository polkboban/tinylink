import React from "react";
import { Instagram, FacebookIcon, LinkedinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#06263a] text-white py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src="/BitlyLogo.svg" alt="Bitly Logo" className="h-8" />

        <p className="text-xs text-gray-200 text-center md:text-left">
          © 2025 Bitly | Handmade in New York City, Denver, Berlin, and all over
          the world.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-white hover:text-gray-300 transition"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-300 transition"
            aria-label="Facebook"
          >
            <FacebookIcon size={20} />
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-300 transition"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-4">
        <a href="https://github.com/polkboban" target="_blank" rel="noopener noreferrer">
          github.com/polkboban
        </a>
      </div>
    </footer>
  );
}
