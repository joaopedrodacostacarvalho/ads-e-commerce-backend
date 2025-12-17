import { InputBase, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useProducts } from '../../(rotas)/(client-area)/client-products/_NewProductContext';


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
  const [value, setValue] = useState("");
  const { searchByName } = useProducts();

  const handleSearch = () => {
    searchByName(value.trim());
  };

  
  return (
    <SearchWrapper sx={{'border':'solid, 2px , red'}}>
      <InputBase
        placeholder="Search…"
        // inputProps={{ 'aria-label': 'search' }}
        sx={{ width: '100%', ml: 1 }}


        onChange={(e) => setValue(e.target.value)}
        inputProps={{ "aria-label": "search" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </SearchWrapper>
  );
}
