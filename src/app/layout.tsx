// src/app/layout.tsx


import "@/app/globals.css"; // ✅ Βεβαιώσου ότι αυτό υπάρχει!

import type { Metadata } from "next";
import MainLayout from "@/layouts/MainLayout";

export const metadata: Metadata = {
  title: "Sargos Private Trips",
  description: "Επαγγελματικές κρουαζιέρες με πολυτελή σκάφη στην Ελλάδα.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
