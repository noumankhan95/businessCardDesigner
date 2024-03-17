"use client";

import BusinessCard from "@/components/KonvaCard";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-400">
      <BusinessCard height={450} width={900} canvasPadding={20} />
    </main>
  );
}
