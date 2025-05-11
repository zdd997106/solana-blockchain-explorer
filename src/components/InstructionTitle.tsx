'use client';

import { Chip, Stack, Typography } from '@mui/material';
import { InnerInstructionDto, InstructionDto } from 'src/services';
import { getInstructionProgramName, getInstructionType } from 'src/utils/instruction';

// ----------

export interface InstructionTitleProps {
  instruction: InstructionDto | InnerInstructionDto;
  index: string;
}

export default function InstructionTitle({ instruction, index }: InstructionTitleProps) {
  // --- SECTIONED ELEMENTS ---

  const sections = {
    indexLabel: (
      <Chip
        label={`#${index}`}
        variant="outlined"
        color="primary"
        size="small"
        sx={{ typography: 'caption' }}
      />
    ),

    title: <Typography variant="h6">{formatInstructionTitle(instruction)}</Typography>,
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" marginBottom={2}>
      {sections.indexLabel}
      {sections.title}
    </Stack>
  );
}

// ----- HELPERS -----

function formatInstructionTitle(instruction: InstructionDto | InnerInstructionDto) {
  return [getInstructionProgramName(instruction), getInstructionType(instruction)]
    .filter(Boolean)
    .join(': ');
}
