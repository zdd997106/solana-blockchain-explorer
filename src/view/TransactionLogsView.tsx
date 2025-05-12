'use client';

import { useMemo } from 'react';
import { Chip as MuiChip, Stack, styled, Typography } from '@mui/material';

import { programNameMap } from 'src/constants/maps';
import { InstructionDto } from 'src/services';
import { withDefaultProps } from 'src/hoc';
import { TerminalMessage } from 'src/components';

const Chip = withDefaultProps(
  styled(MuiChip)(({ theme }) => ({ ...theme.typography.caption, height: 20 })),
  { size: 'small', variant: 'outlined' },
);

// ----------

interface TransactionLogsViewProps {
  logs: string[];
  instructions: InstructionDto[];
}

export default function TransactionLogsView({ logs, instructions }: TransactionLogsViewProps) {
  const groupedLogs = useMemo(() => groupAndOrganizeLogs(logs), [logs]);

  // --- RENDER FUNCTIONS ---

  const renderInstructionLog = (instruction: InstructionDto, index: number) => {
    const sections = {
      instructionTitle: (
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip label={`#${index + 1}`} color={getLogTitleColor(groupedLogs[index] ?? [])} />
          <Typography variant="subtitle2">
            {`${programNameMap.get(instruction.programId) || `Unknown Program`} Instruction`}
          </Typography>
        </Stack>
      ),

      logs: groupedLogs[index]?.slice(1).map((log, i) => (
        <TerminalMessage
          key={i}
          color={getMessageColor(log)}
          typography="caption"
          sx={{ paddingLeft: log.level * 2 }}
        >
          {getLogMessage(log)}
        </TerminalMessage>
      )),
    };

    return (
      <Stack key={index} spacing={1}>
        {sections.instructionTitle}
        {sections.logs}
      </Stack>
    );
  };

  return <Stack spacing={3}>{instructions.map(renderInstructionLog)}</Stack>;
}

// ----- HELPERS -----

function groupAndOrganizeLogs(logs: string[]) {
  let index = -1;
  let level = 0;

  return logs.reduce((collections, log) => {
    // Preparation: parse and check if the log is valid
    const parsed = parseLog(log);
    if (!parsed) return collections;

    // Initialization: when a new program is invoked
    if (getInvokeLevel(parsed.data) === 1) {
      collections[++index] = [];
      level = 0;
    }

    // Update Collection
    collections[index].push({ ...parsed, level });

    // Update Level: when a new program is invoked or finished
    if (parsed.data.startsWith(EToken.INVOKE)) level++;
    else if (isFinished(parsed.data)) level--;

    return collections;
  }, [] as OrganizedLog[][]);
}

function parseLog(log: string) {
  const [, program, data] = log.split(/^Program (\w+):? ([^]+)/);
  if (!program) return null;
  return { message: log, program, data };
}

function getLogMessage(log: OrganizedLog) {
  const programName = programNameMap.get(log.program) || `Unknown Program (${log.program})`;

  if (log.program === EToken.LOG) return `Program logged: "${log.data}"`;
  if (log.data.startsWith(EToken.INVOKE)) return `Program invoked: ${programName}`;
  if (log.data.startsWith(EToken.SUCCESS)) return `Program returned success`;
  if (log.data.startsWith(EToken.FAILED))
    return `Program returned error: "${getErrorMessage(log.data)}"`;
  return log.message;
}

function getMessageColor(log: OrganizedLog) {
  if (log.data.startsWith(EToken.INVOKE)) return 'primary.main';
  if (log.data.startsWith(EToken.SUCCESS)) return `success.main`;
  if (log.data.startsWith(EToken.FAILED)) return `error.main`;
}

function getLogTitleColor(logs: OrganizedLog[]) {
  if (logs.some((log) => log.data.startsWith(EToken.FAILED))) return `error`;
  if (logs.length === 0) return 'default';
  return EToken.SUCCESS;
}

function getInvokeLevel(data: string) {
  const parsedLevel = data.split(/^invoke \[(\d+)\]/)[1];
  return parsedLevel ? Number(parsedLevel) : null;
}

function getErrorMessage(data: string) {
  return data.split(/^failed: /)[1];
}

function isFinished(data: string) {
  return data.startsWith(EToken.SUCCESS) || data.startsWith(EToken.FAILED);
}

// ----- INTERNAL TYPES -----

enum EToken {
  LOG = 'log',
  INVOKE = 'invoke',
  SUCCESS = 'success',
  FAILED = 'failed',
}

interface OrganizedLog {
  program: string;
  data: string;
  message: string;
  level: number;
}
