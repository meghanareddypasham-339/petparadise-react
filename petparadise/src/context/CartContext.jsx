import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage on init (Browser Storage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("pp_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes (useEffect)
  useEffect(() => {
    localStorage.setItem("pp_cart", JSON.stringify(cart));
  }, [cart]);

  // Derived state
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(pet) {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === pet.id);
      if (exists) {
        return prev.map((i) => i.id === pet.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...pet, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, totalItems, totalPrice, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
