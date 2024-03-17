import React, { useEffect, useRef, useState } from "react";
import { Group, Rect, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

function SquareComponent({
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
}: {
  isSelected: boolean;
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
  onSelect: () => void;
  fill: string;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
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

  const SquareDragEnd = (e: KonvaEventObject<DragEvent>, id: number | null) => {
    if (!id) return;

    if (!id) return;

    if (e.target.x() >= Twidth - canvasPadding) {
      console.log("true");
      handleShapeItemChange("square", "x", id, Twidth / 2);
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleShapeItemChange("square", "x", id, Twidth / 2);

      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleShapeItemChange("square", "y", id, Theight / 2);

      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleShapeItemChange("square", "y", id, Theight / 2);

      e.target?.getLayer()?.batchDraw();
    } else {
      handleShapeItemChange("square", "x", id, e.currentTarget.x());
      handleShapeItemChange("square", "y", id, e.currentTarget.y());
    }
  };
  console.log("square", height, " ", typeof width);
  return (
    <Group>
      <Rect
        draggable
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        fill={fill}
        stroke={stroke} // border color of the Arrow
        strokeWidth={2}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        onDragEnd={(e) => SquareDragEnd(e, id)}
        height={parseInt(height)}
        width={parseInt(width)}
        onTransformEnd={(e) => {
          console.log("transform end");
          const node = e.currentTarget;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          const rotation = node.rotation();
          handleShapeItemChange("square", "rotation", id, rotation);
          handleShapeItemChange("square", "scaleX", id, scaleX);
          handleShapeItemChange("square", "scaleY", id, scaleY);
        }}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </Group>
  );
}

export default SquareComponent;
