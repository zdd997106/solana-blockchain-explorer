// ----------

import { Container, Paper, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import { BlockService } from 'src/services';
import BlockView from 'src/view/BlockView';
import TransactionsView from 'src/view/TransactionsView';

interface PageProps {
  params: Promise<{ slot: string }>;
}

export default async function Page(props: PageProps) {
  const slot = await props.params;
  const block = await blockService.getBlock(BigInt(slot.slot));

  if (!block) {
    return notFound();
  }

  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography variant="h4" gutterBottom>
        Block Detail
      </Typography>

      <Paper
        sx={{
          padding: 4,
          marginBottom: 5,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <BlockView block={block} />
      </Paper>

      <Paper
        sx={{
          padding: 4,
          marginBottom: 5,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <TransactionsView transactions={Array.from(block.transactions)} />
      </Paper>
    </Container>
  );
}

// ----- HELPERS -----

const blockService = new BlockService();
