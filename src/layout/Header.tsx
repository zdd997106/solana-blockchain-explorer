'use client';

import { Suspense } from 'react';
import { AppBar, Box, inputBaseClasses, Stack, Toolbar } from '@mui/material';

import { SolanaSearchField, ClusterSwitchButton } from 'src/components';

// ----------

export interface HeaderProps {
  logo?: React.ReactNode;
}

export default function Header({ logo, ..._props }: HeaderProps) {
  const sections = {
    search: (
      <Suspense>
        <Box flexGrow={1} paddingY={1}>
          <SolanaSearchField
            size="small"
            sx={{ [`.${inputBaseClasses.root}`]: { bgcolor: 'background.paper' } }}
          />
        </Box>
      </Suspense>
    ),
    clusterSwitch: (
      <Suspense>
        <ClusterSwitchButton />
      </Suspense>
    ),
  };

  return (
    <AppBar>
      <Toolbar>
        <Stack direction="row" spacing={2} alignItems="center" width="100%">
          {logo}
          {sections.search}
          {sections.clusterSwitch}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
