import ButtonAbout from "@/components/buttons/button";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MenuSection />
    </main>
  );
}
