'use client';

import { Stack } from '@mui/material';

import { OverviewItem as BasedOverviewItem } from 'src/components';
import { withDefaultProps } from 'src/hoc';
import type { TransactionDto } from 'src/services';

const OverviewItem = withDefaultProps(BasedOverviewItem, { subjectWidth: 180 });

// ----------

interface TransactionViewProps {
  transaction: TransactionDto;
}

export default function TransactionView({ transaction }: TransactionViewProps) {
  const sections = {
    slot: <OverviewItem subject="Slot" value={transaction.slot} />,

    signature: <OverviewItem subject="Signature" value={transaction.transaction.signatures[0]} />,

    timestamp: (
      <OverviewItem
        subject="Timestamp"
        value={
          transaction.blockTime
            ? new Date(+transaction.blockTime.toString() * 1000).toUTCString()
            : 'Not available'
        }
      />
    ),

    recentBlockhash: (
      <OverviewItem
        subject="Recent Block Hash"
        value={transaction.transaction.message.recentBlockhash}
      />
    ),

    fee: (
      <OverviewItem
        subject="Fee (SOL)"
        value={`${Number(transaction.meta?.fee ?? 0) / 1000000000} SOL`}
      />
    ),

    computeUnitsConsumed: (
      <OverviewItem
        subject="Compute Units Consumed"
        value={transaction.meta?.computeUnitsConsumed}
      />
    ),

    transactionVersion: (
      <OverviewItem subject="Transaction Version" value={transaction.version.toString()} />
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
