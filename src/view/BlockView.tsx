'use client';

import { sumBy } from 'lodash';
import { Stack } from '@mui/material';

import type { BlockDto } from 'src/services';
import { formatNumber, toSol } from 'src/utils';
import { withDefaultProps } from 'src/hoc';
import { OverviewItem as OverviewItemBase } from 'src/components';

const OverviewItem = withDefaultProps(OverviewItemBase, { subjectWidth: 200 });

// ----------

interface BlockViewProps {
  block: BlockDto;
}

export default function BlockView({ block }: BlockViewProps) {
  // --- SECTIONED ELEMENTS ---

  const sections = {
    slot: <OverviewItem subject="Slot" value={block.slot} copyable />,

    timestamp: (
      <OverviewItem
        subject="Timestamp"
        value={new Date(+block.blockTime.toString() * 1000).toUTCString()}
      />
    ),

    blockhash: <OverviewItem subject="Block Hash" value={block.blockhash} copyable />,

    reward: (
      <OverviewItem
        subject="Reward"
        value={`${formatNumber(toSol(sumBy(block.rewards, 'lamports')))} SOL`}
      />
    ),

    leader: <OverviewItem subject="Leader" value={block.rewards[0]?.pubkey} copyable />,

    transactions: (
      <OverviewItem
        subject="Transactions"
        value={`${formatNumber(block.transactions.length)} transactions`}
      />
    ),

    previousBlockhash: (
      <OverviewItem subject="Previous Block Hash" value={block.previousBlockhash} copyable />
    ),
  };

  return (
    <Stack spacing={2}>
      {sections.slot}
      {sections.timestamp}
      {sections.blockhash}
      {sections.leader}
      {sections.reward}
      {sections.transactions}
      {sections.previousBlockhash}
    </Stack>
  );
}
