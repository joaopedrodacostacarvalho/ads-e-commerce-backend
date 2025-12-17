'use client';

import { Button, Box, Typography } from '@mui/material';
import { useCart } from '../../context/_CartContext';
import Link from 'next/link'; // Importe Link para navegação no Next.js
import { useEffect, useState } from 'react';

type Props = {
  productId: number;
};

export default function NewAddCartButton({ productId }: Props) {
  const { addItem, loading } = useCart();
  
  // 1. Estado para armazenar o token e status de carregamento inicial
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Para garantir que o LS é lido no cliente

  // 2. Recupera o token APENAS no lado do cliente
  useEffect(() => {
    // Verifica se estamos no ambiente do navegador (window está disponível)
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }
    setIsClient(true);
  }, []);

  const handleAdd = async () => {
    // 3. Validação principal: O contexto já fará a checagem no addItem,
    // mas aqui garantimos a UX de login.
    if (!token) {
      // Como a validação visual (Botão/Box) já foi feita abaixo, 
      // tecnicamente não precisamos de um alerta aqui, mas se quiser, pode manter.
      console.warn("Usuário não logado. Redirecionamento necessário.");
      return; 
    }
    
    await addItem(productId, 1); // Continua com o fluxo de adicionar ao carrinho
  };

  // Se ainda não carregou no lado do cliente, mostra um placeholder ou null
  if (!isClient) {
    return (
        <Button fullWidth variant="contained" disabled sx={{ mt: 1 }}>
            Carregando...
        </Button>
    );
  }

  // 4. Renderiza o Componente de Login se o token for NULL/UNDEFINED
  if (!token) {
    return (
      <Box 
        sx={{ 
          mt: 1, 
          p: 1, 
          borderRadius: 1, 
          textAlign: 'center',
          backgroundColor: '#f5f5f5', // Cor de fundo suave
          border: '1px solid #ffaa00'
        }}
      >
        <Typography variant="body2" color="textSecondary" mb={1}>
          Faça login para adicionar!
        </Typography>
        <Link href="http://localhost:3001/login" passHref style={{ textDecoration: 'none' }}>
          <Button
            size="small"
            fullWidth
            variant="contained"
            sx={{ background: '#FF4500', color: 'white' }}
          >
            Ir para Login
          </Button>
        </Link>
      </Box>
    );
  }

  // 5. Renderiza o Botão de Adicionar ao Carrinho se o token EXISTIR
  return (
    <Button
      fullWidth
      variant="contained"
      onClick={handleAdd}
      disabled={loading}
      sx={{ mt: 1 , background: '#FFE600', color: 'black'}}
    >
      {loading ? 'Adicionando...' : 'Adicionar ao carrinho'}
    </Button>
  );
}