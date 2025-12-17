'use client';

import { Button } from '@mui/material';
import { useCart } from '../../context/_CartContext';
// import { useCart } from '@/app/context/_CartContext';

type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  // const { addItem, loading } = useCart();
  const { cart, addItem, loading } = useCart();

  const handleAdd = async () => {
    await addItem(productId, 1); // adiciona 1 unidade
  };

  return (
    <Button
      fullWidth
      variant="contained"
      // color="primary"
      onClick={handleAdd}
      disabled={loading}
      sx={{ mt: 1 , background: '#FFE600', color: 'black'}}
    >
      {loading ? 'Adicionando...' : 'Adicionar ao carrinho'}
    </Button>
  );
}
