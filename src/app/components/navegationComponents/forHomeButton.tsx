'use client';

import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function HomeButton() {
  return (
    <Link href="/" passHref>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // p: 2,
          // marginTop: 1,
          borderRadius: 2,
          // border: '1px solid #ddd',
          cursor: 'pointer',
          '&:hover': { backgroundColor: '#c3b431ff' },
        }}
      >
        <HomeIcon sx={{ fontSize: 30, color: 'black' }} />
        <Typography variant="body2" sx={{ color: 'black' }}>
          Home
        </Typography>
      </Box>
    </Link>
  );
}
