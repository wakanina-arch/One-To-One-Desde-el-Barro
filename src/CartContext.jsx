/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Carga inicial segura (Evita el blanco absoluto)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('uni_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  
  const [orders, setOrders] = useState([]);

  // 2. Persistencia automática
  useEffect(() => {
    localStorage.setItem('uni_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // --- FUNCIONES QUE FALTABAN O DABAN ERROR ---
  
  const addToCart = useCallback((item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, cantidad: (i.cantidad || 1) + 1 } : i);
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id, cantidad) => {
    setCartItems(prev => prev.map(i => 
      i.id === id ? { ...i, cantidad: Math.max(0, cantidad) } : i
    ).filter(i => i.cantidad > 0));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const calculateTotal = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + (item.precio * (item.cantidad || 1)), 0).toFixed(2);
  }, [cartItems]);

  const addOrder = useCallback((order) => {
    const newOrder = { ...order, id: `QR-${Date.now()}` };
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  }, []);

  // 3. EL OBJETO VALUE (Ahora todo está definido arriba)
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal,
    itemCount: cartItems.reduce((acc, i) => acc + (i.cantidad || 1), 0),
    orders,
    addOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
};
