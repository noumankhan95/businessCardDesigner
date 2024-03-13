"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import { fabric } from "fabric";
import { ChangeEvent, useState } from "react";
import BusinessCard from "@/components/KonvaCard";
import DraggableRect from "@/components/KonvaCard";
export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const handleBackgroundColorChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundColor(event.target.value);
  };

  const handleBackgroundImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event?.target?.result!.toString()!);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-400">
      <BusinessCard height={450} width={900} canvasPadding={20} />
    </main>
  );
}
