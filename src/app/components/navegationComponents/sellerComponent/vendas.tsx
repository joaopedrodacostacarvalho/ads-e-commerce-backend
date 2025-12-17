'use client';

import { Button, Box, Typography, styled } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Link from 'next/link';

const MyStorefrontIcon = styled(StorefrontIcon)(({ theme }) => ({
  fontSize: 40,

  [theme.breakpoints.down("sm")]: {
    fontSize: 25
  }
}))

export default function VendasButton() {
  return (
    <Button
      component={Link}
      href="/vendas"
      sx={{ color: 'black' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StorefrontIcon sx={{ fontSize: 32 }} />
        <Typography variant="caption">
         vendas
        </Typography>
      </Box>
    </Button>
  );
}
