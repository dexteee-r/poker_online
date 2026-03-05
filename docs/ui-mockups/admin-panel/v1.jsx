import React from 'react';
import { 
  Server, ShieldAlert, Terminal, KeyRound, 
  Activity, AlertOctagon, Cpu, ShieldCheck
} from 'lucide-react';

// ============================================================================
// --- LOGIQUE METIER & DONNEES (Mocks pour l'Admin) ---
// ============================================================================

const MOCK_LOGS = [
  { time: "20:45:12", ip: "192.168.1.45", action: "AUTH_SUCCESS", user: "Viper_01", status: "ok" },
  { time: "20:42:05", ip: "85.27.12.99", action: "INVALID_TOKEN", user: "UNKNOWN", status: "warn" },
  { time: "20:30:00", ip: "45.14.22.11", action: "BRUTE_FORCE_BLOCKED", user: "UNKNOWN", status: "danger" },
  { time: "20:15:11", ip: "10.0.0.5", action: "CHIPS_MINTED", user: "ROOT", status: "ok" },
];

// ============================================================================
// --- COMPOSANTS UI PURS ---
// ============================================================================

const GlassCardDanger = ({ children, className = "" }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:border-rose-500/30 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
    {children}
  </div>
);

// ============================================================================
// --- PAGE PRINCIPALE : ADMIN CONSOLE ---
// ============================================================================

export default function AdminConsolePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-rose-500/30 relative overflow-x-hidden flex flex-col items-center pt-16 px-4 pb-12">
      
      {/* Background Ambient Glow (Rose/Danger for Root) */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-rose-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <main className="relative z-10 w-full max-w-[1400px] animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8">
        
        {/* Header Admin */}
        <div className="mb-12 border-b border-rose-500/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full text-[10px] font-mono text-rose-500 uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(225,29,72,0.1)]">
            <AlertOctagon size={12} /> Root Privilege Active
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-2 drop-shadow-lg">Command Center</h1>
          <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Server size={14} /> Server: The Underground Suite v1.0.4
          </p>
        </div>

        {/* Grille d'Administration (Bento Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* BENTO 1: Token Generator */}
          <GlassCardDanger className="lg:col-span-4 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <KeyRound className="text-amber-500" size={20} />
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">Invite Generator</h2>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Générateur de jeton d'accès cryptographique. Indispensable pour l'onboarding sécurisé d'un nouvel agent dans le réseau.
              </p>
              
              <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 mb-4 text-center">
                <span className="font-mono text-lg text-amber-500/80 select-all">VIP-X89K-M2P4</span>
              </div>
            </div>
            
            <button className="w-full py-3.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95">
              <Terminal size={14} /> Generate New Key
            </button>
          </GlassCardDanger>

          {/* BENTO 2: Network Ledger Controller */}
          <GlassCardDanger className="lg:col-span-4 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="text-blue-500" size={20} />
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">Ledger Controller</h2>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Module Root de création (Mint) ou destruction (Burn) des jetons virtuels ₮.
              </p>
              
              <div className="space-y-3 mb-6">
                <input type="text" placeholder="Target Username / ID" className="w-full bg-zinc-950 border border-white/10 text-white text-xs rounded-lg px-4 py-3.5 focus:border-blue-500/50 outline-none font-mono transition-colors" />
                <input type="number" placeholder="Amount (₮)" className="w-full bg-zinc-950 border border-white/10 text-white text-xs rounded-lg px-4 py-3.5 focus:border-blue-500/50 outline-none font-mono transition-colors" />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-3.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95">
                Mint (+)
              </button>
              <button className="flex-1 py-3.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95">
                Burn (-)
              </button>
            </div>
          </GlassCardDanger>

          {/* BENTO 3: Firewall Logs */}
          <GlassCardDanger className="lg:col-span-4 lg:row-span-2 flex flex-col shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2">
                <ShieldAlert className="text-rose-500" size={20} />
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">Firewall Logs</h2>
              </div>
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </div>
            
            <div className="flex-1 bg-zinc-950/80 border border-white/5 rounded-xl p-4 overflow-hidden flex flex-col">
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-3 pb-3 border-b border-white/5">
                <span>Timestamp / IP</span>
                <span>Event / Status</span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {MOCK_LOGS.map((log, i) => (
                  <div key={i} className="text-xs font-mono flex flex-col gap-1.5 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors rounded px-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">{log.time}</span>
                      <span className={`${log.status === 'danger' ? 'text-rose-500 font-bold' : log.status === 'warn' ? 'text-amber-500' : 'text-emerald-500'}`}>
                        [{log.action}]
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">{log.ip}</span>
                      <span className="text-zinc-600">USR:{log.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full mt-4 py-3.5 border border-rose-500/20 hover:bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
              <ShieldCheck size={14} /> Export Security Audit (.CSV)
            </button>
          </GlassCardDanger>

          {/* BENTO 4: Server Status */}
          <GlassCardDanger className="lg:col-span-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
             <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                 <div className="w-12 h-12 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
                 <Activity className="absolute text-emerald-500" size={16} />
               </div>
               <div>
                 <div className="text-xs font-bold uppercase tracking-widest text-white mb-1.5">WebSocket Server Status</div>
                 <div className="text-[10px] font-mono text-emerald-500">Latency: 12ms • Conns: 24/1000 • Uptime: 14d 2h</div>
               </div>
             </div>
             <button className="w-full md:w-auto px-6 py-3.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-500 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95">
               <AlertOctagon size={12} /> Restart Node Server
             </button>
          </GlassCardDanger>

        </div>
      </main>
      
      {/* Custom CSS for Admin Logs Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(225,29,72,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(225,29,72,0.4); }
      `}} />
    </div>
  );
}