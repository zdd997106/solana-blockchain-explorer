'use client';

import Link from 'next/link';
import { Box, Typography } from '@mui/material';

import Header from './Header';

// ----------

export default function Layout({ children }: React.PropsWithChildren) {
  const sections = {
    logo: (
      <Typography variant="h6" component="div" fontWeight="bold">
        SOLANA.
        <Box component="span" fontWeight="normal" fontSize=".75em">
          EXPLORE
        </Box>
      </Typography>
    ),
  };

  return (
    <Box>
      <Header logo={<Link href="/">{sections.logo}</Link>} />
      {children}
    </Box>
  );
}
