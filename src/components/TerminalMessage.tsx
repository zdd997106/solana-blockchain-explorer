'use client';

import { Box, Stack, StackProps, styled } from '@mui/material';

// ----------

export interface TerminalMessageProps extends Omit<StackProps, 'direction'> {}

export default function TerminalMessage({ children, color, ...props }: TerminalMessageProps) {
  return (
    <Root {...props} direction="row" spacing={props.spacing ?? 0.5}>
      <Box paddingRight={0.5}>{'>'}</Box>
      <Box component="span" color={color}>
        {children}
      </Box>
    </Root>
  );
}

// ----- STYLED COMPONENTS -----

const Root = styled(Stack)(() => ({
  whiteSpace: 'pre-wrap',
  overflowWrap: 'anywhere',
  fontFamily: 'consolas',
}));
