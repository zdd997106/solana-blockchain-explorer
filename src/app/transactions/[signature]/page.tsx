import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { Card, Container, Stack, Typography } from '@mui/material';

import { InnerInstructionDto, InstructionDto, TransactionService } from 'src/services';
import { InstructionTitle } from 'src/components';
import InstructionView from 'src/view/InstructionView';
import TransactionView from 'src/view/TransactionView';

const transactionService = new TransactionService();

// ----------

interface PageProps {
  params: Promise<{ signature: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const transaction = await transactionService.getTransaction(params.signature);

  if (!transaction) {
    return notFound();
  }

  const instructions = transaction.transaction.message.instructions ?? [];

  const innerInstructionsMap = new Map(
    transaction.meta?.innerInstructions?.map((item) => [
      item.index,
      item.instructions as InnerInstructionDto[],
    ]) ?? [],
  );

  // --- SECTIONED ELEMENTS ---

  const sections = {
    transactionDetail: (
      <Card variant="outlined" sx={{ padding: 4, marginBottom: 5 }}>
        <TransactionView transaction={transaction} />
      </Card>
    ),

    instruction: (instruction: InstructionDto, index: number) => {
      const innerInstructions = innerInstructionsMap.get(index) ?? [];
      return (
        <Card key={index} variant="outlined" sx={{ padding: 2 }}>
          <InstructionTitle index={`${index + 1}`} instruction={instruction} />
          <InstructionView instruction={instruction} />

          {innerInstructions.length > 0 && (
            <Stack spacing={2} sx={{ marginTop: 2 }}>
              {innerInstructions.map((innerInstruction, innerIndex) => (
                <Fragment key={innerIndex}>
                  {sections.innerInstruction(innerInstruction, `${index}.${innerIndex}`)}
                </Fragment>
              ))}
            </Stack>
          )}
        </Card>
      );
    },

    innerInstruction: (instruction: InnerInstructionDto, index: string) => (
      <Card variant="outlined" sx={{ padding: 2 }}>
        <InstructionTitle index={`${index + 1}`} instruction={instruction} />
        <InstructionView instruction={instruction} />
      </Card>
    ),
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 5 }}>
      <Typography variant="h4" gutterBottom>
        Transaction Detail
      </Typography>

      {sections.transactionDetail}
      <Stack spacing={2}>
        {instructions.map((instruction, index) => (
          <Fragment key={index}>{sections.instruction(instruction, index)}</Fragment>
        ))}
      </Stack>
    </Container>
  );
}
