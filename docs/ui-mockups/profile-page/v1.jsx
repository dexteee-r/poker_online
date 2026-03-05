import React, { useState } from 'react';
import { 
  User, Shield, Activity, Wallet, KeyRound, 
  History, LogOut, Smartphone, Monitor, AlertTriangle, 
  ChevronRight, TrendingUp
} from 'lucide-react';

// ============================================================================
// --- LOGIQUE METIER & DONNEES (Mocks pour le Frontend) ---
// ============================================================================

const MOCK_USER = {
  username: "Viper_01",
  status: "VIP Member",
  joinDate: "2026-01-15",
  networkChips: 125000,
  stats: {
    handsPlayed: 14520,
    winRate: "+12.4 bb/100",
    vpip: "24.5%", // Voluntarily Put in Pot
    pfr: "18.2%",  // Preflop Raise
    threeBet: "7.1%"
  },
  sessions: [
    { id: 1, device: "MacBook Pro - Chrome", ip: "192.168.1.45", location: "Brussels, BE", active: true, time: "Current Session" },
    { id: 2, device: "iPhone 15 Pro - Safari", ip: "85.27.12.99", location: "Namur, BE", active: false, time: "2 hours ago" }
  ]
};

// ============================================================================
// --- COMPOSANTS UI PURS (Dumb Components) ---
// ============================================================================

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
      active 
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]' 
        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
    }`}
  >
    <Icon size={18} className={active ? "text-emerald-400" : "text-zinc-600"} />
    {label}
  </button>
);

const StatCard = ({ label, value, trend, isCurrency }) => (
  <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{label}</div>
    <div className="flex items-end gap-3">
      <div className={`text-2xl md:text-3xl font-mono ${isCurrency ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </div>
      {trend && (
        <div className="text-xs font-mono text-emerald-500 flex items-center gap-1 mb-1">
          <TrendingUp size={12} /> {trend}
        </div>
      )}
    </div>
  </div>
);

// Composant Cyber/Securité
const SessionRow = ({ session }) => (
  <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-lg ${session.active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
        {session.device.includes("iPhone") ? <Smartphone size={16} /> : <Monitor size={16} />}
      </div>
      <div>
        <div className="text-sm font-medium text-zinc-200 flex items-center gap-2">
          {session.device}
          {session.active && <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-400 uppercase tracking-wider">Active</span>}
        </div>
        <div className="text-xs font-mono text-zinc-500 mt-0.5">
          {session.ip} • {session.location}
        </div>
      </div>
    </div>
    {!session.active ? (
      <button className="text-xs font-bold uppercase tracking-wider text-rose-500 hover:text-rose-400 transition-colors px-3 py-1.5 rounded-lg border border-rose-500/20 hover:bg-rose-500/10">
        Revoke
      </button>
    ) : (
      <span className="text-xs font-mono text-zinc-600">{session.time}</span>
    )}
  </div>
);

// ============================================================================
// --- VUES PRINCIPALES (Sections du Profil) ---
// ============================================================================

const OverviewSection = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    {/* En-tête du profil */}
    <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="flex items-center gap-6 z-10">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/10 flex items-center justify-center shadow-xl">
          <User size={32} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white mb-1">{MOCK_USER.username}</h2>
          <div className="flex gap-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
            <span className="text-emerald-500">{MOCK_USER.status}</span>
            <span>|</span>
            <span>Member since {MOCK_USER.joinDate.split('-')[0]}</span>
          </div>
        </div>
      </div>

      <div className="z-10 w-full md:w-auto bg-zinc-950/50 border border-white/5 rounded-xl p-4 flex flex-col items-end">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Network Bankroll</span>
        <span className="text-2xl font-mono text-emerald-400">
          ₮ {MOCK_USER.networkChips.toLocaleString()}
        </span>
      </div>
    </div>

    {/* Grille de statistiques HUD */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard label="Hands Played" value={MOCK_USER.stats.handsPlayed.toLocaleString()} />
      <StatCard label="Win Rate" value={MOCK_USER.stats.winRate} isCurrency />
      <StatCard label="VPIP (Aggression)" value={MOCK_USER.stats.vpip} />
      <StatCard label="3-Bet %" value={MOCK_USER.stats.threeBet} />
    </div>

    {/* Message Légal & Fonctionnel pour Serveur Privé */}
    <div className="bg-zinc-900/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 flex gap-4">
      <AlertTriangle size={20} className="text-blue-400 flex-shrink-0" />
      <div>
        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Private Ledger Notice</h4>
        <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
          Les jetons affichés ici (₮) sont des unités de compte internes au réseau "The Underground Suite". Ce réseau ne traite aucun dépôt ou retrait en monnaie fiduciaire (EUR/USD). Tout règlement s'effectue hors-ligne selon les accords du cercle privé.
        </p>
      </div>
    </div>
  </div>
);

const SecuritySection = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
        <Shield className="text-emerald-400" size={24} />
        <h3 className="text-lg font-bold uppercase tracking-widest text-white">Security Center</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 2FA Setup */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Authentication</h4>
          <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm font-bold text-white mb-1">Two-Factor Auth (2FA)</div>
                <div className="text-xs text-zinc-500">Protect your account with TOTP (Google Authenticator / Authy).</div>
              </div>
              <div className="px-2 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold uppercase tracking-wider rounded">
                Disabled
              </div>
            </div>
            <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors">
              Enable 2FA
            </button>
          </div>

          <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-5 mt-4">
            <div className="text-sm font-bold text-white mb-1">Master Password</div>
            <div className="text-xs text-zinc-500 mb-4">Last changed 45 days ago.</div>
            <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-300 transition-colors">
              Update Password
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            Active Sessions <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </h4>
          <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-2">
            {MOCK_USER.sessions.map(session => (
              <SessionRow key={session.id} session={session} />
            ))}
          </div>
          <p className="text-[10px] text-zinc-600 font-mono mt-2">
            If you see unfamiliar activity, revoke the session and change your password immediately.
          </p>
        </div>

      </div>
    </div>
  </div>
);

// ============================================================================
// --- COMPOSANT PRINCIPAL (Layout du Dashboard) ---
// ============================================================================

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30 flex justify-center p-4 md:p-8">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <div className="w-full max-w-[1400px] relative z-10 flex flex-col md:flex-row gap-6">
        
        {/* Navigation Latérale (Sidebar) */}
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-8">
          
          {/* Logo / Title */}
          <div className="px-4 pt-4">
            <h1 className="text-xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              The High Roller
            </h1>
            <div className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mt-1">
              Private Terminal
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <SidebarItem icon={Activity} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
            <SidebarItem icon={Shield} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
            <SidebarItem icon={Wallet} label="Ledger" active={activeTab === 'ledger'} onClick={() => setActiveTab('ledger')} />
            <SidebarItem icon={History} label="Hand History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
          </nav>

          {/* Bottom Action */}
          <div className="mt-auto pb-4 pt-8 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-colors">
              <LogOut size={16} />
              Disconnect
            </button>
          </div>
        </aside>

        {/* Espace Principal (Main Content) */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && <OverviewSection />}
          {activeTab === 'security' && <SecuritySection />}
          {/* Les autres onglets affichent un placeholder pour l'instant */}
          {['ledger', 'history'].includes(activeTab) && (
             <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] h-96 flex items-center justify-center text-zinc-500 font-mono text-sm uppercase tracking-widest">
               Module under construction
             </div>
          )}
        </main>

      </div>
    </div>
  );
}