import { TypographyOptions } from "@mui/material/styles/createTypography"
import * as CSS from 'csstype';

const H1 = {
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 700,
  fontSize: '4rem',
  lineHeight: 1.25,
}

const H2 = {
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 700,
  fontSize: '3rem',
  lineHeight: 1.33,
}

const H3 = {
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 700,
  fontSize: '2rem',
  lineHeight: 1.5,
}

const H4 = {
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 700,
  fontSize: '1.5rem',
  lineHeight: 1.5,
}

const H5 = {
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 600,
  fontSize: '1.25rem',
  lineHeight: 1.5,
}

const H6 = {
  fontFamily: 'Barlow, sans-serif',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: 1.55,
}

const SUBTITLE1 = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '1rem',
  lineHeight: 1.75,
}

const SUBTITLE2 = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '0.875rem',
  lineHeight: 1.85,
}

const SUBTITLE3 = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '0.8125rem',
  lineHeight: 1.84,
}

const BODY1 = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: 1.75,
}

const BODY2 = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  fontSize: '0.875rem',
  lineHeight: 1.85,
}

const BODY3 = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  fontSize: '0.8125rem',
  lineHeight: 1.84,
}

const CAPTION = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  fontSize: '0.75rem',
  lineHeight: 1.66,
}

const OVERLINE = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '0.75rem',
  lineHeight: 1.66,
}

const BUTTON = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  fontSize: '0.875rem',
  lineHeight: 1.71429,
}

export const typography: TypographyOptions = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  subtitle1: SUBTITLE1,
  subtitle2: SUBTITLE2,
  subtitle3: SUBTITLE3,
  body1: BODY1,
  body2: BODY2,
  body3: BODY3,
  caption: CAPTION,
  overline: OVERLINE,
  button: BUTTON,
}