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
  isSelected,
  onSelect,
  x,
  y,
  scaleX,
  scaleY,
  rotation,
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
  isSelected: boolean;
  x: number;
  y: number;
  onSelect: () => void;
  scaleX: number;
  scaleY: number;
  rotation: number;
}) {
  //   const TransformRef = useRef<any>();
  const shapeRef = React.useRef<any>();
  const [transformerRef, setTransformerRef] = useState<any>(null);

  const ImageDragEnd = (e: KonvaEventObject<DragEvent>, id: number) => {
    if (e.target.x() >= Twidth - canvasPadding) {
      console.log("true");
      handleCardChange(id, "x", Twidth / 2);
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleCardChange(id, "x", Twidth / 2);
      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleCardChange(id, "y", Theight / 2);
      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleCardChange(id, "y", Theight / 2);

      e.target?.getLayer()?.batchDraw();
    } else {
      handleCardChange(id, "x", e.target.x());
      handleCardChange(id, "y", e.target.y());
    }
  };
  useEffect(() => {
    if (isSelected && transformerRef) {
      // we need to attach transformer manually
      console.log("transform ref in useEffect", transformerRef);

      transformerRef?.nodes([shapeRef.current]);
      transformerRef?.getLayer()?.batchDraw();
    }
  }, [isSelected, transformerRef]);
  console.log("transform ref", transformerRef);
  console.log("shape ref", shapeRef);
  console.log("seklelcted image id", isSelected);

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        width={width}
        height={height}
        image={source}
        key={id}
        ref={shapeRef}
        rotation={rotation}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        draggable
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
          // node.width(node.width() * scaleX);
          // node.height(node.height() * scaleY);
          // node.scaleX(1);
          // node.scaleY(1);
          const rotation = node.rotation();

          // update rotation
          handleCardChange(id, "scaleX", scaleX);
          handleCardChange(id, "scaleY", scaleY);
          handleCardChange(id, "rotation", rotation);

          // setcardImages((prevImages: any) =>
          //   prevImages.map((img: any) =>
          //     img.id === id ? { ...img, rotation: rotation } : img
          //   )
          // );
        }}
      />
      {isSelected && (
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
