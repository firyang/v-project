export const writeNewStyle = (originalStyle, colors) => {
  Object.keys(colors).forEach(key => {
    const reg = new RegExp("(:|\\s+)" + key, "g");
    originalStyle = originalStyle.replace(reg, "$1" + colors[key]);
  });

  const chalkStyle = document.getElementById("chalk-theme-style");
  if (!chalkStyle) {
    const style = document.createElement("style");
    style.innerText = originalStyle;
    style.id = "chalk-theme-style";
    document.head.appendChild(style);
  } else {
    chalkStyle.innerText = originalStyle;
  }
};
