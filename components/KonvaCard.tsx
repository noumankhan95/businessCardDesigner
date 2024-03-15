"use client";
import { KonvaEventObject } from "konva/lib/Node";
import { ImageConfig } from "konva/lib/shapes/Image";
import React, { useEffect, useRef, useState } from "react";
import {
  Stage,
  Layer,
  Rect,
  Image,
  Text,
  Group,
  Line,
  Transformer,
  KonvaNodeComponent,
} from "react-konva";
import CardImageItem from "./CardImageItem";
import TextImageItem from "./TextImageItem";
interface TextBox {
  id: number;
  text: string;
  textAlign: "left" | "center" | "right";
  fontSize: number;
  fill: string;
}

interface CardImage {
  width: number;
  height: number;
  source: CanvasImageSource;
  id: number;
  x?: number;
  y?: number;
  rotation?: number;
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
  const [textboxes, setTextboxes] = useState<TextBox[]>([]);
  const [cardImages, setcardImages] = useState<CardImage[]>([]);
  const cardImageRef = useRef<HTMLInputElement | null>(null);
  const [editType, seteditType] = useState<string>("");
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
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
  function handleFontChange(id: number, value: number) {
    setTextboxes((prevState) =>
      prevState.map((textbox) =>
        textbox.id === id ? { ...textbox, fontSize: value } : textbox
      )
    );
  }
  function handleColorChange(id: number, value: string) {
    setTextboxes((prevState) =>
      prevState.map((textbox) =>
        textbox.id === id ? { ...textbox, fill: value } : textbox
      )
    );
  }
  const handleCardChange = (id: number, type: string, value: string) => {
    setcardImages((p) =>
      p.map((c) => (c.id === id ? { ...c, [type]: value } : c))
    );
  };

  console.log(cardImages, "cardimages");

  console.log(imageRefs, "Imagerefs");

  return (
    <div className="space-y-5">
      <div className="flex flex-row justify-start items-start">
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
              {textboxes?.map((textbox) => {
                return (
                  <TextImageItem
                    textbox={textbox}
                    canvasPadding={canvasPadding}
                    handleTextAlignmentChange={handleTextAlignmentChange}
                    height={height}
                    width={width}
                    key={textbox.id}
                  />
                );
              })}
              {cardImages &&
                cardImages.map((i) => (
                  <React.Fragment key={i.id}>
                    <CardImageItem
                      Theight={height}
                      Twidth={width}
                      handleCardChange={handleCardChange}
                      canvasPadding={canvasPadding}
                      {...i}
                      setcardImages={setcardImages}
                    />
                  </React.Fragment>
                ))}
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
        <div className="flex flex-col gap-4">
          <button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              setTextboxes((p) => [
                ...(p || []),
                {
                  id: (textboxes?.length ?? 0) + 1,
                  fill: "black",
                  fontSize: 16,
                  text: "Enter Text",
                  textAlign: "center",
                },
              ]);
            }}
          >
            Add TextBox
          </button>
          <button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              cardImageRef.current?.click();
            }}
          >
            Add Image
          </button>
          <input
            type="file"
            hidden
            ref={cardImageRef}
            onChange={(e) => {
              const img = new window.Image();
              img.src = URL.createObjectURL(e.target?.files?.[0]!);
              img.onload = () => {
                console.log("loaded");

                setcardImages((prevImages) => [
                  ...prevImages,
                  {
                    width: 130,
                    height: 190,
                    source: img,
                    id: (cardImages.length ?? 0) + 1,
                  },
                ]);
              };
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="p-4 bg-blue-600 text-white rounded-md"
          onClick={(e) => {
            seteditType("text");
          }}
        >
          Edit Text
        </button>
        <button
          className="p-4 bg-blue-600 text-white rounded-md"
          onClick={(e) => {
            seteditType("image");
          }}
        >
          Edit Image
        </button>
      </div>
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
        {editType === "text" &&
          textboxes.map((textbox) => (
            <div
              className="flex flex-row justify-around items-center"
              key={textbox.id}
            >
              <div>
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
              <div>
                <h1>Change Font Size</h1>
                <input
                  type="number"
                  min={1}
                  placeholder="Change Text Size"
                  defaultValue={textbox.fontSize}
                  onChange={(e) => {
                    handleFontChange(textbox.id, parseInt(e.target.value));
                  }}
                />
              </div>
              <div>
                <h1>Change Font Color</h1>

                <input
                  type="color"
                  placeholder="Change Text Color"
                  defaultValue={textbox.fill}
                  onChange={(e) => {
                    handleColorChange(textbox.id, e.target.value);
                  }}
                />
              </div>
              <div>
                <h1
                  className="text-red-700 cursor-pointer"
                  onClick={(e) => {
                    setTextboxes((p) => p.filter((i) => i.id !== textbox.id));
                  }}
                >
                  Delete
                </h1>
              </div>
            </div>
          ))}
        {editType === "image" &&
          cardImages?.map((cardimage) => (
            <div
              className="flex flex-row justify-around items-center"
              key={cardimage.id}
            >
              <div>
                <h1>Change Width </h1>
                <input
                  type="number"
                  min={1}
                  placeholder="Change Text Size"
                  defaultValue={cardimage.width}
                  onChange={(e) => {
                    handleCardChange(cardimage.id, "width", e.target.value);
                  }}
                />
              </div>
              <div>
                <h1>Change Height</h1>
                <input
                  type="number"
                  min={1}
                  placeholder="Change Text Size"
                  defaultValue={cardimage.height}
                  onChange={(e) => {
                    handleCardChange(cardimage.id, "height", e.target.value);
                  }}
                />
              </div>
              <div>
                <h1
                  className="text-red-700 cursor-pointer"
                  onClick={(e) => {
                    setcardImages((p) =>
                      p.filter((i) => i.id !== cardimage.id)
                    );
                  }}
                >
                  Delete
                </h1>
              </div>
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
