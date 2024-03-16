interface TextBox {
  id: number;
  text: string;
  textAlign: "left" | "center" | "right";
  fontSize: number;
  fill: string;
}

interface CardImage {
  width: number;
  height: number;
  source: CanvasImageSource;
  id: number;
  x?: number;
  y?: number;
  rotation?: number;
}
interface BusinessCardProps {
  width: number;
  height: number;
  canvasPadding: number;
}

type CircleItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
};

type StarItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
};

type ArrowItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
};

type SquareItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
};
type TriangleItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
};

type PolygonItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
};

type IconItem = {
  name: string;
  color: string;
  id: number;
  stroke: string;
};
