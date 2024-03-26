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
function EditImage({
  cardImages,
  selectShape,
  selectedId,
  setbringToTop,
  setcardImages,
}: {
  cardImages: Map<number, CardImage>;
  setcardImages: Dispatch<SetStateAction<any>>;
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
}) {
  const handleCardChange = useCallback(
    (id: number, type: string, value: string | number) => {
      setcardImages((p: any) => {
        const newImages = new Map(p);
        const starToUpdate = newImages.get(id);
        if (starToUpdate) {
          // Update the specified attribute of the star
          (starToUpdate as any)[type] = value;
          newImages.set(id, starToUpdate); // Update the star in the map
        }
        return newImages;
      });
    },

    []
  );
  return (
    <div
      className={`flex flex-row justify-around items-end space-x-2
  absolute top-6 bg-white w-full rounded-lg border-2 right-0 left-0 border-slate-50 p-4 mx-auto
`}
    >
      <div>
        <h1>Change Width </h1>
        <TextField
          type="number"
          placeholder="Change Text Size"
          defaultValue={cardImages.get(selectedId.image)?.width}
          onChange={(e) => {
            handleCardChange(selectedId.image, "width", e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiFontSize2 />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <h1>Change Height</h1>
        <TextField
          type="number"
          placeholder="Change Text Size"
          defaultValue={cardImages.get(selectedId.image)?.height}
          onChange={(e) => {
            handleCardChange(selectedId.image, "height", e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiFontSize2 />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        className="p-4 bg-blue-600 text-white rounded-md"
        onClick={(e) => {
          setbringToTop((p: any) => ({
            ...p,
            image: { id: selectedId.image, count: p.image.count + 1 },
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
            setcardImages((p: any) => {
              const newImages = new Map(p);
              newImages.delete(selectedId.image);
              return newImages;
            });
            selectShape((p: any) => ({ ...p, image: 0 }));
          }}
          startIcon={<IoTrashBinOutline />}
          color="error"
          variant="outlined"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default React.memo(EditImage);
