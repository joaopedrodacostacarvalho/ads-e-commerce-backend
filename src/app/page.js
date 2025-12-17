'use client'
import { useState } from 'react';
import Link from 'next/link';
import Navegation from './components/navegationComponents/navbar.home';
import ProfilerConfig from './(rotas)/(client-area)/profile.client.config';
import Products from './(rotas)/(client-area)/client-products/page';
import { useCart } from './context/_CartContext';
import { Box } from '@mui/material';
// import Products from './(rotas)/(client-area)/client-products/page';
import { decodeToken } from './(rotas)/(auth)/jwt';


//IMPLEMENTAR
 export default function Home() {

//  const token = getToken()
//  const user = decodeToken(token)

//   const acionarContador = () => {
//   return setContador(contador + 1)
// }
  
//   if(user.role = "vendedor"){
//     renderizar para vendas
//   }

  const [contador, setContador] = useState(0)
  const [mostrar, setMostrar] = useState(false)
  const { cart, addItem, updateQuantity, removeItem, loading } = useCart();
  return (
    <>
    <Navegation />
    <div>
      <Products/>
      {/* ter um if , se for client , rendderiza components de clients */}
      {/* Client */}
      <h1>Página home!! {contador} </h1>
      <h2>Chamar outa página:<Link href="/login">Ir para Login</Link></h2>
      <button onClick={() => {acionarContador()}}>CLIQUE AQUI +</button>
      <button onClick={() => {setContador(contador - 1)}}>CLIQUE AQUI -</button>
      <button onClick={() => setMostrar(!mostrar)}>MOSTRAR?? : {mostrar}</button>

    {console.log(`carttt visu::: ${cart?.items}`)}
    
       {cart?.items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
          }}
        >

          <p>{item.id}</p>
          <p>{item.name}</p>
        </Box>
      ) )} 

       {/* {cart.items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
          }}
        ></Box> )} */}

      {mostrar ? <p>MOSTRANDO</p>: mostrar}

      

      
    </div>
    </>
  );
}
