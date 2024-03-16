"use client";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useEffect, useState } from "react";
import { Arrow, Transformer } from "react-konva";
function ArrowComponent({
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
        onClick={onSelect}
        onTap={onSelect}
        points={[0, 0, 100, 0]}
        ref={shapeRef}
        height={parseInt(height)}
        width={parseInt(width)}
        x={Twidth / 2}
        y={Theight / 2}
        radius={50} // radius of the Arrow
        fill={fill} // fill color of the Arrow
        stroke={stroke} // border color of the Arrow
        strokeWidth={2} // border width of the Arrow
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

export default ArrowComponent;
