/**
 * Discord Design System — MUI Theme
 * Source of truth: DesignMD /discover/discord
 */
import { createTheme } from "@mui/material/styles";

import breakpoints from "./base/breakpoints";
import globals from "./base/globals";

import sidenav from "./components/sidenav";
import list from "./components/list";
import listItem from "./components/list/listItem";
import listItemText from "./components/list/listItemText";
import card from "./components/card";
import cardMedia from "./components/card/cardMedia";
import cardContent from "./components/card/cardContent";
import button from "./components/button";
import iconButton from "./components/iconButton";
import input from "./components/form/input";
import inputLabel from "./components/form/inputLabel";
import inputOutlined from "./components/form/inputOutlined";
import textField from "./components/form/textField";
import menu from "./components/menu";
import menuItem from "./components/menu/menuItem";
import divider from "./components/divider";
import tableContainer from "./components/table/tableContainer";
import tableHead from "./components/table/tableHead";
import tableCell from "./components/table/tableCell";
import linearProgress from "./components/linearProgress";
import breadcrumbs from "./components/breadcrumbs";
import avatar from "./components/avatar";
import appBar from "./components/appBar";
import autocomplete from "./components/form/autocomplete";
import container from "./components/container";
import buttonBase from "./components/buttonBase";
import icon from "./components/icon";
import svgIcon from "./components/svgIcon";

import colors from "./base/colors";
import typography from "./base/typography";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary.main,        // #5865F2
      dark: colors.primary.focus,       // #4751DA
      light: "#798DF9",                 // Purple Muted
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: colors.secondary.main,      // #727377
      dark: colors.secondary.focus,     // #A1A1A5
      light: "#2C2F33",
      contrastText: "#FFFFFF",
    },
    success: {
      main: colors.success.main,        // #35ED7E
      dark: colors.success.focus,       // #2FD471
      light: "rgba(53, 237, 126, 0.15)",
      contrastText: "#000000",
    },
    warning: {
      main: colors.warning.main,        // #FEE75C
      dark: colors.warning.focus,
      light: "rgba(254, 231, 92, 0.15)",
      contrastText: "#000000",
    },
    error: {
      main: colors.error.main,          // #ED4245
      dark: colors.error.focus,
      light: "rgba(237, 66, 69, 0.15)",
      contrastText: "#FFFFFF",
    },
    info: {
      main: colors.info.main,           // #00B0F4
      dark: colors.info.focus,
      light: "rgba(0, 176, 244, 0.15)",
      contrastText: "#FFFFFF",
    },
    background: {
      default: colors.background.default,  // #060A0B
      paper: colors.background.paper,      // #202024
    },
    text: {
      primary: colors.white.main,          // #FFFFFF
      secondary: colors.text.main,         // #A1A1A5
      disabled: colors.grey[400],          // #727377
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    ...typography,
  },
  shape: {
    borderRadius: 12,  // Discord Standard border radius
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiAvatar: { ...avatar },
    MuiAppBar: { ...appBar },
    MuiAutocomplete: { ...autocomplete },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
  },
});
