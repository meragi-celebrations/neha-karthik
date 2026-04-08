"use client";

import { useState } from "react";

const RSVPForm = () => {
  const [attendance, setAttendance] = useState<string | null>(null);

  return (
    <form className="max-w-4xl space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Guest Name */}
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-2">
          <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">GUEST NAME</label>
          <input 
            type="text" 
            placeholder="E.g., Alexander Varma" 
            className="font-serif text-xl outline-none placeholder:italic placeholder:text-gray-200 bg-transparent"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-2">
          <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">EMAIL ADDRESS</label>
          <input 
            type="email" 
            placeholder="hello@editorial.com" 
            className="font-serif text-xl outline-none placeholder:italic placeholder:text-gray-200 bg-transparent"
          />
        </div>
      </div>

      {/* Attendance */}
      <div className="space-y-6">
        <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">WILL YOU BE ATTENDING?</label>
        <div className="flex flex-col md:flex-row gap-12">
          <label className="flex items-center gap-4 cursor-pointer group">
            <input 
              type="radio" 
              name="attendance" 
              value="yes" 
              className="hidden" 
              onChange={() => setAttendance("yes")}
            />
            <div className={`w-6 h-6 border border-gray-200 flex items-center justify-center transition-all ${attendance === "yes" ? "bg-primary border-primary" : "group-hover:border-primary"}`}>
              {attendance === "yes" && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="font-serif text-2xl">Delightfully, Yes</span>
          </label>

          <label className="flex items-center gap-4 cursor-pointer group">
            <input 
              type="radio" 
              name="attendance" 
              value="no" 
              className="hidden" 
              onChange={() => setAttendance("no")}
            />
            <div className={`w-6 h-6 border border-gray-200 flex items-center justify-center transition-all ${attendance === "no" ? "bg-primary border-primary" : "group-hover:border-primary"}`}>
              {attendance === "no" && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="font-serif text-2xl">Regretfully, No</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Number of Guests */}
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-2">
          <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">NUMBER OF GUESTS</label>
          <select className="font-serif text-xl outline-none bg-transparent appearance-none cursor-pointer">
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
          </select>
        </div>

        {/* Dietary Requirements */}
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-2">
          <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">DIETARY REQUIREMENTS</label>
          <input 
            type="text" 
            placeholder="Vegan, Nut Allergies, etc." 
            className="font-serif text-xl outline-none placeholder:italic placeholder:text-gray-200 bg-transparent"
          />
        </div>
      </div>

      {/* Note for the Couple */}
      <div className="flex flex-col gap-2 border-b border-gray-200 pb-2">
        <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">A NOTE FOR THE COUPLE</label>
        <textarea 
          placeholder="Write your message here..." 
          rows={1}
          className="font-serif text-xl outline-none placeholder:italic placeholder:text-gray-200 bg-transparent resize-none"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 pt-8">
        <button 
          type="submit" 
          className="bg-primary text-white px-12 py-5 text-sm uppercase tracking-[0.2em] font-bold hover:bg-black transition-all flex items-center gap-4 group"
        >
          SUBMIT RESPONSE
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <p className="font-serif italic text-sm text-gray-400">
          Confirmation will be sent via email
        </p>
      </div>
    </form>
  );
};

export default RSVPForm;
