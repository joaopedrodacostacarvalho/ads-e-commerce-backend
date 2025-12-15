'use client'
import { useState } from 'react';
import Link from 'next/link';
import Navegation from './components/navegationComponents/navbar.home';




 export default function Home() {

  const acionarContador = () => {
  return setContador(contador + 1)
}

  const [contador, setContador] = useState(0)
  const [mostrar, setMostrar] = useState(false)

  return (
    <>
    <Navegation />
    <div>
      <h1>Página home!! {contador} </h1>
      <h2>Chamar outa página:<Link href="/login">Ir para Login</Link></h2>
      <button onClick={() => {acionarContador()}}>CLIQUE AQUI +</button>
      <button onClick={() => {setContador(contador - 1)}}>CLIQUE AQUI -</button>
      <button onClick={() => setMostrar(!mostrar)}>MOSTRAR?? : {mostrar}</button>

      {mostrar ? <p>MOSTRANDO</p>: mostrar}
    </div>
    </>
  );
}
