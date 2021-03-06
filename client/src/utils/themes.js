import { primary, darkPrimary, neutral, yellow, green, red } from './colors';
import { primaryFont } from './typography';

export const defaultTheme = {
  bodyBackground: neutral[100],
  primaryColor: primary[100],
  primaryHoverColor: primary[200],
  primaryActiveColor: primary[300],
  formElementBackground: neutral[100],
  textOnFormElementBackground: neutral[600],
  textColorOnPrimary: neutral[100],
  textColor: neutral[600],
  textColorInverted: neutral[100],
  primaryFont: primaryFont,
  disabled: neutral[500],
  textOnDisabled: neutral[300],
  textFieldBackground: neutral[300],
  textFieldLabelColor: neutral[500],
  status: {
    warningColor: yellow[100],
    warningColorHover: yellow[200],
    warningColorActive: yellow[300],
    errorColor: red[100],
    errorColorHover: red[200],
    errorColorActive: red[300],
    successColor: green[100],
    successColorHover: green[200],
    successColorActive: green[300],
  },
};

export const darkTheme = {
  bodyBackground: '#222831',
  primaryColor: darkPrimary[100],
  primaryHoverColor: darkPrimary[200],
  primaryActiveColor: darkPrimary[300],
  formElementBackground: '#393e46',
  textOnFormElementBackground: neutral[200],
  textColorOnPrimary: neutral[100],
  textColor: neutral[300],
  textColorInverted: neutral[100],
  primaryFont: primaryFont,
  disabled: neutral[500],
  textOnDisabled: neutral[300],
  textFieldBackground: neutral[500],
  textFieldLabelColor: neutral[300],
  status: {
    warningColor: yellow[100],
    warningColorHover: yellow[200],
    warningColorActive: yellow[300],
    errorColor: red[100],
    errorColorHover: red[200],
    errorColorActive: red[300],
    successColor: green[100],
    successColorHover: green[200],
    successColorActive: green[300],
  },
};
