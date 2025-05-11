// components/Navbar.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import * as React from "react";
import Link from "next/link";
import { FiShoppingCart, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import NavMenuItem from "./nav-menu-item";
import { navbarService as components } from "@/features/shared/data/navbar-service";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const { openCart } = useCart();

  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  const [prevScrollPos, setPrevScrollPos] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;

      setVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const getShortEmail = (email: string | null | undefined) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    return user.length > 5 ? user.slice(0, 5) + "..." + "@" + domain : email;
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="relative flex items-center justify-between px-8 py-4 text-white bg-black/80 backdrop-blur-lg">
        {/* Логотип */}
        <a className="md:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600" href="/#home">
          coffeewka
        </a>

        {/* Бургер */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-orange-500 hover:text-orange-400 transition"
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Меню для десктопа */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-10 font-semibold uppercase tracking-wide text-sm">
              {components.map((navItem) => (
                <NavMenuItem key={navItem.id} item={navItem} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Кнопки */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoading && !isAuthenticated && (
            <Link
              href="/login"
              className="px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-700 rounded-full transition hover:from-orange-500 hover:to-orange-700"
            >
              Log in
            </Link>
          )}

          {isAuthenticated && (
            <>
              <span className="text-sm text-white/80 font-medium">
                {getShortEmail(session.user?.email)}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 text-white hover:text-red-500 transition"
              >
                <FiLogOut size={24} />
              </button>

              <button onClick={openCart} className="p-2 text-orange-500 hover:text-orange-400 transition">
                <FiShoppingCart size={26} />
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 shadow-md z-50 flex flex-col items-center py-4 gap-4 md:hidden transition-all">
          {components.map((navItem) => (
            <NavMenuItem key={navItem.id} item={navItem} />
          ))}

          {!isLoading && !isAuthenticated && (
            <Link
              href="/login"
              className="px-6 py-2 text-sm font-semibold text-white bg-orange-600 rounded-full hover:bg-orange-500 transition"
            >
              Log in
            </Link>
          )}

          {isAuthenticated && (
            <>
              <span className="text-sm text-white/80 font-medium">
                {getShortEmail(session.user?.email)}
              </span>
              <button
                onClick={handleLogout}
                className="p-2 text-white hover:text-red-500 transition"
              >
                <FiLogOut size={24} />
              </button>

              <button onClick={openCart} className="text-orange-500 hover:text-orange-400 transition">
                <FiShoppingCart size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
