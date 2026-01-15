"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
interface HeaderProps {
  logoUrl?: string | null;
}

export default function Header({ logoUrl }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services-page" },
    { name: "Location", href: "/location" },
    { name: "Blog", href: "/blog" },
    { name: "Our Team", href: "/our-team" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 md:p-0 pl-4 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div
          className="text-4xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src={logoUrl || undefined} alt="logo" className="h-10 md:h-12" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-semibold transition-colors ${
                scrolled || pathname !== "/"
                  ? "text-primary"
                  : "text-primary-foreground "
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <button className="hidden md:block bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-medium transition">
          Free Quote
        </button>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md border border-gray-200"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md w-full transition-all duration-300">
          <nav className="flex flex-col items-center gap-4 py-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-semibold text-primary-foreground transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium mt-2">
              Free Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
