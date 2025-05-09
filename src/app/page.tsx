import { Container, Typography } from '@mui/material';

export default async function Home() {
  return (
    <Container sx={{ paddingY: 5 }}>
      <Typography variant="h4" gutterBottom>
        Latest Blocks
      </Typography>
    </Container>
  );
}
