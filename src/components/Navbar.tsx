"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Sargos Private Trips
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            ☰
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/boats">Yachts</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>

      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 text-gray-700">
          <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link href="/boats" onClick={() => setIsOpen(false)}>Yachts</Link></li>
          <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
