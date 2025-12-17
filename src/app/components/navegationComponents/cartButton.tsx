import { Badge, IconButton, styled } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../context/_CartContext';
import { useState } from 'react';
import CartDrawer from './cartDrawer';




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
  const [open, setOpen] = useState(false);
  const { cart, addItem, loading } = useCart();
  const tamanho = cart?.items.length
  return (
    <>
    <IconButton aria-label="cart" onClick={() => setOpen(true)}>
      <Badge badgeContent={tamanho} color="error" sx={{}}>
        {/* <ShoppingCartIcon sx={{'font-size': 35}}/> */}
        <MyShoppingCartItem />
      </Badge>
    </IconButton>

    <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
