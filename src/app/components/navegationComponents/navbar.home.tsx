'use client'

import logo from "../../images/xx.png"
import { useEffect, useState } from "react";
import { MyAppbar, MyImage, MyTooldbar } from "../../styles/navegation.styles";
import React from "react";
import { Search } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Drawer, IconButton, InputBase, useMediaQuery } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import SearchInput from "./searchappbar";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartButton from "./cartButton";
import LoginButton from "./loginButton";

import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Link from "next/link";
import { useAuth } from "../../(rotas)/(auth)/_AuthContext";
import { authStorage } from "../../(rotas)/(auth)/authStorage";
import EstoqueButton from "./sellerComponent/estoque";
import VendasButton from "./sellerComponent/vendas";

import MenuIcon from '@mui/icons-material/Menu';
import HomeButton from "./forHomeButton";


const MyBox = styled(Box)(({ theme }) => ({
  border: 'solid 2px red',
  display: "flex",
  alignItems: 'center',
  justifyContent: "space-evenly",
  gap: 20,


  [theme.breakpoints.down("sm")]: {
    fontSize: 10
  }
}))



function NavItems({ user, logout }: any) {
  if (!user) {
    return (
      <>
         {/* No mobile, sempre aparece Search */}
        {/* {!user && isMobile && <SearchInput />}         //Cannot find name 'isMobile'.

         {/* Só no Desktop, exibe Search quando não logado */}
         {/* {!isMobile && !user && <SearchInput />} */}
        {/* <SearchInput /> */}
        <LoginButton label="Login" href="/login" />
        <HomeButton/>
        <CartButton />
      </>
    );
  }

  if (user.role === 'vendedor') {
    return (
      <>
        <EstoqueButton />
        <VendasButton />
        <LoginButton label="Perfil" href="/client-profiler" />
        <Button onClick={logout}>Sair</Button>
      </>
    );
  }

  if (user.role === 'consumidor') {
    return (
      <>
        {/* <SearchInput/> */}
        <LoginButton label="Perfil" href="/client-profiler"/>
        <HomeButton/>
        <CartButton />
        <Button onClick={logout}>Sair</Button>
      </>
    );
  }

  return null;
}


export default function Navegation() {
  
  // pegando a largura da tela
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false); 


  const { user, logout } = useAuth();
  console.log(user);

  return (
    <>
      <>
      <MyAppbar position="static" sx={{}}>
        <MyTooldbar>
        <Link href="/" passHref>
          <MyImage src={logo} alt="Logo" />
        </Link>

        {/* DESKTOP */}
        {!isMobile && (
          <MyBox>
            {!user && <SearchInput />}
            <NavItems user={user} logout={logout} />
          </MyBox>
        )}

        {/* MOBILE */}
        {isMobile && (
          <>

            {/* Search sempre visível no mobile (não logado) */}
            {!user && <SearchInput />}
            


            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={open}
              onClose={() => setOpen(false)}
              sx={{width: 130, p: 2}}
            >
              <Box sx={{ width: 140, height: '100%', p: 2, border: 'solid 2px red', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', gap:1 }}>
                <NavItems user={user} logout={logout} />
              </Box>
            </Drawer>
          </>
          )}
           </MyTooldbar>
          {/* <MyTooldbar>
            <div style={{ display: 'flex', alignItems: 'center', border: 'solid, 2px, red' }}>
              <Link href="/" passHref>
                <MyImage src={logo} alt="Logo" />
              </Link>
            </div>
            <MyBox>
              {!user && (
                <>
                 
                  <SearchInput />
                  <CartButton />
                  <LoginButton label="Login"  href="/login" />
                </>
              )}
              {user && user.role == 'vendedor' &&(
                <>
              
                  <EstoqueButton/>
                  <VendasButton/>
                  <LoginButton label="Perfil"  href="/profile" />
                  <Button onClick={logout}>Sair</Button>
                
                </>
              )}
              {user && user.role == 'consumidor' &&(
                <>
                  <h1>component consumidor A</h1>
                  <h1>component B</h1>
                  <CartButton />
                  <Button onClick={logout}>Sair</Button>
                </>
              )}
            </MyBox>
          </MyTooldbar> */}
        </MyAppbar>
      </>
    </>
  )


}
