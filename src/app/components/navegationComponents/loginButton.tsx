
import { Button, IconButton, styled } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';


import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from "next/link";


const MyAccountCircleIcon = styled(AccountCircleIcon)(({ theme }) => ({
  fontSize: 33,

  // [theme.breakpoints.down("sm")]: {
  //   fontSize: 25
  // }
}))

const MyTypography = styled(Typography)(({ theme }) => ({
  fontSize: 13,

  // [theme.breakpoints.down("sm")]: {
  //   fontSize: 10
  // }
}))

type LoginButtonProps = {
  label: string;
  href:string;
};

export default function LoginButton({ label, href}: LoginButtonProps) {

  return (
    <>
    <Link href={href} passHref>
    <Button sx={{ color: 'black' }}>
      {/* O href neste botão faz com que ele nos leve para a tela de login*/}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 'silid, 2px, red'
        }}
      >
        {/* <AccountCircleIcon sx={{ fontSize: 40 }} /> */}
        <MyAccountCircleIcon />
        {/* <Typography variant="caption" sx={{fontSize: 15}}>Login</Typography> */}
        <MyTypography variant="caption">{label}</MyTypography>
      </Box>
    </Button>
    </Link>
    </>
  );
}

