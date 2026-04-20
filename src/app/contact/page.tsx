import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Contact() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-32 pb-24">
        {/* Page Header */}
        <header className="px-8 md:px-20 mb-24 max-w-7xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.5em] text-primary mb-6 block">
            Get in Touch
          </span>
          <h1 className="font-headline text-8xl md:text-[10rem] text-primary leading-[0.8] tracking-tighter">
            Connect <br />
            <span className="italic">With Us</span>
          </h1>
          <div className="mt-12 max-w-xl">
            <p className="font-body text-xl text-on-surface-variant leading-relaxed italic">
              Whether you have questions about the celebrations, travel logistics, or simply want to send your love, we are here for you.
            </p>
          </div>
        </header>

        <section className="px-8 md:px-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          {/* Main Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl text-primary">Wedding Concierge</h2>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-md">
                For any immediate assistance regarding travel, accommodation, or venue directions, please contact our dedicated concierge team.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-10 pt-8 border-t border-outline-variant/20">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-primary opacity-60 mb-1">Mobile</p>
                  <a href="tel:+918828036446" className="font-headline text-2xl text-primary hover:text-secondary transition-colors">+91 88280 36446</a>
                </div>
              </div>
              
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-primary opacity-60 mb-1">Email</p>
                  <a href="mailto:hello@nehaandkarthik.com" className="font-headline text-2xl text-primary hover:text-secondary transition-colors underline decoration-primary/20 underline-offset-4">hello@nehaandkarthik.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline / Important Dates */}
          <div className="bg-surface-container-low p-10 md:p-14 rounded-sm border border-outline-variant/10 shadow-sm self-start">
            <h3 className="font-headline text-3xl text-primary mb-10 italic">Key Milestones</h3>
            <ul className="space-y-8">
              <li className="flex justify-between items-end border-b border-outline-variant/10 pb-4 group">
                <div className="space-y-1">
                  <span className="font-label text-[10px] uppercase tracking-widest opacity-60 block">Celebrations Begin</span>
                  <span className="font-headline text-xl text-primary">July 06, 2026</span>
                </div>
                <span className="font-body text-xs italic text-secondary opacity-0 group-hover:opacity-100 transition-opacity">Bangalore</span>
              </li>
              <li className="flex justify-between items-end border-b border-outline-variant/10 pb-4 group">
                <div className="space-y-1">
                  <span className="font-label text-[10px] uppercase tracking-widest opacity-60 block">The Grand Union</span>
                  <span className="font-headline text-xl text-primary">July 12, 2026</span>
                </div>
                <span className="font-body text-xs italic text-secondary opacity-0 group-hover:opacity-100 transition-opacity">Sheraton Grand</span>
              </li>
              <li className="flex justify-between items-end border-b border-outline-variant/10 pb-4 group">
                <div className="space-y-1">
                  <span className="font-label text-[10px] uppercase tracking-widest opacity-60 block">RSVP Deadline</span>
                  <span className="font-headline text-xl text-secondary">June 15, 2026</span>
                </div>
                <span className="font-body text-xs italic text-secondary opacity-0 group-hover:opacity-100 transition-opacity">Final Call</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
