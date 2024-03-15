"use client";

import { KonvaEventObject } from "konva/lib/Node";
import React, { useState, useRef, useEffect } from "react";
import { Transformer, Image } from "react-konva";

function CardImageItem({
  canvasPadding,
  handleCardChange,
  height,
  width,
  Theight,
  Twidth,
  id,
  source,
  setcardImages,
}: {
  height: number;
  width: number;
  handleCardChange: (...any: any) => void;
  canvasPadding: number;
  Theight: number;
  Twidth: number;
  id: number;
  source: any;
  setcardImages: any;
}) {
  const [selectedImageId, setselectedImageId] = useState<any>();
  //   const TransformRef = useRef<any>();
  const shapeRef = React.useRef<any>();
  const [transformerRef, setTransformerRef] = useState<any>(null);

  const ImageDragEnd = (e: KonvaEventObject<DragEvent>, id: number) => {
    if (e.target.x() >= Twidth - canvasPadding) {
      console.log("true");
      handleCardChange(id, "x", (Twidth / 2).toString());
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleCardChange(id, "x", (Twidth / 2).toString());
      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleCardChange(id, "y", (Theight / 2).toString());
      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleCardChange(id, "y", (Theight / 2).toString());

      e.target?.getLayer()?.batchDraw();
    }
  };
  useEffect(() => {
    if (selectedImageId && transformerRef) {
      // we need to attach transformer manually
      console.log("transform ref in useEffect", transformerRef);

      transformerRef?.nodes([shapeRef.current]);
      transformerRef?.getLayer()?.batchDraw();
    }
  }, [selectedImageId, transformerRef]);
  console.log("transform ref", transformerRef);
  console.log("shape ref", shapeRef);
  console.log("seklelcted image id", selectedImageId);

  return (
    <>
      <Image
        width={width}
        height={height}
        image={source}
        key={id}
        ref={shapeRef}
        draggable
        onClick={(e) => {
          setselectedImageId(id);
        }}
        onDragEnd={(e) => ImageDragEnd(e, id)}
        onTransform={(e) => {
          console.log("start");
        }}
        onTransformEnd={(e) => {
          console.log("transform");
          const node = e.currentTarget;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // update width and height
          node.width(node.width() * scaleX);
          node.height(node.height() * scaleY);
          node.scaleX(1);
          node.scaleY(1);

          // update rotation
          const rotation = node.rotation();
          setcardImages((prevImages: any) =>
            prevImages.map((img: any) =>
              img.id === id ? { ...img, rotation: rotation } : img
            )
          );
        }}
      />
      {selectedImageId === id && (
        <Transformer
          ref={(node) => {
            console.log(node);
            setTransformerRef(node);
          }}
        />
      )}
    </>
  );
}
export default CardImageItem;
