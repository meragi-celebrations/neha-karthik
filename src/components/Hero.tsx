import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative flex flex-col md:flex-row h-[calc(100vh-80px)] bg-white overflow-hidden">
      {/* Left content */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-20 bg-white">
        <div className="max-w-xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6">
            THE AVANT-GARDE CELEBRATION
          </p>
          
          <h1 className="text-[120px] md:text-[180px] font-serif leading-[0.8] tracking-tighter mb-10">
            N<span className="text-primary italic">&</span>K
          </h1>

          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tight mb-8">
              THE <br /> CELEBRATION
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-end gap-10 border-b border-gray-100 pb-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">DATE</span>
                <span className="font-serif text-2xl uppercase tracking-widest">JULY 2026</span>
              </div>
              
              <div className="flex items-end gap-10 border-b border-gray-100 pb-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">LOCATION</span>
                <span className="font-serif text-2xl uppercase tracking-widest text-[#B4975A]">BANGALORE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <div className="w-10 h-10 border border-primary rounded-full flex items-center justify-center">
              <span className="text-primary">↓</span>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400">SCROLL TO NAVIGATE</span>
          </div>
        </div>
      </div>

      {/* Right image */}
      <div className="flex-1 relative h-[50vh] md:h-full bg-gray-100">
        <Image
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
          alt="Wedding Celebration"
          fill
          className="object-cover grayscale contrast-125"
          priority
        />
        <div className="absolute bottom-10 right-0 bg-primary px-4 py-8 writing-vertical text-white">
          <span className="text-[10px] uppercase tracking-[0.5em] origin-center -rotate-90 block whitespace-nowrap">
            SAVE THE DATE
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
