import { KonvaEventObject } from "konva/lib/Node";
import { ImageConfig } from "konva/lib/shapes/Image";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
} from "react-konva";
import {
  Box,
  Button,
  Select,
  TextField,
  Paper,
  InputAdornment,
  Container,
  Typography,
  MenuItem,
} from "@mui/material";
import { BsFonts } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import { CgShapeHexagon } from "react-icons/cg";
import { FaRegImage } from "react-icons/fa";
import { RiFontSize2 } from "react-icons/ri";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaAlignJustify } from "react-icons/fa6";
import { MdLayers } from "react-icons/md";
import CardImageItem from "./CardImageItem";
import TextImageItem from "./TextImageItem";
import CircleComponent from "./CircleComponent";
import StarComponent from "./StarComponent";
import ArrowComponent from "./ArrowShapeComponent";
import { IoShapesOutline } from "react-icons/io5";
import SquareComponent from "./SquareShapeComponent";
import TriangleComponent from "./TriangleShapeComponent";
import PolygonShapeComponent from "./PolygonShapeComponent";
import ListIcons from "./ListIconsComponent";
import IconComponent from "./IconComponent";
import { IoIosAdd } from "react-icons/io";
import { RegularPolygon } from "konva/lib/shapes/RegularPolygon";
const padding = 6; // Padding value
const borderPadding = 10;
const Canvas: React.FC<canvasProps> = ({
  canvasPadding,
  height,
  width,
  arrow,
  cardIcons,
  cardImages,
  circles,
  polygon,
  setTextboxes,
  setarrow,
  setcardIcons,
  setcardImages,
  setcircles,
  setpolygon,
  setsquare,
  setstars,
  settriangle,
  square,
  stars,
  textboxes,
  triangle,
  backgroundColor,
  setBackgroundColor,
  backgroundImage,
  setBackgroundImage,
}) => {
  // const [backgroundImage, setBackgroundImage] = useState<any>(null);
  const [isdownloading, setisdownloading] = useState<boolean>();
  const [forceRender, setForceRender] = useState(false);
  const canvasRef = useRef<any>(null);

  const cardImageRef = useRef<HTMLInputElement | null>(null);
  const [editType, seteditType] = useState<string>("");
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [shapeIdSelected, setshapeIdSelected] = useState<boolean>();
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
  const [bringToTop, setbringToTop] = React.useState<{
    square: { id: number; count: number };
    circle: { id: number; count: number };
    triangle: { id: number; count: number };
    polygon: { id: number; count: number };
    star: { id: number; count: number };
    arrow: { id: number; count: number };
    textbox: { id: number; count: number };
    image: { id: number; count: number };
    icon: { id: number; count: number };
  }>({
    circle: { id: 0, count: 0 },
    polygon: { id: 0, count: 0 },
    square: { id: 0, count: 0 },
    star: { id: 0, count: 0 },
    triangle: { id: 0, count: 0 },
    arrow: { id: 0, count: 0 },
    image: { id: 0, count: 0 },
    textbox: { id: 0, count: 0 },
    icon: { id: 0, count: 0 },
  });
  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };
  const [selectedTexts, setselectedTexts] = useState<TextBox[]>(() =>
    selectedId.textbox
      ? textboxes?.filter((i) => i.id === selectedId.textbox)
      : textboxes
  );
  const [selectedImages, setselectedImages] = useState<CardImage[]>(() =>
    selectedId.image
      ? cardImages?.filter((i) => i.id === selectedId.image)
      : cardImages
  );
  const [selectedcircles, setselectedcircles] = useState<CircleItem[]>(() =>
    selectedId.circle
      ? circles?.filter((i) => i.id === selectedId.circle)
      : circles
  );
  const [selectedstars, setselectedstars] = useState<StarItem[]>(() =>
    selectedId.star ? stars?.filter((i) => i.id === selectedId.star) : stars
  );
  const [selectedarrow, setselectedarrow] = useState<ArrowItem[]>(() =>
    selectedId.arrow ? arrow?.filter((i) => i.id === selectedId.arrow) : arrow
  );
  const [selectedsquare, setselectedsquare] = useState<SquareItem[]>(() =>
    selectedId.square
      ? square?.filter((i) => i.id === selectedId.square)
      : square
  );
  const [selectedtriangle, setselectedtriangle] = useState<TriangleItem[]>(() =>
    selectedId.triangle
      ? triangle?.filter((i) => i.id === selectedId.triangle)
      : triangle
  );
  const [selectedpolygon, setselectedpolygon] = useState<PolygonItem[]>(() =>
    selectedId.polygon
      ? polygon?.filter((i) => i.id === selectedId.polygon)
      : polygon
  );
  const [selectedcardIcons, setselectedcardIcons] = useState<IconItem[]>(() =>
    selectedId.icon
      ? cardIcons?.filter((i) => i.id === selectedId.icon)
      : cardIcons
  );
  useEffect(() => {
    setselectedTexts(
      selectedId.textbox
        ? textboxes.filter((i) => i.id === selectedId.textbox)
        : textboxes
    );
  }, [selectedId.textbox, textboxes]);
  useEffect(() => {
    setselectedImages(
      selectedId.image
        ? cardImages?.filter((i) => i.id === selectedId.image)
        : cardImages
    );
  }, [selectedId.image, cardImages]);

  useEffect(() => {
    setselectedcircles(
      selectedId.circle
        ? circles?.filter((i) => i.id === selectedId.circle)
        : circles
    );
  }, [selectedId.circle, circles]);

  useEffect(() => {
    setselectedstars(
      selectedId.star ? stars?.filter((i) => i.id === selectedId.star) : stars
    );
  }, [selectedId.star, stars]);

  useEffect(() => {
    setselectedarrow(
      selectedId.arrow ? arrow?.filter((i) => i.id === selectedId.arrow) : arrow
    );
  }, [selectedId.arrow, arrow]);

  useEffect(() => {
    setselectedsquare(
      selectedId.square
        ? square?.filter((i) => i.id === selectedId.square)
        : square
    );
  }, [selectedId.square, square]);

  useEffect(() => {
    setselectedtriangle(
      selectedId.triangle
        ? triangle?.filter((i) => i.id === selectedId.triangle)
        : triangle
    );
  }, [selectedId.triangle, triangle]);

  useEffect(() => {
    setselectedpolygon(
      selectedId.polygon
        ? polygon?.filter((i) => i.id === selectedId.polygon)
        : polygon
    );
  }, [selectedId.polygon, polygon]);

  useEffect(() => {
    setselectedcardIcons(
      selectedId.icon
        ? cardIcons?.filter((i) => i.id === selectedId.icon)
        : cardIcons
    );
  }, [selectedId.icon, cardIcons]);

  const handleShapeAddition = useCallback((name: string) => {
    if (name === "Circle") {
      setcircles((p: CircleItem[]) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (p.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
          x: width / 2,
          y: height / 2,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
      ]);
    } else if (name === "Arrow") {
      setarrow((p: ArrowItem[]) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (p.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
          x: width / 2,
          y: height / 2,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
      ]);
    } else if (name === "Star") {
      setstars((p: StarItem[]) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (p.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
          x: width / 2,
          y: height / 2,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
      ]);
    } else if (name == "Square") {
      setsquare((p: SquareItem[]) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (p.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
          x: width / 2,
          y: height / 2,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
      ]);
    } else if (name === "Triangle") {
      settriangle((p: TriangleItem[]) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (p.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
          x: width / 2,
          y: height / 2,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
      ]);
    } else if (name === "Polygon") {
      setpolygon((p: PolygonItem[]) => [
        ...p,
        {
          height: "20",
          width: "20",
          id: (p.length ?? 0) + 1,
          fill: "black",
          stroke: "black",
          x: width / 2,
          y: height / 2,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        },
      ]);
    }
  }, []);
  const handleBackgroundImageChange = useCallback((url: string) => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setBackgroundImage(img);
    };
  }, []);

  const handleTextChange = useCallback((id: number, newText: string) => {
    setTextboxes((prevState: any) =>
      prevState.map((textbox: any) =>
        textbox.id === id ? { ...textbox, text: newText } : textbox
      )
    );
  }, []);

  const handleTextAlignmentChange = useCallback(
    (id: number, alignment: "left" | "center" | "right") => {
      setTextboxes((prevState: any) =>
        prevState.map((textbox: any) =>
          textbox.id === id ? { ...textbox, textAlign: alignment } : textbox
        )
      );
    },
    []
  );
  const handleCardPositionChange = useCallback(
    (id: number, property: string, value: string | number) => {
      setTextboxes((prevState: any) =>
        prevState.map((textbox: any) =>
          textbox.id === id ? { ...textbox, [property]: value } : textbox
        )
      );
    },
    []
  );
  const handleDownload = () => {
    setisdownloading((p: any) => true);

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
    setTextboxes((prevState: any) =>
      prevState.map((textbox: any) =>
        textbox.id === id ? { ...textbox, fontSize: value } : textbox
      )
    );
  }
  function handleColorChange(id: number, value: string) {
    setTextboxes((prevState: any) =>
      prevState.map((textbox: any) =>
        textbox.id === id ? { ...textbox, fill: value } : textbox
      )
    );
  }
  const handleCardChange = useCallback(
    (id: number, type: string, value: string | number) => {
      setcardImages((p: any) =>
        p.map((c: any) => (c.id === id ? { ...c, [type]: value } : c))
      );
    },

    []
  );
  const handleIconChange = useCallback(
    (id: number, type: string, value: string | number) => {
      setcardIcons((p: any) =>
        p.map((c: any) => (c.id === id ? { ...c, [type]: value } : c))
      );
    },
    []
  );

  const handleShapeItemChange = useCallback(
    (name: string, attr: string, id: number, value: string | number) => {
      if (name === "circle") {
        setcircles((p: any) =>
          p.map((c: any) => (c.id === id ? { ...c, [attr]: value } : c))
        );
      } else if (name === "star") {
        setstars((p: any) =>
          p.map((c: any) => (c.id === id ? { ...c, [attr]: value } : c))
        );
      } else if (name == "square") {
        setsquare((p: any) =>
          p.map((c: any) => (c.id === id ? { ...c, [attr]: value } : c))
        );
      } else if (name == "polygon") {
        setpolygon((p: any) =>
          p.map((c: any) => (c.id === id ? { ...c, [attr]: value } : c))
        );
      } else if (name == "arrow") {
        setarrow((p: any) =>
          p.map((c: any) => (c.id === id ? { ...c, [attr]: value } : c))
        );
      } else if (name == "triangle") {
        settriangle((p: TriangleItem[]) =>
          p.map((c: TriangleItem) =>
            c.id === id ? { ...c, [attr]: value } : c
          )
        );
      }
    },
    []
  );

  const CheckDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    // deselect when clicked on empty area
    // const clickedOnEmpty =
    //   e.target.attrs.name === "background" ||
    //   e.target.attrs.name === "backgroundImage" ||
    //   e.target == e.target.getStage();
    const item = Object.entries(selectedId).find(([shape, id]) => !!id)?.[0];
    const clickedOnEmpty =
      !e.target.name().includes("anchor") && item !== e.target.name();
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
      setshapeIdSelected(false);
    }
  };
  const handleIconAddition = useCallback((name: string) => {
    setcardIcons((p: IconItem[]) => [
      ...p,
      {
        id: (p.length ?? 0) + 1,
        name,
        color: "black",
        stroke: "black",
        x: width / 2,
        y: height / 2,
        scaleX: 0.09,
        scaleY: 0.09,
        rotation: 0,
      },
    ]);
  }, []);
  console.log(cardIcons, "Cardicons");
  return (
    <section className="space-y-4 w-full">
      <div className="flex flex-row justify-center items-start">
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
                width={width}
                height={height}
                name="background"
              />
              {backgroundImage && (
                <Image
                  width={width}
                  height={height}
                  image={backgroundImage!}
                  name="backgroundImage"
                />
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
                      seteditType("text");
                    }}
                    isSelected={selectedId.textbox == textbox.id}
                    handleCardPosition={handleCardPositionChange}
                    bringToTop={textbox.id === bringToTop.textbox.id}
                    ToplayerCount={bringToTop.textbox.count}
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
                        seteditType("image");
                      }}
                      isSelected={selectedId.image == i.id}
                      bringToTop={bringToTop.image.id === i.id}
                      ToplayerCount={bringToTop.image.count}
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
                        setshapeIdSelected(true);
                        seteditType("shape");
                      }}
                      isSelected={selectedId.circle == c.id}
                      bringToTop={c.id === bringToTop.circle.id}
                      ToplayerCount={bringToTop.circle.count}
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

                        setshapeIdSelected(true);
                        seteditType("shape");
                      }}
                      isSelected={selectedId.star == c.id}
                      bringToTop={c.id === bringToTop.star.id}
                      ToplayerCount={bringToTop.star.count}
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

                        setshapeIdSelected(true);
                        seteditType("shape");
                      }}
                      isSelected={selectedId.arrow == c.id}
                      bringToTop={c.id === bringToTop.arrow.id}
                      ToplayerCount={bringToTop.arrow.count}
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

                        setshapeIdSelected(true);
                        seteditType("shape");
                      }}
                      isSelected={selectedId.square == c.id}
                      bringToTop={c.id === bringToTop.square.id}
                      ToplayerCount={bringToTop.square.count}
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
                        setshapeIdSelected(true);
                        seteditType("shape");
                      }}
                      isSelected={selectedId.triangle == c.id}
                      bringToTop={c.id === bringToTop.triangle.id}
                      ToplayerCount={bringToTop.triangle.count}
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
                        setshapeIdSelected(true);
                        seteditType("shape");
                      }}
                      isSelected={selectedId.polygon == c.id}
                      bringToTop={c.id === bringToTop.polygon.id}
                      ToplayerCount={bringToTop.polygon.count}
                    />
                  </React.Fragment>
                ))}
              {cardIcons &&
                cardIcons.map((c) => (
                  <IconComponent
                    iconName={c.name}
                    key={c.id}
                    {...c}
                    color={c.color}
                    Theight={height}
                    Twidth={width}
                    onSelect={() => {
                      selectShape((p) => ({ ...p, icon: c.id }));
                      seteditType("icon");
                    }}
                    isSelected={selectedId.icon == c.id}
                    stroke={c.stroke}
                    handleIconChange={handleIconChange}
                    canvasPadding={canvasPadding}
                    bringToTop={c.id === bringToTop.icon.id}
                    ToplayerCount={bringToTop.icon.count}
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
        <div className="flex flex-col justify-start space-y-3 items-center px-5">
          <Button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              seteditType("text");
            }}
            sx={{ padding: "20px" }}
            variant="outlined"
            color="secondary"
            startIcon={<RiFontSize2 />}
          >
            Text
          </Button>
          <Button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              seteditType("image");
            }}
            variant="outlined"
            color="secondary"
            sx={{ padding: "20px" }}
            startIcon={<FaRegImage />}
          >
            Image
          </Button>

          <Button
            className="p-20"
            onClick={(e) => {
              seteditType("shape");
            }}
            variant="outlined"
            color="secondary"
            sx={{ padding: "20px" }}
            startIcon={<IoShapesOutline />}
          >
            Shape
          </Button>
          <Button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              seteditType("icon");
            }}
            variant="outlined"
            sx={{ padding: "20px" }}
            color="secondary"
            startIcon={<CgShapeHexagon />}
          >
            Icons
          </Button>
          <Button
            onClick={() => {
              setisdownloading(true);
              handleDownload();
            }}
            variant="contained"
            color="secondary"
            startIcon={<IoMdDownload />}
          >
            Download
          </Button>
        </div>
        {/* {
          <div className="flex flex-col gap-4">
            <Button
              className="p-4 bg-blue-600 text-white rounded-md"
              onClick={(e) => {
                setTextboxes((p: any) => [
                  ...(p || []),
                  {
                    id: (textboxes?.length ?? 0) + 1,
                    fill: "black",
                    fontSize: 16,
                    text: "Enter Text",
                    textAlign: "center",
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                    x: width / 2,
                    y: height / 2,
                  },
                ]);
              }}
              variant="contained"
              color="secondary"
            >
              Add TextBox
            </Button>
            <Button
              className="p-4 bg-blue-600 text-white rounded-md"
              onClick={(e) => {
                cardImageRef.current?.click();
              }}
              variant="contained"
              color="secondary"
            >
              Add Image
            </Button>
            <TextField
              type="file"
              hidden
              ref={cardImageRef}
              onChange={(e) => {
                const img = new window.Image();
                img.src = URL.createObjectURL(e.target?.files?.[0]!);
                img.onload = () => {
                  console.log("loaded");

                  setcardImages((prevImages: any) => [
                    ...prevImages,
                    {
                      width: 130,
                      height: 190,
                      source: img,
                      id: (cardImages.length ?? 0) + 1,
                      scaleX: 1,
                      scaleY: 1,
                      rotation: 0,
                      x: width / 2,
                      y: height / 2,
                    },
                  ]);
                };
              }}
            />
            <Button
              className="p-4 bg-blue-600 text-white rounded-md"
              onClick={(e) => {
                seteditType("Addshape");
              }}
              variant="contained"
              color="secondary"
            >
              Add Shape
            </Button>
            <Button
              className="p-4 bg-blue-600 text-white rounded-md"
              onClick={(e) => {
                seteditType("Addicon");
              }}
              variant="contained"
              color="secondary"
            >
              Add Icon
            </Button>
          </div>
        } */}
      </div>
      <input
        type="file"
        hidden
        ref={cardImageRef}
        onChange={(e) => {
          const img = new window.Image();
          img.src = URL.createObjectURL(e.target?.files?.[0]!);
          img.onload = () => {
            setcardImages((prevImages: any) => [
              ...prevImages,
              {
                width: 130,
                height: 190,
                source: img,
                id: (cardImages.length ?? 0) + 1,
                scaleX: 1,
                scaleY: 1,
                rotation: 0,
                x: width / 2,
                y: height / 2,
              },
            ]);
          };
        }}
      />

      <div className="w-full flex items-center gap-5 justify-start">
        <TextField
          type="color"
          value={backgroundColor}
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
          InputProps={{
            // Style input element
            style: {
              width: "50px", // Set width of the input
              height: "50px", // Set height of the input
            },
          }}
        />

        {/* <TextField
          placeholder="Choose Background Image"
          title="Choose Background Image"
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleBackgroundImageChange(URL.createObjectURL(e.target.files![0]))
          }
        /> */}
        <Button variant="outlined" component="label" color="secondary">
          Upload Background Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) =>
              handleBackgroundImageChange(
                URL.createObjectURL(e.target.files![0])
              )
            }
          />
        </Button>
      </div>
      <Typography variant="h4">Customize</Typography>
      {editType === "text" && (
        <>
          {selectedTexts?.map((textbox) => (
            <Box
              className="flex flex-row justify-around items-end space-x-2"
              key={textbox.id}
            >
              <Box className="space-x-2">
                <TextField
                  type="text"
                  value={textbox.text}
                  onChange={(e) => handleTextChange(textbox.id, e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BsFonts />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems="center"
                className="space-x-3"
              >
                <FaAlignJustify />
                <Select
                  value={textbox.textAlign}
                  onChange={(e) =>
                    handleTextAlignmentChange(
                      textbox.id,
                      e.target.value as "left" | "center" | "right"
                    )
                  }
                >
                  <MenuItem value="left">Left</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                  <MenuItem value="right">Right</MenuItem>
                </Select>
              </Box>
              <Box>
                <h1>Change Font Size</h1>
                <TextField
                  type="number"
                  placeholder="Change Text Size"
                  defaultValue={textbox.fontSize}
                  onChange={(e) => {
                    handleFontChange(textbox.id, parseInt(e.target.value));
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiFontSize2 />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <h1>Change Font Color</h1>
                <TextField
                  type="color"
                  className="w-24"
                  placeholder="Change Text Color"
                  defaultValue={textbox.fill}
                  onChange={(e) => {
                    handleColorChange(textbox.id, e.target.value);
                  }}
                />
              </Box>
              <Button
                className="p-4 bg-blue-600 text-white  rounded-md"
                onClick={(e) => {
                  setbringToTop((p) => ({
                    ...p,
                    textbox: { count: p.textbox.count + 1, id: textbox.id },
                  }));
                }}
                variant="contained"
                color="secondary"
                startIcon={<MdLayers />}
              >
                Bring To Top
              </Button>
              <Box>
                <Button
                  className="text-red-700 cursor-pointer"
                  onClick={(e) => {
                    setTextboxes((p: any) =>
                      p.filter((i: any) => i.id !== textbox.id)
                    );
                    selectShape((p) => ({ ...p, textbox: 0 }));
                  }}
                  variant="outlined"
                  startIcon={<IoTrashBinOutline />}
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
          <Button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              setTextboxes((p: any) => [
                ...(p || []),
                {
                  id: (textboxes?.length ?? 0) + 1,
                  fill: "black",
                  fontSize: 16,
                  text: "Enter Text",
                  textAlign: "center",
                  scaleX: 1,
                  scaleY: 1,
                  rotation: 0,
                  x: width / 2,
                  y: height / 2,
                },
              ]);
            }}
            variant="contained"
            color="secondary"
            startIcon={<IoIosAdd />}
          >
            Add TextBox
          </Button>
        </>
      )}
      {editType === "image" && (
        <>
          {selectedImages?.map((cardimage) => (
            <div
              className="flex flex-row justify-around items-end"
              key={cardimage.id}
            >
              <div>
                <h1>Change Width </h1>
                <TextField
                  type="number"
                  placeholder="Change Text Size"
                  defaultValue={cardimage.width}
                  onChange={(e) => {
                    handleCardChange(cardimage.id, "width", e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiFontSize2 />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <h1>Change Height</h1>
                <TextField
                  type="number"
                  placeholder="Change Text Size"
                  defaultValue={cardimage.height}
                  onChange={(e) => {
                    handleCardChange(cardimage.id, "height", e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <RiFontSize2 />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <Button
                className="p-4 bg-blue-600 text-white rounded-md"
                onClick={(e) => {
                  setbringToTop((p) => ({
                    ...p,
                    image: { id: cardimage.id, count: p.image.count + 1 },
                  }));
                }}
                variant="contained"
                color="secondary"
                startIcon={<MdLayers />}
              >
                Bring To Top
              </Button>
              <div>
                <Button
                  className="text-red-700 cursor-pointer"
                  onClick={(e) => {
                    setcardImages((p: any) =>
                      p.filter((i: any) => i.id !== cardimage.id)
                    );
                    selectShape((p) => ({ ...p, image: 0 }));
                  }}
                  startIcon={<IoTrashBinOutline />}
                  color="error"
                  variant="outlined"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              cardImageRef.current?.click();
            }}
            variant="contained"
            color="secondary"
            startIcon={<IoIosAdd />}
          >
            Add Image
          </Button>
        </>
      )}
      {editType === "shape" && (
        <>
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "star") &&
            selectedstars?.map((star) => (
              <div
                className="flex flex-row justify-around items-center"
                key={star.id}
              >
                <div>
                  <h1>Change Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                  <TextField
                    type="color"
                    className="w-24"
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
                <Button
                  className="p-4 bg-blue-600 text-white rounded-md"
                  onClick={(e) => {
                    setbringToTop((p) => ({
                      ...p,
                      star: { count: p.star.count + 1, id: star.id },
                    }));
                  }}
                  variant="contained"
                  color="secondary"
                  startIcon={<MdLayers />}
                >
                  Bring To Top
                </Button>
                <div>
                  <Button
                    className="text-red-700 cursor-pointer"
                    onClick={(e) => {
                      setstars((p: any) =>
                        p.filter((i: any) => i.id !== star.id)
                      );
                      setshapeIdSelected(false);
                    }}
                    variant="outlined"
                    color="error"
                    startIcon={<IoTrashBinOutline />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "square") &&
            selectedsquare?.map((square) => (
              <div
                className="flex flex-row justify-around items-center"
                key={square.id}
              >
                <div>
                  <h1>Change Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                  <h1>Change Stroke Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                <Button
                  className="p-4 bg-blue-600 text-white rounded-md"
                  onClick={(e) => {
                    setbringToTop((p) => ({
                      ...p,
                      square: { count: p.square.count + 1, id: square.id },
                    }));
                  }}
                  variant="contained"
                  color="secondary"
                  startIcon={<MdLayers />}
                >
                  Bring To Top
                </Button>
                <div>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<IoTrashBinOutline />}
                    className="text-red-700 cursor-pointer"
                    onClick={(e) => {
                      setsquare((p: any) =>
                        p.filter((i: any) => i.id !== square.id)
                      );
                      setshapeIdSelected(false);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "triangle") &&
            selectedtriangle?.map((triangle) => (
              <div
                className="flex flex-row justify-around items-center"
                key={triangle.id}
              >
                <div>
                  <h1>Change Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                  <h1>Change Stroke Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                <Button
                  className="p-4 bg-blue-600 text-white rounded-md"
                  onClick={(e) => {
                    setbringToTop((p) => ({
                      ...p,
                      triangle: {
                        count: p.triangle.count + 1,
                        id: triangle.id,
                      },
                    }));
                  }}
                  variant="contained"
                  color="secondary"
                  startIcon={<MdLayers />}
                >
                  Bring To Top
                </Button>
                <div>
                  <Button
                    className="text-red-700 cursor-pointer"
                    onClick={(e) => {
                      settriangle((p: any) =>
                        p.filter((i: any) => i.id !== triangle.id)
                      );
                      setshapeIdSelected(false);
                    }}
                    variant="outlined"
                    color="error"
                    startIcon={<IoTrashBinOutline />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "circle") &&
            selectedcircles?.map((circle) => (
              <div
                className="flex flex-row justify-around items-center"
                key={circle.id}
              >
                <div>
                  <h1>Change Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                  <h1>Change Stroke Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                <Button
                  className="p-4 bg-blue-600 text-white rounded-md"
                  onClick={(e) => {
                    setbringToTop((p) => ({
                      ...p,
                      circle: { count: p.circle.count + 1, id: circle.id },
                    }));
                  }}
                  variant="contained"
                  color="secondary"
                  startIcon={<MdLayers />}
                >
                  Bring To Top
                </Button>
                <div>
                  <Button
                    className="text-red-700 cursor-pointer"
                    onClick={(e) => {
                      setcircles((p: any) =>
                        p.filter((i: any) => i.id !== circle.id)
                      );
                      setshapeIdSelected(false);
                    }}
                    variant="outlined"
                    color="error"
                    startIcon={<IoTrashBinOutline />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "arrow") &&
            selectedarrow?.map((arrow) => (
              <div
                className="flex flex-row justify-around items-center"
                key={arrow.id}
              >
                <div>
                  <h1>Change Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                  <h1>Change Stroke Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                <Button
                  className="p-4 bg-blue-600 text-white rounded-md"
                  onClick={(e) => {
                    setbringToTop((p) => ({
                      ...p,
                      arrow: { count: p.arrow.count + 1, id: arrow.id },
                    }));
                  }}
                  variant="contained"
                  color="secondary"
                  startIcon={<MdLayers />}
                >
                  Bring To Top
                </Button>
                <div>
                  <Button
                    className="text-red-700 cursor-pointer"
                    onClick={(e) => {
                      setarrow((p: any) =>
                        p.filter((i: any) => i.id !== arrow.id)
                      );
                      setshapeIdSelected(false);
                    }}
                    variant="outlined"
                    color="error"
                    startIcon={<IoTrashBinOutline />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "polygon") &&
            selectedpolygon?.map((polygon) => (
              <div
                className="flex flex-row justify-around items-center"
                key={polygon.id}
              >
                <div>
                  <h1>Change Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                  <h1>Change Stroke Color</h1>
                  <TextField
                    type="color"
                    className="w-24"
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
                <Button
                  className="p-4 bg-blue-600 text-white rounded-md"
                  onClick={(e) => {
                    setbringToTop((p) => ({
                      ...p,
                      polygon: { count: p.polygon.count + 1, id: polygon.id },
                    }));
                  }}
                  variant="contained"
                  color="secondary"
                  startIcon={<MdLayers />}
                >
                  Bring To Top
                </Button>
                <div>
                  <Button
                    className="text-red-700 cursor-pointer"
                    onClick={(e) => {
                      setpolygon((p: any) =>
                        p.filter((i: any) => i.id !== polygon.id)
                      );
                      setshapeIdSelected(false);
                    }}
                    variant="outlined"
                    color="error"
                    startIcon={<IoTrashBinOutline />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          <Button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              seteditType("Addshape");
            }}
            variant="contained"
            color="secondary"
            startIcon={<IoIosAdd />}
          >
            Add Shape
          </Button>
        </>
      )}
      {editType === "icon" && (
        <>
          {selectedcardIcons?.map((c) => (
            <div
              className="flex flex-row justify-around items-center"
              key={c.id}
            >
              <div>
                <h1>Change Color</h1>
                <TextField
                  type="color"
                  className="w-24"
                  placeholder="Change Color Size"
                  defaultValue={c.color}
                  onChange={(e) => {
                    handleIconChange(c.id, "color", e.target.value);
                  }}
                />
              </div>
              <Button
                className="p-4 bg-blue-600 text-white rounded-md"
                onClick={(e) => {
                  setbringToTop((p) => ({
                    ...p,

                    icon: { count: p.icon.count + 1, id: c.id },
                  }));
                }}
                variant="contained"
                color="secondary"
                startIcon={<MdLayers />}
              >
                Bring To Top
              </Button>
              <div>
                <h1>Change Stroke Color</h1>
                <TextField
                  type="color"
                  placeholder="Change Stroke"
                  defaultValue={c.color}
                  onChange={(e) => {
                    handleIconChange(c.id, "stroke", e.target.value);
                  }}
                />
              </div>
              <div>
                <Button
                  className="text-red-700 cursor-pointer"
                  onClick={(e) => {
                    setcardIcons((p: any) =>
                      p.filter((i: any) => i.id !== c.id)
                    );
                    selectShape((p) => ({ ...p, icon: 0 }));
                  }}
                  variant="outlined"
                  color="error"
                  startIcon={<IoTrashBinOutline />}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Button
            className="p-4 bg-blue-600 text-white rounded-md"
            onClick={(e) => {
              seteditType("Addicon");
            }}
            variant="contained"
            color="secondary"
            startIcon={<IoIosAdd />}
          >
            Add Icon
          </Button>
        </>
      )}
      {editType === "Addshape" && (
        <ShapeItemOptions handleShapeAddition={handleShapeAddition} />
      )}
      {editType === "Addicon" && (
        <ListIcons handleShapeAddition={handleIconAddition} />
      )}
    </section>
  );
};

export default Canvas;

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
