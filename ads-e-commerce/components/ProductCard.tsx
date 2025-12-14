import React from "react";
import Link from "next/link";
import { Product } from "@/services/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const stockAvailable = product.stock - product.reservedStock;
  const hasStock = stockAvailable > 0;

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow h-full bg-white">
      <div className="w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover h-full w-full"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400">Sem Imagem</span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
        {product.name}
      </h3>

      <p className="text-xl font-bold text-green-600 mb-1">
        R$ {product.price.toFixed(2)}
      </p>

      <p
        className={`text-sm mb-4 ${
          hasStock ? "text-gray-500" : "text-red-500"
        }`}
      >
        {hasStock ? `Estoque: ${stockAvailable}` : "Esgotado"}
      </p>

      <Link
        href={`/products/${product.id}`}
        className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full"
      >
        Ver Detalhes
      </Link>
    </div>
  );
}
