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

function EditText({
  textboxes,
  setTextboxes,
  selectedId,
  width,
  canvasPadding,
  selectShape,
  setbringToTop,
}: {
  textboxes: Map<number, TextBox>;
  width: number;
  canvasPadding: number;
  setTextboxes: Dispatch<SetStateAction<any>>;
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
  function handleFontChange(id: number, value: number) {
    setTextboxes((prevState: any) => {
      const newState = new Map<number, TextBox>(prevState);
      const updatedTextBox: TextBox = newState.get(id)!;
      if (updatedTextBox) {
        // Update the fontFamily property of the TextBox with the specified ID
        updatedTextBox.fontSize = value;
        newState.set(id, updatedTextBox);
      }
      return newState;
    });
  }
  function handleFontFamily(id: number, value: string) {
    setTextboxes((prevState: any) => {
      const newState = new Map<number, TextBox>(prevState);
      const updatedTextBox: TextBox = newState.get(id)!;
      if (updatedTextBox) {
        // Update the fontFamily property of the TextBox with the specified ID
        updatedTextBox.fontFamily = value;
        newState.set(id, updatedTextBox);
      }
      return newState;
    });
  }
  function handleColorChange(id: number, value: string) {
    setTextboxes((prevState: any) => {
      const newState = new Map<number, TextBox>(prevState);
      const updatedTextBox: TextBox = newState.get(id)!;
      if (updatedTextBox) {
        // Update the fontFamily property of the TextBox with the specified ID
        updatedTextBox.fill = value;
        newState.set(id, updatedTextBox);
      }
      return newState;
    });
  }
  const handleTextChange = useCallback((id: number, newText: string) => {
    setTextboxes((prevState: any) => {
      const newState = new Map<number, TextBox>(prevState);
      const updatedTextBox: TextBox = newState.get(id)!;
      if (updatedTextBox) {
        // Update the fontFamily property of the TextBox with the specified ID
        updatedTextBox.text = newText;
        newState.set(id, updatedTextBox);
      }
      return newState;
    });
  }, []);

  const handleTextAlignmentChange = useCallback(
    (id: number, alignment: "left" | "center" | "right") => {
      console.log("alignment", alignment);
      let x =
        alignment === "left"
          ? canvasPadding
          : alignment === "center"
          ? width / 2
          : width - canvasPadding * 10;
      setTextboxes((prevState: any) => {
        const newState = new Map<number, TextBox>(prevState);
        const updatedTextBox: TextBox = newState.get(id)!;
        if (updatedTextBox) {
          // Update the fontFamily property of the TextBox with the specified ID
          updatedTextBox.textAlign = alignment;
          updatedTextBox.x = x;
          newState.set(id, updatedTextBox);
        }
        return newState;
      });
    },
    []
  );
  return (
    <Box
      className={`flex flex-wrap flex-row justify-start lg:justify-around items-end space-x-2
        absolute bottom-0 z-10 gap-2 lg:gap-1 lg:top-6 bg-white w-full rounded-lg border-2 right-0 left-0 border-slate-50 p-4 mx-auto
    `}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems="center"
        className="space-x-3"
      >
        <FaAlignJustify />
        <p>Font Family</p>
        <Select
          placeholder="Font Family"
          label="Change FontFamily"
          value={textboxes.get(selectedId.textbox)?.fontFamily}
          onChange={(e) => handleFontFamily(selectedId.textbox, e.target.value)}
        >
          <MenuItem value="playfair_display">Playfair Display</MenuItem>
          <MenuItem value="sunflower">Sunflower</MenuItem>
        </Select>
      </Box>
      <Box className="space-x-2">
        <TextField
          type="text"
          value={textboxes.get(selectedId.textbox)?.text}
          onChange={(e) => handleTextChange(selectedId.textbox, e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsFonts />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems="center"
        className="space-x-3"
      >
        <FaAlignJustify />
        <Select
          placeholder="Set Alignment"
          label="Align"
          value={textboxes.get(selectedId.textbox)?.textAlign}
          onChange={(e) =>
            handleTextAlignmentChange(
              selectedId.textbox,
              e.target.value as "left" | "center" | "right"
            )
          }
        >
          <MenuItem value="left">Left</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="right">Right</MenuItem>
        </Select>
      </Box>
      <Box>
        <h1>Change Font Size</h1>
        <TextField
          type="number"
          placeholder="Change Text Size"
          defaultValue={textboxes.get(selectedId.textbox)?.fontSize}
          onChange={(e) => {
            handleFontChange(selectedId.textbox, parseInt(e.target.value));
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiFontSize2 />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box>
        <h1>Change Font Color</h1>
        <TextField
          type="color"
          className="w-24"
          placeholder="Change Text Color"
          defaultValue={textboxes.get(selectedId.textbox)?.fill}
          onChange={(e) => {
            handleColorChange(selectedId.textbox, e.target.value);
          }}
        />
      </Box>
      <Button
        className="p-4 bg-blue-600 text-white  rounded-md"
        onClick={(e) => {
          setbringToTop((p: any) => ({
            ...p,
            textbox: {
              count: p.textbox.count + 1,
              id: selectedId.textbox,
            },
          }));
        }}
        variant="contained"
        color="secondary"
        startIcon={<MdLayers />}
      >
        Bring To Top
      </Button>
      <Box>
        <Button
          className="text-red-700 cursor-pointer"
          onClick={(e) => {
            setTextboxes((p: any) => {
              const newTextBoxes = new Map(p);
              newTextBoxes.delete(selectedId.textbox);
              return newTextBoxes;
            });
            selectShape((p: any) => ({ ...p, textbox: 0 }));
          }}
          variant="outlined"
          startIcon={<IoTrashBinOutline />}
          color="error"
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(EditText);
