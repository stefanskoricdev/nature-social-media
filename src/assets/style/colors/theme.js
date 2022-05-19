import { extendTheme, theme } from "@chakra-ui/react";

const customColors = {
  lightGreen: {
    50: "rgb(0, 185, 96)",
    100: "rgb(0, 185, 96)",
    200: "rgb(0, 185, 96)",
    300: "rgb(0, 185, 96)",
    400: "rgb(0, 185, 96)",
    500: "rgb(0, 185, 96)",
    600: "rgb(0, 185, 96)",
    700: "rgb(0, 185, 96)",
    800: "rgb(0, 185, 96)",
    900: "rgb(0, 185, 96)",
  },
  darkGrayish: {
    50: "rgb(168, 167, 167)",
    100: "rgb(168, 167, 167)",
    200: "rgb(168, 167, 167)",
    300: "rgb(168, 167, 167)",
    400: "rgb(168, 167, 167)",
    500: "rgb(168, 167, 167)",
    600: "rgb(168, 167, 167)",
    700: "rgb(168, 167, 167)",
    800: "rgb(168, 167, 167)",
    900: "rgb(168, 167, 167)",
  },
  transparent: {
    100: "rgba(0, 0, 0, 0)",
  },
};

const Input = {
  variants: {
    flushed: {
      field: {
        borderColor: "rgb(168, 167, 167)",
        _focus: {
          borderColor: "rgb(168, 167, 167)",
          boxShadow: `0px 0px 0px 0px ${customColors.transparent[100]}`,
        },
        _placeholder: {
          color: "rgb(234, 234, 245)",
        },
      },
    },
  },
  defaultProps: {
    focusBorderColor: customColors.transparent[100],
  },
};

const Button = {
  baseStyle: {
    _focus: {
      boxShadow: `0px 0px 0px 0px ${customColors.transparent[100]}`,
    },
  },
  variants: {
    solid: {
      _hover: {
        bg: "inherit",
      },
      _active: {
        bg: "transparent",
      },
    },
  },
};

export const chakraTheme = extendTheme({
  colors: {
    ...theme.colors,
    ...customColors,
  },
  shadows: {
    outline: "none",
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
    mono: `'Poppins', sans-serif`,
  },

  components: {
    Input,
    Button,
  },
});
