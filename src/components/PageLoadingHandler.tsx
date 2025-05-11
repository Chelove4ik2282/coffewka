"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoadingHandler() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // задержка, имитирующая загрузку

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 flex flex-col items-center justify-center">
      <img
        src="/loading.gif"
        alt="Loading..."
        className="w-40 h-40 mb-4 animate-pulse"
      />
      {/* <p className="text-white text-lg font-medium tracking-wider animate-pulse">
        Loading...
      </p> */}
    </div>
  );
}
