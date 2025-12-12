import Produto from "@/components/Produto";
import { Product } from "@/services/types";


// import Image from "next/image";
async function getProdutos() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Falhou a busca de produtos");
  }

  return res.json();
}

export default async function Home() {
  const produtos = await getProdutos();
  console.log(produtos);

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {produtos.map((prod: Product) => (
          <Produto key={prod.id} produto={prod}></Produto>
        ))}
      </div>
      <h1>Hello World</h1>
    </div>
  );
}
