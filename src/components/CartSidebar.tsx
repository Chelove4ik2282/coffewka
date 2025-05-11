'use client';

import { useCart } from '@/context/CartContext';
import { FiX } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
  const { isOpen, closeCart, cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
  const router = useRouter();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    closeCart(); // Закрыть корзину
    router.push('/checkout'); // Перейти на страницу оформления заказа
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-black text-white shadow-lg z-[9999] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <h2 className="text-base font-medium tracking-wide text-white/90">Cart</h2>
        <button onClick={closeCart} className="text-white/70 hover:text-orange-500 transition">
          <FiX size={22} />
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto text-sm text-white/80 space-y-3 max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-orange-600 scrollbar-track-black/50 scrollbar-thumb-rounded-xl scrollbar-track-rounded-md scrollbar-w-2 hover:scrollbar-thumb-orange-700 transition-all ease-in-out">
        {cartItems.length === 0 ? (
          <p className="italic">Your cart is empty 🛒</p>
        ) : (
          cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="border-b border-white/10 pb-2 flex justify-between items-start gap-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-white/60">Size: {item.size.toUpperCase()}</p>
                <p className="text-sm text-white/60">Price: ${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => decrementQuantity(item.id, item.size)} className="bg-white/10 hover:bg-white/20 rounded px-2">
                    <FaMinus size={12} />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id, item.size)} className="bg-white/10 hover:bg-white/20 rounded px-2">
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="text-white/50 hover:text-red-500 transition mt-1"
                title="Remove"
              >
                <MdDelete size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-5 border-t border-white/10 bg-black space-y-2">
        {cartItems.length > 0 && (
          <>
            <div className="flex justify-between text-sm text-white/60">
              <span>Total:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm font-semibold tracking-wide rounded-xl bg-red-500 hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="w-full py-2 text-sm font-semibold tracking-wide rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 transition"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
