import { findAllProducts } from "@/services/product.service";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/services/types";

// Garante que o fetch ocorra dinamicamente em cada requisição
export const dynamic = "force-dynamic";

export default async function ProductsListPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const apiResponse = await findAllProducts();

    // Garantia de que o retorno é um array, conforme correção anterior
    if (Array.isArray(apiResponse)) {
      // Filtra produtos inativos, pois esta é a lista de vendas
      products = apiResponse.filter((p) => p.isActive);
    } else {
      console.error(
        "A API retornou um formato inesperado para a lista de produtos."
      );
      error = "A estrutura de dados da API está incorreta.";
    }
  } catch (e) {
    console.error("Erro ao carregar a lista de produtos:", e);
    // Se a API estiver offline ou inacessível
    error =
      "Ocorreu um erro ao carregar os produtos. Verifique o servidor da API (porta 3000).";
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">
        Todos os Produtos
      </h1>

      {error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <h3 className="text-lg font-medium text-red-800">
            Indisponibilidade
          </h3>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-gray-600 py-10">
            Nenhum produto ativo encontrado no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
