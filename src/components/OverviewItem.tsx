'use client';

import { Box, Stack, Typography } from '@mui/material';
import { mixins } from 'gexii/theme';
import { isNil } from 'lodash';

interface OverviewItemProps {
  subject: string;
  value: unknown;
  subjectWidth?: number;
}

export function OverviewItem({ subject, value, subjectWidth }: OverviewItemProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2 }}
      alignItems={{ xs: 'start', sm: 'center' }}
    >
      <Box minWidth={subjectWidth} sx={{ flexShrink: 0 }}>
        <Typography variant="subtitle2" color="textSecondary">
          {subject}
        </Typography>
      </Box>

      <Box sx={{ ...mixins.ellipse(), flexGrow: 1 }}>
        <Typography variant="body2">{!isNil(value) && String(value)}</Typography>
      </Box>
    </Stack>
  );
}
