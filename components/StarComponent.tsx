import React, { useEffect, useRef, useState } from "react";
import { Group, Star, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

function StarComponent({
  width,
  height,
  Theight,
  Twidth,
  canvasPadding,
  id,
  handleShapeItemChange,
}: {
  width: number;
  height: number;
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
}) {
  const [selectedShapeId, setSelectedShapeId] = useState<number | null>(null);
  const shapeRef = useRef<any>();
  const groupRef = useRef<any>();
  const transformerRef = useRef<any>();

  useEffect(() => {
    if (selectedShapeId !== null && transformerRef.current !== null) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedShapeId]);

  const StarDragEnd = (e: KonvaEventObject<DragEvent>, id: number | null) => {
    if (!id) return;

    const newX = Math.max(
      canvasPadding,
      Math.min(Twidth - canvasPadding, e.target.x())
    );
    const newY = Math.max(
      canvasPadding,
      Math.min(Theight - canvasPadding, e.target.y())
    );

    handleShapeItemChange("Star", "x", id, newX.toString());
    handleShapeItemChange("Star", "y", id, newY.toString());

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
      onClick={() => setSelectedShapeId(id)}
      onDragEnd={(e) => StarDragEnd(e, id)}
      x={width / 2}
      y={height / 2}
    >
      <Star
        ref={shapeRef}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill="yellow"
        stroke="black"
        strokeWidth={2}
      />
      {selectedShapeId === id && (
        <Transformer ref={transformerRef} rotateEnabled={true} />
      )}
    </Group>
  );
}

export default StarComponent;
