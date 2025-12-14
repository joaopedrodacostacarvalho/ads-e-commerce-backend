import { Badge, IconButton, styled } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const myIconButton = styled(IconButton)(({ theme }) => ({  
  border: 'solid 2px red',
  backGround: 'whithe'

  //  [theme.breakpoints.down("md")]: {
  //   width: '200px',
  //   height: '40px'
  // },
  
  // [theme.breakpoints.down("sm")]: {
  //   width: '150px',
  //   height: '30px'
  // }
}))

const myBadge = styled(Badge)(({ theme }) => ({  
  'border': 'solid 2px green',
  //  [theme.breakpoints.down("md")]: {
  //   width: '200px',
  //   height: '40px'
  // },
  
  // [theme.breakpoints.down("sm")]: {
  //   width: '150px',
  //   height: '30px'
  // }
}))

const MyShoppingCartItem = styled(ShoppingCartIcon)(({ theme }) => ({  
  fontSize: 35, 
  color: 'black',
  // border: 'solid 2px yellow',
  //  [theme.breakpoints.down("md")]: {
  //   width: '200px',
  //   height: '40px'
  // },
  
  [theme.breakpoints.down("sm")]: {
    fontSize: 28
  }
}))


export default function CartButton() {
  return (
    <IconButton  aria-label="cart" sx={{}}>
      <Badge badgeContent={3} color="error" sx={{}}>
        {/* <ShoppingCartIcon sx={{'font-size': 35}}/> */}
        <MyShoppingCartItem/>
      </Badge>
    </IconButton>
  );
}
