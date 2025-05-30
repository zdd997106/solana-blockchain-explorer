import { Container, Typography } from '@mui/material';
import { ECluster } from 'src/services';

import BlockService from 'src/services/block';
import BlocksView from 'src/view/BlocksView';

// ----------

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// ----------

interface PageProps {
  searchParams: Promise<{ slot: string; page: number; limit: number; cluster?: ECluster }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { page = 1, limit = 10, cluster } = await searchParams;
  const customSlot = getCustomSlot(await searchParams);

  const blockService = new BlockService(cluster);
  const blocks = await blockService.getLatestBlocks({
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

function getCustomSlot(searchParams: Awaited<PageProps['searchParams']>) {
  try {
    if (searchParams.slot) return BigInt(searchParams.slot);
    return undefined;
  } catch {
    return undefined;
  }
}
