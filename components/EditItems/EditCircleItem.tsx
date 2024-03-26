import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { BsFonts } from "react-icons/bs";
import { FaAlignJustify } from "react-icons/fa6";
import { IoTrashBinOutline } from "react-icons/io5";
import { MdLayers } from "react-icons/md";
import { RiFontSize2 } from "react-icons/ri";

function EditCircleItem({
  handleShapeItemChange,
  selectShape,
  selectedId,
  setbringToTop,
  setcircles,
  circles,
  setshapeIdSelected,
}: {
  circles: Map<number, CircleItem>;
  setcircles: Dispatch<SetStateAction<any>>;
  selectedId: {
    square: number;
    circle: number;
    triangle: number;
    polygon: number;
    star: number;
    arrow: number;
    textbox: number;
    image: number;
    icon: number;
  };
  setbringToTop: any;
  selectShape: any;
  handleShapeItemChange: any;
  setshapeIdSelected: any;
}) {
  return (
    <div
      className={`flex flex-row justify-around items-end space-x-2  absolute top-6 bg-white w-full rounded-lg border-2 right-0 left-0 border-slate-50 p-4 mx-auto
`}
    >
      <div>
        <h1>Change Color</h1>
        <TextField
          type="color"
          className="w-24"
          placeholder="Change Color"
          defaultValue={circles.get(selectedId.circle)?.fill}
          onChange={(e) => {
            handleShapeItemChange(
              "circle",
              "fill",
              circles.get(selectedId.circle)?.id!,
              e.target.value
            );
          }}
        />
      </div>
      <div>
        <h1>Change Stroke Color</h1>
        <TextField
          type="color"
          className="w-24"
          placeholder="Change Stroke Color"
          defaultValue={circles.get(selectedId.circle)?.stroke}
          onChange={(e) => {
            handleShapeItemChange(
              "circle",
              "stroke",
              circles.get(selectedId.circle)?.id!,
              e.target.value
            );
          }}
        />
      </div>
      <Button
        className="p-4 bg-blue-600 text-white rounded-md"
        onClick={(e) => {
          setbringToTop((p: any) => ({
            ...p,
            circle: {
              count: p.circle.count + 1,
              id: selectedId.circle,
            },
          }));
        }}
        variant="contained"
        color="secondary"
        startIcon={<MdLayers />}
      >
        Bring To Top
      </Button>
      <div>
        <Button
          className="text-red-700 cursor-pointer"
          onClick={(e) => {
            setcircles((p: any) => {
              const newCircles = new Map(p);
              newCircles.delete(selectedId.circle);
              return newCircles;
            });
            setshapeIdSelected(false);
          }}
          variant="outlined"
          color="error"
          startIcon={<IoTrashBinOutline />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default React.memo(EditCircleItem);
