import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme, ThemeOptions } from '@mui/material/styles';

const baseThemeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true
      },
      styleOverrides: {
        sizeLarge: {
          fontSize: 18
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          marginLeft: 16,
          marginRight: 16
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 16
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%'
        },
        '#root': {
          height: '100%'
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'initial'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    button: {
      fontWeight: 600,
      textTransform: 'none'
    },
    h1: {
      lineHeight: 1.2
    },
    h2: {
      lineHeight: 1.2
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.2
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.2
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.2

    },
    h6: {
      lineHeight: 1.2

    },
    body1: {

    },
    body2: {
    },
    subtitle1: {
      fontWeight: 500
    },
    subtitle2: {
      fontWeight: 500
    },
    overline: {
    },
    caption: {
      lineHeight: 1.2
    }
  }
};

const lightThemeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedSecondary: {
          '&:hover': {
            backgroundColor: '#FF8552',
            color: '#EBF4FF'
          }
        },
        outlinedPrimary: {
          '&:hover': {
            backgroundColor: '#1E4582',
            color: '#EBF4FF'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          '&:hover': {
            backgroundColor: '#EBF4FF',
            color: '#1E4582'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '& .swiper-pagination-bullet': {
          backgroundColor: '#808080'
        },
        '& .swiper-pagination-bullet-active': {
          backgroundColor: '#1E4582'
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        underlineAlways: {
          textDecorationColor: '#6D7791 !important'
        },
        underlineHover: {
          textDecorationColor: '#6D7791 !important'
        }
      }
    }
  },
  palette: {
    background: {
      default: '#ebe6e1',
      paper: '#fff'
    },
    divider: '#d3d3d3',
    mode: 'light',
    text: {
      secondary: '#808080',
      primary: '#000'
    },
    secondary: {
      contrastText: '#EBF4FF',
      dark: '#FF6422',
      main: '#FF8552'
    },
    primary: {
      contrastText: '#fff',
      dark: '#1C3F77',
      main: '#1E4582'
    }
  }
};

const darkThemeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedPrimary: {
          '&:hover': {
            backgroundColor: '#fff',
            color: '#000'
          }
        },
        outlinedSecondary: {
          '&:hover': {
            backgroundColor: '#1E4582',
            color: '#EBF4FF'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          '&:hover': {
            backgroundColor: '#EBF4FF',
            color: '#1E4582'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '& .swiper-pagination-bullet': {
          backgroundColor: '#BFBFBF'
        },
        '& .swiper-pagination-bullet-active': {
          backgroundColor: '#fff'
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          backgroundColor: '#fff',
          color: '#000'
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        underlineAlways: {
          textDecorationColor: '#6D7791 !important'
        },
        underlineHover: {
          textDecorationColor: '#6D7791 !important'
        }
      }
    }
  },
  palette: {
    background: {
      default: '#050C17',
      paper: '#11284E'
    },
    divider: '#0A182D',
    mode: 'dark',
    text: {
      secondary: '#BFBFBF',
      primary: '#edf6f9'
    },
    secondary: {
      contrastText: '#fff',
      dark: '#1C3F77',
      main: '#1E4582'
    },
    primary: {
      contrastText: '#000',
      dark: '#C8C8C8',
      main: '#fff '
    }
  }
};

export const createCustomTheme = (themeMode: string): Theme => {
  let themeOptions = themeMode === 'light'
    ? lightThemeOptions
    : darkThemeOptions;

  if (!themeOptions) {
    console.warn(new Error(`The theme ${themeMode} is not valid`));
    themeOptions = lightThemeOptions;
  }

  const theme = responsiveFontSizes(createTheme(
    { ...baseThemeOptions },
    { ...themeOptions }
  ));

  return theme;
};