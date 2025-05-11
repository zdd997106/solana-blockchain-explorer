'use client';

import { Table, Cell } from 'gexii/table';
import { Chip as MuiChip, Stack, Typography } from '@mui/material';

import { formatNumber, toSol } from 'src/utils';
import type { TransactionAccountDto, TransactionDto } from 'src/services';
import Description from 'src/components/Description';
import { withDefaultProps } from 'src/hoc';

const Chip = withDefaultProps(MuiChip, {
  size: 'small',
  sx: { typography: 'caption' },
});

// ----------

interface AccountsViewProps {
  accounts: TransactionAccountDto[];
  transaction: TransactionDto;
}

export default function AccountsView({ accounts, transaction }: AccountsViewProps) {
  const prebalance = transaction.meta?.preBalances ?? [];
  const postbalance = transaction.meta?.postBalances ?? [];

  // --- SECTIONED ELEMENTS ---

  const sections = {
    cells: {
      index: <Cell label="#" width={60} path="slot" render={(_value, _item, index) => index} />,

      address: (
        <Cell
          label="Address"
          path="pubkey"
          render={(pubkey) => <Description copyable>{pubkey}</Description>}
        />
      ),

      change: (
        <Cell
          label="Change (SOL)"
          width={150}
          render={(_, _item, index) => {
            const sol = toSol((postbalance[index] ?? 0n) - (prebalance[index] ?? 0n));

            return (
              <Typography
                variant="caption"
                color={getColor(sol, { positive: 'success.main', negative: 'error.main' })}
              >
                {sol > 0 && '+'}
                {formatNumber(sol)}
              </Typography>
            );
          }}
        />
      ),

      details: (
        <Cell
          label="Details"
          width={200}
          render={(_, item: TransactionAccountDto) => (
            <Stack direction="row" spacing={1}>
              {item.signer && <Chip label="Signer" color="primary" />}
              {item.writable && <Chip label="Writable" color="secondary" />}
            </Stack>
          )}
        />
      ),
    },
  };

  return (
    <Table source={accounts} sx={{ tableLayout: 'fixed', minWidth: 800 }}>
      {sections.cells.index}
      {sections.cells.address}
      {sections.cells.change}
      {sections.cells.details}
    </Table>
  );
}

// ----- HELPERS -----

function getColor(value: number, { positive = '', negative = '', zero = '' }) {
  if (value > 0) return positive || undefined;
  if (value < 0) return negative || undefined;
  return zero || undefined;
}
