'use client'

import logo from "../../images/xx.png"
import { useState } from "react";
import { MyAppbar, MyImage, MyTooldbar } from "../../styles/navegation.styles";
import React from "react";
import { Search } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from "@mui/material";
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import SearchInput from "./searchappbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartButton from "./cartButton";
import LoginButton from "./loginButton";

import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const MyBox = styled(Box)(({ theme }) => ({  
  border:'solid 2px red', 
  display: "flex", 
  alignItems: 'center', 
  justifyContent: "space-evenly",
  gap: 10,
  

  [theme.breakpoints.down("sm")]: {
    fontSize: 10
  }
}))


export default function Navegation() {

  const [openDrawer, setOpenDrawer] = useState(false)


  const togleDrawer = () => {
    return setOpenDrawer(!openDrawer);
  }



  return (
    <>
      <MyAppbar position="static">
        <MyTooldbar>
          <div style={{ display: 'flex', alignItems: 'center', border: 'solid, 2px, red' }}>
            {/*erro simples aqui na iomagem*/}
            <MyImage src={logo} alt="Logo" />
          </div>
          {/*   */}
          <MyBox>
            <SearchInput />
            <CartButton />
            <LoginButton/>
          </MyBox>
        </MyTooldbar>
      </MyAppbar>
    </>
  )


}