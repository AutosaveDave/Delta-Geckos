import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#ecca70',
      contrastText: '#351d1c',
      light: '#ffe8ac',
    },
    secondary: {
      main: '#ffc053',
    },
    background: {
      default: '#2c2b31',
      paper: '#5b4a34',
    },
    text: {
      primary: '#fff4d9',
    },
    error: {
      main: '#c14b46',
    },
    warning: {
      main: '#cc8a33',
    },
    info: {
      main: '#4470b1',
    },
    success: {
      main: '#e8b829',
    },
  },
  typography: {
    fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
  },
};

const Theme1 = createTheme(themeOptions);
export default Theme1;