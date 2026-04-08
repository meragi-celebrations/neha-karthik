"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchRSVPs } from "./actions";

interface RSVPRecord {
  timestamp: string;
  event: string;
  fullName: string;
  email: string;
  guestCount: string | number;
}

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await fetchRSVPs();
      if (result.success) {
        setRsvps(result.data);
      } else {
        setError(result.error || "Failed to fetch data");
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const totalGuests = rsvps.reduce((sum, rsvp) => sum + Number(rsvp.guestCount || 0), 0);

  return (
    <main className="min-h-screen bg-surface dot-pattern">
      <Navbar />

      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Admin Header */}
          <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="font-label text-secondary text-[10px] tracking-[0.4em] uppercase">
                Confidential • Central Guest Registry
              </span>
              <h1 className="font-headline text-6xl text-primary italic leading-tight">
                Guest Anthology
              </h1>
              <p className="font-body text-on-surface-variant max-w-lg italic">
                A live summary of all RSVPs received for the Bangalore celebrations.
              </p>
            </div>

            <div className="flex gap-12 bg-surface-container-lowest p-8 shadow-sm border border-outline-variant/30 rounded-sm">
              <div className="text-center md:text-left">
                <div className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Total RSVP Entries</div>
                <div className="font-headline text-4xl text-primary">{rsvps.length}</div>
              </div>
              <div className="w-px bg-outline-variant/30 h-full"></div>
              <div className="text-center md:text-left">
                <div className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Total Expected Guests</div>
                <div className="font-headline text-4xl text-secondary">{totalGuests}</div>
              </div>
            </div>
          </header>

          {/* Data Table */}
          <div className="bg-surface-container-lowest shadow-2xl rounded-sm overflow-hidden border border-outline-variant/20">
            {loading ? (
              <div className="py-40 text-center space-y-4">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Syncing Registry...</p>
              </div>
            ) : error ? (
              <div className="py-40 text-center text-secondary space-y-4">
                <span className="material-symbols-outlined text-4xl">error</span>
                <p className="font-label text-[10px] uppercase tracking-[0.2em]">{error}</p>
              </div>
            ) : rsvps.length === 0 ? (
              <div className="py-40 text-center text-on-surface-variant space-y-4">
                <span className="material-symbols-outlined text-4xl">inventory_2</span>
                <p className="font-body italic text-lg text-surface-dim">No responses logged yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/30">
                      <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Entry Date</th>
                      <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Guest Name</th>
                      <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">The Celebration</th>
                      <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-center">Count</th>
                      <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Contact info</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {rsvps.slice().reverse().map((rsvp, idx) => (
                      <tr key={idx} className="hover:bg-surface-container/30 transition-colors">
                        <td className="p-6 font-body text-xs text-on-surface-variant font-medium">
                          {new Date(rsvp.timestamp).toLocaleDateString()}
                        </td>
                        <td className="p-6">
                          <div className="font-headline text-xl text-primary">{rsvp.fullName}</div>
                        </td>
                        <td className="p-6">
                            <span className="px-3 py-1 bg-primary/5 text-primary-container font-label text-[9px] uppercase tracking-widest rounded-full border border-primary/10">
                              {rsvp.event}
                            </span>
                        </td>
                        <td className="p-6 text-center">
                          <div className="font-headline text-2xl text-secondary">{rsvp.guestCount}</div>
                        </td>
                        <td className="p-6 font-body text-sm text-on-surface-variant italic">
                          {rsvp.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
              <p className="font-body text-xs text-on-surface-variant opacity-50 italic">
                All data is fetched in real-time from the Neha Karthik 2026 Registry.
              </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
