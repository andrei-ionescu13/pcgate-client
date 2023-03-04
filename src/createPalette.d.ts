import "@mui/material/styles/createPalette";
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    white: Palette['primary'];
    darkGrey: Palette['primary'];
  }

  interface PaletteOptions {
    white: PaletteOptions['primary'];
    darkGrey: PaletteOptions['primary'];
  }
}