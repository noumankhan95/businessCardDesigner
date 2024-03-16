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
    value: string
  ) => void;
  isSelected: boolean;
  fill: string;
  onSelect: () => void;
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

  const TriangleDragEnd = (
    e: KonvaEventObject<DragEvent>,
    id: number | null
  ) => {
    if (!id) return;

    const newX = Math.max(
      canvasPadding,
      Math.min(Twidth - canvasPadding, e.target.x())
    );
    const newY = Math.max(
      canvasPadding,
      Math.min(Theight - canvasPadding, e.target.y())
    );

    handleShapeItemChange("Triangle", "x", id, newX.toString());
    handleShapeItemChange("Triangle", "y", id, newY.toString());

    e.currentTarget.position({
      x: newX,
      y: newY,
    });
    e.target?.getLayer()?.batchDraw();
  };

  return (
    <Group
      ref={groupRef}
      draggable
      onDragEnd={(e) => TriangleDragEnd(e, id)}
      height={parseInt(height)}
      width={parseInt(width)}
      x={Twidth / 2}
      y={Theight / 2}
      onClick={onSelect}
      onTap={onSelect}
    >
      <Line
        ref={shapeRef}
        points={[0, -50, 50, 50, -50, 50]} // Points defining the triangle
        closed // Indicates that the shape is closed
        fill={fill}
        stroke={stroke} // border color of the Arrow
        strokeWidth={2}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </Group>
  );
}

export default TriangleComponent;