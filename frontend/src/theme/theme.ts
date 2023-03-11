import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  components: {
    MuiFilledInput: {
      styleOverrides: {
        colorSecondary: "white",
        root: {
          backgroundColor: "white",
          ":hover": {
            backgroundColor: "#f5f5f6",
          },
        },
      },
    },
  },
});

theme.typography.h1 = {
  fontSize: "2.25rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.75rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "4.5rem",
  },
};

theme.typography.h3 = {
  fontSize: "1rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.5rem",
  },
};

export default theme;
