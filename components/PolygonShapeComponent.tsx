import React, { useEffect, useRef, useState } from "react";
import { Group, Line, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

function PolygonComponent({
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
  // const [selectedShapeId, setSelectedShapeId] = useState<number | null>(null);
  const shapeRef = useRef<any>();
  const groupRef = useRef<any>();
  const transformerRef = useRef<any>();

  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef?.current?.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const PolygonDragEnd = (
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

    handleShapeItemChange("Polygon", "x", id, newX.toString());
    handleShapeItemChange("Polygon", "y", id, newY.toString());

    e.currentTarget.position({
      x: newX,
      y: newY,
    });
    e.target?.getLayer()?.batchDraw();
  };
  console.log("selected", height, "w ", typeof width);
  return (
    <Group
      ref={groupRef}
      draggable
      // onClick={() => setisSelected(id)}
      onDragEnd={(e) => PolygonDragEnd(e, id)}
      x={Twidth / 2}
      y={Theight / 2}
      onClick={onSelect}
      onTap={onSelect}
    >
      <Line
        ref={shapeRef}
        points={[0, -50, 47, -16, 29, 40, -29, 40, -47, -16]}
        closed
        fill={fill}
        stroke={stroke} // border color of the Arrow
        strokeWidth={2}
        height={43}
        width={parseInt(width)}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </Group>
  );
}

export default PolygonComponent;
