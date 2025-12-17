"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { authStorage } from "../(rotas)/(auth)/authStorage";
import { decodeToken } from "../(rotas)/(auth)/jwt";

/* =======================
   TYPES
======================= */

export type CartItem = {
  id: number;
  productId: number;
  name: string;
  price: string;
  quantity: number;
  subtotal: number;
  imageUrl:string
};

export type Cart = {
  id_cart: number;
  items: CartItem[];
};

type CartContextType = {
  cart: Cart | null;
  loading: boolean;
  loadingProductId: number | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

/* =======================
   CONTEXT
======================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* =======================
   PROVIDER
======================= */

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  /* =======================
     FETCH CART
  ======================= */

  const fetchCart = async () => {
    if (!token) { 
        setCart(null); // Garante que o estado está limpo
        return; 
    }
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:3000/cart/mycarts",
        { headers }
      );

      if (res.status === 401 || res.status === 403 || res.status === 404) {
      console.info("Usuário sem carrinho disponível");
      setCart(null);
      return;
      }

      if (!res.ok) throw new Error("Erro ao buscar carrinho");

      // if(user.role == 'consumidor'){
      //     if (!res.ok) throw new Error("Erro ao buscar carrinho");
      // }
      

      const data: Cart = await res.json();
      console.log("RETORNO DA API /cart/mycarts:", data);
      setCart(data);
      console.log(`CART DO CONTEXT:::${data?.items.length}`) //NAO VEJO PRINTADO NO CONSOLE
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     ADD ITEM
  ======================= */
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const addItem = async (productId: number, quantity: number) => {
    setLoadingProductId(productId);
    // if (!token) {
        
    //     console.warn("Tentativa de adicionar item sem token. Ação bloqueada no Contexto.");
    //     return; 
    // }
    try {
      setLoading(true);

      await fetch("http://localhost:3000/cartitem/add", {
        method: "POST",
        headers,
        body: JSON.stringify({ productId, quantity }),
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingProductId(null);
    }
  };

  /* =======================
     UPDATE QUANTITY
  ======================= */

  const updateQuantity = async (
    cartItemId: number,
    quantity: number
  ) => {
    try {
      setLoading(true);

      await fetch("http://localhost:3000/cartitem/quantity", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ cartItemId, quantity }),
      });

      await fetchCart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     REMOVE ITEM
  ======================= */

  const removeItem = async (cartItemId: number) => {
    try {
      setLoading(true);

      await fetch(
        `http://localhost:3000/cartitem/${cartItemId}`,
        {
          method: "DELETE",
          headers,
        }
      );

      await fetchCart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     CLEAR CART
  ======================= */

  const clearCart = async () => {
    try {
      setLoading(true);

      await fetch("http://localhost:3000/cart/clear", {
        method: "DELETE",
        headers,
      });

      setCart(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     AUTO LOAD
  ======================= */

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        loadingProductId,
        fetchCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =======================
   HOOK
======================= */

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
