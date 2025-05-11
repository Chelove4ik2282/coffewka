"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function BodyWrapper({
  children,
  fonts,
}: {
  children: React.ReactNode;
  fonts: string[];
}) {
  const pathname = usePathname();

  const backgroundImage =
    pathname === "/about" ? "" : "url('/pizza-hero.jpg')";

  return (
    <body
      className={`${fonts.join(" ")} antialiased`}
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </body>
  );
}
