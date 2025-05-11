'use client'

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import SessionWrapper from "./SessionWrapper";
import PageLoadingHandler from "./PageLoadingHandler";
import CartSidebar from "./CartSidebar";

// Типизация параметра сессии
type ProvidersProps = {
  children: ReactNode;
  session: Session | null;
};

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <CartProvider>
          <SessionWrapper>
            <PageLoadingHandler />
            {children}
            <CartSidebar />
          </SessionWrapper>
        </CartProvider>
      </UserProvider>
    </SessionProvider>
  );
}
