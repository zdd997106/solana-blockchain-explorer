'use client';

import { isValidElement } from 'react';
import { isNil } from 'lodash';
import { mixins } from 'gexii/theme';
import { BigNumber } from 'bignumber.js';
import { useCopyToClipboard } from 'react-use';
import { IconButton, Stack, Typography } from '@mui/material';
import CopyIcon from '@mui/icons-material/ContentCopyRounded';

import { formatNumber } from 'src/utils';

// ----------

interface DescriptionProps {
  children: unknown;
  value?: unknown;
  copyable?: boolean;
}

export default function Description({ children, value = children, copyable }: DescriptionProps) {
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <Stack direction="row" alignItems="center">
      {copyable && (
        <IconButton size="small" onClick={() => copyToClipboard(String(value))}>
          <CopyIcon fontSize="inherit" sx={{ fontSize: '1em' }} />
        </IconButton>
      )}
      <Typography variant="body2" sx={{ ...mixins.ellipse() }}>
        {(isValidElement(children) ? children : undefined) || formatValue(value)}
      </Typography>
    </Stack>
  );
}

// --- HELPERS ---

function formatValue(value: unknown): string {
  if (isNil(value)) return 'Not available';

  if (typeof value === 'string') return value;

  if (typeof value === 'number' || typeof value === 'bigint' || BigNumber.isBigNumber(value))
    return formatNumber(value);

  if (Array.isArray(value)) return value.map(formatValue).join(', ');

  return JSON.stringify(value, (_key, value) => {
    if (BigNumber.isBigNumber(value)) return value.toString();
    if (typeof value === 'bigint') return value.toString();
    return value;
  });
}
