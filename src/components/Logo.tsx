'use client';

import { Box, Typography } from '@mui/material';

// ----------

export default function Logo() {
  return (
    <Typography variant="h6" component="div" fontWeight="bold" color="text.primary">
      SOLANA.
      <Box component="span" fontWeight="normal" fontSize=".75em">
        EXPLORE
      </Box>
    </Typography>
  );
}
