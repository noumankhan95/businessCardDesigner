import { NextFont } from "next/dist/compiled/@next/font";
import { Sunflower, Playfair_Display } from "next/font/google";
const sunflower_init = Sunflower({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  // variable: "--font-sunflower",
});
const playfair_Display_init = Playfair_Display({
  subsets: ["latin"],
  // variable: "--font-playfair_display",
  weight: ["400", "700"],
});

const FontFamilies: { [key: string]: NextFont } = {
  sunflower: sunflower_init,
  playfair_display: playfair_Display_init,
};

export default FontFamilies;
