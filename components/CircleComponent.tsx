"use client";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useEffect, useState } from "react";
import { Circle, Transformer } from "react-konva";
function CircleComponent({
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
  x,
  y,
  scaleX,
  scaleY,
  rotation,
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
  const shapeRef = React.useRef<any>();
  const [transformerRef, setTransformerRef] = useState<any>(null);
  useEffect(() => {
    if (isSelected && transformerRef) {
      // we need to attach transformer manually
      console.log("transform ref in useEffect", transformerRef);

      transformerRef?.nodes([shapeRef.current]);
      transformerRef?.getLayer()?.batchDraw();
    }
  }, [isSelected, transformerRef]);

  const CircleDragEnd = (e: KonvaEventObject<DragEvent>, id: number) => {
    if (e.target.x() >= Twidth - canvasPadding) {
      console.log("true");
      handleShapeItemChange("circle", "x", id, (Twidth / 2).toString());
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleShapeItemChange("circle", "x", id, (Twidth / 2).toString());

      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleShapeItemChange("circle", "y", id, (Theight / 2).toString());

      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleShapeItemChange("circle", "y", id, (Theight / 2).toString());

      e.target?.getLayer()?.batchDraw();
    } else {
      console.log("Call now");
      handleShapeItemChange("circle", "x", id, e.currentTarget.x());
      handleShapeItemChange("circle", "y", id, e.currentTarget.y());
    }
  };

  return (
    <>
      <Circle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        height={parseInt(height)}
        width={parseInt(width)}
        x={x}
        y={y}
        rotation={rotation}
        scaleY={scaleY}
        scaleX={scaleX}
        radius={50} // radius of the circle
        fill={fill} // fill color of the circle
        stroke={stroke} // border color of the Arrow
        strokeWidth={2} // border width of the circle
        onDragEnd={(e) => CircleDragEnd(e, id)}
        draggable
        onTransformEnd={(e) => {
          console.log("transform end");
          const node = e.currentTarget;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // update width and height
          // node.width(node.width() * scaleX);
          // node.height(node.height() * scaleY);
          node.scaleX(1);
          node.scaleY(1);

          // update rotation
          const rotation = node.rotation();
          handleShapeItemChange("circle", "rotation", id, rotation);
          handleShapeItemChange("circle", "scaleX", id, scaleX);
          handleShapeItemChange("circle", "scaleY", id, scaleY);
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

export default CircleComponent;
