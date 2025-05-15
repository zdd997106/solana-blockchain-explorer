'use client';

import { capitalize } from 'lodash';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, BoxProps, IconButton, Menu, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { ECluster } from 'src/services';

// ----------

export interface ClusterSwitchButtonProps extends BoxProps {}

export default function ClusterSwitchButton({ ...props }: ClusterSwitchButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const searchParams = useSearchParams();
  const cluster = searchParams.get('cluster');

  // --- FUNCTIONS ---

  const selectCluster = (cluster: ECluster) => {
    close();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('cluster', cluster);

    // [NOTE]
    // It's hard to apply loading transition to the URL change when it's only search params change
    // So we just reload the page to keep it simple
    window.location.href = `?${searchParams.toString()}`;
  };

  const isOpen = () => Boolean(anchorEl);

  const close = () => setAnchorEl(null);

  // --- HANDLERS ---

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box {...props}>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} disableScrollLock open={isOpen()} onClose={close}>
        {[ECluster.MAINNET, ECluster.TESTNET, ECluster.DEVNET].map((net) => (
          <MenuItem key={net} selected={net === cluster} onClick={() => selectCluster(net)}>
            {capitalize(net)}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
