import React, { useEffect, useRef, useState } from "react";
import { Group, Path, Transformer } from "react-konva";
import { IconType } from "react-icons";

function IconComponent({
  iconName,
  color,
  Theight,
  Twidth,
  isSelected,
  onSelect,
  stroke,
}: {
  iconName: string;
  color: string;
  Twidth: number;
  Theight: number;
  isSelected: boolean;
  onSelect: () => void;
  stroke: string;
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

  const extractPathData = (svg: any) => {
    // Parse the SVG data to extract the path data
    // You can implement your own logic here to extract the path data
    // This example assumes that the path data is stored in the 'd' attribute of the first <path> element
    return svg.props.children[0].props.d;
  };
  console.log(isSelected, "selected");
  return iconPath ? (
    <Group
      scaleX={Twidth / 5036}
      scaleY={Theight / 4300}
      ref={groupRef}
      draggable
    >
      <Path
        data={iconPath}
        fill={color}
        stroke={stroke}
        height={2}
        width={1}
        ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={true} />}
    </Group>
  ) : null;
}

export default IconComponent;
