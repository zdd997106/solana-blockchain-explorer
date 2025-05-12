'use client';

import { Link, Stack } from '@mui/material';

import type { TransactionDto } from 'src/services';
import { formatNumber, toDate, toSol } from 'src/utils';
import { withDefaultProps } from 'src/hoc';
import { OverviewItem as BasedOverviewItem } from 'src/components';

const OverviewItem = withDefaultProps(BasedOverviewItem, { subjectWidth: 180 });

// ----------

interface TransactionViewProps {
  transaction: TransactionDto;
}

export default function TransactionView({ transaction }: TransactionViewProps) {
  // --- SECTIONED ELEMENTS ---

  const sections = {
    slot: (
      <OverviewItem
        subject="Slot"
        value={<Link href={`/blocks/${transaction.slot}`}>{transaction.slot}</Link>}
        copyable
      />
    ),

    signature: (
      <OverviewItem copyable subject="Signature" value={transaction.transaction.signatures[0]} />
    ),

    timestamp: (
      <OverviewItem
        subject="Timestamp"
        value={
          transaction.blockTime ? toDate(transaction.blockTime).toUTCString() : 'Not available'
        }
      />
    ),

    recentBlockhash: (
      <OverviewItem
        copyable
        subject="Recent Block Hash"
        value={transaction.transaction.message.recentBlockhash}
      />
    ),

    fee: <OverviewItem subject="Fee (SOL)" value={formatNumber(toSol(transaction.meta?.fee))} />,

    computeUnitsConsumed: (
      <OverviewItem
        subject="Compute Units Consumed"
        value={transaction.meta?.computeUnitsConsumed}
      />
    ),

    transactionVersion: (
      <OverviewItem subject="Transaction Version" value={transaction.version?.toString()} />
    ),
  };

  return (
    <Stack spacing={2}>
      {sections.slot}
      {sections.signature}
      {sections.timestamp}
      {sections.recentBlockhash}
      {sections.fee}
      {sections.computeUnitsConsumed}
      {sections.transactionVersion}
    </Stack>
  );
}
