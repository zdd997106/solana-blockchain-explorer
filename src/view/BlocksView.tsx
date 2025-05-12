'use client';

import { useRouter } from 'next/navigation';
import { Table, Cell } from 'gexii/table';
import { CircularProgress, Link, Pagination, Stack, Typography } from '@mui/material';

import { formatNumber, timeAgo, toDate } from 'src/utils';
import type { PreviewBlockDto } from 'src/services';
import { Description } from 'src/components';
import { useAction } from 'gexii';
import { useTransitionCallback } from './useTransition';

// ----------

interface BlocksViewProps {
  slot: string;
  blocks: PreviewBlockDto[];
  page: number;
  now: number;
}

export default function BlocksView({ blocks, page, slot, now }: BlocksViewProps) {
  const router = useRouter();

  // --- FUNCTIONS ---

  const redirect = useTransitionCallback<typeof router.push>((...args) => router.push(...args));

  // --- HANDLERS ---

  const handleChangePage = useAction(async (_event: unknown, page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    searchParams.set('slot', slot);
    await redirect(`?${searchParams.toString()}`);
  });
  const loading = handleChangePage.isLoading();

  // --- SECTIONED ELEMENTS ---

  const sections = {
    cells: {
      slot: (
        <Cell
          label="#"
          width={150}
          path="slot"
          render={(slot) => (
            <Description copyable value={slot}>
              <Link href={`/blocks/${slot}`}>{formatNumber(slot)}</Link>
            </Description>
          )}
        />
      ),

      blockhash: (
        <Cell
          label="Block Hash"
          path="blockhash"
          render={(blockhash: string, block: PreviewBlockDto) => (
            <Description copyable value={blockhash}>
              <Link href={`/blocks/${block.slot}`}>{blockhash}</Link>
            </Description>
          )}
        />
      ),

      transactionLength: (
        <Cell width={150} label="Transactions" path="transactionLength" render={formatNumber} />
      ),

      blockTime: (
        <Cell
          width={150}
          label="Time"
          path="blockTime"
          render={(blockTime: PreviewBlockDto['blockTime']) => timeAgo(toDate(blockTime), { now })}
        />
      ),
    },

    tablePlaceholder: (
      <Stack sx={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No blocks found
        </Typography>
      </Stack>
    ),

    tableLoading: (
      <Stack
        position="absolute"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', height: '100%', top: 0, left: 0 }}
      >
        <CircularProgress color="inherit" size={60} />
      </Stack>
    ),

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
    <Stack spacing={2} position="relative" sx={{ opacity: loading ? 0.5 : 1 }}>
      <Stack sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table source={blocks} sx={{ tableLayout: 'fixed', minWidth: 800 }}>
          {sections.cells.slot}
          {sections.cells.blockhash}
          {sections.cells.transactionLength}
          {sections.cells.blockTime}
        </Table>

        {blocks.length === 0 && sections.tablePlaceholder}
      </Stack>

      <Stack sx={{ maxWidth: '100%', overflowX: 'auto', alignSelf: 'end' }}>
        {sections.pagination}
      </Stack>

      {loading && sections.tableLoading}
    </Stack>
  );
}
