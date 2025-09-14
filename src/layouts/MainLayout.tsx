import React from "react";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto p-4">
          {children}
        </div>
      </main>

      <footer className="bg-gray-900 text-white text-sm p-4 text-center">
        © {new Date().getFullYear()} Sargos Private Trips. All rights reserved.
      </footer>
    </div>
  );
}
