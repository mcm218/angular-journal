export interface Theme {
  primary: string;
  accent: string;
  highlight: string;
  background?: string;
  text: string;
}
const blank = {
  primary: "",
  accent: "",
  highlight: "",
  background: "",
  text: ""
};
const darkTheme = {
  primary: "rgb(41, 38, 39)",
  accent: "rgb(54, 51, 51)",
  highlight: "rgb(54, 51, 51)",
  background: "rgb(26, 24, 24)",
  text: "rgb(255, 255, 255)"
};
const lightTheme = {
  primary: "rgb(230, 230, 230)",
  accent: "rgb(240, 240, 240)",
  highlight: "rgb(240, 240, 240)",
  background: "rgb(250, 250, 250)",
  text: "rgb(0, 0, 0)"
};
const redTheme = {
  primary: "#ad2e24",
  accent: "#81171b",
  highlight: "#540804",
  text: "#ea8c55"
};
const blueTheme = {
  primary: "#3a506b",
  accent: "#1c2541",
  highlight: "##0b132b",
  text: "#6fffe9"
};
const greenTheme = {
  primary: "#52796f",
  accent: "#354f52",
  highlight: "#2f3e46",
  text: "#cad2c5"
};
const purpleTheme = {
  primary: "#a5668b",
  accent: "#69306d",
  highlight: "#0e103d",
  text: "#f2d7ee"
};
const orangeTheme = {
  primary: "#ff8c42",
  accent: "#ff3c38",
  highlight: "#a23e48",
  text: "#fff275"
};
export const themes = new Map<string, Theme>([
  ["black", darkTheme],
  ["white", lightTheme],
  ["red", redTheme],
  ["blue", blueTheme],
  ["green", greenTheme],
  ["purple", purpleTheme],
  ["orange", orangeTheme]
]);
