"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchRSVPs, deleteRSVP } from "./actions";

interface RSVPRecord {
  timestamp: string;
  event: string;
  fullName: string;
  email: string;
  guestCount: string | number;
  contactNumber?: string;
  dietary?: string;
  accessibility?: string;
  foodAllergies?: string;
  additionalGuests?: string;
}

export default function AdminDashboard() {
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [selectedRsvp, setSelectedRsvp] = useState<RSVPRecord | null>(null);

  // Filter & UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [attendanceFilter, setAttendanceFilter] = useState<"all" | "attending" | "declined">("attending");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "alpha-asc">("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

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

  // Get unique event names (without status) for filtering
  const uniqueEvents = Array.from(new Set(rsvps.flatMap(r => {
    return r.event.split(" | ").map(e => e.split(":")[0].trim());
  }))).sort();

  // FILTERING LOGIC
  const filteredRsvps = rsvps.filter((rsvp) => {
    const matchesSearch =
      rsvp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rsvp.contactNumber && String(rsvp.contactNumber).includes(searchTerm)) ||
      rsvp.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Event + Attendance filter: 
    // - "all" event = show everyone
    // - specific event selected = only show guests where that event has the matching attendance status
    let matchesEvent = true;
    if (eventFilter !== "all") {
      const eventSegments = rsvp.event.split(" | ");
      const targetSegment = eventSegments.find(seg => seg.split(":")[0].trim() === eventFilter);
      if (!targetSegment) {
        matchesEvent = false;
      } else if (attendanceFilter === "attending") {
        matchesEvent = targetSegment.toLowerCase().includes("attending") && !targetSegment.toLowerCase().includes("not attending") && !targetSegment.toLowerCase().includes("declining");
      } else if (attendanceFilter === "declined") {
        matchesEvent = targetSegment.toLowerCase().includes("declining") || targetSegment.toLowerCase().includes("not attending") || targetSegment.toLowerCase().includes("declined");
      }
    } else if (attendanceFilter !== "all") {
      // No specific event, but filter by overall attendance
      if (attendanceFilter === "attending") {
        matchesEvent = rsvp.event.toLowerCase().includes("attending") && !rsvp.event.toLowerCase().split("attending").every((_, i) => i === 0);
      }
    }

    return matchesSearch && matchesEvent;
  });

  // SORTING LOGIC
  const sortedRsvps = [...filteredRsvps].sort((a, b) => {
    if (sortBy === "date-desc") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    if (sortBy === "date-asc") return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    if (sortBy === "alpha-asc") return a.fullName.localeCompare(b.fullName);
    return 0;
  });

  // PAGINATION LOGIC
  const totalItems = sortedRsvps.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRsvps = sortedRsvps.slice(startIndex, startIndex + itemsPerPage);

  const totalGuests = rsvps.reduce((sum, rsvp) => sum + Number(rsvp.guestCount || 0), 0);

  const handleExport = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Event Responses", "Total Guests", "Dietary", "Allergies", "Accessibility", "Additional Guests"];
    const rows = sortedRsvps.map(r => [
      new Date(r.timestamp).toLocaleString(),
      r.fullName,
      r.email,
      `'${r.contactNumber || ""}`,
      r.event,
      r.guestCount,
      r.dietary || "",
      r.foodAllergies || "",
      r.accessibility || "",
      r.additionalGuests || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `RSVP_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (timestamp: string) => {
    setIsDeleting(timestamp);
    try {
      const result = await deleteRSVP(timestamp);
      if (result.success) {
        setRsvps(prev => prev.filter(r => r.timestamp !== timestamp));
        setConfirmDelete(null);
        setSelectedRsvp(null);
      } else {
        alert(result.error || "Failed to delete entry");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An unexpected error occurred while deleting.");
    } finally {
      setIsDeleting(null);
    }
  };

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
              <h1 className="font-headline text-6xl text-primary leading-tight">
                Guest Anthology
              </h1>
              <p className="font-body text-on-surface-variant max-w-lg italic">
                A live summary of all RSVPs received for the Bangalore celebrations.
              </p>
            </div>

            <div className="flex bg-surface-container-lowest p-8 shadow-sm border border-outline-variant/30 rounded-sm relative gap-8">
              <button
                onClick={handleExport}
                className="absolute -top-4 -right-4 bg-primary text-on-primary p-3 rounded-full shadow-lg hover:scale-105 transition-all group"
                title="Export current view to CSV"
              >
                <span className="material-symbols-outlined text-xl">download</span>
              </button>
              <div className="text-center md:text-left">
                <div className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Total RSVP Entries</div>
                <div className="font-headline text-4xl text-primary [font-variant-numeric:lining-nums]">{rsvps.length}</div>
              </div>
              <div className="w-px bg-outline-variant/30 h-full"></div>
              <div className="text-center md:text-left">
                <div className="font-label text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Total Expected Guests</div>
                <div className="font-headline text-4xl text-secondary [font-variant-numeric:lining-nums]">{totalGuests}</div>
              </div>
            </div>
          </header>

          {/* Controls Bar */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-4 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
              <input
                type="text"
                placeholder="Search by name or contact..."
                className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border border-outline-variant/30 rounded-full font-body text-sm focus:outline-none focus:border-primary/50 transition-all text-primary"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>

            {/* Event Filter */}
            <div className="md:col-span-3 relative">
              <select
                className="w-full px-4 py-4 bg-surface-container-lowest border border-outline-variant/30 rounded-full font-label text-[10px] uppercase tracking-widest text-on-surface-variant appearance-none focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                value={eventFilter}
                onChange={(e) => { setEventFilter(e.target.value); setCurrentPage(1); }}
              >
                <option value="all">All Events</option>
                {uniqueEvents.map(evt => (
                  <option key={evt} value={evt}>{evt}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">event</span>
            </div>

            {/* Attendance Filter — only meaningful when an event is selected */}
            <div className="md:col-span-3 relative">
              <select
                className="w-full px-4 py-4 bg-surface-container-lowest border border-outline-variant/30 rounded-full font-label text-[10px] uppercase tracking-widest text-on-surface-variant appearance-none focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                value={attendanceFilter}
                onChange={(e) => { setAttendanceFilter(e.target.value as any); setCurrentPage(1); }}
              >
                <option value="all">All Responses</option>
                <option value="attending">Attending Only</option>
                <option value="declined">Declined Only</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">filter_alt</span>
            </div>

            {/* Sort */}
            <div className="md:col-span-2 relative">
              <select
                className="w-full px-4 py-4 bg-surface-container-lowest border border-outline-variant/30 rounded-full font-label text-[10px] uppercase tracking-widest text-on-surface-variant appearance-none focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="date-desc">Latest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="alpha-asc">A → Z</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">sort_by_alpha</span>
            </div>
          </div>

          {/* Active filter info */}
          {(eventFilter !== "all" || attendanceFilter !== "all") && (
            <div className="mb-4 flex items-center gap-3 flex-wrap">
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Active Filters:</span>
              {eventFilter !== "all" && (
                <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-label text-[9px] uppercase tracking-widest">
                  Event: {eventFilter}
                </span>
              )}
              {attendanceFilter !== "all" && (
                <span className={`px-3 py-1 border rounded-full font-label text-[9px] uppercase tracking-widest ${attendanceFilter === "attending" ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary/10 text-secondary border-secondary/20"}`}>
                  {attendanceFilter === "attending" ? "✓ Attending" : "✗ Declined"}
                </span>
              )}
              <button
                onClick={() => { setEventFilter("all"); setAttendanceFilter("attending"); setCurrentPage(1); }}
                className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors underline"
              >
                Clear all
              </button>
            </div>
          )}

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
            ) : filteredRsvps.length === 0 ? (
              <div className="py-40 text-center text-on-surface-variant space-y-4">
                <span className="material-symbols-outlined text-4xl">search_off</span>
                <p className="font-body italic text-lg text-surface-dim">No matching guests found.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-outline-variant/30">
                        <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Entry Date</th>
                        <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Guest Name</th>
                        <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">The Celebration</th>
                        <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-center">Count</th>
                        <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Contact info</th>
                        <th className="p-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {paginatedRsvps.map((rsvp, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-surface-container/50 transition-colors group/row cursor-pointer"
                          onClick={() => setSelectedRsvp(rsvp)}
                        >
                          <td className="p-6 font-body text-xs text-on-surface-variant font-medium">
                            {new Date(rsvp.timestamp).toLocaleDateString()}
                          </td>
                          <td className="p-6">
                            <div className="font-headline text-xl text-primary group-hover/row:translate-x-1 transition-transform">{rsvp.fullName}</div>
                            <div className="font-label text-[9px] uppercase tracking-widest text-secondary opacity-0 group-hover/row:opacity-100 transition-opacity mt-1">View Details →</div>
                          </td>
                          <td className="p-6">
                            <div className="flex flex-wrap gap-2">
                              {rsvp.event.split(" | ").map((evt, eIdx) => (
                                <span key={eIdx} className={`px-3 py-1 font-label text-[9px] uppercase tracking-widest rounded-full border ${
                                  evt.toLowerCase().includes('attending') && !evt.toLowerCase().includes('not attending') && !evt.toLowerCase().includes('declining')
                                    ? 'bg-primary/5 text-primary border-primary/20'
                                    : 'bg-secondary/5 text-secondary border-secondary/10 opacity-70'
                                }`}>
                                  {evt}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <div className="font-headline text-2xl text-secondary [font-variant-numeric:lining-nums]">{rsvp.guestCount}</div>
                          </td>
                          <td className="p-6 space-y-1">
                            <div className="font-body text-xs text-on-surface-variant font-semibold [font-variant-numeric:lining-nums]">
                              {rsvp.contactNumber || "No Number"}
                            </div>
                            <div className="font-body text-[11px] text-on-surface-variant opacity-60 italic">
                              {rsvp.email}
                            </div>
                          </td>
                          <td className="p-6 text-right" onClick={(e) => e.stopPropagation()}>
                            {confirmDelete === rsvp.timestamp ? (
                              <div className="flex items-center justify-end gap-2 animate-in fade-in slide-in-from-right-2">
                                <button
                                  onClick={() => setConfirmDelete(null)}
                                  className="px-3 py-1 font-label text-[9px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
                                  disabled={isDeleting === rsvp.timestamp}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDelete(rsvp.timestamp)}
                                  className="px-3 py-1 bg-secondary text-on-secondary font-label text-[9px] uppercase tracking-widest rounded-full shadow-sm hover:scale-105 transition-all"
                                  disabled={isDeleting === rsvp.timestamp}
                                >
                                  {isDeleting === rsvp.timestamp ? 'Deleting...' : 'Confirm'}
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(rsvp.timestamp)}
                                className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary/5 rounded-full transition-all group/delete"
                                title="Delete Entry"
                              >
                                <span className="material-symbols-outlined text-lg group-hover/delete:scale-110 transition-transform">delete</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-6 border-t border-outline-variant/20 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-low/30">
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Showing {startIndex + 1} – {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} Entries
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      className="p-2 text-primary disabled:opacity-30 hover:bg-primary/5 rounded-full transition-all"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-full font-label text-[10px] transition-all ${
                            currentPage === page
                              ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                              : 'text-on-surface-variant hover:bg-primary/5'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="p-2 text-primary disabled:opacity-30 hover:bg-primary/5 rounded-full transition-all"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              </>
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

      {/* =================== GUEST DETAIL MODAL =================== */}
      {selectedRsvp && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedRsvp(null)}
        >
          <div
            className="relative bg-surface-container-lowest w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl border border-outline-variant/20 animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant/10 px-8 py-6 flex items-start justify-between z-10">
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary block mb-1">RSVP Record</span>
                <h2 className="font-headline text-3xl text-primary">{selectedRsvp.fullName}</h2>
                <p className="font-body text-xs text-on-surface-variant mt-1">
                  Submitted {new Date(selectedRsvp.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedRsvp(null)}
                className="p-2 rounded-full hover:bg-surface-container transition-colors group mt-1"
              >
                <span className="material-symbols-outlined text-on-surface-variant group-hover:rotate-90 transition-transform">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-8 py-6 space-y-8">

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary">Contact Number</span>
                  <p className="font-headline text-xl text-primary [font-variant-numeric:lining-nums]">{selectedRsvp.contactNumber || "—"}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary">Email</span>
                  <p className="font-body text-sm text-primary break-all">{selectedRsvp.email || "—"}</p>
                </div>
              </div>

              {/* Guest Count */}
              <div className="p-6 bg-surface-container-low rounded-sm border border-outline-variant/10 flex items-center gap-6">
                <span className="material-symbols-outlined text-primary text-3xl">group</span>
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block">Total Party Size</span>
                  <span className="font-headline text-5xl text-secondary [font-variant-numeric:lining-nums]">{selectedRsvp.guestCount}</span>
                  <span className="font-body text-sm text-on-surface-variant ml-2">person(s)</span>
                </div>
              </div>

              {/* Event Responses */}
              <div>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3 block">Event Responses</span>
                <div className="space-y-2">
                  {selectedRsvp.event.split(" | ").map((evt, i) => {
                    const isAttending = evt.toLowerCase().includes("attending") && !evt.toLowerCase().includes("not attending") && !evt.toLowerCase().includes("declining");
                    return (
                      <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-sm border ${isAttending ? "bg-primary/5 border-primary/15" : "bg-surface-container border-outline-variant/10 opacity-60"}`}>
                        <span className={`material-symbols-outlined text-sm ${isAttending ? "text-primary" : "text-secondary"}`}>
                          {isAttending ? "check_circle" : "cancel"}
                        </span>
                        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{evt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Additional Guests */}
              {selectedRsvp.additionalGuests && selectedRsvp.additionalGuests.trim() && (
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3 block">Additional Guests</span>
                  <div className="p-4 bg-surface-container-low rounded-sm border border-outline-variant/10">
                    <p className="font-body text-sm text-on-surface-variant whitespace-pre-wrap">{selectedRsvp.additionalGuests}</p>
                  </div>
                </div>
              )}

              {/* Dietary & Restrictions */}
              {(selectedRsvp.dietary || selectedRsvp.foodAllergies || selectedRsvp.accessibility) && (
                <div>
                  <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3 block">Dietary & Accessibility Notes</span>
                  <div className="space-y-3">
                    {selectedRsvp.dietary && (
                      <div className="flex gap-3 items-start p-4 bg-surface-container-low rounded-sm border border-outline-variant/10">
                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">restaurant</span>
                        <div>
                          <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant block">Dietary</span>
                          <p className="font-body text-sm text-primary">{selectedRsvp.dietary}</p>
                        </div>
                      </div>
                    )}
                    {selectedRsvp.foodAllergies && (
                      <div className="flex gap-3 items-start p-4 bg-surface-container-low rounded-sm border border-outline-variant/10">
                        <span className="material-symbols-outlined text-secondary text-lg mt-0.5">warning</span>
                        <div>
                          <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant block">Allergies</span>
                          <p className="font-body text-sm text-primary">{selectedRsvp.foodAllergies}</p>
                        </div>
                      </div>
                    )}
                    {selectedRsvp.accessibility && (
                      <div className="flex gap-3 items-start p-4 bg-surface-container-low rounded-sm border border-outline-variant/10">
                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">accessible</span>
                        <div>
                          <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant block">Accessibility</span>
                          <p className="font-body text-sm text-primary">{selectedRsvp.accessibility}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant/10 px-8 py-4 flex justify-between items-center">
              <button
                onClick={() => { setConfirmDelete(selectedRsvp.timestamp); setSelectedRsvp(null); }}
                className="flex items-center gap-2 px-4 py-2 text-secondary hover:bg-secondary/5 rounded-full transition-colors font-label text-[10px] uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Delete Entry
              </button>
              <button
                onClick={() => setSelectedRsvp(null)}
                className="px-6 py-2 bg-primary text-on-primary font-label text-[10px] uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
