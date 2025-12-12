import Produto from "@/components/Produto";
import { findAllProducts } from "@/services/product.service";
import { Product } from "@/services/types";

export default async function Home() {
  const produtos = await findAllProducts();
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
