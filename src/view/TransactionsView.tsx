'use client';

import { Chip, Pagination, Stack, Switch, Typography } from '@mui/material';
import type { PreviewTransactionDto } from 'src/services';
import { Cell, Table } from 'gexii/table';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { has } from 'lodash';

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
          render={(transaction: PreviewTransactionDto) => (
            <Link href={`/transactions/${transaction.transaction.signatures[0]}`}>
              {transaction.transaction.signatures[0]}
            </Link>
          )}
        />
      ),

      signer: (
        <Cell
          label="Signer"
          ellipsis
          render={(transaction: PreviewTransactionDto) =>
            transaction.transaction.message.accountKeys[0]?.pubkey
          }
        />
      ),

      fee: (
        <Cell
          width={150}
          label="Fee (SOL)"
          path="meta.fee"
          render={(fee: bigint) => Number(fee) / 1000000000}
        />
      ),

      status: (
        <Cell
          width={100}
          label="Status"
          path="meta.status"
          render={(status) => {
            if (has(status, 'Ok')) return 'Success';
            if (has(status, 'Err')) return 'Error';
            return 'Unknown';
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
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
        <Typography variant="h6">Transactions</Typography>
        {sections.excludeVoteSwitch}
      </Stack>

      <Stack sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table source={pagedTransactions} sx={{ tableLayout: 'fixed', minWidth: 800 }}>
          {sections.cells.signature}
          {sections.cells.signer}
          {sections.cells.status}
          {sections.cells.fee}
        </Table>
      </Stack>

      <Stack sx={{ maxWidth: '100%', overflowX: 'auto', alignSelf: 'end' }}>
        {sections.pagination}
      </Stack>
    </Stack>
  );
}
