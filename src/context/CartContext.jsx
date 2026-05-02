import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getProductNamePtBr } from '@/services/products';

const CartContext = createContext(null);
const CART_KEY = 'costavelle_cart';

function readStoredCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored).map(item => ({ ...item, name: getProductNamePtBr(item) })) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, size = product.sizes?.[0] || 'M', quantity = 1) => {
    setItems(current => {
      const existing = current.find(item => item.id === product.id && item.size === size);

      if (existing) {
        return current.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, name: getProductNamePtBr(product), quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: getProductNamePtBr(product),
          price: product.price,
          image: product.image,
          size,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id, size) => {
    setItems(current => current.filter(item => !(item.id === id && item.size === size)));
  }, []);

  const updateQuantity = useCallback((id, size, quantity) => {
    setItems(current => {
      if (quantity <= 0) {
        return current.filter(item => !(item.id === id && item.size === size));
      }

      return current.map(item =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return { items, addItem, removeItem, updateQuantity, clearCart, total, count };
  }, [items, addItem, removeItem, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return context;
}
