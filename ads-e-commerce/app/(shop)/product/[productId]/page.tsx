import { findOneProduct } from "@/services/product.service";
import { Product } from "@/services/types";
import { notFound } from "next/navigation";
import AddToCartButton from "./add-to-cart-button"; // Componente de Cliente

// Rota: /products/123 (productService.findOne)
export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const id = parseInt(params.productId);

  if (isNaN(id)) {
    notFound();
  }

  let product: Product;
  try {
    product = await findOneProduct(id);
  } catch (error) {
    // Tratar 404 de forma específica
    notFound();
  }

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>
        Detalhes do Produto: {product.name}
      </h2>
      <div style={{ display: "flex", gap: "30px" }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "300px", height: "auto", border: "1px solid #eee" }}
        />
        <div style={{ flexGrow: 1 }}>
          <p>
            <strong>Descrição:</strong>{" "}
            {product.description || "Nenhuma descrição fornecida."}
          </p>
          <p>
            <strong>Preço:</strong>{" "}
            <span style={{ fontSize: "1.5em", color: "green" }}>
              R$ {product.price.toFixed(2)}
            </span>
          </p>
          <p>
            <strong>Estoque Disponível:</strong>{" "}
            {product.stock - product.reservedStock}
          </p>

          {/* Componente de Cliente para interação do carrinho */}
          <AddToCartButton
            productId={product.id}
            stock={product.stock - product.reservedStock}
          />
        </div>
      </div>
    </div>
  );
}

