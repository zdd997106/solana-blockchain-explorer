'use client';

import { Stack, Typography, Link } from '@mui/material';

// ----------

interface PageErrorProps {
  message?: React.ReactNode;
}

export default function PageError({ message }: PageErrorProps) {
  return (
    <Stack
      direction="column"
      spacing={3}
      alignItems="center"
      justifyContent="center"
      margin="auto"
      flexGrow={1}
      sx={{ paddingY: { xs: 3, md: 10 } }}
    >
      <Stack spacing={1} sx={{ textAlign: 'center', paddingX: 2 }}>
        <Typography variant="h4" component="h1">
          {message || 'Something Went Wrong'}
        </Typography>

        <Typography variant="body2" color="action.active">
          Please try again later or contact support if the problem persists.
        </Typography>
      </Stack>

      <Link href="/">Back to home</Link>
    </Stack>
  );
}
