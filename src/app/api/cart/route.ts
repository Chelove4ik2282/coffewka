import { NextApiRequest, NextApiResponse } from 'next';
import { getUserCart, updateUserCart, clearUserCart } from '@/lib/cart'; // Функции для работы с базой данных

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { userEmail, cartItems } = req.body;

  switch (method) {
    case 'GET':
      if (!userEmail) {
        return res.status(400).json({ error: 'User email is required' });
      }
      try {
        const cart = await getUserCart(userEmail); // Загружаем корзину пользователя
        res.status(200).json({ cartItems: cart });
      } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
      }
      break;
      
    case 'POST':
      if (!userEmail || !cartItems) {
        return res.status(400).json({ error: 'User email and cart items are required' });
      }
      try {
        await updateUserCart(userEmail, cartItems); // Обновляем корзину в базе данных
        res.status(200).json({ message: 'Cart updated successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error updating cart' });
      }
      break;

    case 'DELETE':
      if (!userEmail) {
        return res.status(400).json({ error: 'User email is required' });
      }
      try {
        await clearUserCart(userEmail); // Очищаем корзину
        res.status(200).json({ message: 'Cart cleared successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error clearing cart' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
