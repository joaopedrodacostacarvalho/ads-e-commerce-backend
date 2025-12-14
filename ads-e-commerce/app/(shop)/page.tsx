import { findAllProducts } from "@/services/product.service";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/services/types"; // Importando o tipo para Products

export const revalidate = 60;

export default async function HomePage() {
  // Use um tipo específico para garantir que o resultado da Promise é um array de Product
  let products: Product[] = [];
  let error: string | null = null;

  try {
    const apiResponse = await findAllProducts();

    if (Array.isArray(apiResponse)) {
      products = apiResponse;
    } else {
      // Se não for um array, loga o retorno inesperado e define o erro
      console.error("A API retornou um formato inesperado:", apiResponse);
      error = "A estrutura de dados da API está incorreta.";
    }
  } catch (e) {
    console.error("Erro crítico ao carregar home:", e);
    // Erro de rede, 404, 500, etc.
    error =
      "Ocorreu um erro ao carregar a vitrine. Tente novamente mais tarde.";
  }

  return (
    <div className="space-y-8">
      {/* Banner / Hero Section */}
      <section className="text-center py-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Bem-vindo à ADS Store
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Projeto de Web III
        </p>
      </section>

      {/* Tratamento de Erro Visual */}
      {error ? (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
          <h3 className="text-lg font-medium text-red-800">
            Indisponibilidade Temporária
          </h3>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      ) : (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Destaques</h2>
            <a
              href="/products"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Ver tudo &rarr;
            </a>
          </div>

          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              Nenhum produto em destaque no momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Uso seguro do .slice(), pois 'products' é garantido ser um Array */}
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
