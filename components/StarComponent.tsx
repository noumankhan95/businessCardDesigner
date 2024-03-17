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

  const StarDragEnd = (e: KonvaEventObject<DragEvent>, id: number | null) => {
    if (!id) return;

    if (e.target.x() >= Twidth - canvasPadding) {
      console.log("true");
      handleShapeItemChange("star", "x", id, Twidth / 2);
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleShapeItemChange("star", "x", id, Twidth / 2);

      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleShapeItemChange("star", "y", id, Theight / 2);

      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleShapeItemChange("star", "y", id, Theight / 2);

      e.target?.getLayer()?.batchDraw();
    } else {
      handleShapeItemChange("star", "x", id, e.currentTarget.x());
      handleShapeItemChange("star", "y", id, e.currentTarget.y());
    }
  };

  return (
    <Group ref={groupRef}>
      <Star
        draggable
        onDragEnd={(e) => StarDragEnd(e, id)}
        height={parseInt(height)}
        width={parseInt(height)}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        rotation={rotation}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill={fill}
        stroke={stroke} // border color of the Arrow
        strokeWidth={2}
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
          handleShapeItemChange("star", "rotation", id, rotation);
          handleShapeItemChange("star", "scaleX", id, scaleX);
          handleShapeItemChange("star", "scaleY", id, scaleY);
        }}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </Group>
  );
}

export default StarComponent;
