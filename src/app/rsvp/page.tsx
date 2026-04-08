"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { submitRSVP, checkDuplicateRSVP } from "./actions";

export default function RSVP() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "duplicate">("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    event: "The Grand Union (Wedding)",
    guestCount: "1",
    attendance: "attending",
    dietary: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Prepare payload
      const payload = {
        date: new Date().toLocaleDateString(),
        event: formData.event,
        fullName: formData.fullName,
        email: formData.email,
        // Only send guestCount if attending, otherwise 0
        guestCount: formData.attendance === "attending" ? formData.guestCount : "0",
        attendance: formData.attendance,
        dietary: formData.dietary
      };

      // Submit
      const result = await submitRSVP(payload);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("RSVP Error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-32 pb-24 px-6 floral-bg transition-all duration-1000">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <section className="text-center mb-20">
              <span className="font-label text-secondary text-xs tracking-[0.3em] uppercase">
                July 12, 2026 • Bangalore
              </span>
            <h1 className="font-headline text-6xl md:text-8xl italic text-primary leading-tight">
              Kindly Respond
            </h1>
            <div className="mt-8 flex justify-center items-center gap-4">
              <span className="h-px w-12 bg-outline-variant opacity-30"></span>
              <span className="font-headline text-2xl text-on-surface-variant">Neha & Karthik</span>
              <span className="h-px w-12 bg-outline-variant opacity-30"></span>
            </div>
          </section>

          {/* RSVP Form Canvas */}
          <div className="bg-surface-container-lowest p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(51,3,55,0.06)] relative overflow-hidden rounded-sm">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 p-8 text-outline-variant/20 select-none">
              <span className="material-symbols-outlined text-6xl">local_florist</span>
            </div>

            {status === "success" ? (
              <div className="py-20 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="material-symbols-outlined text-primary text-4xl">check</span>
                </div>
                <h2 className="font-headline text-5xl text-primary">Response Received</h2>
                <p className="font-body text-lg text-on-surface-variant italic max-w-md mx-auto">
                  Thank you for sharing your plans with us. We have successfully logged your RSVP and cannot wait to celebrate together!
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="font-label text-[10px] uppercase tracking-widest text-secondary border-b border-secondary pb-1"
                >
                  Edit or Add Another Response
                </button>
              </div>
            ) : status === "duplicate" ? (
              <div className="py-20 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="material-symbols-outlined text-secondary text-4xl">inventory_2</span>
                </div>
                <h2 className="font-headline text-5xl text-secondary">Already Registry</h2>
                <p className="font-body text-lg text-on-surface-variant italic max-w-md mx-auto">
                  It looks like you have already submitted an RSVP for this email address. If you need to change your response, please contact us directly.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="font-label text-[10px] uppercase tracking-widest text-primary border-b border-primary pb-1"
                >
                  Back to Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Name Input */}
                  <div className="group">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="input-underline w-full font-headline text-2xl placeholder:text-surface-dim placeholder:italic py-4 text-primary"
                      placeholder="e.g. Inaaya Gupta"
                      type="text"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="group">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-underline w-full font-headline text-2xl placeholder:text-surface-dim py-4 text-primary"
                      placeholder="hello@example.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Event Selection */}
                  <div className="group">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">
                      The Celebration
                    </label>
                    <select
                      name="event"
                      value={formData.event}
                      onChange={handleChange}
                      className="input-underline w-full font-headline text-2xl py-4 text-primary appearance-none bg-transparent"
                    >
                      <option>The Grand Union (Wedding)</option>
                      <option>Sangeet & Soiree</option>
                      <option>The Afterparty</option>
                      <option>All Celebrations</option>
                    </select>
                  </div>

                  {/* Attendance Choice */}
                  <div className="group">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-6 block">
                      Attendance
                    </label>
                    <div className="flex flex-col md:flex-row gap-8">
                      <label className="flex items-center space-x-3 cursor-pointer group/radio">
                        <input
                          className="w-4 h-4 text-primary border-outline focus:ring-primary appearance-none border rounded-full checked:bg-primary transition-all"
                          name="attendance"
                          type="radio"
                          value="attending"
                          checked={formData.attendance === "attending"}
                          onChange={handleChange}
                        />
                        <span className="font-body text-sm text-on-surface tracking-wide group-hover/radio:text-primary transition-colors">
                          Attending with Pleasure
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer group/radio">
                        <input
                          className="w-4 h-4 text-primary border-outline focus:ring-primary appearance-none border rounded-full checked:bg-primary transition-all"
                          name="attendance"
                          type="radio"
                          value="declined"
                          checked={formData.attendance === "declined"}
                          onChange={handleChange}
                        />
                        <span className="font-body text-sm text-on-surface tracking-wide group-hover/radio:text-primary transition-colors">
                          Regretfully Declines
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Conditional Fields: Only show if attending */}
                {formData.attendance === "attending" && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
                    {/* Guest Count */}
                    <div className="group">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">
                        Number of Guests
                      </label>
                      <input
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="input-underline w-full font-headline text-2xl placeholder:text-surface-dim py-4 text-primary"
                        placeholder="01"
                        type="number"
                        min="1"
                        max="10"
                      />
                    </div>

                    {/* Dietary Requirements */}
                    <div className="group">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2 block">
                        Special Notes or Dietary Preferences
                      </label>
                      <textarea
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        className="input-underline w-full font-body text-base placeholder:text-surface-dim py-4 text-on-surface resize-none"
                        placeholder="Allergies, preferences, or a message for the couple..."
                        rows={2}
                      />
                    </div>
                  </div>
                )}

                {/* CTA Section */}
                <div className="pt-8 flex flex-col items-center space-y-6">
                  <button
                    disabled={status === "submitting"}
                    className="w-full md:w-auto px-16 py-5 bg-linear-to-r from-primary to-primary-container text-on-primary font-label text-xs uppercase tracking-[0.2em] rounded-sm hover:opacity-95 transition-all shadow-xl shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                  >
                    {status === "submitting" ? "Checking Registry..." : "Confirm Response"}
                  </button>
                  {status === "error" && (
                    <p className="text-secondary font-label text-[10px] uppercase tracking-widest animate-pulse">
                      Something went wrong. Please try again or reach out to us directly.
                    </p>
                  )}
                  <p className="font-headline text-lg italic text-secondary text-center">
                    Please respond by May 15th, 2026
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Asymmetric Editorial Detail */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-4/5 bg-surface-container-low overflow-hidden rounded-sm">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXPvymZxi0khFqvnGlVXmCzdZ764E2QFO2XqzqRMEvImMy5B2dS9LoUD5SoRbVTTDvy_xZRivinpi872dPMll8aAr3O54pTr2C5nTZn9Z4NqopKwv-B6BjGK0E5LhjZCRw2fporY-mvpU9aPfnZZKJb3l-G_5tJLkRKGM0Atir6_DimhOBS0OULW1HymJIR4U8AeipVZihqZ8pV_3J0X1JCewUmonHgB3TM-qHCKO4yBa9RrUdgUjDcnihgFBKcFYeSl8RILQnjQ"
                alt="Elegant wedding table setting"
                fill
                className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="md:-ml-20 z-10 p-10 bg-surface-container-lowest shadow-2xl border-l-4 border-secondary rounded-sm">
              <h3 className="font-headline text-3xl text-primary italic mb-4">A Note on Travel</h3>
              <p className="font-body text-sm leading-relaxed text-on-surface-variant mb-6">
                For our guests traveling from afar, we have curated a special guide for your stay in Bangalore. From heritage walks to the finest filter coffee spots.
              </p>
              <Link
                href="/guide"
                className="inline-block font-label text-[10px] uppercase tracking-widest text-secondary border-b-2 border-secondary pb-1 hover:text-primary hover:border-primary transition-colors"
              >
                Explore the Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
