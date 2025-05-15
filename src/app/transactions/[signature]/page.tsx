import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import { Card, Container, Stack, Typography } from '@mui/material';

import { ECluster, InnerInstructionDto, InstructionDto, TransactionService } from 'src/services';
import { InstructionTitle } from 'src/components';
import InstructionView from 'src/view/InstructionView';
import TransactionView from 'src/view/TransactionView';
import AccountsView from 'src/view/AccountsView';
import TransactionLogsView from 'src/view/TransactionLogsView';

// ----------

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// ----------

interface PageProps {
  params: Promise<{ signature: string }>;
  searchParams: Promise<{ cluster?: ECluster }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const transactionService = new TransactionService(searchParams.cluster);
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

  // --- RENDER FUNCTIONS ---

  const renderInstruction = (instruction: InstructionDto, index: number) => {
    const innerInstructions = innerInstructionsMap.get(index) ?? [];
    return (
      <Card key={index} variant="outlined" sx={{ padding: 2 }}>
        <InstructionTitle index={`${index + 1}`} instruction={instruction} />
        <InstructionView instruction={instruction} />

        {innerInstructions.length > 0 && (
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            {innerInstructions.map((innerInstruction, innerIndex) => (
              <Fragment key={innerIndex}>
                {renderInnerInstruction(innerInstruction, `${index + 1}.${innerIndex + 1}`)}
              </Fragment>
            ))}
          </Stack>
        )}
      </Card>
    );
  };

  const renderInnerInstruction = (instruction: InnerInstructionDto, index: string) => (
    <Card variant="outlined" sx={{ padding: 2 }}>
      <InstructionTitle index={index} instruction={instruction} />
      <InstructionView instruction={instruction} />
    </Card>
  );

  // --- SECTIONED ELEMENTS ---

  const sections = {
    transactionDetail: (
      <Card variant="outlined" sx={{ padding: 4, marginBottom: 5 }}>
        <TransactionView transaction={transaction} />
      </Card>
    ),

    accounts: (
      <Card variant="outlined" sx={{ overflow: 'auto' }}>
        <AccountsView
          accounts={Array.from(transaction.transaction.message.accountKeys)}
          transaction={transaction}
        />
      </Card>
    ),

    instructions: (
      <Stack spacing={2}>
        {instructions.map((instruction, index) => (
          <Fragment key={index}>{renderInstruction(instruction, index)}</Fragment>
        ))}
      </Stack>
    ),

    logs: (
      <Card variant="outlined" sx={{ padding: 2 }}>
        <TransactionLogsView
          logs={Array.from(transaction.meta?.logMessages ?? [])}
          instructions={Array.from(transaction.transaction.message.instructions)}
        />
      </Card>
    ),
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 5 }}>
      <Typography variant="h4" marginBottom={4}>
        Transaction Detail
      </Typography>

      <Stack spacing={4}>
        {sections.transactionDetail}
        {withTitle(sections.accounts, 'Account Inputs')}
        {withTitle(sections.instructions, 'Program Instructions')}
        {withTitle(sections.logs, 'Instruction Logs')}
      </Stack>
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
