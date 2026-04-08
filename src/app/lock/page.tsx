"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validatePassword } from "../rsvp/actions";

export default function LockPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    
    const result = await validatePassword(password);
    
    if (result.success) {
      // Set a secure cookie that expires in 30 days
      // Note: In production, we should ideally use a proper session/JWT
      document.cookie = `auth_token=${password}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
      router.push('/');
    } else {
      setError(true);
    }
  };

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-6 dot-pattern">
      <div className="max-w-md w-full space-y-12 animate-in fade-in zoom-in duration-1000">
        <div className="text-center space-y-4">
          <div className="font-label text-secondary text-[10px] tracking-[0.4em] uppercase mb-2">
            The Private Collection
          </div>
          <h1 className="font-headline text-5xl md:text-6xl text-primary italic leading-tight">
            Neha & Karthik
          </h1>
          <div className="flex justify-center items-center gap-3">
            <span className="h-px w-8 bg-outline-variant opacity-30"></span>
            <span className="font-body text-xs text-on-surface-variant tracking-widest uppercase">
              July 2026 • Bangalore
            </span>
            <span className="h-px w-8 bg-outline-variant opacity-30"></span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-10 md:p-12 shadow-[0_40px_100px_-20px_rgba(51,3,55,0.08)] rounded-sm border border-outline-variant/30 relative">
          {/* Decorative Ornament */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-surface flex items-center justify-center rounded-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-secondary text-xl">lock</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 pt-4">
            <div className="space-y-4">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-center block">
                Enter Invitation Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-surface-container border-b-2 py-4 px-2 text-center font-headline text-2xl focus:outline-none transition-all duration-300 ${
                  error ? 'border-secondary text-secondary' : 'border-outline-variant focus:border-primary text-primary'
                }`}
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary font-label text-[10px] uppercase tracking-[0.3em] hover:bg-primary/95 transition-all shadow-lg shadow-primary/20"
            >
              Enter Sanctuary
            </button>

            {error && (
              <p className="text-secondary text-[10px] font-label uppercase tracking-widest text-center animate-pulse">
                Incorrect Password. Please try again.
              </p>
            )}
          </form>
        </div>

        <p className="text-center font-body text-xs text-on-surface-variant opacity-60 italic">
          Reserved for our dearest family and friends.
        </p>
      </div>
    </main>
  );
}
