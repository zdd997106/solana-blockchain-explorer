import { Components, Theme } from '@mui/material';
import Link from 'src/components/Link';

export const overwrites: Components<Theme> = {
  MuiAppBar: {
    defaultProps: {
      color: 'default',
      position: 'static',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
      }),
    },
  },

  MuiLink: {
    defaultProps: {
      component: Link,
      underline: 'hover',
    },
  },

  MuiChip: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.caption,
      }),
    },
  },
};
