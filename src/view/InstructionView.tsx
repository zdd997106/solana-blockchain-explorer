'use client';

import { get, has } from 'lodash';
import { Stack } from '@mui/material';

import type { InnerInstructionDto, InstructionDto } from 'src/services';
import { formatTitle } from 'src/utils';
import { withDefaultProps } from 'src/hoc';
import { OverviewItem as BasedOverviewItem } from 'src/components';

const OverviewItem = withDefaultProps(BasedOverviewItem, { subjectWidth: 180 });

// ----------

interface InstructionViewProps {
  instruction: InstructionDto | InnerInstructionDto;
}

export default function InstructionView({ instruction }: InstructionViewProps) {
  const programId = get(instruction, 'programId', 'Unavailable');

  // --- FUNCTIONS ---

  const findInstructionInfo = () => {
    if (!('parsed' in instruction) || !instruction.parsed.info) return null;
    return instruction.parsed.info;
  };

  const getInstructionDescription = (key: string, value: unknown) => {
    if (has(value, 'uiAmountString')) {
      return get(value, 'uiAmountString', value);
    }
    return value;
  };

  const isCopyable = (key: string) => {
    if (key.endsWith('Program')) return true;
    if (key.endsWith('Account')) return true;
    return [
      'source',
      'destination',
      'owner',
      'mint',
      'data',
      'authority',
      'account',
      'wallet',
    ].includes(key);
  };

  // --- SECTIONED ELEMENTS ---

  const sections = {
    program: <OverviewItem subject="Program" value={programId} copyable />,
    instructionData: <OverviewItem subject="Data" value={get(instruction, 'data')} copyable />,
    instructionInfoList: Object.entries(findInstructionInfo() ?? {}).map(([key, value]) => (
      <OverviewItem
        key={key}
        subject={formatTitle(key)}
        value={getInstructionDescription(key, value)}
        copyable={isCopyable(key)}
      />
    )),
  };

  return (
    <Stack spacing={2}>
      {sections.program}
      {'data' in instruction && sections.instructionData}
      {sections.instructionInfoList}
    </Stack>
  );
}
