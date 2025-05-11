'use client';

import { Stack, Typography } from '@mui/material';

import Description from './Description';

// ----------

interface OverviewItemProps {
  subject: string;
  value: unknown;
  copyable?: boolean;
  subjectWidth?: string | number;
}

export default function OverviewItem({
  subject,
  value,
  copyable,
  subjectWidth,
}: OverviewItemProps) {
  return (
    <Stack
      width="100%"
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 4 }}
      alignItems={{ xs: 'start', sm: 'center' }}
      justifyContent={{ xs: 'start', sm: 'space-between' }}
    >
      <Typography
        variant="subtitle2"
        color="textSecondary"
        sx={{ minWidth: { xs: '100%', sm: subjectWidth }, flexShrink: 0 }}
      >
        {subject}
      </Typography>

      <Description copyable={copyable}>{value}</Description>
    </Stack>
  );
}
