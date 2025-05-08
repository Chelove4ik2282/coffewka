import Navbar from "@/components/layout/header";

import { ReactNode } from "react";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] via-[#2b2b2b] to-black">
      <Navbar />
      {children}
    </div>
  );
}
