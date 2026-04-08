<!DOCTYPE html>

<html class="scroll-smooth" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "on-secondary": "#ffffff",
              "primary-fixed-dim": "#ffb2b7",
              "surface-variant": "#e4e2e0",
              "error": "#ba1a1a",
              "on-primary": "#ffffff",
              "on-secondary-container": "#771e2c",
              "inverse-surface": "#30302f",
              "tertiary-fixed-dim": "#82d5ca",
              "tertiary-fixed": "#9ef2e6",
              "primary-fixed": "#ffdadb",
              "tertiary-container": "#006c63",
              "outline": "#8f6f70",
              "error-container": "#ffdad6",
              "on-secondary-fixed-variant": "#812532",
              "on-error-container": "#93000a",
              "surface-bright": "#fbf9f7",
              "surface": "#fbf9f7",
              "secondary-fixed-dim": "#ffb2b7",
              "on-error": "#ffffff",
              "secondary-container": "#ff8791",
              "surface-container": "#efedec",
              "background": "#fbf9f7",
              "surface-tint": "#bb0f3a",
              "inverse-on-surface": "#f2f0ee",
              "surface-container-lowest": "#ffffff",
              "on-primary-container": "#ffd0d2",
              "secondary": "#a03d48",
              "primary-container": "#be123c",
              "on-tertiary-fixed": "#00201d",
              "surface-container-low": "#f5f3f1",
              "inverse-primary": "#ffb2b7",
              "on-tertiary-fixed-variant": "#005049",
              "on-secondary-fixed": "#40000d",
              "outline-variant": "#e3bdbf",
              "tertiary": "#00524b",
              "primary": "#95002a",
              "surface-container-high": "#eae8e6",
              "on-primary-fixed-variant": "#920029",
              "on-primary-fixed": "#40000d",
              "on-surface": "#1b1c1b",
              "surface-dim": "#dbdad8",
              "secondary-fixed": "#ffdadb",
              "on-tertiary": "#ffffff",
              "on-background": "#1b1c1b",
              "on-tertiary-container": "#97eade",
              "surface-container-highest": "#e4e2e0",
              "on-surface-variant": "#5b4041"
            },
            fontFamily: {
              "headline": ["Newsreader", "serif"],
              "body": ["Manrope", "sans-serif"],
              "label": ["Manrope", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .dot-pattern {
            background-image: radial-gradient(#95002a 0.5px, transparent 0.5px);
            background-size: 12px 12px;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #fbf9f7;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #95002a;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
    </style>
</head>
<body class="bg-surface font-body text-on-surface overflow-x-hidden selection:bg-primary selection:text-white">
<!-- Header Navigation -->
<nav class="fixed top-0 w-full z-50 bg-[#fbf9f7] dark:bg-stone-900 opacity-90 backdrop-blur-md">
<div class="flex justify-between items-center w-full px-8 py-6 max-w-none mx-auto">
<a class="font-['Newsreader'] font-bold text-2xl tracking-tighter text-[#95002a] dark:text-rose-500" href="#">N&amp;K</a>
<div class="hidden md:flex items-center gap-10">
<a class="text-stone-600 dark:text-stone-400 hover:text-[#95002a] transition-colors font-['Newsreader'] serif tracking-tight text-lg" href="#">Home</a>
<a class="text-[#95002a] dark:text-rose-400 font-bold border-b-2 border-[#95002a] pb-1 font-['Newsreader'] serif tracking-tight text-lg" href="#">Events</a>
<a class="text-stone-600 dark:text-stone-400 hover:text-[#95002a] transition-colors font-['Newsreader'] serif tracking-tight text-lg" href="#">RSVP</a>
<a class="text-stone-600 dark:text-stone-400 hover:text-[#95002a] transition-colors font-['Newsreader'] serif tracking-tight text-lg" href="#">Wardrobe</a>
<a class="text-stone-600 dark:text-stone-400 hover:text-[#95002a] transition-colors font-['Newsreader'] serif tracking-tight text-lg" href="#">Bangalore Guide</a>
</div>
<button class="bg-[#95002a] text-white px-6 py-2 font-bold hover:bg-[#a03d48] transition-all hover:opacity-80 duration-300">Save the Date</button>
</div>
</nav>
<main class="pt-24 pb-20">
<!-- Hero Section -->
<header class="relative px-8 md:px-20 py-16 md:py-24 border-b border-outline-variant/10">
<div class="absolute top-0 right-0 w-1/3 h-full dot-pattern opacity-10 pointer-events-none"></div>
<div class="max-w-7xl mx-auto relative">
<p class="font-label text-xs uppercase tracking-[0.4em] text-primary mb-6">The Itinerary</p>
<h1 class="font-headline text-6xl md:text-9xl leading-[0.9] text-on-surface tracking-tighter">
                    Celebrations <br/>
<span class="italic text-primary">&amp; Venues</span>
</h1>
<div class="mt-12 flex flex-col md:flex-row gap-8 items-start justify-between">
<p class="max-w-md text-lg text-on-surface-variant font-light leading-relaxed">
                        A curated sequence of celebrations bridging tradition and modern elegance across Bangalore's most distinguished venues.
                    </p>
<div class="flex items-center gap-4">
<span class="w-12 h-[1px] bg-primary"></span>
<p class="font-label text-[10px] uppercase tracking-widest text-secondary italic">Bangalore, Karnataka • July 2024</p>
</div>
</div>
</div>
</header>
<!-- Event 1: Devara Samradhane -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-outline-variant/10 group">
<div class="md:col-span-5 px-8 md:px-20 py-16 flex flex-col justify-center bg-surface-container-low">
<span class="font-label text-[10px] uppercase tracking-widest text-primary mb-4">July 6th</span>
<h2 class="font-headline text-5xl md:text-6xl text-on-surface mb-6 group-hover:italic transition-all duration-500">Devara Samradhane</h2>
<p class="font-body text-on-surface-variant mb-8 leading-relaxed">
                    Commencing our journey with divine blessings. A morning of spiritual resonance and traditional rituals.
                </p>
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-xl">location_on</span>
<span class="font-headline text-xl leading-snug">Ekadanta Pravachana Mandira, B.E.L. Sri Ganapathi Seva Mandali</span>
</div>
<a class="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all duration-300" href="#">
                        View on Map <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
<div class="md:col-span-7 h-[500px] md:h-auto overflow-hidden relative">
<img alt="Traditional Indian temple architecture with intricate stone carvings" class="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXO2EmZG2qkghraNHJuLFE2z8v-a8h_xeKphPxhj2Oos75knOAGTzNOlj7Uh5Y3TT01iQzn_AcOK8v4nN3BVy4O9XDx6ugVlRjjQLle0poqBXbdLdaUkbNtKiz3yBN0i-9-52uTTH1UiwfXVzU6slK-e3SUaZdfxj2KRkgcyUD-P5GnBcEMBRBGSh6e2y37_JhUXth0Hw2Dd1AeexyOmg2j9fZ2xtcA4EMDtS02jgPWovY1oR6-I38ySuz0HBj_-lJWFWcIEZM2w"/>
<div class="absolute bottom-8 right-8 bg-surface/90 backdrop-blur px-6 py-4 border border-outline-variant/20">
<p class="font-label text-[10px] uppercase tracking-widest">Atmosphere</p>
<p class="font-headline text-lg italic text-primary">Sacred &amp; Traditional</p>
</div>
</div>
</section>
<!-- Event 2: Welcome Lunch & Sangeet -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-outline-variant/10 group">
<div class="md:col-span-7 md:order-1 h-[500px] md:h-auto overflow-hidden">
<img alt="Luxurious modern ballroom with dramatic lighting and floral installations" class="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8_EP7hfqd-R9p9M-KSjpSMFnI5HP04ZA5OlkuqytgP6i1lFCMfTzSPDr3ANl9TMEI9eMadnbxS57YbI9hxs-bFLBA-oYGPcJjbTO2ZoiKur009AdtzB5faxOHBpHGaJixKlbu-cU5cHEqfwr38NnEwdnJC0d4Mm07Kyj17jRqi3tkZu8_5ZN2CAoYEhMl70C64Fn4jff2MJCTW_oLGPF269kuvO68Mws3MOELiwM2kdvpR0qzAB4whiTKZnJNe4bQQubAJIcnew"/>
</div>
<div class="md:col-span-5 md:order-2 px-8 md:px-20 py-16 flex flex-col justify-center bg-surface">
<span class="font-label text-[10px] uppercase tracking-widest text-primary mb-4">July 10th</span>
<h2 class="font-headline text-5xl md:text-6xl text-on-surface mb-6 group-hover:italic transition-all duration-500">Welcome Lunch &amp; Sangeet</h2>
<p class="font-body text-on-surface-variant mb-8 leading-relaxed">
                    A vibrant introduction at Zinnia, followed by an electrifying night of music and dance.
                    <span class="block mt-4 italic">Sangeet &amp; Afterparty at the Scarlet Ballroom</span>
</p>
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-xl">location_on</span>
<span class="font-headline text-xl">Zinnia &amp; Scarlet Ballroom</span>
</div>
<a class="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all duration-300" href="#">
                        View on Map <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</section>
<!-- Event 3: Mehendi & Varpooje -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-outline-variant/10 group">
<div class="md:col-span-5 px-8 md:px-20 py-16 flex flex-col justify-center bg-surface-container-high">
<span class="font-label text-[10px] uppercase tracking-widest text-primary mb-4">July 11th</span>
<h2 class="font-headline text-5xl md:text-6xl text-on-surface mb-6 group-hover:italic transition-all duration-500">Mehendi &amp; Varpooje</h2>
<p class="font-body text-on-surface-variant mb-8 leading-relaxed">
                    Sun-kissed celebrations at the Party Lawn, transitioning into a sophisticated evening of tradition and fine dining.
                    <span class="block mt-4 italic">Varpooje &amp; Dinner at Zinnia / Scarlet</span>
</p>
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-xl">location_on</span>
<span class="font-headline text-xl leading-snug">Party Lawn / Scarlet Alfresco</span>
</div>
<a class="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all duration-300" href="#">
                        View on Map <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
<div class="md:col-span-7 h-[500px] md:h-auto overflow-hidden relative">
<img alt="Beautifully decorated garden lawn for a luxury outdoor wedding event" class="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbaYqQxFr4d1avXG0eEprfJ88YWB1WoZHSKiljH0B3xOfGEn7BGxEAJDETSXNALfCVFzrOuYpyfVyBPTCEfI35JkcLOR6REJDiVSKLR4MtXZ-xzEi69NZAKjzGdzhpxUQhqDksBjmPZxDUa8OZmmkWGOX98oHgteiCsx1qu0q61l8O-tla0fFQEOgNii5M-qVWWLZOhpSWiJ8A886WoVuA2YO1xNjUxaYscjGD7l8UwhDhRDbRsXiLXxhRi81qOFec41Ucnxx6dQ"/>
<div class="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
</div>
</section>
<!-- Event 4: Wedding & Reception -->
<section class="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-outline-variant/10 group">
<div class="md:col-span-7 md:order-1 h-[500px] md:h-auto overflow-hidden">
<img alt="Exquisite wedding mandap with traditional elements and modern luxury decor" class="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtV8TBYG9JeaHCRjKVZazCF4ebGAwhm_tIIigO7DV-HxUyhKHqbvKOP4T9lAY5shvJ5dn4D4WEltV-oxz8EvfLCJzK3KfS_0WI1tAT5-tQNZhfoK3yZrLEv7PrjGejSPLj7bE8tGbloNiqD_Zh0Uj4hh_3_kD8eWkfd7R2p_4JMy8Wu1Of8j3ksL2GDpQplm6WKn-PkhZHmY36aeyUY6x8KcMHG2qUXlsVel8uy9a44vNLOtthXD6S-IfLjhx4JhPGK2YctiqPWw"/>
</div>
<div class="md:col-span-5 md:order-2 px-8 md:px-20 py-16 flex flex-col justify-center bg-surface">
<span class="font-label text-[10px] uppercase tracking-widest text-primary mb-4">July 12th</span>
<h2 class="font-headline text-5xl md:text-6xl text-on-surface mb-6 group-hover:italic transition-all duration-500">Wedding &amp; Reception</h2>
<p class="font-body text-on-surface-variant mb-8 leading-relaxed">
                    The pinnacle of our union. A grand ceremony followed by a sit-down Banti Bhojanam lunch, concluding with a celebratory Reception &amp; Afterparty.
                </p>
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary text-xl">location_on</span>
<span class="font-headline text-xl leading-snug">Convention Center &amp; Scarlet Ballroom</span>
</div>
<a class="inline-flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-primary hover:gap-4 transition-all duration-300" href="#">
                        View on Map <span class="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</div>
</section>
<!-- Signature Ticker Component -->
<div class="w-full overflow-hidden bg-primary text-white py-6 border-y border-white/10 mt-20">
<div class="flex whitespace-nowrap gap-16 animate-marquee">
<span class="font-headline text-3xl italic tracking-widest uppercase">Bangalore • July 06-12 • RSVP by June 15</span>
<span class="font-headline text-3xl italic tracking-widest uppercase">Bangalore • July 06-12 • RSVP by June 15</span>
<span class="font-headline text-3xl italic tracking-widest uppercase">Bangalore • July 06-12 • RSVP by June 15</span>
<span class="font-headline text-3xl italic tracking-widest uppercase">Bangalore • July 06-12 • RSVP by June 15</span>
</div>
</div>
<!-- Final Venue Map CTA -->
<section class="px-8 md:px-20 py-24 text-center max-w-4xl mx-auto">
<div class="dot-pattern h-2 w-24 mx-auto mb-10 opacity-40"></div>
<h3 class="font-headline text-4xl md:text-5xl mb-8 leading-tight text-on-surface">
                Finding Your Way to the <span class="text-primary italic">Avant-Garde</span> Celebration
            </h3>
<div class="flex flex-col md:flex-row gap-6 justify-center">
<a class="bg-primary text-white px-10 py-5 font-label text-xs uppercase tracking-[0.3em] hover:opacity-80 transition-all" href="#">
                    Open Global Map
                </a>
<a class="border border-outline-variant text-on-surface px-10 py-5 font-label text-xs uppercase tracking-[0.3em] hover:bg-surface-container transition-all" href="#">
                    Travel Guide
                </a>
</div>
</section>
</main>
<!-- Footer Section -->
<footer class="bg-[#eae8e6] dark:bg-stone-950 border-t-0">
<div class="flex flex-col items-center justify-center w-full py-20 px-4 space-y-8">
<span class="font-['Newsreader'] italic text-xl text-[#95002a]">Neha &amp; Karthik</span>
<div class="flex flex-wrap justify-center gap-10">
<a class="font-['Manrope'] sans-serif uppercase tracking-[0.2em] text-[10px] text-stone-500 dark:text-stone-500 hover:tracking-[0.3em] transition-all duration-500" href="#">The Journey</a>
<a class="font-['Manrope'] sans-serif uppercase tracking-[0.2em] text-[10px] text-stone-500 dark:text-stone-500 hover:tracking-[0.3em] transition-all duration-500" href="#">Gift Registry</a>
<a class="font-['Manrope'] sans-serif uppercase tracking-[0.2em] text-[10px] text-stone-500 dark:text-stone-500 hover:tracking-[0.3em] transition-all duration-500" href="#">Contact Concierge</a>
</div>
<p class="font-['Manrope'] sans-serif uppercase tracking-[0.2em] text-[10px] text-stone-500 dark:text-stone-500 text-center">
                © 2024 NEHA &amp; KARTHIK. DESIGNED FOR THE AVANT-GARDE CELEBRATION.
            </p>
</div>
</footer>
<!-- Mobile Navigation Shell -->
<div class="md:hidden fixed bottom-0 w-full bg-surface/90 backdrop-blur-xl border-t border-outline-variant/10 px-8 py-4 flex justify-between items-center z-50">
<div class="flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-gray-500">home</span>
<span class="text-[8px] uppercase tracking-widest">Home</span>
</div>
<div class="flex flex-col items-center gap-1 text-primary">
<span class="material-symbols-outlined">celebration</span>
<span class="text-[8px] uppercase tracking-widest font-bold">Events</span>
</div>
<div class="flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-gray-500">edit_note</span>
<span class="text-[8px] uppercase tracking-widest">RSVP</span>
</div>
<div class="flex flex-col items-center gap-1">
<span class="material-symbols-outlined text-gray-500">styler</span>
<span class="text-[8px] uppercase tracking-widest">Wardrobe</span>
</div>
</div>
</body></html>