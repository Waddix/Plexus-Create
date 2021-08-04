import { extendTheme, ThemeConfig } from "@chakra-ui/react";
// import { userSettings } from "../../../context/userContext";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  // useSystemColorMode: true,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  fonts: {
    // Dyslexia friendly
    // body: `'Helvetica', 'Arial', sans-serif`,
    // heading: `'Helvetica', 'Arial', sans-serif`,
    body: `'Bai Jamjuree', sans-serif`,
    heading: `'Bai Jamjuree', sans-serif`,
  },
});
export default theme;
