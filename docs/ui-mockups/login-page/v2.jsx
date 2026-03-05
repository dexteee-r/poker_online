import React, { useState } from 'react';
import { Shield, Lock, Mail, KeyRound, ArrowRight, AlertTriangle, Fingerprint, Ticket } from 'lucide-react';

// ============================================================================
// --- COMPOSANTS UI PURS (Dumb Components) ---
// ============================================================================

const GlassInput = ({ icon: Icon, type, placeholder, name, required }) => (
  <div className="relative group mb-4">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
      <Icon size={18} />
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900/80 transition-all placeholder-zinc-600 shadow-inner"
    />
  </div>
);

const SecurityBadge = ({ text }) => (
  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-8">
    <Shield size={12} />
    <span>{text}</span>
  </div>
);

// ============================================================================
// --- LOGIQUE DE VUE (Smart Component) ---
// ============================================================================

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Fonction de soumission simulée (à remplacer par ton backend Python/Node.js)
  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isLogin ? "Connexion" : "Vérification du Token d'accès...";
    alert(`[Sécurité Frontend] Tentative de ${action}. \nDans ton code final, intercepte ceci avec ton hook useAuth().`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 relative flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background Ambient Glows (Liquid Glass effect) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* Back to Home Button (Simulé) */}
      <div className="absolute top-8 left-8 z-20">
        <button className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
           <ArrowRight size={14} className="rotate-180" /> Return
        </button>
      </div>

      <main className="relative z-10 w-full max-w-md">
        
        {/* Header du formulaire */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-4">
            The High Roller
          </h1>
          <SecurityBadge text="Private Server - Encrypted" />
        </div>

        {/* Panneau Principal Liquid Glass */}
        <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Ligne de brillance au top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Toggle Login/Signup */}
          <div className="flex bg-zinc-950/50 rounded-xl p-1 mb-8 border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${isLogin ? 'bg-zinc-800 text-white shadow-md border border-white/10' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${!isLogin ? 'bg-zinc-800 text-white shadow-md border border-white/10' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Join Beta
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            
            {/* --- CHAMPS COMMUNS --- */}
            <GlassInput icon={Mail} type="email" name="email" placeholder="Email Address" required />
            <GlassInput icon={Lock} type="password" name="password" placeholder="Master Password" required />

            {/* --- CHAMPS SPÉCIFIQUES INSCRIPTION (Private Circle) --- */}
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <GlassInput icon={KeyRound} type="password" name="confirmPassword" placeholder="Confirm Password" required />
                
                <div className="my-6 border-t border-white/5 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Fingerprint size={16} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Access Verification</span>
                    </div>
                  </div>
                  
                  {/* Champ Invite Code - Très stylisé "Hacker" */}
                  <div className="relative group mb-4">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500/50 group-focus-within:text-emerald-400 transition-colors">
                      <Ticket size={18} />
                    </div>
                    <input
                      type="text"
                      name="inviteToken"
                      placeholder="Enter your 16-char Invite Token"
                      required
                      className="w-full bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-sm font-mono rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:bg-emerald-950/40 transition-all placeholder-emerald-900 shadow-inner tracking-widest uppercase"
                    />
                  </div>

                  {/* Avertissement Cercle Privé */}
                  <div className="bg-zinc-950/50 border border-white/5 rounded-lg p-3 flex gap-3 mt-4">
                    <AlertTriangle size={16} className="text-zinc-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-400 leading-relaxed">
                      L'accès à <strong>The High Roller</strong> est strictement sur invitation (Closed Beta). Demandez votre token d'accès cryptographique à l'administrateur du réseau.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* --- OPTIONS CONNEXION --- */}
            {isLogin && (
              <div className="flex justify-between items-center mb-6 px-1 animate-in fade-in duration-300">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/20 focus:ring-offset-zinc-950" />
                  <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">Trust this device</span>
                </label>
                <a href="#" className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors">Lost access?</a>
              </div>
            )}

            {/* --- BOUTON SUBMIT --- */}
            <button 
              type="submit"
              className="w-full mt-2 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group border border-emerald-400/30"
            >
              {isLogin ? (
                <>Authenticate <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              ) : (
                <>Validate Token <Shield size={16} className="group-hover:scale-110 transition-transform" /></>
              )}
            </button>

          </form>
        </div>

        {/* Sécurité Footer */}
        <div className="text-center mt-8 text-[10px] text-zinc-600 uppercase tracking-widest font-mono flex flex-col items-center gap-2">
          <p>Protected by TLS 1.3 & Anti-CSRF Tokens</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-400">Invite Only Policy</a>
          </div>
        </div>

      </main>
    </div>
  );
}