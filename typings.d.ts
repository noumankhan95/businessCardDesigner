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

interface canvasProps extends BusinessCardProps {
  textboxes: TextBox[];
  setTextboxes: Dispatch<SetStateAction<TextBox[]>>;
  cardImages: CardImage[];
  setcardImages: Dispatch<SetStateAction<CardImage[]>>;
  circles: CircleItem[];
  setcircles: Dispatch<SetStateAction<CircleItem[]>>;
  stars: StarItem[];
  setstars: Dispatch<SetStateAction<StarItem[]>>;
  arrow: ArrowItem[];
  setarrow: Dispatch<SetStateAction<ArrowItem[]>>;
  square: SquareItem[];
  setsquare: Dispatch<SetStateAction<SquareItem[]>>;
  triangle: TriangleItem[];
  settriangle: Dispatch<SetStateAction<TriangleItem[]>>;
  polygon: PolygonItem[];
  setpolygon: Dispatch<SetStateAction<PolygonItem[]>>;
  cardIcons: IconItem[];
  setcardIcons: Dispatch<SetStateAction<IconItem[]>>;
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
