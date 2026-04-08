const Marquee = () => {
  return (
    <div className="bg-black py-4 overflow-hidden border-y border-gray-800">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-white font-serif text-3xl uppercase tracking-[0.3em] mx-10 flex items-center gap-10 opacity-80">
            NEHA <span className="text-primary italic">&</span> KARTHIK 
            <span className="text-white opacity-20">•</span> 
            BANGALORE 2026 
            <span className="text-white opacity-20">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
