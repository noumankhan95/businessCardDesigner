"use client";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useEffect, useState } from "react";
import { Arrow, Transformer } from "react-konva";
function ArrowComponent({
  height,
  width,
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
  const [selectedShapeId, setselectedShapeId] = useState<any>();
  const shapeRef = React.useRef<any>();
  const [transformerRef, setTransformerRef] = useState<any>(null);
  useEffect(() => {
    if (selectedShapeId && transformerRef) {
      // we need to attach transformer manually
      console.log("transform ref in useEffect", transformerRef);

      transformerRef?.nodes([shapeRef.current]);
      transformerRef?.getLayer()?.batchDraw();
    }
  }, [selectedShapeId, transformerRef]);

  const ArrowDragEnd = (e: KonvaEventObject<DragEvent>, id: number) => {
    if (e.target.x() >= Twidth - canvasPadding) {
      console.log("true");
      handleShapeItemChange("Arrow", "x", id, (Twidth / 2).toString());
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleShapeItemChange("Arrow", "x", id, (Twidth / 2).toString());

      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleShapeItemChange("Arrow", "y", id, (Theight / 2).toString());

      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleShapeItemChange("Arrow", "y", id, (Theight / 2).toString());

      e.target?.getLayer()?.batchDraw();
    }
  };

  return (
    <>
      <Arrow
        points={[0, 0, 100, 0]}
        ref={shapeRef}
        x={width / 2} // x-coordinate of the Arrow center
        y={height / 2} // y-coordinate of the Arrow center
        radius={50} // radius of the Arrow
        fill="black" // fill color of the Arrow
        stroke="black" // border color of the Arrow
        strokeWidth={2} // border width of the Arrow
        onClick={() => setselectedShapeId(id)}
        onDragEnd={(e) => ArrowDragEnd(e, id)}
        draggable
        onTransformEnd={(e) => {
          console.log("transform end");
          //   const node = e.currentTarget;
          //   const scaleX = node.scaleX();
          //   const scaleY = node.scaleY();

          //   // update width and height
          //   node.width(node.width() * scaleX);
          //   node.height(node.height() * scaleY);
          //   node.scaleX(1);
          //   node.scaleY(1);

          //   // update rotation
          //   const rotation = node.rotation();
          //   setcardImages((prevImages: any) =>
          //     prevImages.map((img: any) =>
          //       img.id === id ? { ...img, rotation: rotation } : img
          //     )
          //   );
        }}
      />
      {selectedShapeId === id && (
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

export default ArrowComponent;
