'use client';

import { Button } from '@mui/material';
import { useCart } from '../../context/_CartContext';
import { useAuth } from '../../(rotas)/(auth)/_AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useCart } from '@/app/context/_CartContext';

type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  // const { addItem, loading } = useCart();
  const { cart, addItem, loading } = useCart();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (user && user.role === "consumidor") {
      setIsLogged(true);
    }
  }, [user]);


  const handleAdd = async () => {
    if (isLogged) {
      await addItem(productId, 1); // adiciona 1 unidade
    } else {
      router.push("/login");
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      // color="primary"
      onClick={handleAdd}
      disabled={loading || user.role === "vendedor"}
      sx={{ mt: 1, background: '#FFE600', color: 'black' }}
    >
      {loading ? 'Adicionando...' : 'Adicionar ao carrinho'}
    </Button>
  );
}
