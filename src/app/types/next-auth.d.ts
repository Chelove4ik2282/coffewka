import { CartItem } from "@/generated/prisma";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      cart: CartItem[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    cart: number[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    cart: number[];
    accessTokenExpires: number;
  }
}
