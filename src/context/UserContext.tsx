// src/context/UserContext.tsx

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

type User = {
  email: string;
  password: string; // хешированный пароль
  cart: number[];  // или CartItem[], если нужно
};

type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Фиктивные пользователи для тестирования
const dummyUsers: User[] = [
  {
    email: "user@example.com",
    password: "$2b$10$Trz2PTQ1vYdbDdI4TbZ9TeFh3yHslI9a0OQfZ1e7c34jv3OqYrdWy", // bcrypt-хэш для пароля "password"
    cart: [1, 2, 3],
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { data: session, status } = useSession();

  const login = (email: string, password: string) => {
    const found = dummyUsers.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
    }
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
