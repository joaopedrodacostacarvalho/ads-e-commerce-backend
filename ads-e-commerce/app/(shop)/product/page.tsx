import { findAllProducts } from "@/services/product.service";
import { Product, ProductFilterParams } from "@/services/types";

// Função para buscar dados do lado do servidor (Server Component)
async function getProducts(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<Product[]> {
  const filters: ProductFilterParams = {
    name: searchParams.name as string,
    categoryId: searchParams.categoryId
      ? parseInt(searchParams.categoryId as string)
      : undefined,
    minPrice: searchParams.minPrice
      ? parseFloat(searchParams.minPrice as string)
      : undefined,
    maxPrice: searchParams.maxPrice
      ? parseFloat(searchParams.maxPrice as string)
      : undefined,
  };

  // Filtra valores inválidos para não enviar para a API
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  return findAllProducts(validFilters);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await getProducts(searchParams);

  return (
    <div>
      <h2>🛒 Catálogo de Produtos</h2>
      {/* O formulário de filtros e a lógica de busca seriam implementados em um Client Component */}
      {products.length === 0 ? (
        <p>Nenhum produto encontrado com os filtros aplicados.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{ border: "1px solid #ddd", padding: "15px" }}
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                style={{ width: "100%", height: "auto" }}
              />
              <h3>{p.name}</h3>
              <p>R$ {p.price.toFixed(2)}</p>
              <a href={`/products/${p.id}`}>Ver Detalhes</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
