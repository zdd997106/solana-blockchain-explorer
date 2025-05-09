'use client';

import { Table, Cell } from 'gexii/table';
import { Button, Pagination, Stack } from '@mui/material';
import { formatNumber, timeAgo } from 'src/utils';
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

  // --- HANDLERS ---

  const handleChangePage = (_event: unknown, page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    searchParams.set('slot', slot);
    router.push(`?${searchParams.toString()}`);
  };

  // --- SECTIONED ELEMENTS ---

  const sections = {
    cells: {
      slot: <Cell label="#" path="slot" />,

      blockhash: <Cell label="Block Hash" path="blockhash" ellipsis />,

      transactionLength: (
        <Cell label="Transactions" path="transactionLength" render={formatNumber} />
      ),

      rewardLength: <Cell label="Rewards" path="rewards.length" render={formatNumber} />,

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
          render={(_, block: PreviewBlockDto) => (
            <Link href={`/blocks/${block.slot}`}>
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

    pagination: (
      <Pagination
        page={+page}
        count={100}
        sx={{ ul: { flexWrap: 'nowrap' } }}
        onChange={handleChangePage}
      />
    ),
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
        {sections.pagination}
      </Stack>
    </Stack>
  );
}
