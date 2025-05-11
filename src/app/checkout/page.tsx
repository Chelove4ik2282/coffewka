'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    console.log(`Order confirmed. Total: $${totalPrice.toFixed(2)}`);

    // Очищаем корзину
    clearCart();

    // Перенаправляем на страницу успешного заказа
    router.push('/order-success');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-amber-400 mb-1">Checkout</h2>

        {cartItems.length === 0 ? (
          <p className="italic text-center text-white/60">Your cart is empty 🛒</p>
        ) : (
          <div className="space-y-4">
            <ul>
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex justify-between text-white/80">
                  <span>{item.quantity} x {item.name} (Size: {item.size.toUpperCase()})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between text-white/60 mt-4">
              <span>Total:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-2 bg-amber-400 text-black rounded-md font-medium hover:bg-amber-300 transition"
            >
              Confirm Order
            </button>

            <button
              onClick={() => router.back()}
              className="w-full py-2 mt-2 border border-white/20 text-white/70 rounded-md hover:bg-white/10 transition"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
