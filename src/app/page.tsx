import { Box, Container, Link, Stack } from '@mui/material';

import { Logo, SolanaSearchField } from 'src/components';

// ----------

export default function Page() {
  return (
    <Stack
      padding={4}
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100vw' }}
    >
      <Box sx={{ marginBottom: 4 }}>
        <Logo />
      </Box>

      <Container maxWidth="sm">
        <Stack spacing={2}>
          <SolanaSearchField />

          <Link href="/blocks" typography="body2" underline="hover">
            {'Go check out the latest blocks'}
          </Link>
        </Stack>
      </Container>
    </Stack>
  );
}
