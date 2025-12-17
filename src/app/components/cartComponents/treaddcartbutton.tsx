'use client';

import { Button } from '@mui/material';
import { useCart } from '../../context/_CartContext';
import { useState, useEffect } from 'react';
import AddItemNotification from './additemnotification';
// Certifique-se do caminho correto

type Props = {
  productId: number;
};

export default function AddToCartButtont({ productId }: Props) {
  const { addItem, loading } = useCart();
  
  // 1. Estado para controlar a visibilidade da notificação
  const [showNotification, setShowNotification] = useState(false); 
  
  // 2. Leitura do Token (lado do cliente)
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleClose = () => {
    setShowNotification(false);
  };

  const handleAdd = async () => {
    // 3. Lógica de Login (Se não tiver token, não faz nada e a renderização condicional assume)
    if (!token) {
        // Você pode querer adicionar aqui um redirecionamento ou alertar o usuário,
        // mas a renderização condicional (do seu modelo anterior) já lida com o UX.
        return;
    }

    await addItem(productId, 1);

    // 4. Dispara a notificação APÓS o sucesso
    setShowNotification(true); 
  };
  
  // --- IMPORTANTE: Se o usuário não estiver logado, use o modelo anterior para mostrar o botão de Login.
  if (!token && typeof window !== 'undefined') { // Adicione a lógica de login aqui
    // Se o token for null, renderize o botão/componente de login que você deseja.
    // Como você só forneceu o botão de adicionar, vou assumir que você tem a lógica de login em outro lugar.
    // Por enquanto, apenas desabilito a ação.
  }
  
  // --- Renderização Principal ---
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        onClick={handleAdd}
        disabled={loading}
        sx={{ mt: 1, background: "#FFE600", color: "black" }}
      >
        {loading ? "Adicionando..." : "Adicionar ao carrinho"}
      </Button>

      {/* 5. Usa o componente de notificação e passa o estado */}
      <AddItemNotification
        open={showNotification}
        onClose={handleClose}
        message="Produto adicionado ao carrinho!"
        severity="success"
      />
    </>
  );
}