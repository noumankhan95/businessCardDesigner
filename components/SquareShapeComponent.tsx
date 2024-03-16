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
    value: string
  ) => void;
  onSelect: () => void;
  fill: string;
  stroke: string;
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

    const newX = Math.max(
      canvasPadding,
      Math.min(Twidth - canvasPadding, e.target.x())
    );
    const newY = Math.max(
      canvasPadding,
      Math.min(Theight - canvasPadding, e.target.y())
    );

    handleShapeItemChange("Square", "x", id, newX.toString());
    handleShapeItemChange("Square", "y", id, newY.toString());

    e.currentTarget.position({
      x: newX,
      y: newY,
    });
    e.target?.getLayer()?.batchDraw();
  };
  console.log("square", height, " ", typeof width);
  return (
    <Group
      ref={groupRef}
      draggable
      onDragEnd={(e) => SquareDragEnd(e, id)}
      height={parseInt(height)}
      width={parseInt(width)}
      x={Twidth / 2}
      y={Theight / 2}
      onClick={onSelect}
      onTap={onSelect}
    >
      <Rect
        ref={shapeRef}
        width={100} // Width of the square
        height={100} // Height of the square
        fill={fill}
        stroke={stroke} // border color of the Arrow

        strokeWidth={2}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </Group>
  );
}

export default SquareComponent;
