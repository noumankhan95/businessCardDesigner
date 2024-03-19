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
  rotation,
  scaleX,
  scaleY,
  x,
  y,
  bringToTop,
  ToplayerCount,
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
  bringToTop: boolean;
  ToplayerCount: number;
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

    if (e.target.x() >= Twidth - canvasPadding) {
      console.log("true");
      handleShapeItemChange("polygon", "x", id, Twidth / 2);
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleShapeItemChange("polygon", "x", id, Twidth / 2);

      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleShapeItemChange("polygon", "y", id, Theight / 2);

      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleShapeItemChange("polygon", "y", id, Theight / 2);

      e.target?.getLayer()?.batchDraw();
    } else {
      handleShapeItemChange("polygon", "x", id, e.currentTarget.x());
      handleShapeItemChange("polygon", "y", id, e.currentTarget.y());
    }
  };
  useEffect(() => {
    if (bringToTop) {
      console.log("top polygon", shapeRef.current.moveUp());
      shapeRef.current.moveUp();
    }
  }, [bringToTop, ToplayerCount]);
  console.log("selected", height, "w ", typeof width);
  return (
    <>
      <Line
        ref={shapeRef}
        points={[0, -50, 47, -16, 29, 40, -29, 40, -47, -16]}
        closed
        fill={fill}
        stroke={stroke} // border color of the Arrow
        strokeWidth={2}
        height={43}
        width={parseInt(width)}
        draggable
        // onClick={() => setisSelected(id)}
        onDragEnd={(e) => PolygonDragEnd(e, id)}
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
          handleShapeItemChange("polygon", "rotation", id, rotation);
          handleShapeItemChange("polygon", "scaleX", id, scaleX);
          handleShapeItemChange("polygon", "scaleY", id, scaleY);
        }}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </>
  );
}

export default PolygonComponent;
