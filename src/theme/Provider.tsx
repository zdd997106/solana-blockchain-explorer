'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { overwrites } from './overwrites';
import { typography } from './typography';

// ----------

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

// ----- CONSTANTS -----

const theme = createTheme({
  shape: { borderRadius: 8 },
  typography,
  components: overwrites,
} as ThemeOptions);
