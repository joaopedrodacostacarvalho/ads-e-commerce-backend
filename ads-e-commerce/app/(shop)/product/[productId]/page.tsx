import { findOneProduct } from "@/services/product.service";
import { notFound } from "next/navigation";
import AddToCartButton from "./add-to-cart-button";

interface PageProps {
  params: { productId: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const id = parseInt(params.productId);
  if (isNaN(id)) notFound();

  let product;
  try {
    product = await findOneProduct(id);
  } catch {
    notFound();
  }

  const stockAvailable = product.stock - product.reservedStock;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 md:w-1/2 bg-gray-100 flex items-center justify-center h-96 md:h-auto">
          {product.imageUrl ? (
            <img
              className="h-full w-full object-contain"
              src={product.imageUrl}
              alt={product.name}
            />
          ) : (
            <span className="text-gray-400">Sem Imagem</span>
          )}
        </div>
        <div className="p-8 md:w-1/2 flex flex-col">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Categoria #{product.categoryId}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="mt-4 text-gray-500">
            {product.description || "Sem descrição disponível."}
          </p>

          <div className="mt-6 flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">
              R$ {product.price.toFixed(2)}
            </span>
            <span className="ml-2 text-sm text-gray-500">unidade</span>
          </div>

          <div className="mt-6">
            {/* Componente Cliente para lógica de adicionar ao carrinho */}
            <AddToCartButton
              productId={product.id}
              stock={stockAvailable}
              isActive={product.isActive}
            />
          </div>

          <div className="mt-auto pt-6 text-sm text-gray-400">
            ID do Produto: {product.id}
          </div>
        </div>
      </div>
    </div>
  );
}
