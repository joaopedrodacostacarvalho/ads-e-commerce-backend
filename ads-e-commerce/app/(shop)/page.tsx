import { findAllProducts } from "@/services/product.service";
import { Product } from "@/services/types";
import Produto from "@/components/Produto";

// A função assíncrona da página agora usa o serviço que, por sua vez, usa Axios.
async function getProdutos() {
  try {
    // ESTA LINHA CHAMA A FUNÇÃO DE SERVIÇO QUE UTILIZA AXIOS INTERNAMENTE.
    const produtos = await findAllProducts({});
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Falhou a busca de produtos na API.");
  }
}

export default async function Home() {
  let produtos: Product[] = [];
  try {
    produtos = await getProdutos();
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
        <h1>Falha ao Carregar Produtos</h1>
        <p>
          Ocorreu um erro ao conectar-se à API ou buscar os dados. Tente
          verificar se o backend NestJS está rodando e se a baseURL em
          `src/services/api.ts` está correta.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {produtos.map((prod: Product) => (
          <Produto key={prod.id} produto={prod} />
        ))}
      </div>
      <h1>Hello World</h1>
    </div>
  );
}
