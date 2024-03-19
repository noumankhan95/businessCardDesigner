import React, { useEffect, useRef, useState } from "react";
import { Group, Line, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

function TriangleComponent({
  width,
  height,
  Theight,
  Twidth,
  canvasPadding,
  id,
  handleShapeItemChange,
  isSelected,
  onSelect,
  fill,
  stroke,
  rotation,
  scaleX,
  scaleY,
  x,
  y,
  ToplayerCount,
  bringToTop,
}: {
  width: string;
  height: string;
  canvasPadding: number;
  Theight: number;
  Twidth: number;
  id: number;
  handleShapeItemChange: (
    name: string,
    attr: string,
    id: number,
    value: string | number
  ) => void;
  isSelected: boolean;
  fill: string;
  onSelect: () => void;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  bringToTop: boolean;
  ToplayerCount: number;
}) {
  const shapeRef = useRef<any>();
  const groupRef = useRef<any>();
  const transformerRef = useRef<any>();

  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const TriangleDragEnd = (
    e: KonvaEventObject<DragEvent>,
    id: number | null
  ) => {
    if (!id) return;

    if (e.target.x() >= Twidth - canvasPadding) {
      console.log("true");
      handleShapeItemChange("triangle", "x", id, Twidth / 2);
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleShapeItemChange("triangle", "x", id, Twidth / 2);

      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleShapeItemChange("triangle", "y", id, Theight / 2);

      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleShapeItemChange("triangle", "y", id, Theight / 2);

      e.target?.getLayer()?.batchDraw();
    } else {
      handleShapeItemChange("triangle", "x", id, e.currentTarget.x());
      handleShapeItemChange("triangle", "y", id, e.currentTarget.y());
    }
  };
  useEffect(() => {
    if (bringToTop) {
      console.log("top triangle", shapeRef.current.moveUp());
      shapeRef.current.moveUp();
    }
  }, [bringToTop, ToplayerCount]);
  return (
    <>
      <Line
        ref={shapeRef}
        points={[0, -50, 50, 50, -50, 50]} // Points defining the triangle
        closed // Indicates that the shape is closed
        fill={fill}
        stroke={stroke} // border color of the triangle
        strokeWidth={2}
        draggable
        onDragEnd={(e) => TriangleDragEnd(e, id)}
        height={parseInt(height)}
        width={parseInt(width)}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={(e) => {
          console.log("transform end");
          const node = e.currentTarget;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // update width and height
          // node.width(node.width() * scaleX);
          // node.height(node.height() * scaleY);

          // update rotation
          const rotation = node.rotation();
          handleShapeItemChange("triangle", "rotation", id, rotation);
          handleShapeItemChange("triangle", "scaleX", id, scaleX);
          handleShapeItemChange("triangle", "scaleY", id, scaleY);
        }}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </>
  );
}

export default TriangleComponent;
