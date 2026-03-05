import React from 'react';
import { Shield, Lock, PlayCircle, Server, ChevronRight } from 'lucide-react';

// ============================================================================
// --- COMPOSANTS UI PURS (Liquid Glass & Centered Layout) ---
// ============================================================================

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/60 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
          The High Roller
        </h1>
      </div>
      
      {/* Liens de navigation centrés */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
        <a href="#features" className="hover:text-emerald-400 transition-colors">Architecture</a>
        <a href="#fairplay" className="hover:text-emerald-400 transition-colors">Security</a>
        <a href="#legal" className="hover:text-emerald-400 transition-colors">Legal</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:block text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">
          Sign In
        </button>
        <button className="px-6 py-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] border border-emerald-400/50">
          Play Now
        </button>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group">
    <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors text-zinc-300 group-hover:text-emerald-400 shadow-inner">
      <Icon size={28} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed max-w-[280px]">
      {description}
    </p>
  </div>
);

const LegalFooter = () => (
  <footer id="legal" className="relative z-10 bg-zinc-950/80 backdrop-blur-md border-t border-white/5 pt-20 pb-12 mt-24">
    <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center text-center">
      
      <h2 className="text-2xl font-black tracking-tighter uppercase italic text-zinc-700 mb-6">
        The High Roller
      </h2>
      
      <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed mb-12">
        Plateforme d'ingénierie logicielle dédiée au poker en ligne. Focus absolu sur la cryptographie, la sécurité des fonds et la transparence des algorithmes.
      </p>

      {/* Compliance légale belge - Centrée et intégrée façon Glass */}
      <div className="p-6 rounded-2xl border border-rose-900/30 bg-rose-950/20 backdrop-blur-sm max-w-2xl w-full flex flex-col items-center gap-4 mb-16">
        <div className="w-14 h-14 bg-zinc-950 rounded-full flex items-center justify-center border border-rose-900/50 text-white font-black text-2xl shadow-[0_0_15px_rgba(225,29,72,0.2)]">
          21+
        </div>
        <div>
          <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2">Conformité Légale Belge</h4>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            L'accès aux jeux de casino et de poker est <strong>strictement interdit aux moins de 21 ans</strong> par la Commission des jeux de hasard. Jouez avec modération. En cas de besoin, contactez aide-aux-joueurs.be.
          </p>
        </div>
      </div>
      
      <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest gap-4">
        <p>© 2026 Underground Suite. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Security Audit</a>
        </div>
      </div>

    </div>
  </footer>
);

// ============================================================================
// --- COMPOSANT PRINCIPAL (Vue de la Landing Page) ---
// ============================================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 relative overflow-x-hidden">
      
      {/* Background Ambient Glows (Liquid Glass effect makers) */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[600px] bg-emerald-900/15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <Navbar />

      <main className="relative z-10 pt-20">
        
        {/* Hero Section - Complètement centrée */}
        <section className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Encrypted Tables Live Now</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter uppercase mb-8 leading-[0.9] drop-shadow-2xl">
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 italic pr-4">
              Online Poker
            </span>
          </h2>
          
          <p className="max-w-2xl text-base md:text-lg text-zinc-400 mb-12 leading-relaxed font-medium">
            L'expérience "Liquid Glass". Une interface conçue pour la concentration, soutenue par une architecture cryptographique garantissant un fair-play absolu.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-105 text-sm font-black uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <PlayCircle size={20} className="group-hover:scale-110 transition-transform" />
              Join the Tables
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-zinc-900/50 hover:bg-zinc-800 backdrop-blur-md border border-white/10 text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2">
              View Analytics <ChevronRight size={18} />
            </button>
          </div>

          {/* Abstract UI Preview (Simulating the Poker Table Glass effect - Centered) */}
          <div className="mt-24 w-full max-w-4xl relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 z-10 pointer-events-none"></div>
            
            <div className="relative w-full aspect-[2/1] rounded-t-[3rem] border-t border-x border-white/10 bg-zinc-900/40 backdrop-blur-2xl overflow-hidden flex items-center justify-center shadow-[0_-20px_100px_rgba(16,185,129,0.1)]">
              
              {/* Fake Cards for visual decoration inside the glass table */}
              <div className="flex justify-center gap-4 opacity-70 transform -translate-y-4">
                <div className="w-20 h-28 bg-white/90 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] rotate-[-12deg] flex items-center justify-center border border-white/20"><span className="text-3xl font-bold text-zinc-900">A</span></div>
                <div className="w-20 h-28 bg-white/95 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] rotate-[0deg] translate-y-4 flex items-center justify-center border border-white/20"><span className="text-3xl text-rose-600">♥</span></div>
                <div className="w-20 h-28 bg-emerald-500/90 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] rotate-[12deg] flex items-center justify-center border border-emerald-400"><span className="text-3xl font-bold text-white">K</span></div>
              </div>

            </div>
          </div>
        </section>

        {/* Features / Cybersécurité Section - Grille centrée */}
        <section id="features" className="py-24 px-6 max-w-[1400px] mx-auto flex flex-col items-center">
          
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 drop-shadow-lg">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Security</span>
            </h2>
            <p className="text-zinc-500 text-sm uppercase tracking-widest font-mono bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5 inline-block">
              End-to-end encrypted architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            <FeatureCard 
              icon={Server}
              title="Provably Fair RNG"
              description="Notre générateur de nombres aléatoires est vérifiable cryptographiquement. Chaque donne est scellée avant la révélation des cartes du board."
            />
            <FeatureCard 
              icon={Shield}
              title="Anti-Bot Engine"
              description="Analyse comportementale heuristique et détection de GTO-solvers pour garantir que vous ne jouez que contre des adversaires humains."
            />
            <FeatureCard 
              icon={Lock}
              title="Cold Storage"
              description="L'intégrité de vos fonds est absolue. 100% des fonds joueurs sont stockés hors ligne selon des protocoles de sécurité bancaires suisses."
            />
          </div>
        </section>

      </main>

      <LegalFooter />

    </div>
  );
}