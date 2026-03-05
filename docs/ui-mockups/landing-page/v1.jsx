import React from 'react';
import { Shield, Zap, Lock, ChevronRight, PlayCircle, Server } from 'lucide-react';

// ============================================================================
// --- COMPOSANTS UI PURS (Dumb Components) ---
// ============================================================================

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
          The High Roller
        </h1>
        <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full">
          Beta
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#fairplay" className="hover:text-white transition-colors">Fair Play</a>
        <a href="#cashier" className="hover:text-white transition-colors">Cashier</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden md:block text-xs font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">
          Sign In
        </button>
        <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]">
          Play Now
        </button>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors text-zinc-400">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{title}</h3>
    <p className="text-sm text-zinc-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const LegalFooter = () => (
  <footer className="bg-zinc-950 border-t border-white/5 py-12 mt-24">
    <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
      
      <div className="md:col-span-4">
        <h2 className="text-xl font-black tracking-tighter uppercase italic text-zinc-600 mb-4">
          The High Roller
        </h2>
        <p className="text-xs text-zinc-500 leading-relaxed mb-6">
          L'expérience poker "Liquid Glass" conçue pour les joueurs exigeants. Focus sur la fluidité, la sécurité et le fair-play absolu.
        </p>
      </div>

      <div className="md:col-span-8 flex flex-col md:flex-row gap-8 md:justify-end">
        {/* Compliance légale belge */}
        <div className="p-4 rounded-xl border border-rose-900/30 bg-rose-950/10 max-w-sm flex items-start gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-700 text-white font-black text-xl">
            21+
          </div>
          <div>
            <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Avertissement Légal</h4>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              Conformément à la loi belge et à la Commission des jeux de hasard, l'accès aux jeux d'argent de type casino/poker est <strong>strictement interdit aux moins de 21 ans</strong>. Jouez avec modération. En cas de besoin, contactez aide-aux-joueurs.be.
            </p>
          </div>
        </div>
      </div>
      
    </div>
    <div className="max-w-[1400px] mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest">
      <p>© 2026 Underground Suite Poker. All rights reserved.</p>
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="#" className="hover:text-zinc-400">Terms</a>
        <a href="#" className="hover:text-zinc-400">Privacy</a>
        <a href="#" className="hover:text-zinc-400">Responsible Gaming</a>
      </div>
    </div>
  </footer>
);

// ============================================================================
// --- COMPOSANT PRINCIPAL (Vue de la Landing Page) ---
// ============================================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-900/15 blur-[120px] rounded-[100%] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 max-w-[1400px] mx-auto flex flex-col items-center text-center z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Tables Live Now</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
            Redefining <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 italic pr-2">
              Online Poker
            </span>
          </h2>
          
          <p className="max-w-2xl text-base md:text-lg text-zinc-400 mb-12 leading-relaxed">
            Plongez dans l'expérience "Liquid Glass". Une interface asymétrique conçue pour les professionnels, soutenue par une architecture cryptographique garantissant un fair-play absolu.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="px-8 py-4 bg-white text-zinc-950 hover:bg-zinc-200 text-sm font-black uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 group">
              <PlayCircle size={18} className="group-hover:scale-110 transition-transform" />
              Join the Tables
            </button>
            <button className="px-8 py-4 bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 text-white text-sm font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2">
              View Analytics <ChevronRight size={18} />
            </button>
          </div>

          {/* Abstract UI Preview (Simulating the Poker Table Glass effect) */}
          <div className="mt-24 w-full max-w-5xl relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-10"></div>
            <div className="relative aspect-video rounded-t-3xl border-t border-x border-white/10 bg-zinc-900/40 backdrop-blur-2xl overflow-hidden flex items-center justify-center shadow-[0_-20px_100px_rgba(16,185,129,0.1)]">
              {/* Fake Cards for visual decoration */}
              <div className="flex gap-4 opacity-50 transform -translate-y-8">
                <div className="w-20 h-28 bg-white rounded-xl shadow-2xl rotate-[-10deg]"></div>
                <div className="w-20 h-28 bg-white rounded-xl shadow-2xl rotate-[5deg] translate-y-4"></div>
                <div className="w-20 h-28 bg-emerald-500 rounded-xl shadow-2xl rotate-[15deg] translate-y-2"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Cybersécurité Section */}
        <section id="features" className="py-24 px-6 max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Built for <span className="text-emerald-400">Security</span></h2>
            <p className="text-zinc-500 text-sm uppercase tracking-widest font-mono">End-to-end encrypted architecture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Server}
              title="Provably Fair RNG"
              description="Notre générateur de nombres aléatoires est vérifiable cryptographiquement. Chaque donne est scellée avant la révélation des cartes, éliminant toute possibilité de manipulation."
            />
            <FeatureCard 
              icon={Shield}
              title="Anti-Bot Engine"
              description="Analyse comportementale en temps réel et détection de GTO-solvers pour garantir que vous ne jouez que contre des humains."
            />
            <FeatureCard 
              icon={Lock}
              title="Cold Storage Funds"
              description="L'intégrité de vos jetons/fonds est notre priorité. Systèmes de stockage hors ligne et audits financiers réguliers."
            />
          </div>
        </section>

      </main>

      <LegalFooter />

      {/* Global CSS for subtle animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-pulse { animation: pulse-slow 3s ease-in-out infinite; }
      `}} />
    </div>
  );
}