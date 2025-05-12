// ----------

import { Container, Card, Typography, Stack } from '@mui/material';
import { notFound } from 'next/navigation';

import { BlockService } from 'src/services';
import BlockView from 'src/view/BlockView';
import TransactionsView from 'src/view/TransactionsView';

const blockService = new BlockService();

// ----------

export const runtime = 'edge';

// ----------

interface PageProps {
  params: Promise<{ slot: string }>;
}

export default async function Page(props: PageProps) {
  const slot = await props.params;
  const block = await blockService.getBlock(BigInt(slot.slot));

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
