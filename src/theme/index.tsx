import { Star as StarIcon } from '@/icons/star';
import type { Theme, ThemeOptions } from '@mui/material/styles';
import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';
import * as PALETTE from './palette';
import * as SHADOWS from './shadows';
import { typography } from './typography';

const BORDER_RADIUS = 8;
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const baseThemeOptions: ThemeOptions = {
  breakpoints: {
    values: BREAKPOINTS,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADIUS,
          color: PALETTE.DARK_TEXT.secondary,
          '&:hover': {
            backgroundColor: alpha(PALETTE.GREY[500], 0.24),
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(PALETTE.GREY[500], 0.08),
          fontSize: 14,
          borderRadius: BORDER_RADIUS * 1,
          '::before': {
            display: 'none',
          },
          '::after': {
            display: 'none',
          },
          '& .MuiFilledInput-input': {
            height: '40px',
          },
          '& .MuiFilledInput-input:focus': {
            borderRadius: BORDER_RADIUS * 1,
          },
          '&:hover': {
            backgroundColor: alpha(PALETTE.GREY[500], 0.16),
          },
        },
        input: {
          borderRadius: BORDER_RADIUS * 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {
          minWidth: 'fit-content',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          marginLeft: 16,
          marginRight: 16,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 16,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 600px)': {},
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
          boxSizing: 'border-box',
        },
        body: {
          height: '100%',
        },
        '#__next': {
          height: '100%',
        },
        '#nprogress': {
          '.bar': {
            height: '2px !important',
            background: `${PALETTE.PRIMARY.main} !important`,
            '.peg': {
              display: 'none',
            },
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'initial',
        },
      },
    },
    MuiRating: {
      defaultProps: {
        icon: <StarIcon />,
        emptyIcon: <StarIcon />,
      },
    },
  },
  typography,
  palette: {
    primary: PALETTE.PRIMARY,
    secondary: PALETTE.SECONDARY,
    info: PALETTE.INFO,
    success: PALETTE.SUCCESS,
    warning: PALETTE.WARNING,
    error: PALETTE.ERROR,
    divider: PALETTE.DIVIDER,
  },

  shape: {
    borderRadius: BORDER_RADIUS,
  },
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: PALETTE.LIGHT_MODE,
    background: PALETTE.LIGHT_BACKGROUND,
    text: PALETTE.LIGHT_TEXT,
    action: PALETTE.LIGHT_STATE,
  },
  shadows: SHADOWS.LIGHT_SHADOWS,
};

const darkThemeOptions: ThemeOptions = {
  components: {},
  palette: PALETTE.darkPalette,
  shadows: SHADOWS.DARK_SHADOWS,
};

export const createCustomTheme = (themeMode: string): Theme => {
  let themeOptions =
    themeMode === 'light' ? lightThemeOptions : darkThemeOptions;

  if (!themeOptions) {
    console.warn(new Error(`The theme ${themeMode} is not valid`));
    themeOptions = lightThemeOptions;
  }

  const theme = responsiveFontSizes(
    createTheme({ ...baseThemeOptions }, { ...themeOptions })
  );

  return theme;
};
