import { Container, Typography } from '@mui/material';
import BlockService from 'src/services/block';
import { cacheable } from 'src/utils';
import BlocksView from 'src/view/BlocksView';

// ----------

interface PageProps {
  searchParams: Promise<{ slot: string; page: number; limit: number }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { slot: customSlot, page = 1, limit = 10 } = await searchParams;
  const blocks = await getRpcLatestBlocks({
    limit,
    slot: customSlot ? BigInt(customSlot) - BigInt((page - 1) * limit) : undefined,
  });
  const slot = customSlot ? BigInt(customSlot) : blocks[0].slot;

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography variant="h4" gutterBottom>
        Recent Blocks
      </Typography>

      <BlocksView blocks={blocks} now={Date.now()} page={page} slot={slot.toString()} />
    </Container>
  );
}

// ----- HELPERS -----

const blockService = new BlockService();

const getRpcLatestBlocks = cacheable(blockService.getLatestBlocks, {
  revalidate: 1,
  useStaleWhileRevalidate: true,
});
