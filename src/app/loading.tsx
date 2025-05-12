import { CircularProgress, Stack } from '@mui/material';

export default function Loading() {
  return (
    <Stack
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100vw', top: 0, left: 0 }}
    >
      <CircularProgress size={100} />
    </Stack>
  );
}
