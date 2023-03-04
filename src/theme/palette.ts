import { alpha } from '@mui/material/styles';
import type { PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import { Color } from '@mui/material';

export const PRIMARY = {
  lighter: '#FEE9D1',
  light: '#FDAB76',
  main: '#FA541C',
  dark: '#B3200E',
  darker: '#770508',
}

export const SECONDARY = {
  lighter: '#D2FCF4',
  light: '#77F0ED',
  main: '#22B8CF',
  dark: '#116E95',
  darker: '#063963',
}

export const INFO = {
  lighter: '#CBFEFC',
  light: '#63E8F9',
  main: '#00B1ED',
  dark: '#0067AA',
  darker: '#003471',
}

export const SUCCESS = {
  lighter: '#CDFCD1',
  light: '#69F290',
  main: '#0CD66E',
  dark: '#069A6B',
  darker: '#02665B',
}

export const WARNING = {
  lighter: '#FFF8D1',
  light: '#FFE475',
  main: '#FFC81A',
  dark: '#B7860D',
  darker: '#7A5204',
}

export const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
}

export const GREY = {
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
}

export const COMMON = {
  white: '#FFF',
  black: '#000'
}

export const DIVIDER = alpha(GREY[500], 0.24)

export const LIGHT_BACKGROUND = {
  default: COMMON.white,
  paper: COMMON.white,
  neutral: GREY[100],
}

export const DARK_BACKGROUND = {
  default: GREY[900],
  paper: GREY[800],
  neutral: alpha(GREY[500], 0.12),
}

export const LIGHT_STATE = {
  active: GREY[600],
  hover: alpha(GREY[500], 0.08),
  selected: alpha(GREY[500], 0.12),
  disabled: alpha(GREY[500], 0.80),
  disabledBackground: alpha(GREY[500], 0.24),
  focus: alpha(GREY[500], 0.24),
}

export const DARK_STATE = {
  active: GREY[500],
  hover: alpha(GREY[500], 0.08),
  selected: alpha(GREY[500], 0.12),
  disabled: alpha(GREY[500], 0.80),
  disabledBackground: alpha(GREY[500], 0.24),
  focus: alpha(GREY[500], 0.24),
}

export const LIGHT_TEXT = {
  primary: GREY[800],
  secondary: GREY[600],
  disable: GREY[500],
}

export const DARK_TEXT = {
  primary: COMMON.white,
  secondary: GREY[500],
  disabled: GREY[600],
}

export const DARK_MODE = 'dark';

export const LIGHT_MODE = 'light';

export const darkPalette: PaletteOptions = {
  mode: DARK_MODE,
  background: DARK_BACKGROUND,
  text: DARK_TEXT,
  action: DARK_STATE,
  darkGrey: {
    light: GREY[500],
    main: alpha(GREY[500], 0.08),
    dark: alpha(GREY[500], 0.24),
  },
  grey: {
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
  },
  white: {
    light: COMMON.white,
    main: COMMON.white,
    dark: COMMON.white,
  }
}