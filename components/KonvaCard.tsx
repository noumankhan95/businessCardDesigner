"use client";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Image, Text, Group, Line } from "react-konva";

interface TextBox {
  id: number;
  text: string;
  textAlign: "left" | "center" | "right";
}

interface BusinessCardProps {
  width: number;
  height: number;
  canvasPadding: number;
}
const padding = 6; // Padding value
const borderPadding = 10;
const BusinessCard: React.FC<BusinessCardProps> = ({
  width,
  height,
  canvasPadding,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState<any>(null);
  const [isdownloading, setisdownloading] = useState<boolean>();
  const [forceRender, setForceRender] = useState(false);
  const canvasRef = useRef<any>(null);
  const [textboxes, setTextboxes] = useState<TextBox[]>([
    { id: 1, text: "Text 1", textAlign: "left" },
    { id: 2, text: "Text 2", textAlign: "center" },
    { id: 3, text: "Text 3", textAlign: "right" },
  ]);

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  const handleBackgroundImageChange = (url: string) => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setBackgroundImage(new window.Image(width, height));
      setBackgroundImage(img);
    };
  };

  const handleTextChange = (id: number, newText: string) => {
    setTextboxes((prevState) =>
      prevState.map((textbox) =>
        textbox.id === id ? { ...textbox, text: newText } : textbox
      )
    );
  };

  const handleTextAlignmentChange = (
    id: number,
    alignment: "left" | "center" | "right"
  ) => {
    setTextboxes((prevState) =>
      prevState.map((textbox) =>
        textbox.id === id ? { ...textbox, textAlign: alignment } : textbox
      )
    );
  };
  const handleDownload = () => {
    setisdownloading((p) => true);

    if (canvasRef.current) {
      // Hide the line
      // Force re-rendering of the stage
      setForceRender(true);

      setTimeout(() => {
        // Get the canvas content as a data URL
        const dataURL = canvasRef.current.toDataURL();
        // Restore the line
        // Force re-rendering of the stage
        setForceRender(true);

        if (dataURL) {
          // Create a temporary anchor element to download the image
          const anchor = document.createElement("a");
          anchor.href = dataURL;
          anchor.download = "canvas_image.png"; // Set the download filename
          document.body.appendChild(anchor);

          // Trigger the click event to download the image
          anchor.click();

          // Remove the temporary anchor element
          document.body.removeChild(anchor);
        }
        setisdownloading(false);
      }, 1000);
    }
  };
  console.log(isdownloading, "downloading");
  return (
    <div className="space-y-5">
      <Stage width={width} height={height} ref={canvasRef}>
        <Layer>
          <Group width={width} height={height}>
            <Rect
              fill={backgroundColor}
              width={width - canvasPadding}
              height={height - canvasPadding}
            />
            {backgroundImage && (
              <Image width={width} height={height} image={backgroundImage} />
            )}
            {textboxes.map((textbox) => {
              console.log(textbox);
              return (
                <Text
                  key={textbox.id}
                  x={
                    textbox.textAlign === "left"
                      ? canvasPadding // Align left
                      : textbox.textAlign === "center"
                      ? width / 2 // Align center
                      : width - canvasPadding * 10 // Align right
                  }
                  y={canvasPadding}
                  text={textbox.text}
                  align={textbox.textAlign}
                  fontSize={20}
                  fill="black"
                  draggable
                  onClick={() => {
                    const newAlignment =
                      textbox.textAlign === "left"
                        ? "center"
                        : textbox.textAlign === "center"
                        ? "right"
                        : "left";
                    handleTextAlignmentChange(textbox.id, newAlignment);
                  }}
                  wrap="word"
                  onDragEnd={(e) => {
                    if (e.target.x() >= width - canvasPadding) {
                      console.log("true");
                      handleTextAlignmentChange(textbox.id, "center");
                      const newX = width / 2;

                      e.currentTarget.x(newX);

                      e.target?.getLayer()?.batchDraw();
                    } else if (e.target.x() < canvasPadding) {
                      console.log("true here");
                      const newX = width / 2;
                      e.currentTarget.x(newX);
                      handleTextAlignmentChange(textbox.id, "center");
                      e.target?.getLayer()?.batchDraw();
                    }
                    if (e.target.y() >= height - canvasPadding) {
                      console.log("true");
                      handleTextAlignmentChange(textbox.id, "center");
                      const newX = height / 2;
                      e.currentTarget.y(newX);

                      e.target?.getLayer()?.batchDraw();
                    } else if (e.target.y() < canvasPadding) {
                      console.log("true here y");
                      const newX = height / 2;
                      e.currentTarget.y(newX);
                      handleTextAlignmentChange(textbox.id, "center");
                      e.target?.getLayer()?.batchDraw();
                    }
                  }}
                />
              );
            })}
            {backgroundImage && !isdownloading && (
              <Line
                points={[
                  padding + borderPadding, // Index 0: X-coordinate of the top-left corner
                  padding + borderPadding, // Index 1: Y-coordinate of the top-left corner
                  width - padding - borderPadding, // Index 2: X-coordinate of the top-right corner
                  padding + borderPadding, // Index 3: Y-coordinate of the top-right corner
                  width - padding - borderPadding, // Index 4: X-coordinate of the bottom-right corner
                  height - padding - borderPadding, // Index 5: Y-coordinate of the bottom-right corner
                  padding + borderPadding, // Index 6: X-coordinate of the bottom-left corner
                  height - padding - borderPadding, // Index 7: Y-coordinate of the bottom-left corner
                  padding + borderPadding, // Index 8: X-coordinate of the top-left corner (to close the shape)
                  padding + borderPadding, // Index 9: Y-coordinate of the top-left corner (to close the shape)
                ]}
                stroke="black"
                dash={[5, 5]} // Adjust the dash array for the desired dotted effect
              />
            )}
          </Group>
        </Layer>
      </Stage>
      <div>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleBackgroundImageChange(URL.createObjectURL(e.target.files![0]))
          }
        />
        {textboxes.map((textbox) => (
          <div key={textbox.id}>
            <input
              type="text"
              value={textbox.text}
              onChange={(e) => handleTextChange(textbox.id, e.target.value)}
            />
            <select
              value={textbox.textAlign}
              onChange={(e) =>
                handleTextAlignmentChange(
                  textbox.id,
                  e.target.value as "left" | "center" | "right"
                )
              }
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        ))}
        <button
          onClick={() => {
            setisdownloading(true);
            handleDownload();
          }}
        >
          Download Canvas
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
