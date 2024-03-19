import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fcba03",

        },
        secondary: {
            main: "#3e7fcf"
        },
        background: {
            default: '#f0f0f0', // Default background color
            paper: '#ffffff',   // Background color for paper elements (e.g., cards, dialogs)
        },
    },
});
export default theme;