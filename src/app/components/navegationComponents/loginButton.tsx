
import { Button, IconButton, styled } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';


import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const MyAccountCircleIcon = styled(AccountCircleIcon)(({ theme }) => ({  
  fontSize: 40,
 
  [theme.breakpoints.down("sm")]: {
    fontSize: 25
  }
}))

const MyTypography = styled(Typography)(({ theme }) => ({  
  fontSize: 15,

  [theme.breakpoints.down("sm")]: {
    fontSize: 10
  }
}))

export default function LoginButton() {
  return (
    <Button sx={{color:'black'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 'silid, 2px, red'
        }}
      >
        {/* <AccountCircleIcon sx={{ fontSize: 40 }} /> */}
        <MyAccountCircleIcon/>
        {/* <Typography variant="caption" sx={{fontSize: 15}}>Login</Typography> */}
        <MyTypography variant="caption">Register</MyTypography>
      </Box>
    </Button>
  );
}

