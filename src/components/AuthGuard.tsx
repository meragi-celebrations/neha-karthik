"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Skip check for the lock page and public assets
    if (pathname === "/lock" || pathname.includes(".")) {
      setIsAuthorized(true);
      return;
    }

    // 2. Check for cookie in the browser
    const checkAuth = () => {
      const cookies = document.cookie.split(";").map(c => c.trim());
      const authToken = cookies.find(c => c.startsWith("auth_token="))?.split("=")[1];

      // Values from the environment or fallback to defaults
      // Note: We use the defaults here because if the cookie matches, it's valid
      const guestPass = "nehakarthik2026";
      const adminPass = "nk2026@meragi";

      if (authToken === guestPass || authToken === adminPass) {
        setIsAuthorized(true);
      } else {
        // Kick to lock page if not on it
        router.push("/lock");
      }
    };

    checkAuth();
    
    // 3. Listen for focus/visibility changes to re-verify (useful after clearing cache)
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, [pathname, router]);

  // Prevent flash of protected content
  if (!isAuthorized && pathname !== "/lock") {
    return (
      <div className="fixed inset-0 bg-surface z-[9999] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
