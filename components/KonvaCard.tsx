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
  Arrow,
  Circle,
  Ellipse,
  Ring,
  Star,
  RegularPolygon,
} from "react-konva";

import CardImageItem from "./CardImageItem";
import TextImageItem from "./TextImageItem";
import CircleComponent from "./CircleComponent";
import StarComponent from "./StarComponent";
import ArrowComponent from "./ArrowShapeComponent";
import SquareComponent from "./SquareShapeComponent";
import TriangleComponent from "./TriangleShapeComponent";
import PolygonShapeComponent from "./PolygonShapeComponent";
import ListIcons from "./ListIconsComponent";
import IconComponent from "./IconComponent";

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
  const [circles, setcircles] = useState<CircleItem[]>([]);
  const [stars, setstars] = useState<StarItem[]>([]);
  const [arrow, setarrow] = useState<ArrowItem[]>([]);
  const [square, setsquare] = useState<SquareItem[]>([]);
  const [triangle, settriangle] = useState<TriangleItem[]>([]);
  const [polygon, setpolygon] = useState<PolygonItem[]>([]);
  const [cardIcons, setcardIcons] = useState<IconItem[]>([]);

  const [selectedId, selectShape] = React.useState<{
    square: number;
    circle: number;
    triangle: number;
    polygon: number;
    star: number;
    arrow: number;
    textbox: number;
    image: number;
    icon: number;
  }>({
    circle: 0,
    polygon: 0,
    square: 0,
    star: 0,
    triangle: 0,
    arrow: 0,
    image: 0,
    textbox: 0,
    icon: 0,
  });
  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };
  const handleShapeAddition = (name: string) => {
    if (name === "Circle") {
      setcircles((p) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (circles.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
        },
      ]);
    } else if (name === "Arrow") {
      setarrow((p) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (arrow.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
        },
      ]);
    } else if (name === "Star") {
      setstars((p) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (stars.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
        },
      ]);
    } else if (name == "Square") {
      setsquare((p) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (square.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
        },
      ]);
    } else if (name === "Triangle") {
      settriangle((p) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (triangle.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
        },
      ]);
    } else if (name === "Polygon") {
      setpolygon((p) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (polygon.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
        },
      ]);
    }
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
  const handleIconChange = (id: number, type: string, value: string) => {
    setcardIcons((p) =>
      p.map((c) => (c.id === id ? { ...c, [type]: value } : c))
    );
  };
  const handleShapeItemChange = (
    name: string,
    attr: string,
    id: number,
    value: string
  ) => {
    if (name === "circle") {
      setcircles((p) =>
        p.map((c) => (c.id === id ? { ...c, [attr]: value } : c))
      );
    } else if (name === "star") {
      setstars((p) =>
        p.map((c) => (c.id === id ? { ...c, [attr]: value } : c))
      );
    } else if (name == "square") {
      setsquare((p) =>
        p.map((c) => (c.id === id ? { ...c, [attr]: value } : c))
      );
    } else if (name == "polygon") {
      setpolygon((p) =>
        p.map((c) => (c.id === id ? { ...c, [attr]: value } : c))
      );
    } else if (name == "arrow") {
      setstars((p) =>
        p.map((c) => (c.id === id ? { ...c, [attr]: value } : c))
      );
    } else if (name == "triangle") {
      settriangle((p) =>
        p.map((c) => (c.id === id ? { ...c, [attr]: value } : c))
      );
    }
  };

  console.log("Selected Id", cardIcons);
  const CheckDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    // deselect when clicked on empty area
    const clickedOnEmpty =
      e.target.attrs.name === "background" || e.target == e.target.getStage();
    if (clickedOnEmpty) {
      selectShape({
        arrow: 0,
        circle: 0,
        polygon: 0,
        square: 0,
        star: 0,
        triangle: 0,
        image: 0,
        textbox: 0,
        icon: 0,
      });
    }
  };
  const handleIconAddition = (name: string) => {
    setcardIcons((p) => [
      ...p,
      {
        name,
        color: "black",
        id: (cardIcons.length ?? 0) + 1,
        stroke: "black",
      },
    ]);
  };
  return (
    <div className="space-y-5">
      <div className="flex flex-row justify-start items-start">
        <Stage
          width={width}
          height={height}
          ref={canvasRef}
          onMouseDown={CheckDeselect}
          onTouchStart={CheckDeselect}
        >
          <Layer>
            <Group width={width} height={height}>
              <Rect
                fill={backgroundColor}
                width={width - canvasPadding}
                height={height - canvasPadding}
                name="background"
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
                    onSelect={() => {
                      selectShape((p) => ({ ...p, textbox: textbox.id }));
                    }}
                    isSelected={selectedId.textbox == textbox.id}
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
                      onSelect={() => {
                        selectShape((p) => ({ ...p, image: i.id }));
                      }}
                      isSelected={selectedId.image == i.id}
                    />
                  </React.Fragment>
                ))}
              {circles &&
                circles.map((c) => (
                  <React.Fragment key={c.id}>
                    <CircleComponent
                      {...c}
                      canvasPadding={canvasPadding}
                      Theight={height}
                      Twidth={width}
                      handleShapeItemChange={handleShapeItemChange}
                      onSelect={() => {
                        selectShape((p) => ({ ...p, circle: c.id }));
                      }}
                      isSelected={selectedId.circle == c.id}
                    />
                  </React.Fragment>
                ))}
              {stars &&
                stars.map((c) => (
                  <React.Fragment key={c.id}>
                    <StarComponent
                      {...c}
                      canvasPadding={canvasPadding}
                      Theight={height}
                      Twidth={width}
                      handleShapeItemChange={handleShapeItemChange}
                      onSelect={() => {
                        selectShape((p) => ({ ...p, star: c.id }));
                      }}
                      isSelected={selectedId.star == c.id}
                    />
                  </React.Fragment>
                ))}
              {arrow &&
                arrow.map((c) => (
                  <React.Fragment key={c.id}>
                    <ArrowComponent
                      {...c}
                      canvasPadding={canvasPadding}
                      Theight={height}
                      Twidth={width}
                      handleShapeItemChange={handleShapeItemChange}
                      onSelect={() => {
                        selectShape((p) => ({ ...p, arrow: c.id }));
                      }}
                      isSelected={selectedId.arrow == c.id}
                    />
                  </React.Fragment>
                ))}
              {square &&
                square.map((c) => (
                  <React.Fragment key={c.id}>
                    <SquareComponent
                      {...c}
                      canvasPadding={canvasPadding}
                      Theight={height}
                      Twidth={width}
                      handleShapeItemChange={handleShapeItemChange}
                      onSelect={() => {
                        selectShape((p) => ({ ...p, square: c.id }));
                      }}
                      isSelected={selectedId.square == c.id}
                    />
                  </React.Fragment>
                ))}
              {triangle &&
                triangle.map((c) => (
                  <React.Fragment key={c.id}>
                    <TriangleComponent
                      {...c}
                      canvasPadding={canvasPadding}
                      Theight={height}
                      Twidth={width}
                      handleShapeItemChange={handleShapeItemChange}
                      onSelect={() => {
                        selectShape((p) => ({ ...p, triangle: c.id }));
                      }}
                      isSelected={selectedId.triangle == c.id}
                    />
                  </React.Fragment>
                ))}
              {polygon &&
                polygon.map((c) => (
                  <React.Fragment key={c.id}>
                    <PolygonShapeComponent
                      {...c}
                      canvasPadding={canvasPadding}
                      Theight={height}
                      Twidth={width}
                      handleShapeItemChange={handleShapeItemChange}
                      onSelect={() => {
                        selectShape((p) => ({ ...p, polygon: c.id }));
                      }}
                      isSelected={selectedId.polygon == c.id}
                    />
                  </React.Fragment>
                ))}
              {cardIcons &&
                cardIcons.map((c) => (
                  <IconComponent
                    iconName={c.name}
                    key={c.name}
                    color={c.color}
                    Theight={height}
                    Twidth={width}
                    onSelect={() => {
                      selectShape((p) => ({ ...p, icon: c.id }));
                    }}
                    isSelected={selectedId.icon == c.id}
                    stroke={c.stroke}
                  />
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
        {
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
            <button
              className="p-4 bg-blue-600 text-white rounded-md"
              onClick={(e) => {
                seteditType("Addshape");
              }}
            >
              Add Shape
            </button>
            <button
              className="p-4 bg-blue-600 text-white rounded-md"
              onClick={(e) => {
                seteditType("Addicon");
              }}
            >
              Add Icon
            </button>
          </div>
        }
      </div>
      <div className="w-full">
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
        <button
          className="p-4 bg-blue-600 text-white rounded-md"
          onClick={(e) => {
            seteditType("shape");
          }}
        >
          Edit Shape
        </button>
        <button
          className="p-4 bg-blue-600 text-white rounded-md"
          onClick={(e) => {
            seteditType("icon");
          }}
        >
          Edit Icons
        </button>
      </div>
      <div className="w-full">
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
      </div>
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
                  setcardImages((p) => p.filter((i) => i.id !== cardimage.id));
                }}
              >
                Delete
              </h1>
            </div>
          </div>
        ))}
      {editType === "shape" &&
        stars?.map((star) => (
          <div
            className="flex flex-row justify-around items-center"
            key={star.id}
          >
            <div>
              <h1>Change Color</h1>
              <input
                type="color"
                placeholder="Change Color Size"
                defaultValue={star.fill}
                onChange={(e) => {
                  handleShapeItemChange(
                    "star",
                    "fill",
                    star.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1>Change Stroke Color</h1>
              <input
                type="color"
                placeholder="Change Stroke Color Size"
                defaultValue={star.fill}
                onChange={(e) => {
                  handleShapeItemChange(
                    "star",
                    "stroke",
                    star.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1
                className="text-red-700 cursor-pointer"
                onClick={(e) => {
                  setstars((p) => p.filter((i) => i.id !== star.id));
                }}
              >
                Delete
              </h1>
            </div>
          </div>
        ))}
      {editType === "shape" &&
        square?.map((square) => (
          <div
            className="flex flex-row justify-around items-center"
            key={square.id}
          >
            <div>
              <h1>Change Stroke Color</h1>
              <input
                type="color"
                placeholder="Change Color Size"
                defaultValue={square.stroke}
                onChange={(e) => {
                  handleShapeItemChange(
                    "square",
                    "fill",
                    square.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1>Change Color</h1>
              <input
                type="color"
                placeholder="Change Color Size"
                defaultValue={square.fill}
                onChange={(e) => {
                  handleShapeItemChange(
                    "square",
                    "fill",
                    square.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1
                className="text-red-700 cursor-pointer"
                onClick={(e) => {
                  setsquare((p) => p.filter((i) => i.id !== square.id));
                }}
              >
                Delete
              </h1>
            </div>
          </div>
        ))}
      {editType === "shape" &&
        triangle?.map((triangle) => (
          <div
            className="flex flex-row justify-around items-center"
            key={triangle.id}
          >
            <div>
              <h1>Change Stroke</h1>
              <input
                type="color"
                placeholder="Change Stroke"
                defaultValue={triangle.stroke}
                onChange={(e) => {
                  handleShapeItemChange(
                    "triangle",
                    "stroke",
                    triangle.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1>Change Color</h1>
              <input
                type="color"
                placeholder="Change Color"
                defaultValue={triangle.fill}
                onChange={(e) => {
                  handleShapeItemChange(
                    "triangle",
                    "fill",
                    triangle.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1
                className="text-red-700 cursor-pointer"
                onClick={(e) => {
                  settriangle((p) => p.filter((i) => i.id !== triangle.id));
                }}
              >
                Delete
              </h1>
            </div>
          </div>
        ))}
      {editType === "shape" &&
        circles?.map((circle) => (
          <div
            className="flex flex-row justify-around items-center"
            key={circle.id}
          >
            <div>
              <h1>Change Stroke Color</h1>
              <input
                type="color"
                placeholder="Change Stroke Color"
                defaultValue={circle.stroke}
                onChange={(e) => {
                  handleShapeItemChange(
                    "circle",
                    "stroke",
                    circle.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1>Change Color</h1>
              <input
                type="color"
                placeholder="Change Color"
                defaultValue={circle.fill}
                onChange={(e) => {
                  handleShapeItemChange(
                    "circle",
                    "fill",
                    circle.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1
                className="text-red-700 cursor-pointer"
                onClick={(e) => {
                  setcircles((p) => p.filter((i) => i.id !== circle.id));
                }}
              >
                Delete
              </h1>
            </div>
          </div>
        ))}
      {editType === "shape" &&
        arrow?.map((arrow) => (
          <div
            className="flex flex-row justify-around items-center"
            key={arrow.id}
          >
            <div>
              <h1>Change Stroke Color</h1>
              <input
                type="color"
                placeholder="Change Stroke Color"
                defaultValue={arrow.stroke}
                onChange={(e) => {
                  handleShapeItemChange(
                    "arrow",
                    "stroke",
                    arrow.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1>Change Color</h1>
              <input
                type="color"
                placeholder="Change Color"
                defaultValue={arrow.fill}
                onChange={(e) => {
                  handleShapeItemChange(
                    "arrow",
                    "fill",
                    arrow.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1
                className="text-red-700 cursor-pointer"
                onClick={(e) => {
                  setarrow((p) => p.filter((i) => i.id !== arrow.id));
                }}
              >
                Delete
              </h1>
            </div>
          </div>
        ))}
      {editType === "shape" &&
        polygon?.map((polygon) => (
          <div
            className="flex flex-row justify-around items-center"
            key={polygon.id}
          >
            <div>
              <h1>Change Stroke Color</h1>
              <input
                type="color"
                placeholder="Change Stroke"
                defaultValue={polygon.stroke}
                onChange={(e) => {
                  handleShapeItemChange(
                    "polygon",
                    "stroke",
                    polygon.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1>Change Color</h1>
              <input
                type="color"
                placeholder="Change Color Size"
                defaultValue={polygon.fill}
                onChange={(e) => {
                  handleShapeItemChange(
                    "polygon",
                    "fill",
                    polygon.id,
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <h1
                className="text-red-700 cursor-pointer"
                onClick={(e) => {
                  setpolygon((p) => p.filter((i) => i.id !== polygon.id));
                }}
              >
                Delete
              </h1>
            </div>
          </div>
        ))}
      {editType === "icon" &&
        cardIcons.map((c) => (
          <div className="flex flex-row justify-around items-center" key={c.id}>
            <div>
              <h1>Change Color</h1>
              <input
                type="color"
                placeholder="Change Color Size"
                defaultValue={c.color}
                onChange={(e) => {
                  handleIconChange(c.id, "color", e.target.value);
                }}
              />
            </div>
            <div>
              <h1>Change Stroke Color</h1>
              <input
                type="color"
                placeholder="Change Stroke"
                defaultValue={c.color}
                onChange={(e) => {
                  handleIconChange(c.id, "stroke", e.target.value);
                }}
              />
            </div>
            <div>
              <h1
                className="text-red-700 cursor-pointer"
                onClick={(e) => {
                  setcardIcons((p) => p.filter((i) => i.id !== c.id));
                }}
              >
                Delete
              </h1>
            </div>
          </div>
        ))}
      {editType === "Addshape" && (
        <ShapeItemOptions handleShapeAddition={handleShapeAddition} />
      )}
      {editType === "Addicon" && (
        <ListIcons handleShapeAddition={handleIconAddition} />
      )}
      <button
        onClick={() => {
          setisdownloading(true);
          handleDownload();
        }}
      >
        Download Canvas
      </button>
    </div>
  );
};

export default BusinessCard;

function ShapeItemOptions({
  handleShapeAddition,
}: {
  handleShapeAddition: (name: string) => void;
}) {
  return (
    <section className="flex h-auto w-full bg-gray-100 p-5">
      <div className="flex justify-between items-center">
        <div
          className="w-20 h-14 cursor-pointer"
          id="square"
          onClick={handleShapeAddition.bind(null, "Square")}
        >
          <svg
            fill="#000000"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M 6 6 L 6 26 L 26 26 L 26 6 L 6 6 z"></path>
            </g>
          </svg>
        </div>
        <div
          className="w-20 h-14 cursor-pointer"
          id="star"
          onClick={handleShapeAddition.bind(null, "Star")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.8532 4.13112C11.2884 3.12751 12.7117 3.12752 13.1469 4.13112L15.1266 8.69665L20.0805 9.16869C21.1695 9.27246 21.6093 10.626 20.7893 11.3501L17.059 14.6438L18.1408 19.501C18.3787 20.5688 17.2272 21.4053 16.2853 20.8492L12 18.3193L7.71482 20.8492C6.77284 21.4053 5.62141 20.5688 5.85923 19.501L6.94111 14.6438L3.21082 11.3501C2.39082 10.626 2.83063 9.27246 3.91959 9.16869L8.87345 8.69665L10.8532 4.13112Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div
          className="w-20 h-14 cursor-pointer"
          id="arrow"
          onClick={handleShapeAddition.bind(null, "Arrow")}
        >
          <svg
            fill="#000000"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M 13.28125 6.78125 L 4.78125 15.28125 L 4.09375 16 L 4.78125 16.71875 L 13.28125 25.21875 L 14.71875 23.78125 L 7.9375 17 L 28 17 L 28 15 L 7.9375 15 L 14.71875 8.21875 Z"></path>
            </g>
          </svg>
        </div>
        <div
          className="w-20 h-14 cursor-pointer"
          id="circle"
          onClick={handleShapeAddition.bind(null, "Circle")}
        >
          <svg
            viewBox="0 0 72 72"
            id="emoji"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="color">
                {" "}
                <circle cx="36" cy="36.0001" r="28"></circle>{" "}
              </g>{" "}
              <g id="line">
                {" "}
                <circle
                  cx="36"
                  cy="36.0001"
                  r="28"
                  fill="none"
                  stroke="#000000"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></circle>{" "}
              </g>{" "}
            </g>
          </svg>
        </div>
        <div
          className="w-20 h-14 cursor-pointer"
          onClick={handleShapeAddition.bind(null, "Triangle")}
          id="Triangle"
        >
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.999 32"
            transform="rotate(180)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path d="M31.92,5.021l-14.584,22.5c-0.089,0.138-0.241,0.223-0.406,0.229c-0.004,0-0.009,0-0.014,0 c-0.16,0-0.312-0.076-0.404-0.205L0.096,5.044C-0.015,4.893-0.031,4.69,0.054,4.523C0.139,4.354,0.312,4.25,0.5,4.25h31 c0.183,0,0.352,0.1,0.438,0.261C32.026,4.67,32.019,4.867,31.92,5.021z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
        </div>
        <div
          className="w-20 h-14 cursor-pointer"
          onClick={handleShapeAddition.bind(null, "Polygon")}
          id="Polygon"
        >
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className="bi bi-pentagon-fill"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path d="m8 0 8 6.5-3 9.5H3L0 6.5 8 0z"></path>{" "}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
