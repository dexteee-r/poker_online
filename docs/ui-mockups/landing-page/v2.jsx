// "use client"; // Dé-commente ceci dans Next.js (App Router) car tu utiliseras Framer Motion / Three.js

import React from 'react';
import { Shield, Server, Lock, PlayCircle, ArrowRight } from 'lucide-react';

// ============================================================================
// --- COMPOSANTS UI PURS (Dumb Components) ---
// ============================================================================

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference pointer-events-auto">
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic text-white">
          The High Roller
        </h1>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      
      <div className="hidden md:flex items-center gap-12 text-xs font-bold uppercase tracking-widest text-zinc-400">
        <a href="#vision" className="hover:text-white transition-colors">Vision</a>
        <a href="#tech" className="hover:text-white transition-colors">Tech</a>
        <button className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2">
          Sign In <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </nav>
);

const TechSpec = ({ icon: Icon, title, value }) => (
  <div className="flex flex-col gap-2 border-l border-white/20 pl-4 py-2 pointer-events-auto">
    <Icon size={16} className="text-emerald-500 mb-2" />
    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{title}</h3>
    <p className="text-sm font-mono text-zinc-200">{value}</p>
  </div>
);

// ============================================================================
// --- COMPOSANT PRINCIPAL (Vue de la Landing Page HUD) ---
// ============================================================================

export default function LandingPage() {
  return (
    // Le conteneur principal a "pointer-events-none" pour laisser les interactions de la souris
    // traverser vers le futur <Canvas> Three.js qui sera placé en dessous.
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-emerald-500/30 relative overflow-hidden pointer-events-none">
      
      {/* ================================================================
        ZONE THREE.JS (Rappel d'intégration)
        ================================================================
        C'est ICI que tu placeras ton composant React Three Fiber.
        Exemple :
        <div className="absolute inset-0 z-0 pointer-events-auto">
           <Canvas>
             <Scene3D />
           </Canvas>
        </div>
        Pour le prototype 2D actuel, on laisse un simple dégradé abstrait.
      */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-zinc-950 opacity-50" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-900/10 blur-[150px] rounded-full z-0" />

      {/* OVERLAY UI (Z-index supérieur) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 flex flex-col justify-center px-6 md:px-12 max-w-[1600px] w-full mx-auto">
          
          {/* Typographie Massive (Hero) */}
          <div className="max-w-4xl pointer-events-auto mt-24">
            <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-black tracking-tighter uppercase leading-[0.85] mb-8 mix-blend-screen">
              Liquid <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-600 italic">
                Glass.
              </span>
            </h2>
            
            <p className="max-w-md text-sm md:text-base text-zinc-400 mb-12 font-light tracking-wide leading-relaxed">
              L'architecture asymétrique du poker en ligne de demain. Cryptographiquement prouvé, propulsé par WebGL.
            </p>

            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-black uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-3 group">
              <PlayCircle size={18} className="group-hover:scale-110 transition-transform" />
              Enter the Suite
            </button>
          </div>

          {/* Spécifications Techniques Minimalistes (En bas de l'écran) */}
          <div className="mt-auto pb-12 pt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-4xl">
             <TechSpec icon={Server} title="Architecture" value="Provably Fair RNG" />
             <TechSpec icon={Shield} title="Security" value="Anti-Solver Engine" />
             <TechSpec icon={Lock} title="Funds" value="Cold Storage Assets" />
          </div>

        </main>

        {/* Footer Légal Minimaliste */}
        <footer className="w-full border-t border-white/10 bg-zinc-950/50 backdrop-blur-md pointer-events-auto">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Compliance légale belge épurée */}
            <div className="flex items-center gap-4 text-xs">
              <span className="w-8 h-8 rounded-full bg-rose-950 border border-rose-900/50 text-rose-500 font-black flex items-center justify-center">
                21+
              </span>
              <p className="text-zinc-500 max-w-lg">
                <span className="text-zinc-300 font-bold uppercase tracking-widest text-[10px] block mb-0.5">Législation Belge</span>
                Accès strictement interdit aux mineurs (CJH). Jouez avec modération.
              </p>
            </div>

            <div className="flex gap-6 text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
            
          </div>
        </footer>
      </div>

    </div>
  );
}