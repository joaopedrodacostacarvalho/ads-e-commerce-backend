import Link from "next/link";
import React from "react";

export default function Login(){

  return <>(
  <h1>Pagina de LOGIN!</h1>
  <h2>Ir para pagina register: <Link href="/register"> ir </Link></h2>
  <h2>Ir para pagina Home: <Link href="/"> ir </Link></h2>
  
  ) </>

}