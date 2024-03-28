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

function EditIcon({
  handleIconChange,
  selectShape,
  selectedId,
  setbringToTop,
  setcardIcons,
  cardIcons,
  setshapeIdSelected,
}: {
  cardIcons: Map<number, IconItem>;
  setcardIcons: Dispatch<SetStateAction<any>>;
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
  handleIconChange: any;
  setshapeIdSelected: any;
}) {
  return (
    <div
      className={`flex flex-col items-start lg:flex-row justify-start flex-wrap lg:justify-around lg:items-end space-x-2  !fixed h-auto lg:h-32 gap-2 bottom-0 z-50 lg:top-6 bg-white w-full rounded-lg border-2 right-0 left-0 border-slate-50 p-4 mx-auto
    `}
    >
      <div>
        <h1>Change Color</h1>
        <TextField
          type="color"
          className="w-24"
          placeholder="Change Color Size"
          defaultValue={cardIcons.get(selectedId.icon)?.color}
          onChange={(e) => {
            handleIconChange(
              cardIcons.get(selectedId.icon)?.id!,
              "color",
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

            icon: {
              count: p.icon.count + 1,
              id: selectedId.icon,
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
        <h1>Change Stroke Color</h1>
        <TextField
          type="color"
          className="w-24"
          placeholder="Change Stroke"
          defaultValue={cardIcons.get(selectedId.icon)?.color}
          onChange={(e) => {
            handleIconChange(
              cardIcons.get(selectedId.icon)?.id!,
              "stroke",
              e.target.value
            );
          }}
        />
      </div>
      <div>
        <Button
          className="text-red-700 cursor-pointer"
          onClick={(e) => {
            setcardIcons((p: any) => {
              const newCardIcons = new Map(p);
              newCardIcons.delete(selectedId.icon);
              return newCardIcons;
            });
            selectShape((p: any) => ({ ...p, icon: 0 }));
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

export default React.memo(EditIcon);
