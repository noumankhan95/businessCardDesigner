import React, { useEffect, useState } from "react";
import { Text, Transformer } from "react-konva";
function TextImageItem({
  textbox,
  canvasPadding,
  handleTextAlignmentChange,
  height,
  width,
  isSelected,
  onSelect,
}: {
  textbox: any;
  canvasPadding: number;
  width: number;
  height: number;
  handleTextAlignmentChange: any;
  isSelected: boolean;

  onSelect: () => void;
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
  return (
    <>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        key={textbox.id}
        x={
          textbox.textAlign === "left"
            ? canvasPadding // Align left
            : textbox.textAlign === "center"
            ? width / 2 // Align center
            : width - canvasPadding * 4 // Align right
        }
        y={canvasPadding}
        text={textbox.text}
        align={textbox.textAlign}
        fontSize={textbox.fontSize}
        fill={textbox.fill}
        draggable
        ref={shapeRef}
        wrap="word"
        onTransformEnd={(e) => {
          console.log("transform end", e);
        }}
        onDragEnd={(e) => {
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
            handleTextAlignmentChange(textbox.id, "center");
            const newX = height / 2;
            e.currentTarget.y(newX);

            e.target?.getLayer()?.batchDraw();
          } else if (e.target.y() < canvasPadding) {
            console.log("true here y");
            const newX = height / 2;
            e.currentTarget.y(newX);
            handleTextAlignmentChange(textbox.id, "center");
            e.target?.getLayer()?.batchDraw();
          }
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

export default TextImageItem;
