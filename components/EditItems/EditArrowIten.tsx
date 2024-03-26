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
function EditArrowItem({
  handleShapeItemChange,
  selectShape,
  selectedId,
  setbringToTop,
  setarrow,
  arrow,
  setshapeIdSelected,
}: {
  arrow: Map<number, CircleItem>;
  setarrow: Dispatch<SetStateAction<any>>;
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
      className={`flex flex-row justify-around items-end space-x-2 absolute top-6 bg-white w-full rounded-lg border-2 right-0 left-0 border-slate-50 p-4 mx-auto
      
  `}
    >
      <div>
        <h1>Change Color</h1>
        <TextField
          type="color"
          className="w-24"
          placeholder="Change Color"
          defaultValue={arrow.get(selectedId.arrow)?.fill}
          onChange={(e) => {
            handleShapeItemChange(
              "arrow",
              "fill",
              arrow.get(selectedId.arrow)?.id!,
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
          defaultValue={arrow.get(selectedId.arrow)?.stroke}
          onChange={(e) => {
            handleShapeItemChange(
              "arrow",
              "stroke",
              arrow.get(selectedId.arrow)?.id!,
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
            arrow: {
              count: p.arrow.count + 1,
              id: selectedId.arrow,
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
            setarrow((p: any) => {
              const newArrow = new Map(p);
              newArrow.delete(selectedId.arrow);
              return newArrow;
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

export default React.memo(EditArrowItem);
