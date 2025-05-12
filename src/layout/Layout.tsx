'use client';

import { Link, Stack } from '@mui/material';

import { Logo } from 'src/components';

import Header from './Header';

// ----------

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Stack minHeight="100vh">
      <Header
        logo={
          <Link href="/" underline="none">
            <Logo />
          </Link>
        }
      />
      <Stack flexGrow={1}>{children}</Stack>
    </Stack>
  );
}
