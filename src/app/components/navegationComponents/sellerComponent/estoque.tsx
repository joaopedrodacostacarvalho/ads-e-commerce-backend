'use client';

import { Button, Box, Typography } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import Link from 'next/link';

export default function EstoqueButton() {
  return (
    <Button
      component={Link}
      href="/estoque"
      sx={{ color: 'black' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Inventory2Icon sx={{ fontSize: 32 }} />
        <Typography variant="caption">
          Estoque
        </Typography>
      </Box>
    </Button>
  );
}