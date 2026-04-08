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

        <section className="px-8 md:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Details */}
          <div className="space-y-16">
            <div className="space-y-8">
              <h2 className="font-headline text-4xl text-primary">Wedding Concierge</h2>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                For any immediate assistance regarding travel, accommodation, or venue directions, please contact our dedicated concierge team.
              </p>
              
              <div className="space-y-6 pt-8 border-t border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">call</span>
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest text-primary opacity-60">Mobile</p>
                    <p className="font-headline text-2xl text-primary">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest text-primary opacity-60">Email</p>
                    <p className="font-headline text-2xl text-primary">hello@nehaandkarthik.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 bg-surface-container-low rounded-sm space-y-6">
              <h3 className="font-headline text-2xl text-primary">Important Dates</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-baseline border-b border-outline-variant/10 pb-2">
                  <span className="font-label text-xs uppercase tracking-widest opacity-60">Celebrations Begin</span>
                  <span className="font-headline text-lg">July 06, 2026</span>
                </li>
                <li className="flex justify-between items-baseline border-b border-outline-variant/10 pb-2">
                  <span className="font-label text-xs uppercase tracking-widest opacity-60">The Grand Union</span>
                  <span className="font-headline text-lg">July 12, 2026</span>
                </li>
                <li className="flex justify-between items-baseline pb-2">
                  <span className="font-label text-xs uppercase tracking-widest opacity-60">RSVP Deadline</span>
                  <span className="font-headline text-lg text-secondary">June 15, 2026</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-12 md:p-16 shadow-[0_20px_50px_rgba(51,3,55,0.05)] border border-outline-variant/10">
            <h2 className="font-headline text-4xl text-primary mb-12">Send a Message</h2>
            <form className="space-y-10">
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-primary opacity-60">Your Name</label>
                <input 
                  type="text" 
                  className="w-full text-xl font-headline py-4 border-b border-outline focus:border-primary transition-colors outline-none bg-transparent"
                  placeholder="Inaaya Gupta"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-primary opacity-60">Email Address</label>
                <input 
                  type="email" 
                  className="w-full text-xl font-headline py-4 border-b border-outline focus:border-primary transition-colors outline-none bg-transparent"
                  placeholder="inaaya@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-primary opacity-60">Subject</label>
                <select className="w-full text-xl font-headline py-4 border-b border-outline focus:border-primary transition-colors outline-none bg-transparent appearance-none">
                  <option>General Inquiry</option>
                  <option>Travel & Logistics</option>
                  <option>Gift Registry</option>
                  <option>Message for Couple</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-primary opacity-60">Message</label>
                <textarea 
                  rows={4}
                  className="w-full text-xl font-headline py-4 border-b border-outline focus:border-primary transition-colors outline-none bg-transparent resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button className="w-full bg-primary text-on-primary py-6 font-label text-xs uppercase tracking-[0.3em] hover:bg-primary/90 transition-all shadow-xl">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
