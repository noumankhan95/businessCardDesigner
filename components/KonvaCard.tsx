"use client";

import React, { useEffect, useRef, useState } from "react";

import Canvas from "./Canvas";
import { Button } from "@mui/material";
const BusinessCard: React.FC<BusinessCardProps> = ({
  width,
  height,
  canvasPadding,
}) => {
  const [showFront, setshowFront] = useState<boolean>(false);
  const [textboxes, setTextboxes] = useState<Map<number, TextBox>>(
    new Map<number, TextBox>()
  );
  const [cardImages, setcardImages] = useState<CardImage[]>([]);
  const [circles, setcircles] = useState<CircleItem[]>([]);
  const [stars, setstars] = useState<StarItem[]>([]);
  const [arrow, setarrow] = useState<ArrowItem[]>([]);
  const [square, setsquare] = useState<SquareItem[]>([]);
  const [triangle, settriangle] = useState<TriangleItem[]>([]);
  const [polygon, setpolygon] = useState<PolygonItem[]>([]);
  const [cardIcons, setcardIcons] = useState<IconItem[]>([]);
  // const [backShowFront, setbackShowFront] = useState<boolean>(false);
  const [backTextboxes, setbackTextboxes] = useState<Map<number, TextBox>>(
    new Map<number, TextBox>()
  );
  const [backCardImages, setbackCardImages] = useState<CardImage[]>([]);
  const [backCircles, setbackCircles] = useState<CircleItem[]>([]);
  const [backStars, setbackStars] = useState<StarItem[]>([]);
  const [backArrow, setbackArrow] = useState<ArrowItem[]>([]);
  const [backSquare, setbackSquare] = useState<SquareItem[]>([]);
  const [backTriangle, setbackTriangle] = useState<TriangleItem[]>([]);
  const [backPolygon, setbackPolygon] = useState<PolygonItem[]>([]);
  const [backCardIcons, setbackCardIcons] = useState<IconItem[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [BackSidebackgroundColor, setBackSideBackgroundColor] =
    useState<string>("#ffffff");
  const [backgroundImage, setbackgroundImage] = useState<any>();
  const [BacksidebackgroundImage, setBacksidebackgroundImage] = useState<any>();

  return (
    <div className="space-y-5 w-full h-screen ">
      {showFront && (
        <Canvas
          canvasPadding={canvasPadding}
          height={height}
          width={width}
          textboxes={textboxes}
          setTextboxes={setTextboxes}
          cardImages={cardImages}
          setcardImages={setcardImages}
          circles={circles}
          setcircles={setcircles}
          stars={stars}
          setstars={setstars}
          arrow={arrow}
          setarrow={setarrow}
          square={square}
          setsquare={setsquare}
          triangle={triangle}
          settriangle={settriangle}
          polygon={polygon}
          setpolygon={setpolygon}
          cardIcons={cardIcons}
          setcardIcons={setcardIcons}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          backgroundImage={backgroundImage}
          setBackgroundImage={setbackgroundImage}
        />
      )}
      {!showFront && (
        <Canvas
          canvasPadding={canvasPadding}
          height={height}
          width={width}
          textboxes={backTextboxes}
          setTextboxes={setbackTextboxes}
          cardImages={backCardImages}
          setcardImages={setbackCardImages}
          circles={backCircles}
          setcircles={setbackCircles}
          stars={backStars}
          setstars={setbackStars}
          arrow={backArrow}
          setarrow={setbackArrow}
          square={backSquare}
          setsquare={setbackSquare}
          triangle={backTriangle}
          settriangle={setbackTriangle}
          polygon={backPolygon}
          setpolygon={setbackPolygon}
          cardIcons={backCardIcons}
          setcardIcons={setbackCardIcons}
          backgroundColor={BackSidebackgroundColor}
          setBackgroundColor={setBackSideBackgroundColor}
          backgroundImage={BacksidebackgroundImage}
          setBackgroundImage={setBacksidebackgroundImage}
        />
      )}
      <div className="flex flex-row justify-start items-center fixed right-6 top-32 ">
        <Button
          onClick={() => {
            setshowFront((p) => !p);
          }}
          variant="contained"
          color="secondary"
        >
          Show {showFront ? "Front" : "Back"}
        </Button>
      </div>
    </div>
  );
};

export default BusinessCard;
