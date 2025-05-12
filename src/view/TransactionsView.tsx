'use client';

import { has } from 'lodash';
import { useMemo, useState } from 'react';
import { Cell, Table } from 'gexii/table';
import { Chip, Link, Pagination, Stack, Switch, Typography } from '@mui/material';

import type { PreviewTransactionDto } from 'src/services';
import { toSol } from 'src/utils';
import { withDefaultProps } from 'src/hoc';
import { Description } from 'src/components';

const Status = withDefaultProps(Typography, { typography: 'caption', color: 'text.secondary' });

// ----------

interface TransactionsViewProps {
  transactions: PreviewTransactionDto[];
}

export default function TransactionsView({ transactions }: TransactionsViewProps) {
  const [page, setPage] = useState(1);
  const [excludeVote, setExcludeVote] = useState(true);

  const filteredTransactions = useMemo(() => {
    if (excludeVote)
      return transactions.filter(
        (tx) => !tx.transaction.message.accountKeys.some((key) => key.pubkey.startsWith('Vote')),
      );
    return transactions;
  }, [transactions, excludeVote]);

  const pagedTransactions = useMemo(
    () => filteredTransactions.slice((page - 1) * 10, page * 10),
    [filteredTransactions, page],
  );

  // --- SECTIONED ELEMENTS ---

  const sections = {
    cells: {
      signature: (
        <Cell
          label="Signature"
          ellipsis
          path="transaction.signatures.0"
          render={(signatures: string) => (
            <Description copyable value={signatures}>
              <Link href={`/transactions/${signatures}`}>{signatures}</Link>
            </Description>
          )}
        />
      ),

      signer: (
        <Cell
          label="Signer"
          ellipsis
          path="transaction.message.accountKeys.0.pubkey"
          render={showDescription.copyable}
        />
      ),

      fee: (
        <Cell
          width={150}
          label="Fee (SOL)"
          path="meta.fee"
          render={(fee: bigint) => showDescription(toSol(fee))}
        />
      ),

      status: (
        <Cell
          width={100}
          label="Status"
          path="meta.status"
          render={(status) => {
            if (has(status, 'Ok')) return <Status color="success">Success</Status>;
            if (has(status, 'Err')) return <Status color="error">Error</Status>;
            return <Status>Unknown</Status>;
          }}
        />
      ),
    },

    excludeVoteSwitch: (
      <Chip
        label={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="caption">Exclude Vote Program</Typography>
            <Switch
              size="small"
              checked={excludeVote}
              onChange={(event) => setExcludeVote(event.target.checked)}
            />
          </Stack>
        }
      />
    ),

    tablePlaceholder: (
      <Stack sx={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No transactions found
        </Typography>
      </Stack>
    ),

    pagination: (
      <Pagination
        page={page}
        count={Math.ceil(filteredTransactions.length / 10)}
        sx={{ ul: { flexWrap: 'nowrap' } }}
        onChange={(_, page) => setPage(page)}
      />
    ),
  };

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="end" spacing={2}>
        {sections.excludeVoteSwitch}
      </Stack>

      <Stack sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table source={pagedTransactions} sx={{ tableLayout: 'fixed', minWidth: 800 }}>
          {sections.cells.signature}
          {sections.cells.signer}
          {sections.cells.status}
          {sections.cells.fee}
        </Table>

        {filteredTransactions.length === 0 && sections.tablePlaceholder}
      </Stack>

      {filteredTransactions.length > 0 && (
        <Stack sx={{ maxWidth: '100%', overflowX: 'auto', alignSelf: 'end' }}>
          {sections.pagination}
        </Stack>
      )}
    </Stack>
  );
}

// ----- HELPERS -----

function showDescription(value: unknown) {
  return <Description>{value}</Description>;
}

showDescription.copyable = (value: unknown) => {
  return <Description copyable>{value}</Description>;
};
