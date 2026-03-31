import { Home, Users, Calendar, TrendingUp, PenTool, Bell } from 'lucide-react'

const navItems = [
  { id: 'accueil', label: 'Accueil', icon: Home },
  { id: 'clients', label: 'Clients & Relances', icon: Users },
  { id: 'agenda', label: 'Mon Agenda', icon: Calendar },
  { id: 'comptabilite', label: 'Comptabilité', icon: TrendingUp },
  { id: 'contenu', label: 'Création de Contenu', icon: PenTool },
]

export default function Sidebar({ page, setPage, notifications }) {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-sm">
            CR
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">Mon CRM</h1>
            <p className="text-slate-400 text-xs">Tableau de bord</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => {
          const notif = notifications?.[id]
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all ${
                page === id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span className="text-sm font-medium">{label}</span>
              </div>
              {notif > 0 && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  page === id ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'
                }`}>
                  {notif}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Notifications rapides */}
      <div className="px-4 pb-4">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Bell size={14} className="text-amber-400" />
            <span className="text-xs font-semibold text-slate-300">Alertes</span>
          </div>
          <p className="text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">3 relances</span> à effectuer aujourd'hui
          </p>
          <p className="text-xs text-slate-400 mt-1">
            <span className="text-red-400 font-semibold">1 facture</span> en retard
          </p>
        </div>
      </div>

      {/* Profil */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
            ME
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Mon Entreprise</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}
