'use client';

import { useRouter } from 'next/navigation';
import { Table, Cell } from 'gexii/table';
import { Pagination, Stack } from '@mui/material';
import Link from 'next/link';

import { formatNumber, timeAgo, toDate } from 'src/utils';
import type { PreviewBlockDto } from 'src/services';
import { Description } from 'src/components';

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
          {sections.cells.blockTime}
        </Table>
      </Stack>

      <Stack sx={{ maxWidth: '100%', overflowX: 'auto', alignSelf: 'end' }}>
        {sections.pagination}
      </Stack>
    </Stack>
  );
}
