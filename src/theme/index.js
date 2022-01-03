import _ from "lodash";
import { colors, createMuiTheme } from "@material-ui/core";
import { THEMES } from "../constants";
import { typography } from "./typography";

const baseTheme = {
  spacing: 10,
  direction: "ltr",
  name: THEMES.LIGHT,
  typography: { ...typography },
  overrides: {
    MuiFormControl: {
      root: {
        width:'100%'
      },
    },
    MuiDialogActions: {
      root: {
        paddingLeft: '16px',
        paddingRight: '0px',
      }
    }
  },
  palette: {
    type: "light",
    action: {
      active: colors.blueGrey[600],
    },
    background: {
      default: "#d2c8c8",
      dark: "#f7f7f0",
      paper: colors.common.white,
      main: "#57CC99",
      light: "#F6F6F6",
    },
    primary: {
      main: "#57CC99",
    },

    secondary: {
      main: "#57CC99",
    },

    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
};

export const createTheme = () => {
  let theme = createMuiTheme(_.merge({}, baseTheme));

  return theme;
};
