'use client';

import { Stack } from '@mui/material';
import type { BlockDto } from 'src/services';
import { OverviewItem as OverviewItemBase } from 'src/components';
import { withDefaultProps } from 'src/hoc';
import { sum } from 'lodash';

const OverviewItem = withDefaultProps(OverviewItemBase, { subjectWidth: 200 });

// ----------

interface BlockViewProps {
  block: BlockDto;
}

export default function BlockView({ block }: BlockViewProps) {
  const sections = {
    slot: <OverviewItem subject="Slot" value={block.slot} />,

    timestamp: (
      <OverviewItem
        subject="Timestamp"
        value={new Date(+block.blockTime.toString() * 1000).toUTCString()}
      />
    ),

    blockhash: <OverviewItem subject="Block Hash" value={block.blockhash} />,

    reward: (
      <OverviewItem
        subject="Reward"
        value={`${sum(block.rewards.map((reward) => Number(reward.lamports))) / 1000000000} SOL`}
      />
    ),

    leader: <OverviewItem subject="Leader" value={block.rewards[0]?.pubkey} />,

    transactions: (
      <OverviewItem subject="Transactions" value={`${block.transactions.length} transactions`} />
    ),

    previousBlockhash: (
      <OverviewItem subject="Previous Block Hash" value={block.previousBlockhash} />
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
