"use client";

import BusinessCard from "@/components/KonvaCard";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <BusinessCard height={450} width={900} canvasPadding={20} />
    </main>
  );
}
