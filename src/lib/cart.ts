import { prisma } from './prisma'; // Подключение к базе данных с использованием Prisma

export async function getUserCart(userEmail: string) {
  return prisma.cart.findUnique({
    where: { userEmail },
  });
}

export async function updateUserCart(userEmail: string, cartItems: any[]) {
  return prisma.cart.upsert({
    where: { userEmail },
    update: { items: cartItems },
    create: { userEmail, items: cartItems },
  });
}

export async function clearUserCart(userEmail: string) {
  return prisma.cart.delete({
    where: { userEmail },
  });
}
