"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleMobileLinkClick = () => setMenuOpen(false);

  return (
    <header className="bg-white/90 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#inicio"
          className="flex items-center gap-2 text-2xl font-bold text-rose-400"
        >
          💅 Serenity Salon
        </a>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
          <a href="#inicio" className="hover:text-yellow-700 transition">
            Inicio
          </a>
          <a href="#servicios" className="hover:text-yellow-700 transition">
            Servicios
          </a>
          <a href="#ubicacion" className="hover:text-yellow-700 transition">
            Ubicación
          </a>
          <a
            href="https://wa.me/529996401914"
            target="_blank"
            className="inline-block bg-green-500 hover:bg-rose-500 text-white text-sm font-semibold px-3 py-3 rounded-full transition"
          >
            WhatsApp
          </a>
        </nav>
        <a
          href="https://wa.me/529996401914"
          target="_blank"
          className="inline-block bg-green-500 hover:bg-rose-500 text-white text-xs font-semibold px-3 py-3 rounded-full transition md:hidden"
        >
          WhatsApp
        </a>
        <button
          id="menu-btn"
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          onClick={handleMenuToggle}
        >
          ☰
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden bg-rose-300 border-t border-gray-200 ${
          menuOpen ? "flex flex-col" : "hidden"
        } items-center py-4 space-y-4 text-white font-medium`}
      >
        <a
          href="#inicio"
          className="hover:text-yellow-700"
          onClick={handleMobileLinkClick}
        >
          Inicio
        </a>
        <a
          href="#servicios"
          className="hover:text-yellow-700"
          onClick={handleMobileLinkClick}
        >
          Servicios
        </a>
        <a
          href="#ubicacion"
          className="hover:text-yellow-700"
          onClick={handleMobileLinkClick}
        >
          Ubicación
        </a>
      </div>
    </header>
  );
}
