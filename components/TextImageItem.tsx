import React, { useEffect, useState } from "react";
import { Text, Transformer } from "react-konva";
import fontFamilies from "@/app/fonts";
function TextImageItem({
  textbox,
  canvasPadding,
  handleTextAlignmentChange,
  height,
  width,
  isSelected,
  onSelect,
  handleCardPosition,
  ToplayerCount,
  bringToTop,
  fontFamily,
  isMobile,
}: {
  textbox: any;
  canvasPadding: number;
  width: number;
  height: number;
  handleTextAlignmentChange: any;
  isSelected: boolean;
  handleCardPosition: (
    id: number,
    property: string,
    value: string | number
  ) => void;

  onSelect: () => void;
  bringToTop: boolean;
  ToplayerCount: number;
  fontFamily: string;
  isMobile: boolean;
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
  useEffect(() => {
    if (bringToTop) {
      console.log("top text", shapeRef.current.moveUp());
      shapeRef.current.moveUp();
    }
  }, [bringToTop, ToplayerCount]);
  console.log(fontFamily, "fontfamily");

  return (
    <>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        fontStyle={textbox.fontStyle}
        key={textbox.id}
        fontFamily={fontFamilies[fontFamily].style.fontFamily}
        x={
          textbox.x // Align right
        }
        y={textbox.y}
        scaleX={textbox.scaleX}
        scaleY={textbox.scaleY}
        rotation={textbox.rotation}
        text={textbox.text}
        align={textbox.textAlign}
        fontSize={textbox.fontSize}
        fill={textbox.fill}
        draggable
        ref={shapeRef}
        wrap="word"
        onDragEnd={(e) => {
          console.log(e.target.x(), "X");
          console.log(e.target.y(), "y");
          console.log("width", width - canvasPadding);
          console.log("height", height - canvasPadding);
          if (e.target.x() >= width - canvasPadding) {
            console.log("true");
            handleTextAlignmentChange(textbox.id, "center");
            const newX = width / 2;

            e.currentTarget.x(newX);

            e.target?.getLayer()?.batchDraw();
          } else if (e.target.x() < canvasPadding) {
            console.log("true here");
            const newX = width / 2;
            e.currentTarget.x(newX);
            handleTextAlignmentChange(textbox.id, "center");
            e.target?.getLayer()?.batchDraw();
          }
          if (e.target.y() >= height - canvasPadding) {
            console.log("true");
            // handleTextAlignmentChange(textbox.id, "center");
            const newX = width / 2;
            var newY;

            if (isMobile) {
              newY = height / 8;
              console.log("new Y mobile", newY);
            } else {
              console.log("new Y UnMobile", newY);

              newY = height / 2;
            }

            e.currentTarget.y(newY);
            e.currentTarget.x(newX);

            e.target?.getLayer()?.batchDraw();
          } else if (e.target.y() < canvasPadding) {
            console.log("true here y");
            const newX = width / 2;
            var newY;

            if (isMobile) {
              newY = height / 8;

              console.log("new Y Mobile", newY);
            } else {
              console.log("new Y UnMobile", newY);

              newY = height / 2;
            }
            e.currentTarget.y(newY);
            e.currentTarget.x(newX);

            // handleTextAlignmentChange(textbox.id, "center");
            e.target?.getLayer()?.batchDraw();
          } else {
            handleCardPosition(textbox.id, "x", e.target.x());
            handleCardPosition(textbox.id, "y", e.target.y());
          }
        }}
        onTransformEnd={(e) => {
          console.log("transform");
          const node = e.currentTarget;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // update width and height
          // node.width(node.width() * scaleX);
          // node.height(node.height() * scaleY);
          // node.scaleX(1);
          // node.scaleY(1);
          const rotation = node.rotation();

          // update rotation
          handleCardPosition(textbox.id, "scaleX", scaleX);
          handleCardPosition(textbox.id, "scaleY", scaleY);
          handleCardPosition(textbox.id, "rotation", rotation);

          // setcardImages((prevImages: any) =>
          //   prevImages.map((img: any) =>
          //     img.id === id ? { ...img, rotation: rotation } : img
          //   )
          // );
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

export default React.memo(TextImageItem);
