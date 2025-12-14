'use client'

import logo from "../images/xx.png"
import { useState } from "react";
import {MyAppbar,MyImage,MyTooldbar} from "../styles/navegation.styles";
import React from "react";
import { Search } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import SearchInput from "./searchappbar";





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
            <MyImage src={logo} alt="Logo"/>  
          </div>
          {/*   */}
          <SearchInput/>
        </MyTooldbar>
      </MyAppbar>
    </>
  )


}