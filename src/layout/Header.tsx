'use client';

import { AppBar, Box, Stack, Toolbar } from '@mui/material';

import { SolanaSearchField } from 'src/components';

// ----------

export interface HeaderProps {
  logo?: React.ReactNode;
}

export default function Header({ logo, ..._props }: HeaderProps) {
  const sections = {
    search: (
      <Box flexGrow={1} paddingY={1}>
        <SolanaSearchField size="small" />
      </Box>
    ),
  };

  return (
    <AppBar color="default" sx={{ position: 'sticky', top: 0 }}>
      <Toolbar>
        <Stack direction="row" spacing={2} alignItems="center" width="100%">
          {logo}
          {sections.search}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
