"use client";

import { createContext, useContext, useEffect, useState } from "react";

/* =======================
   TYPES
======================= */

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  reservedStock: number;
  categoryId: number;
  isActive: boolean;
  imageUrl: string;
  sellerId: number;
};

type Meta = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

type Filters = {
  name?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
};

type ProductContextType = {
  products: Product[];
  meta: Meta | null;
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  setFilters: (filters: Filters) => void;
  searchByName: (name: string) => void;
};

/* =======================
   CONTEXT
======================= */

const ProductContext = createContext<ProductContextType | undefined>(undefined);

/* =======================
   PROVIDER
======================= */

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        ...(filters.name && { name: filters.name }),
        ...(filters.categoryId && { categoryId: String(filters.categoryId) }),
        ...(filters.minPrice && { minPrice: String(filters.minPrice) }),
        ...(filters.maxPrice && { maxPrice: String(filters.maxPrice) }),
      });

      const response = await fetch(
        `http://localhost:3000/product/getall?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const result = await response.json();

      setProducts(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchByName = (name: string) => {
    setPage(1); // reset paginação
    setFilters((prev) => ({
      ...prev,
      name: name || undefined,
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, [page, filters]);

  return (
    <ProductContext.Provider
     
      value={{
        products,
        meta,
        loading,
        page,
        setPage,
        setFilters,
        searchByName
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

/* =======================
   HOOK
======================= */

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return ctx;
}