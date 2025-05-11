"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  item: { name: string; href: string };
}

export default function NavMenuItem({ item }: NavItemProps) {
  const path = usePathname();
  const isActive = path === item.href;

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "px-4 py-2 text-xs text-white rounded transition-colors duration-200 hover:text-yellow-400",
          isActive && "text-yellow-500 font-semibold"
        )}
      >
        {item.name}
      </Link>
    </li>
  );
}
