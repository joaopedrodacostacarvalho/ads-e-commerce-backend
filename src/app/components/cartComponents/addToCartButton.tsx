'use client';

"use client";

import { Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/_CartContext";

type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  const { addItem, loading, loadingProductId } = useCart();
  const [openAlert, setOpenAlert] = useState(false);
  const router = useRouter();
  const isLoading = loadingProductId === productId;
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const handleAdd = async () => {
    console.log("handleAdd chamado");

    if (!token) {
      setOpenAlert(true); // 👈 muda estado
      return;
    }

    await addItem(productId, 1);
  };

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        onClick={handleAdd}
        disabled={isLoading}
        sx={{ mt: 1, background: "#FFE600", color: "black" }}
      >
        {isLoading ? "Adicionando..." : "Adicionar ao carrinho"}
      </Button>

      {/* 🔔 ALERTA CONTROLADO POR ESTADO */}
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => router.push("/login")}
            >
              LOGIN
            </Button>
          }
        >
          Você precisa estar logado para adicionar ao carrinho
        </Alert>
      </Snackbar>
    </>
  );
}


// import { Button } from '@mui/material';
// import { useCart } from '../../context/_CartContext';
// import { useState } from 'react';
// import ScrollToTopButton from './ofComponent';
// import { Button } from '@mui/material';
// // import { useCart } from '@/app/context/_CartContext';

// type Props = {
//   productId: number;
// };

// export default function AddToCartButton({ productId }: Props) {
//                  const { addItem, loading } = useCart();
//   const [showScroll, setShowScroll] = useState(false);

//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null;

//   const handleAdd = async () => {
//     console.log("hundle add chamado")
//     if (!token) return alert('sem token'); //ta sendo chamado, NAO VOLTA PARA O BUTTON
//     await addItem(productId, 1);

//     setShowScroll(true); // 👈 dispara renderização
//   };

//   return (
//     <>
//       <Button
//         fullWidth
//         variant="contained"
//         onClick={handleAdd}
//         disabled={loading}
//         sx={{ mt: 1, background: "#FFE600", color: "black" }}
//       >
        
//         {loading ? "Adicionando..." : "Adicionar ao carrinho"}
        
//       </Button>

//       {console.log("FORA DO CLIQUE")}

//       {showScroll ? alert('true') : showScroll}
//     </>
//   );
  // const { addItem, loading } = useCart();
  // const { cart, addItem, loading } = useCart();
  // / 1. Estado para armazenar o token e status de carregamento inicial
  // const token = localStorage.getItem('token');
  
  // const handleAdd = async () => {
  //   if(token){
  //     await addItem(productId, 1);
  //    }

  //    return (
  //     <ScrollToTopButton/>
  //    )
  //   // await addItem(productId, 1); // adiciona 1 unidade
  // };

  // const vrify = async () => {
  //    if(token){
  //     await addItem(productId, 1);
  //    }

  //    return (
  //     <ScrollToTopButton/>
  //    )
  // }

  // return (
  //   <Button
  //     fullWidth
  //     variant="contained"
  //     // color="primary"
  //     onClick={handleAdd}
  //     disabled={loading}
  //     sx={{ mt: 1 , background: '#FFE600', color: 'black'}}
  //   >
  //     {loading ? 'Adicionando...' : 'Adicionar ao carrinho'}
  //   </Button>
  // );
// }
