'use client';

import { AppBar, Box, inputBaseClasses, Stack, Toolbar } from '@mui/material';

import { SolanaSearchField, ClusterSwitchButton } from 'src/components';

// ----------

export interface HeaderProps {
  logo?: React.ReactNode;
}

export default function Header({ logo, ..._props }: HeaderProps) {
  const sections = {
    search: (
      <Box flexGrow={1} paddingY={1}>
        <SolanaSearchField
          size="small"
          sx={{ [`.${inputBaseClasses.root}`]: { bgcolor: 'background.paper' } }}
        />
      </Box>
    ),
    clusterSwitch: <ClusterSwitchButton />,
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
