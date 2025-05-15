// ----------

import { Container, Card, Typography, Stack } from '@mui/material';
import { notFound } from 'next/navigation';

import { BlockService, ECluster } from 'src/services';
import BlockView from 'src/view/BlockView';
import TransactionsView from 'src/view/TransactionsView';

// ----------

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// ----------

interface PageProps {
  params: Promise<{ slot: string }>;
  searchParams: Promise<{ cluster?: ECluster }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const blockService = new BlockService(searchParams.cluster);
  const block = await blockService.getBlock(BigInt(params.slot));

  if (!block) {
    return notFound();
  }

  // --- SECTIONED ELEMENTS ---

  const sections = {
    blockDetail: (
      <Card variant="outlined" sx={{ padding: 4, marginBottom: 5 }}>
        <BlockView block={block} />
      </Card>
    ),
    transactions: (
      <Card variant="outlined" sx={{ padding: 4, marginBottom: 5 }}>
        <TransactionsView transactions={Array.from(block.transactions)} />
      </Card>
    ),
  };

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography variant="h4" marginBottom={4}>
        Block Detail
      </Typography>

      {sections.blockDetail}
      {withTitle(sections.transactions, 'Transactions')}
    </Container>
  );
}

// ----- HELPERS -----

function withTitle(element: React.ReactNode, title: string) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6" marginBottom={2}>
        {title}
      </Typography>
      {element}
    </Stack>
  );
}
