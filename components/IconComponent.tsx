import React, { useEffect, useRef, useState } from "react";
import { Group, Path, Transformer } from "react-konva";
import { IconType } from "react-icons";
import { KonvaEventObject } from "konva/lib/Node";

function IconComponent({
  iconName,
  color,
  Theight,
  Twidth,
  isSelected,
  onSelect,
  stroke,
  rotation,
  scaleX,
  scaleY,
  x,
  y,
  handleIconChange,
  canvasPadding,
  id,
  ToplayerCount,
  bringToTop,
}: {
  iconName: string;
  color: string;
  Twidth: number;
  Theight: number;
  isSelected: boolean;
  onSelect: () => void;
  stroke: string;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  handleIconChange: (id: number, type: string, value: string | number) => void;
  canvasPadding: number;
  id: number;
  bringToTop: boolean;
  ToplayerCount: number;
}) {
  const [iconPath, setIconPath] = useState<any>(null);
  const shapeRef = useRef<any>();
  const groupRef = useRef<any>();
  const transformerRef = useRef<any>();

  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  useEffect(() => {
    // Dynamically import all icons from react-icons/fa
    import("react-icons/fa")
      .then((module) => {
        // Get all exported icons from the module
        const iconComponents: any = Object.entries(module)
          .filter(([key, value]) => typeof value === "function")
          .map(([key, value]) => [key, value]);

        const selectedIcon = iconComponents.find(
          ([key]: any) => key === iconName
        );

        if (selectedIcon) {
          // If the icon is found, extract its SVG path data
          const svgData = selectedIcon[1]();
          const pathData = extractPathData(svgData);
          setIconPath(pathData);
        } else {
          console.error(`Icon '${iconName}' not found`);
        }
      })
      .catch((error) => {
        console.error("Error importing icon module:", error);
      });
  }, [iconName]);

  const IconDragEnd = (e: KonvaEventObject<DragEvent>, id: number | null) => {
    if (!id) return;

    if (e.target.x() >= Twidth - canvasPadding) {
      handleIconChange(id, "x", Twidth / 2);
      const newX = Twidth / 2;

      e.currentTarget.x(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.x() < canvasPadding) {
      console.log("true here");
      const newX = Twidth / 2;
      e.currentTarget.x(newX);
      handleIconChange(id, "x", Twidth / 2);

      e.target?.getLayer()?.batchDraw();
    }
    if (e.target.y() >= Theight - canvasPadding) {
      console.log("true");
      handleIconChange(id, "y", Theight / 2);

      const newX = Theight / 2;
      e.currentTarget.y(newX);

      e.target?.getLayer()?.batchDraw();
    } else if (e.target.y() < canvasPadding) {
      console.log("true here y");
      const newX = Theight / 2;
      e.currentTarget.y(newX);
      handleIconChange(id, "y", Theight / 2);

      e.target?.getLayer()?.batchDraw();
    } else {
      handleIconChange(id, "x", e.currentTarget.x());
      handleIconChange(id, "y", e.currentTarget.y());
    }
  };
  const extractPathData = (svg: any) => {
    // Parse the SVG data to extract the path data
    // You can implement your own logic here to extract the path data
    // This example assumes that the path data is stored in the 'd' attribute of the first <path> element
    return svg.props.children[0].props.d;
  };
  useEffect(() => {
    if (bringToTop) {
      console.log("top con", shapeRef.current.moveUp());
      shapeRef.current.moveUp();
    }
  }, [bringToTop, ToplayerCount]);
  console.log(isSelected, "selected");
  return iconPath ? (
    <>
      <Path
        draggable
        x={x}
        y={y}
        rotation={rotation}
        scaleX={scaleX}
        scaleY={scaleY}
        data={iconPath}
        fill={color}
        onDragEnd={(e) => IconDragEnd(e, id)}
        stroke={stroke}
        height={2}
        width={1}
        ref={shapeRef}
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
          handleIconChange(id, "rotation", rotation);
          handleIconChange(id, "scaleX", scaleX);
          handleIconChange(id, "scaleY", scaleY);
        }}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </>
  ) : null;
}

export default IconComponent;
