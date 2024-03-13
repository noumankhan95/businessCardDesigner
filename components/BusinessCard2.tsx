"use client";
import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";

const BusinessCard2 = ({
  backgroundColor,
  backgroundImage,
}: {
  backgroundColor: string;
  backgroundImage: string;
}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [textAlign, setTextAlign] = useState("left");
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 800,
      height: 400,
    });
    setCanvas(canvas);
    // Set background color
    canvas.backgroundColor = backgroundColor;
    canvas.renderAll();

    // Set background image if available
    if (backgroundImage) {
      fabric.Image.fromURL(backgroundImage, (img) => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: (canvas?.width ?? 1) / (img?.width ?? 1),
          scaleY: (canvas?.height ?? 1) / (img?.height ?? 1),
        });
      });
    }
  }, [backgroundColor, backgroundImage]);
  useEffect(() => {
    if (canvas) {
      const textObject = new fabric.Text("Your text here", {
        fontSize: 20,
        backgroundColor: "orange",
        selectable: true,
      });
      canvas.add(textObject);
    }
  }, [canvas, textAlign]);
  const handleTextAlignChange = (event: any) => {
    const alignment = event.target.value;
    console.log("Align", alignment);
    setTextAlign(alignment);
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      console.log(activeObject);
      if (activeObject && activeObject.type === "text") {
        const textObject = activeObject as fabric.Text;
        textObject.set("textAlign", alignment); // Use set method to set textAlign
        canvas.renderAll();
      }
    }
  };
  return (
    <section className="flex flex-row justify-between items-center border-red-900">
      <canvas id="canvas" />
      <select value={textAlign} onChange={handleTextAlignChange}>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </section>
  );
};

export default BusinessCard2;
