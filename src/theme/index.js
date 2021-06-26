import axios from "../common/HttpRequest.js";
import { generateColors } from "./color";
import { writeNewStyle } from "./writeNewStyle";
import { getStyleTemplate } from "./getStyleTemplate";

const defaultTheme = "#43B884";
let originalStyle = localStorage.getItem("originalStyle");

export const generateTheme = color => {
  const colors = Object.assign(
    { primary: defaultTheme },
    generateColors(color)
  );
  writeNewStyle(originalStyle, colors);
};

const getThemeChalkStyle = () => {
  return axios.get("/theme-chalk/index.css");
};

if (!originalStyle) {
  getThemeChalkStyle().then(data => {
    originalStyle = getStyleTemplate(data);
    localStorage.setItem("originalStyle", originalStyle);
    generateTheme(defaultTheme);
  });
} else {
  generateTheme(defaultTheme);
}
