'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useSession } from 'next-auth/react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Путь к Firebase инициализации

interface CartItem {
  id: number;
  name: string;
  size: 's' | 'm' | 'b';
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, size: 's' | 'm' | 'b') => void;
  incrementQuantity: (id: number, size: 's' | 'm' | 'b') => void;
  decrementQuantity: (id: number, size: 's' | 'm' | 'b') => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (session?.user?.email) {
        const docRef = doc(db, 'users', session.user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCartItems(data.cart || []);
        } else {
          await setDoc(docRef, { cart: [] }, { merge: true });
          setCartItems([]);
        }
      }
    };

    if (status === 'authenticated') {
      fetchCart();
    }
  }, [session?.user?.email, status]);

  const syncCart = async (updatedCart: CartItem[]) => {
    console.log("hello: ", status, session);
    if (session?.user?.email) {
      const docRef = doc(db, 'users', session.user.email);
      await updateDoc(docRef, { cart: updatedCart });
    }
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        updatedCart = [...prev, { ...item, quantity: 1 }];
      }
      syncCart(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id: number, size: 's' | 'm' | 'b') => {
    setCartItems((prev) => {
      const updatedCart = prev.filter(item => !(item.id === id && item.size === size));
      syncCart(updatedCart);
      return updatedCart;
    });
  };

  const incrementQuantity = (id: number, size: 's' | 'm' | 'b') => {
    setCartItems((prev) => {
      const updatedCart = prev.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      syncCart(updatedCart);
      return updatedCart;
    });
  };

  const decrementQuantity = (id: number, size: 's' | 'm' | 'b') => {
    setCartItems((prev) => {
      const item = prev.find(i => i.id === id && i.size === size);
      let updatedCart;
      if (item && item.quantity > 1) {
        updatedCart = prev.map(i =>
          i.id === id && i.size === size
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
      } else {
        updatedCart = prev.filter(i => !(i.id === id && i.size === size));
      }
      syncCart(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    if (session?.user?.email) {
      const docRef = doc(db, 'users', session.user.email);
      await updateDoc(docRef, { cart: [] });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        isOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
