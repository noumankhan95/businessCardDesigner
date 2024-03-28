interface TextBox {
  id: number;
  text: string;
  textAlign: "left" | "center" | "right";
  fontSize: number;
  fill: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  fontFamily: string;
  fontStyle: string;
}

interface CardImage {
  width: number;
  height: number;
  source: CanvasImageSource;
  id: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
}
interface BusinessCardProps {
  width: number;
  height: number;
  canvasPadding: number;
}

interface canvasProps extends BusinessCardProps {
  textboxes: Map<number, Textbox>;
  setTextboxes: Dispatch<SetStateAction<TextBox>>;
  cardImages: Map<number, CardImage>;
  setcardImages: Dispatch<SetStateAction<CardImage>>;
  circles: Map<number, CircleItem>;
  setcircles: Dispatch<SetStateAction<CircleItem>>;
  stars: Map<number, StarItem>;
  setstars: Dispatch<SetStateAction<StarItem>>;
  arrow: Map<number, ArrowItem>;
  setarrow: Dispatch<SetStateAction<ArrowItem>>;
  square: Map<number, SquareItem>;
  setsquare: Dispatch<SetStateAction<SquareItem>>;
  triangle: Map<number, TriangleItem>;
  settriangle: Dispatch<SetStateAction<TriangleItem>>;
  polygon: Map<number, PolygonItem>;
  setpolygon: Dispatch<SetStateAction<PolygonItem>>;
  cardIcons: Map<number, IconItem>;
  setcardIcons: Dispatch<SetStateAction<IconItem>>;
  canvasPadding: number;
  backgroundColor: string;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
  backgroundImage: any;
  setBackgroundImage: Dispatch<SetStateAction<any>>;
}
type CircleItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
};

type StarItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
};

type ArrowItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
};

type SquareItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
};
type TriangleItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
};

type PolygonItem = {
  width: string;
  height: string;
  id: number;
  fill: string;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
};

type IconItem = {
  name: string;
  color: string;
  id: number;
  stroke: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
};
