import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#ff4400',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    background: {
      default: '#080808',
      paper: '#fff4d9'
    },
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Press Start 2P',
    fontWeightLight: 300,
  },
};

const Theme1 = createTheme(themeOptions);
export default Theme1;