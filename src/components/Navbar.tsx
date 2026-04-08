"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Basic check for admin cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];
    
    setIsAdmin(token === 'nk2026@meragi');
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "RSVP", href: "/rsvp" },
    { name: "Wardrobe", href: "/wardrobe" },
    { name: "Bangalore Guide", href: "/guide" },
    { name: "Contact", href: "/contact" },
  ];

  if (isAdmin) {
    navLinks.push({ name: "Admin", href: "/admin" });
  }

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-6 max-w-none bg-white/60 backdrop-blur-xl z-50 shadow-[0_20px_40px_rgba(51,3,55,0.05)]">
      <div className="font-headline italic text-2xl text-primary">
        Neha & Karthik
      </div>
      
      {/* Navigation Links (Web) */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                isActive
                  ? "text-secondary font-semibold border-b-2 border-secondary pb-1"
                  : "text-primary/70 font-medium hover:text-secondary transition-colors duration-300"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <Link href="/rsvp">
        <button className="bg-primary text-on-primary px-6 py-2 text-sm font-label tracking-widest uppercase hover:opacity-90 transition-all scale-95 duration-200 ease-in-out">
          RSVP Now
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
