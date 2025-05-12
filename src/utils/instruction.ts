import { get, has } from 'lodash';

import { programNameMap } from 'src/constants/maps';

import { InnerInstructionDto, InstructionDto } from 'src/services';
import { formatTitle } from './format';

// ----------

export function getInstructionProgramName(instruction: InstructionDto | InnerInstructionDto) {
  if ('program' in instruction) return `${formatTitle(instruction.program)} Program`;

  if (programNameMap.has(instruction.programId)) return programNameMap.get(instruction.programId)!;

  return `Unknown Program`;
}

export function getInstructionType(instruction: InstructionDto | InnerInstructionDto) {
  if ('parsed' in instruction && has(instruction, 'parsed.info.type'))
    return formatTitle(String(get(instruction, 'parsed.info.type', '')));

  if ('parsed' in instruction && has(instruction, 'parsed.type'))
    return formatTitle(String(get(instruction, 'parsed.type', '')));

  return '';
}
