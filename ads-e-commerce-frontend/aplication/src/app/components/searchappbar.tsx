import { InputBase, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';


const SearchWrapper = styled('div')(({ theme }) => ({  
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '5px',
  padding: '5px 10px',
  width: '700px',

   [theme.breakpoints.down("md")]: {
    width: '200px',
    height: '40px'
  },
  
  [theme.breakpoints.down("sm")]: {
    width: '150px',
    height: '30px'
  }
}))

export default function SearchInput() {
  return (
    <SearchWrapper>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        sx={{ width: '100%', ml: 1 }}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </SearchWrapper>
  );
}
