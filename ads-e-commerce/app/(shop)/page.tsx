import { findAllProducts } from '@/services/product.service';
import { Product } from '@/services/types';

export default async function HomePage() {
  let products: Product[] = [];
  try {
    // Busca os 4 primeiros produtos para destaque
    products = await findAllProducts();
  } catch (error) {
    console.error("Erro ao carregar produtos de destaque:", error);
  }

  return (
    <div>
      <h2>✨ Produtos em Destaque</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.slice(0, 4).map((p) => (
          <div key={p.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: 'auto' }} />
            <h4>{p.name}</h4>
            <p>R$ {p.price.toFixed(2)}</p>
            <a href={`/products/${p.id}`}>Ver Detalhes</a>
          </div>
        ))}
      </div>
      <p><a href="/products">Ver todos os produtos...</a></p>
    </div>
  );
}