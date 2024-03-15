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
  width: number;
  height: number;
  id: number;
};

type StarItem = {
  width: number;
  height: number;
  id: number;
};

type ArrowItem = {
  width: number;
  height: number;
  id: number;
};
