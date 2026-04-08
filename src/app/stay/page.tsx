import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Stay() {
  const accommodations = [
    {
      name: "The ITC Gardenia",
      type: "Primary Residence",
      description: "Inspired by the gardens of Bangalore, this luxury hotel is located in the heart of the city and will host our primary out-of-town guests.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9s8O8-W18g71fo34cQLe2dNYWrcx-KhsgzDbvM323yBNoV5eT3gU76cOgIkhdpmCLwn9tyxXMLQGXROB7Q3kW1SL2ZmDUnnXA4vddy9qZN7hVEeNa5tVCbMZMHzkx7lQbW3tVKjsrpkiIFNk8tlEczPBb9xCYYnUbR7zBKzvFeDF4n6Rk7VbAGgv4U877f7marzehQTjcsqXPRKNQmk2IMWUJH35TVMllzDkIeo2Y2zpZb4W36yYuIjLajEx8I4IQtAt2IjkbGQ",
      bookingCode: "NKWED2026",
    },
    {
      name: "The Leela Palace",
      type: "Heritage Stay",
      description: "A testament to the glory of the Vijayanagara Empire, offering a truly royal Bangalore experience with lush gardens and grand architecture.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXPvymZxi0khFqvnGlVXmCzdZ764E2QFO2XqzqRMEvImMy5B2dS9LoUD5SoRbVTTDvy_xZRivinpi872dPMll8aAr3O54pTr2C5nTZn9Z4NqopKwv-B6BjGK0E5LhjZCRw2fporY-mvpU9aPfnZZKJb3l-G_5tJLkRKGM0Atir6_DimhOBS0OULW1HymJIR4U8AeipVZihqZ8pV_3J0X1JCewUmonHgB3TM-qHCKO4yBa9RrUdgUjDcnihgFBKcFYeSl8RILQnjQ",
      bookingCode: "LEELANK26",
    },
    {
      name: "Taj West End",
      type: "Historical Landmark",
      description: "Nestled amidst 20 acres of flora and fauna, this 125-year-old hotel is a piece of living history in the Garden City.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbrYzhJ3PEqWxgjV_mQHYR5Zq9YYThExskSmb95fz4G2_l42Ctv9qWbEZ39PQjxkYQpgIxhndz_X3pnPYjrciPbPG3gSi7kTX6MN7iAgSqkTRY1LHJUiy1B7yFZxwZ8IP2b0lUiUxMKTL9SUPR2mtk0cpZ9idWicUg6kTucl-dOYpEc-AC2g6UqjNz90P_XNXaK49eJu9su9Qcslf8Ivdm8s7frakHZEsXuELcsx6MqOxQycyLJ34zeeILvPuDXJTVDvZOTCVoBA",
      bookingCode: "TAJNKWEDD",
    },
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <div className="pt-32 pb-24">
        {/* Artistic Hero Header */}
        <section className="px-8 md:px-20 mb-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-8">
            <span className="font-label text-secondary text-xs tracking-[0.3em] uppercase">
              July 2026 • Bangalore
            </span>
            <h1 className="font-headline text-8xl md:text-[10rem] text-primary leading-[0.85] tracking-tighter mb-8 italic">
              Royal <br /> Residences
            </h1>
            <p className="font-headline text-2xl text-on-surface-variant max-w-xl leading-relaxed italic">
              We have handpicked the city's most iconic residences to ensure your stay is as celebratory
              as the wedding itself.
            </p>
          </div>
          <div className="md:col-span-4 hidden md:block">
            <div className="border-l border-outline-variant/30 pl-8 pb-12">
              <span className="font-label text-[10px] tracking-widest uppercase opacity-40 block mb-4">
                The Selection
              </span>
              <p className="font-body text-xs leading-relaxed text-on-surface-variant">
                Curated for their heritage, garden landscapes, and proximity to the celebration venues.
              </p>
            </div>
          </div>
        </section>

        {/* Accommodation Cards */}
        <section className="px-8 md:px-20 space-y-40 mb-40">
          {accommodations.map((hotel, index) => (
            <div
              key={hotel.name}
              className={`editorial-grid items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className={`col-span-12 md:col-span-7 relative h-[500px] md:h-[700px] overflow-hidden group rounded-sm ${index % 2 !== 0 ? "md:order-2" : ""}`}>
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-surface px-4 py-2 shadow-xl z-10">
                  <span className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold">
                    {hotel.type}
                  </span>
                </div>
              </div>
              <div className={`col-span-12 md:col-span-5 p-8 md:p-16 space-y-8 ${index % 2 !== 0 ? "md:order-1" : ""}`}>
                <h2 className="font-headline text-6xl text-primary leading-none">{hotel.name}</h2>
                <p className="font-body text-lg text-on-surface-variant leading-relaxed italic">
                  {hotel.description}
                </p>
                <div className="pt-8 border-t border-outline-variant/20 flex flex-col items-start gap-6">
                  <div className="space-y-1">
                    <span className="font-label text-[10px] uppercase tracking-widest opacity-40">
                      Booking Referral
                    </span>
                    <p className="font-headline text-2xl text-secondary tracking-widest font-light">
                      {hotel.bookingCode}
                    </p>
                  </div>
                  <button className="bg-primary text-on-primary px-10 py-4 font-label text-xs tracking-widest uppercase hover:bg-secondary transition-colors">
                    Inquire for Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Travel & Concierge Section */}
        <section className="bg-primary-container p-12 md:p-24 mx-8 md:mx-20 rounded-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 text-on-primary opacity-5 select-none touch-none">
            <span className="material-symbols-outlined text-[300px]">flight_takeoff</span>
          </div>
          <div className="relative z-10 editorial-grid">
            <div className="col-span-12 lg:col-span-6 space-y-12">
              <h2 className="font-headline text-5xl md:text-7xl text-on-primary">The Concierge</h2>
              <div className="space-y-8">
                <div className="group border-b border-on-primary/10 pb-8 hover:border-on-primary/30 transition-colors">
                  <h4 className="font-headline text-2xl text-primary-fixed mb-2">Airport Transfers</h4>
                  <p className="font-body text-sm text-on-primary-container max-w-md leading-relaxed">
                    Personalized pick-up services can be arranged from Kempegowda International Airport (BLR).
                  </p>
                </div>
                <div className="group border-b border-on-primary/10 pb-8 hover:border-on-primary/30 transition-colors">
                  <h4 className="font-headline text-2xl text-primary-fixed mb-2">Local Shuttles</h4>
                  <p className="font-body text-sm text-on-primary-container max-w-md leading-relaxed">
                    Dedicated shuttles will run between ITC Gardenia and all wedding venues throughout the
                    weekend.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-4 bg-surface text-primary px-10 py-5 font-label text-xs uppercase tracking-widest hover:bg-primary-fixed transition-colors"
              >
                Reach Out to Concierge
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
