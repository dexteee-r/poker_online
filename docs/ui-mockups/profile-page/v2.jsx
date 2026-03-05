
import React, { useState } from 'react';
import { 
  User, Shield, Activity, Wallet, KeyRound, 
  History, LogOut, Smartphone, Monitor, AlertTriangle, 
  TrendingUp, Crosshair, Zap, Fingerprint
} from 'lucide-react';

// ============================================================================
// --- LOGIQUE METIER & DONNEES (Mocks) ---
// ============================================================================

const MOCK_USER = {
  username: "Viper_01",
  clearance: "Level 4 - High Roller",
  memberSince: "2026",
  inviteToken: "VIP-8F92-A1B2",
  networkChips: 125000,
  stats: {
    handsPlayed: 14520,
    winRate: "+12.4 bb/100",
    vpip: 24.5, // %
    pfr: 18.2,  // %
    threeBet: 7.1 // %
  },
  sessions: [
    { id: 1, device: "MacBook Pro", ip: "192.168.1.45", location: "Encrypted Node", active: true },
    { id: 2, device: "iPhone 15 Pro", ip: "85.27.12.99", location: "Relay Node BE", active: false }
  ]
};

// ============================================================================
// --- COMPOSANTS UI PURS (Dumb Components) ---
// ============================================================================

const NavPill = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
      active 
        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
        : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'
    }`}
  >
    <Icon size={16} />
    <span className="hidden md:block">{label}</span>
  </button>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
    {children}
  </div>
);

const StatBar = ({ label, value, max, colorClass }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1.5">
      <span>{label}</span>
      <span className="text-white font-mono">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/5">
      <div 
        className={`h-full ${colorClass} shadow-[0_0_10px_currentColor]`} 
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  </div>
);

// ============================================================================
// --- VUES PRINCIPALES (Bento Grid) ---
// ============================================================================

const OverviewGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    {/* BENTO 1 : Identity (Span 4) */}
    <GlassCard className="md:col-span-4 flex flex-col justify-between min-h-[300px]">
      <div className="flex justify-between items-start">
        <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#10b981_2px,#10b981_4px)]"></div>
          <User size={28} className="text-zinc-300 relative z-10" />
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
          <Shield size={10} /> {MOCK_USER.clearance}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-3xl font-black tracking-tighter uppercase text-white mb-2">{MOCK_USER.username}</h2>
        <div className="text-xs font-mono text-zinc-500">Operative since {MOCK_USER.memberSince}</div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Invite Token</span>
        <span className="text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/5 blur-[2px] hover:blur-none transition-all cursor-pointer" title="Hover to reveal">
          {MOCK_USER.inviteToken}
        </span>
      </div>
    </GlassCard>

    {/* BENTO 2 : Bankroll (Span 8) */}
    <GlassCard className="md:col-span-8 flex flex-col justify-center relative min-h-[300px]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="text-emerald-500" size={20} />
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Network Ledger</span>
      </div>
      
      <div className="text-6xl md:text-8xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 tracking-tighter drop-shadow-2xl mb-4">
        ₮ {MOCK_USER.networkChips.toLocaleString()}
      </div>
      
      <div className="flex gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-950/80 rounded-lg border border-white/5 text-xs font-mono text-zinc-400">
          <TrendingUp size={14} className="text-emerald-500" /> + 4,200 (Last 7 Days)
        </div>
      </div>
    </GlassCard>

    {/* BENTO 3 : HUD Poker Stats (Span 6) */}
    <GlassCard className="md:col-span-6">
      <div className="flex items-center gap-3 mb-8">
        <Crosshair className="text-rose-500" size={20} />
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tactical HUD (Stats)</span>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Total Hands</div>
          <div className="text-2xl font-mono text-white">{MOCK_USER.stats.handsPlayed.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Win Rate</div>
          <div className="text-2xl font-mono text-emerald-400">{MOCK_USER.stats.winRate}</div>
        </div>
      </div>

      <div className="space-y-6">
        <StatBar label="VPIP (Voluntarily Put in Pot)" value={MOCK_USER.stats.vpip} max={100} colorClass="bg-blue-500" />
        <StatBar label="PFR (Preflop Raise)" value={MOCK_USER.stats.pfr} max={100} colorClass="bg-rose-500" />
        <StatBar label="3-Bet" value={MOCK_USER.stats.threeBet} max={30} colorClass="bg-amber-500" />
      </div>
    </GlassCard>

    {/* BENTO 4 : Security Cyber (Span 6) */}
    <GlassCard className="md:col-span-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <Fingerprint className="text-blue-500" size={20} />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Cyber Sec Panel</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>

        <div className="space-y-3">
          {MOCK_USER.sessions.map(session => (
            <div key={session.id} className="p-3 rounded-xl bg-zinc-950/50 border border-white/5 flex justify-between items-center group">
              <div className="flex items-center gap-3">
                {session.device.includes("iPhone") ? <Smartphone size={16} className="text-zinc-500" /> : <Monitor size={16} className="text-zinc-500" />}
                <div>
                  <div className="text-xs font-bold text-zinc-300">{session.device}</div>
                  <div className="text-[10px] font-mono text-zinc-600">{session.ip} • {session.location}</div>
                </div>
              </div>
              {session.active ? (
                <span className="text-[9px] uppercase tracking-wider text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 rounded">Active Node</span>
              ) : (
                <button className="text-[9px] uppercase tracking-wider text-rose-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity border border-rose-500/30 px-2 py-1 rounded hover:bg-rose-500/10">
                  Kill Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5">
        <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors flex items-center justify-center gap-2">
          <KeyRound size={14} /> Manage Encryption (2FA)
        </button>
      </div>
    </GlassCard>

  </div>
);

// ============================================================================
// --- COMPOSANT PRINCIPAL (Layout du Dashboard) ---
// ============================================================================

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30 relative overflow-hidden flex flex-col items-center">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none z-0" />
      
      {/* Top Navigation Bar Flottante */}
      <nav className="fixed top-6 z-50 w-full max-w-2xl px-4">
        <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-between shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="flex gap-1">
            <NavPill icon={Activity} label="Command" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <NavPill icon={History} label="History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
            <NavPill icon={Wallet} label="Ledger" active={activeTab === 'ledger'} onClick={() => setActiveTab('ledger')} />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-colors">
            <LogOut size={16} />
            <span className="hidden md:block">Disconnect</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-[1200px] pt-32 pb-16 px-6">
        
        {activeTab === 'overview' && <OverviewGrid />}
        
        {/* Placeholders pour les autres onglets */}
        {['ledger', 'history'].includes(activeTab) && (
           <div className="w-full h-[600px] bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl flex flex-col items-center justify-center text-zinc-500 animate-in fade-in duration-500">
             <Zap size={48} className="text-zinc-800 mb-6" />
             <div className="font-mono text-sm uppercase tracking-widest mb-2">Encrypted Module</div>
             <div className="text-xs text-zinc-600">This sector is currently offline.</div>
           </div>
        )}

        {/* Private Ledger Notice - Toujours présent pour couverture légale */}
        <div className="mt-8 bg-zinc-900/30 border border-blue-500/20 rounded-2xl p-4 flex items-start md:items-center gap-4 max-w-3xl mx-auto">
          <AlertTriangle size={18} className="text-blue-500 flex-shrink-0 mt-0.5 md:mt-0" />
          <p className="text-[10px] text-zinc-500 leading-relaxed font-mono uppercase tracking-wider">
            Disclaimer: ₮ values represent internal network state only. The Underground Suite does not process fiat currency. Private agreements apply offline.
          </p>
        </div>

      </main>

    </div>
  );
}