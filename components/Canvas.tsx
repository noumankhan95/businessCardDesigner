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
  useMediaQuery,
} from "@mui/material";
import { BsFonts } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import { CgShapeHexagon } from "react-icons/cg";
import { FaRegImage } from "react-icons/fa";
import { RiFontSize2 } from "react-icons/ri";
import { IoTrashBinOutline } from "react-icons/io5";
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
import "@/app/globals.css";
import EditText from "./EditItems/EditText";
import EditImage from "./EditItems/EditImage";
import EditStar from "./EditItems/EditStar";
import EditSquare from "./EditItems/EditSquare";
import EditTriangleItem from "./EditItems/TriangleItem";
import EditCircleItem from "./EditItems/EditCircleItem";
import EditArrowIten from "./EditItems/EditArrowIten";
import EditPolygonItem from "./EditItems/EditPolygonItem";
import EditIcon from "./EditItems/EditIcon";
import { useTheme } from "@emotion/react";
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
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const cardImageRef = useRef<HTMLInputElement | null>(null);
  const [editType, seteditType] = useState<string>("");
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [shapeIdSelected, setshapeIdSelected] = useState<boolean>();
  console.log(isMobile, "isMobile");
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

  const handleShapeAddition = useCallback((name: string) => {
    if (name === "Circle") {
      setcircles(
        (p: any) =>
          new Map(
            p.set((p.size ?? 0) + 1, {
              height: "20",
              width: "20",
              id: (p.size ?? 0) + 1,
              fill: "black",
              stroke: "black",
              x: width / 2,
              y: height / 2,

              rotation: 0,
            })
          )
      );
    } else if (name === "Arrow") {
      setarrow(
        (p: any) =>
          new Map(
            p.set((p.size ?? 0) + 1, {
              height: "20",
              width: "20",
              id: (p.size ?? 0) + 1,
              fill: "black",
              stroke: "black",
              x: width / 2,
              y: height / 2,

              rotation: 0,
            })
          )
      );
    } else if (name === "Star") {
      setstars(
        (p: any) =>
          new Map(
            p.set((p.size ?? 0) + 1, {
              height: "20",
              width: "20",
              id: (p.size ?? 0) + 1,
              fill: "black",
              stroke: "black",
              x: width / 2,
              y: height / 2,

              rotation: 0,
            })
          )
      );
    } else if (name == "Square") {
      setsquare(
        (p: any) =>
          new Map(
            p.set((p.size ?? 0) + 1, {
              height: "20",
              width: "20",
              id: (p.size ?? 0) + 1,
              fill: "black",
              stroke: "black",
              x: width / 2,
              y: height / 2,

              rotation: 0,
            })
          )
      );
    } else if (name === "Triangle") {
      settriangle(
        (p: any) =>
          new Map(
            p.set((p.size ?? 0) + 1, {
              height: "20",
              width: "20",
              id: (p.size ?? 0) + 1,
              fill: "black",
              stroke: "black",
              x: width / 2,
              y: height / 2,

              rotation: 0,
            })
          )
      );
    } else if (name === "Polygon") {
      setpolygon(
        (p: any) =>
          new Map(
            p.set((p.size ?? 0) + 1, {
              height: "20",
              width: "20",
              id: (p.size ?? 0) + 1,
              fill: "black",
              stroke: "black",
              x: width / 2,
              y: height / 2,

              rotation: 0,
            })
          )
      );
    }
  }, []);
  const [stageWidth, setStageWidth] = useState(() => (isMobile ? 340 : 660));
  const [stageHeight, setStageHeight] = useState(() => (isMobile ? 190 : 350));
  const containerRef = useRef<any>(null);
  useEffect(() => {
    const resizeStage = () => {
      const container = containerRef.current;
      if (container) {
        console.log("changing");
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        setStageWidth(width);
        setStageHeight(height);
      }
    };

    // Resize the stage when the window is resized
    window.addEventListener("resize", resizeStage);
    resizeStage(); // Initialize stage dimensions
    return () => {
      window.removeEventListener("resize", resizeStage);
    };
  }, []);
  console.log(stageWidth);
  console.log(stageHeight);

  useEffect(() => {
    setStageWidth(() => (isMobile ? 340 : 660));
    setStageHeight(() => (isMobile ? 190 : 350));
  }, [isMobile]);
  const handleBackgroundImageChange = useCallback((url: string) => {
    console.log("url", url);
    if (!url) {
      console.log("no background");
      setBackgroundImage("");
      canvasRef.current.return;
    }
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setBackgroundImage(img);
    };
  }, []);

  const handleTextChange = useCallback((id: number, newText: string) => {
    setTextboxes((prevState: any) => {
      const newState = new Map<number, TextBox>(prevState);
      const updatedTextBox: TextBox = newState.get(id)!;
      if (updatedTextBox) {
        // Update the fontFamily property of the TextBox with the specified ID
        updatedTextBox.text = newText;
        newState.set(id, updatedTextBox);
      }
      return newState;
    });
  }, []);

  const handleTextAlignmentChange = useCallback(
    (id: number, alignment: "left" | "center" | "right") => {
      console.log("alignment", alignment);
      let x =
        alignment === "left"
          ? canvasPadding
          : alignment === "center"
          ? width / 2
          : width - canvasPadding * 10;
      setTextboxes((prevState: any) => {
        const newState = new Map<number, TextBox>(prevState);
        const updatedTextBox: TextBox = newState.get(id)!;
        if (updatedTextBox) {
          // Update the fontFamily property of the TextBox with the specified ID
          updatedTextBox.textAlign = alignment;
          updatedTextBox.x = x;
          newState.set(id, updatedTextBox);
        }
        return newState;
      });
    },
    []
  );
  const handleCardPositionChange = useCallback(
    (id: number, property: any, value: string | number) => {
      setTextboxes((prevState: Map<number, TextBox>) => {
        const newState = new Map(prevState);
        const updatedTextBox = newState.get(id);
        if (updatedTextBox) {
          // Use type assertion to tell TypeScript that property is a valid property name
          (updatedTextBox as any)[property] = value;
          newState.set(id, updatedTextBox);
        }
        return newState;
      });
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

  const handleCardChange = useCallback(
    (id: number, type: string, value: string | number) => {
      setcardImages((p: any) => {
        const newImages = new Map(p);
        const starToUpdate = newImages.get(id);
        if (starToUpdate) {
          // Update the specified attribute of the star
          (starToUpdate as any)[type] = value;
          newImages.set(id, starToUpdate); // Update the star in the map
        }
        return newImages;
      });
    },

    []
  );
  const handleIconChange = useCallback(
    (id: number, type: string, value: string | number) => {
      setcardIcons((p: any) => {
        const newIcons = new Map(p);
        const starToUpdate = newIcons.get(id);
        if (starToUpdate) {
          // Update the specified attribute of the star
          (starToUpdate as any)[type] = value;
          newIcons.set(id, starToUpdate); // Update the star in the map
        }
        return newIcons;
      });
    },
    []
  );

  const handleShapeItemChange = useCallback(
    (name: string, attr: string, id: number, value: string | number) => {
      if (name === "circle") {
        setcircles((p: any) => {
          const newCircles = new Map(p);
          const starToUpdate = newCircles.get(id);
          if (starToUpdate) {
            // Update the specified attribute of the star
            (starToUpdate as any)[attr] = value;
            newCircles.set(id, starToUpdate); // Update the star in the map
          }
          return newCircles;
        });
      } else if (name === "star") {
        setstars((p: any) => {
          const newStars = new Map(p);
          const starToUpdate = newStars.get(id);
          if (starToUpdate) {
            // Update the specified attribute of the star
            (starToUpdate as any)[attr] = value;
            newStars.set(id, starToUpdate); // Update the star in the map
          }
          return newStars;
        });
      } else if (name == "square") {
        setsquare((p: any) => {
          const newSquares = new Map(p);
          const starToUpdate = newSquares.get(id);
          if (starToUpdate) {
            // Update the specified attribute of the star
            (starToUpdate as any)[attr] = value;
            newSquares.set(id, starToUpdate); // Update the star in the map
          }
          return newSquares;
        });
      } else if (name == "polygon") {
        setpolygon((p: any) => {
          const newPolygons = new Map(p);
          const starToUpdate = newPolygons.get(id);
          if (starToUpdate) {
            // Update the specified attribute of the star
            (starToUpdate as any)[attr] = value;
            newPolygons.set(id, starToUpdate); // Update the star in the map
          }
          return newPolygons;
        });
      } else if (name == "arrow") {
        setarrow((p: any) => {
          const newArrows = new Map(p);
          const starToUpdate = newArrows.get(id);
          if (starToUpdate) {
            // Update the specified attribute of the star
            (starToUpdate as any)[attr] = value;
            newArrows.set(id, starToUpdate); // Update the star in the map
          }
          return newArrows;
        });
      } else if (name == "triangle") {
        settriangle((p: any) => {
          const newTriangles = new Map(p);
          const starToUpdate = newTriangles.get(id);
          if (starToUpdate) {
            // Update the specified attribute of the star
            (starToUpdate as any)[attr] = value;
            newTriangles.set(id, starToUpdate); // Update the star in the map
          }
          return newTriangles;
        });
      }
    },
    []
  );
  const CheckDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
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
    setcardIcons(
      (p: any) =>
        new Map(
          p.set((p.size ?? 0) + 1, {
            id: (p.size ?? 0) + 1,
            name,
            color: "black",
            stroke: "black",
            x: width / 2,
            y: height / 2,
            scaleX: 0.09,
            scaleY: 0.09,
            rotation: 0,
          })
        )
    );
  }, []);
  console.log(editType, "editType");
  console.log(isMobile, "isMobile");

  return (
    <section
      className={`space-y-4  w-full h-screen md:h-auto flex flex-col-reverse items-start justify-end md:flex-row lg:justify-start gap-5 lg:py-20 lg:px-0 px-10 lg:my-10  ${
        isMobile && editType ? "mt-32" : ""
      }`}
    >
      {editType === "text" && (
        <>
          {textboxes.has(selectedId.textbox) && (
            <EditText
              textboxes={textboxes}
              setTextboxes={setTextboxes}
              canvasPadding={canvasPadding}
              width={width}
              selectShape={selectShape}
              selectedId={selectedId}
              setbringToTop={setbringToTop}
            />
          )}
        </>
      )}
      {editType === "image" && (
        <>
          {cardImages.has(selectedId.image) && (
            <EditImage
              cardImages={cardImages}
              selectShape={selectShape}
              selectedId={selectedId}
              setbringToTop={setbringToTop}
              setcardImages={setcardImages}
            />
          )}
        </>
      )}
      {editType === "shape" && (
        <>
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "star") &&
            stars.has(selectedId.star) && (
              <EditStar
                handleShapeItemChange={handleShapeItemChange}
                selectShape={selectShape}
                selectedId={selectedId}
                setbringToTop={setbringToTop}
                setshapeIdSelected={setshapeIdSelected}
                setstars={setstars}
                stars={stars}
              />
            )}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "square") &&
            square.has(selectedId.square) && (
              <EditSquare
                handleShapeItemChange={handleShapeItemChange}
                selectShape={selectShape}
                selectedId={selectedId}
                setbringToTop={setbringToTop}
                setshapeIdSelected={setshapeIdSelected}
                setsquare={setsquare}
                square={square}
              />
            )}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "triangle") &&
            triangle.has(selectedId.triangle) && (
              <EditTriangleItem
                handleShapeItemChange={handleShapeItemChange}
                selectShape={selectShape}
                selectedId={selectedId}
                setbringToTop={setbringToTop}
                setshapeIdSelected={setshapeIdSelected}
                settriangle={settriangle}
                triangle={triangle}
              />
            )}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "circle") &&
            circles.has(selectedId.circle) && (
              <EditCircleItem
                circles={circles}
                setcircles={setcircles}
                handleShapeItemChange={handleShapeItemChange}
                selectShape={selectShape}
                selectedId={selectedId}
                setbringToTop={setbringToTop}
                setshapeIdSelected={setshapeIdSelected}
              />
            )}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "arrow") &&
            arrow.has(selectedId.arrow) && (
              <EditArrowIten
                arrow={arrow}
                setarrow={setarrow}
                handleShapeItemChange={handleShapeItemChange}
                selectShape={selectShape}
                selectedId={selectedId}
                setbringToTop={setbringToTop}
                setshapeIdSelected={setshapeIdSelected}
              />
            )}
          {(!shapeIdSelected ||
            Object.entries(selectedId).find(([i, a]) => a != 0)?.[0] ==
              "polygon") &&
            polygon.has(selectedId.polygon) && (
              <EditPolygonItem
                polygon={polygon}
                setpolygon={setpolygon}
                handleShapeItemChange={handleShapeItemChange}
                selectShape={selectShape}
                selectedId={selectedId}
                setbringToTop={setbringToTop}
                setshapeIdSelected={setshapeIdSelected}
              />
            )}
        </>
      )}
      {editType === "icon" && (
        <>
          {cardIcons.has(selectedId.icon) && (
            <EditIcon
              cardIcons={cardIcons}
              setcardIcons={setcardIcons}
              handleIconChange={handleIconChange}
              selectShape={selectShape}
              selectedId={selectedId}
              setbringToTop={setbringToTop}
              setshapeIdSelected={setshapeIdSelected}
            />
          )}
        </>
      )}
      <section className=" flex flex-col-reverse w-full  fixed bottom-0 left-0  md:flex-row  md:justify-start md:items-start md:h-full w-full md:w-2/5 gap-5 md:relative md:top-10 ">
        <div className="flex md:flex-col flex-row bg-black md:bg-transparent justify-between items-end gap-3 md:flex-col md:justify-start space-y-3 md:items-center px-5">
          <Button
            className="p-4 bg-blue-600 text-white rounded-md flex flex-col items-center"
            onClick={(e) => {
              seteditType("text");
            }}
            sx={{
              padding: "20px",
              textAlign: "center",
              ...(isMobile && {
                padding: 1,
                border: "none",
                color: "white",
              }),
            }}
            variant="outlined"
            color="secondary"
            startIcon={<RiFontSize2 />}
          >
            <span>Text</span>
          </Button>
          <Button
            className="p-4 bg-blue-600 text-white rounded-md flex flex-col items-center"
            onClick={(e) => {
              seteditType("image");
            }}
            variant="outlined"
            color="secondary"
            sx={{
              padding: "20px",
              ...(isMobile && {
                color: "white",
                padding: 1,
                border: "none",
              }),
            }}
            startIcon={<FaRegImage />}
          >
            <span>Image</span>
          </Button>

          <Button
            className="p-20 flex flex-col items-center"
            onClick={(e) => {
              seteditType("shape");
            }}
            variant="outlined"
            color="secondary"
            sx={{
              padding: "20px",
              ...(isMobile && {
                color: "white",
                padding: 1,
                border: "none",
              }),
            }}
            startIcon={<IoShapesOutline />}
          >
            <span>Shape</span>
          </Button>
          <Button
            className="p-4 bg-blue-600 text-white rounded-md flex flex-col items-center"
            onClick={(e) => {
              seteditType("icon");
            }}
            variant="outlined"
            sx={{
              padding: "20px",
              ...(isMobile && {
                color: "white",
                padding: 1,
                border: "none",
              }),
            }}
            color="secondary"
            startIcon={<CgShapeHexagon />}
          >
            <span>Icons</span>
          </Button>
          {/* <Button
            onClick={() => {
              setisdownloading(true);
              handleDownload();
            }}
            sx={{
              ...(isMobile && {
                color: "white",
                padding:4
              }),
            }}
            variant="contained"
            color="secondary"
            startIcon={<IoMdDownload />}
            hidden
          >
            Download
          </Button> */}
        </div>

        <div className="flex flex-col p-5 gap-5 bg-white rounded-xl border-2 border-slate-300 max-h-64 md:max-h-none overflow-auto  lg:min-h-56 w-full  lg:w-3/5 items-start ">
          <Typography variant="h6" fontWeight={600}>
            Customize
          </Typography>
          {!editType && <p>Click On an Item to Start Editing</p>}
          {editType === "text" && (
            <>
              <p>Edit Your Text Here</p>

              {Array.from(textboxes.values()).map((textbox) => (
                <Box
                  className={`flex flex-row justify-around items-end space-x-2 `}
                  key={textbox.id}
                >
                  <Box className="space-x-2">
                    <TextField
                      type="text"
                      value={textbox.text}
                      onChange={(e) =>
                        handleTextChange(textbox.id, e.target.value)
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BsFonts />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box>
              ))}
              <Button
                className="p-4 bg-blue-600 text-white rounded-md"
                onClick={(e) => {
                  setTextboxes(
                    (prevTextboxes: any) =>
                      new Map(
                        prevTextboxes.set((prevTextboxes?.size ?? 0) + 1, {
                          id: (prevTextboxes?.size ?? 0) + 1,
                          fill: "black",
                          fontSize: 16,
                          text: "Enter Text",
                          textAlign: "center",
                          rotation: 0,
                          x: width / 8,
                          y: height / 8,
                          fontFamily: "sunflower",
                        })
                      )
                  );
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
              <p>
                Accepted formats .jpg, .jpeg, .jfif, .bmp, .png, .gif, .heic,
                .svg, .pdf, .psd, .ai, .eps, .ait, .ppt, .pptx, .tif, .tiff
              </p>
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
        </div>
      </section>
      <div
        className={`w-full md:w-2/5 relative flex-col top-10 flex lg:flex-row`}
      >
        <div>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            {/* <div
              style={{
                position: "absolute",
                backgroundColor: "black",
                width: "100%", // Span the width
                height: "1px", // Adjust thickness as needed
                bottom: -12,
                zIndex: 1, // Ensure the line is above the canvas content
                textAlign: "center",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
              id="verticalLine"
            >
              <span>9.4 cm</span>
            </div> */}
            {/* Horizontal line */}
            {/* <div
              style={{
                position: "absolute",
                backgroundColor: "black",
                height: "100%", // Span the height
                width: "1px", // Adjust thickness as needed
                left: "calc(660px + 10px)", // Adjust position as needed
                zIndex: 1, // Ensure the line is above the canvas content
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                whiteSpace: "nowrap", // Prevent text from wrapping
              }}
              id="horizontalLine"
            >
              <span style={{ marginLeft: 2 }}>5.4 cm</span>
            </div> */}
            <div
              className="flex flex-row justify-center items-start"
              ref={containerRef}
            >
              <Stage
                width={stageWidth} // Set a default width
                height={stageHeight}
                ref={canvasRef}
                onMouseDown={CheckDeselect}
                onTouchStart={CheckDeselect}
              >
                <Layer>
                  <Group
                    width={stageWidth} // Set a default width
                    height={stageHeight}
                  >
                    <Rect
                      fill={backgroundColor}
                      width={stageWidth} // Set a default width
                      height={stageHeight}
                      name="background"
                    />
                    {backgroundImage && (
                      <Image
                        width={stageWidth}
                        height={stageHeight}
                        image={backgroundImage!}
                        name="backgroundImage"
                      />
                    )}
                    {Array.from(textboxes.values())?.map((textbox) => {
                      return (
                        <TextImageItem
                          textbox={textbox}
                          isMobile={isMobile}
                          canvasPadding={isMobile ? 1 : canvasPadding}
                          handleTextAlignmentChange={handleTextAlignmentChange}
                          height={stageHeight}
                          width={stageWidth}
                          key={textbox.id}
                          onSelect={() => {
                            selectShape((p) => ({ ...p, textbox: textbox.id }));
                            seteditType("text");
                          }}
                          isSelected={selectedId.textbox == textbox.id}
                          handleCardPosition={handleCardPositionChange}
                          bringToTop={textbox.id === bringToTop.textbox.id}
                          ToplayerCount={bringToTop.textbox.count}
                          fontFamily={textbox.fontFamily}
                        />
                      );
                    })}
                    {cardImages &&
                      Array.from(cardImages.values())?.map((i) => (
                        <React.Fragment key={i.id}>
                          <CardImageItem
                            Theight={stageHeight}
                            Twidth={stageWidth}
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
                      Array.from(circles.values())?.map((c) => (
                        <React.Fragment key={c.id}>
                          <CircleComponent
                            {...c}
                            canvasPadding={canvasPadding}
                            Theight={stageHeight}
                            Twidth={stageWidth}
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
                      Array.from(stars.values())?.map((c) => (
                        <React.Fragment key={c.id}>
                          <StarComponent
                            {...c}
                            canvasPadding={canvasPadding}
                            Theight={stageHeight}
                            Twidth={stageWidth}
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
                      Array.from(arrow.values())?.map((c) => (
                        <React.Fragment key={c.id}>
                          <ArrowComponent
                            {...c}
                            canvasPadding={canvasPadding}
                            Theight={stageHeight}
                            Twidth={stageWidth}
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
                      Array.from(square.values())?.map((c) => (
                        <React.Fragment key={c.id}>
                          <SquareComponent
                            {...c}
                            canvasPadding={canvasPadding}
                            Theight={stageHeight}
                            Twidth={stageWidth}
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
                      Array.from(triangle.values())?.map((c) => (
                        <React.Fragment key={c.id}>
                          <TriangleComponent
                            {...c}
                            canvasPadding={canvasPadding}
                            Theight={stageHeight}
                            Twidth={stageWidth}
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
                      Array.from(polygon.values())?.map((c) => (
                        <React.Fragment key={c.id}>
                          <PolygonShapeComponent
                            {...c}
                            canvasPadding={canvasPadding}
                            Theight={stageHeight}
                            Twidth={stageWidth}
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
                      Array.from(cardIcons.values())?.map((c) => (
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
                          stageWidth - padding - borderPadding, // Index 2: X-coordinate of the top-right corner
                          padding + borderPadding, // Index 3: Y-coordinate of the top-right corner
                          stageWidth - padding - borderPadding, // Index 4: X-coordinate of the bottom-right corner
                          stageHeight - padding - borderPadding, // Index 5: Y-coordinate of the bottom-right corner
                          padding + borderPadding, // Index 6: X-coordinate of the bottom-left corner
                          stageHeight - padding - borderPadding, // Index 7: Y-coordinate of the bottom-left corner
                          padding + borderPadding, // Index 8: X-coordinate of the top-left corner (to close the shape)
                          padding + borderPadding, // Index 9: Y-coordinate of the top-left corner (to close the shape)
                        ]}
                        stroke="black"
                        dash={[8, 5]} // Adjust the dash array for the desired dotted effect
                      />
                    )}
                  </Group>
                </Layer>
              </Stage>
            </div>
          </div>

          <input
            type="file"
            hidden
            ref={cardImageRef}
            onChange={(e) => {
              const img = new window.Image();
              img.src = URL.createObjectURL(e.target?.files?.[0]!);
              img.onload = () => {
                setcardImages(
                  (prevImages: any) =>
                    new Map(
                      prevImages.set((prevImages.size ?? 0) + 1, {
                        width: img.width / 2,
                        height: img.height / 2,
                        source: img,
                        id: (prevImages.size ?? 0) + 1,
                        scaleX: 1,
                        scaleY: 1,
                        rotation: 0,
                        x: width / 2,
                        y: height / 2,
                      })
                    )
                );
              };
            }}
          />

          <div className="w-full my-5 flex items-center gap-5 justify-start lg:mt-16">
            <TextField
              type="color"
              value={backgroundColor}
              onChange={(e) => handleBackgroundColorChange(e.target.value)}
              className="w-32"
            />

            <Button
              variant="outlined"
              component="label"
              color="secondary"
              className="text-sm"
              style={{ fontSize: !isMobile ? 14 : 12 }}
            >
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
            <Button
              variant="outlined"
              component="label"
              color="error"
              style={{ fontSize: !isMobile ? 14 : 12 }}
              onClick={(e) => {
                console.log("pressed");
                handleBackgroundImageChange("");
              }}
            >
              Remove Background Image
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default React.memo(Canvas);

function ShapeItemOptions({
  handleShapeAddition,
}: {
  handleShapeAddition: (name: string) => void;
}) {
  return (
    <section className="flex h-auto w-full bg-gray-100 p-5">
      <div className="flex justify-between items-center w-full">
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
