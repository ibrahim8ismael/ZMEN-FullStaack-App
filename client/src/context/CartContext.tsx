import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      // Check if this item+size combination already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.size === item.size
      );

      if (existingItemIndex >= 0) {
        // If item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: string, size: string) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate total items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};