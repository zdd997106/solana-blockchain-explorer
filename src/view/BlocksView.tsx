'use client';

import pluralize from 'pluralize';
import { Table, Cell } from 'gexii/table';
import { Button, Pagination, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { PreviewBlockDto } from 'src/services';

// ----------

interface BlocksViewProps {
  slot: string;
  blocks: PreviewBlockDto[];
  page: number;
  now: number;
}

export default function BlocksView({ blocks, page, slot, now }: BlocksViewProps) {
  const router = useRouter();

  const handleChangePage = (_event: unknown, page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    searchParams.set('slot', slot);
    router.push(`?${searchParams.toString()}`);
  };

  const sections = {
    cells: {
      slot: <Cell label="#" path="slot" />,

      blockhash: <Cell label="Block Hash" path="blockhash" ellipsis />,

      transactionLength: (
        <Cell label="Transactions" path="transactionLength" render={formatNumber} />
      ),

      rewardLength: <Cell label="Rewards" path="rewards.length" />,

      blockTime: (
        <Cell
          label="Time"
          path="blockTime"
          render={(blockTime: PreviewBlockDto['blockTime']) =>
            timeAgo(now - Number(blockTime.toString()) * 1000)
          }
        />
      ),

      action: (
        <Cell
          render={() => (
            <Link href={`/blocks/${blocks[0].slot}`}>
              <Button
                variant="contained"
                size="small"
                sx={{ borderRadius: 2, textTransform: 'none', minWidth: 'auto' }}
              >
                View
              </Button>
            </Link>
          )}
        />
      ),
    },
  };

  return (
    <Stack spacing={2}>
      <Stack sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table source={blocks} sx={{ tableLayout: 'fixed', minWidth: 800 }}>
          {sections.cells.slot}
          {sections.cells.blockhash}
          {sections.cells.transactionLength}
          {sections.cells.rewardLength}
          {sections.cells.blockTime}
          {sections.cells.action}
        </Table>
      </Stack>

      <Stack sx={{ maxWidth: '100%', overflowX: 'auto', alignSelf: 'end' }}>
        <Pagination
          page={+page}
          count={100}
          sx={{ ul: { flexWrap: 'nowrap' } }}
          onChange={handleChangePage}
        />
      </Stack>
    </Stack>
  );
}

const intervals = {
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
};
function timeAgo(diff: number) {
  if (diff < intervals.second) return 'Just now';
  const hitInterval = Object.entries(intervals).findLast(([_, value]) => diff >= value);

  // [NOTE] Error prevention, this should never happen
  if (!hitInterval) return 'Unknown time';

  const unit = hitInterval[0];
  const value = Math.floor(diff / Number(hitInterval[1]));
  return `${value} ${pluralize(unit, value)} ago`;
}

function formatNumber(num: number | bigint) {
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
