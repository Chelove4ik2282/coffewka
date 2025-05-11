import { db } from './admin';

export async function findUser(email: string) {
  const snapshot = await db.collection('users').doc(email).get();
  
  // Если пользователь не найден
  if (!snapshot.exists) return null;

  const data = snapshot.data();
  
  // Если данных нет, возвращаем null
  if (!data) return null;

  // Даем гарантию, что cart будет массивом
  const cart = Array.isArray(data.cart) ? data.cart : [];

  return {
    email,
    password: data.password, // password обязателен
    cart, // cart либо из данных, либо пустой массив
  };
}
