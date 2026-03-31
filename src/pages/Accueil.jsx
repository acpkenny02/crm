import { Users, TrendingUp, Bell, CheckSquare, ArrowUpRight, ArrowDownRight, Calendar, Clock } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts'

const revenueData = [
  { mois: 'Oct', revenus: 3200, depenses: 1400 },
  { mois: 'Nov', revenus: 4100, depenses: 1800 },
  { mois: 'Déc', revenus: 3700, depenses: 1600 },
  { mois: 'Jan', revenus: 4800, depenses: 2100 },
  { mois: 'Fév', revenus: 5200, depenses: 1900 },
  { mois: 'Mar', revenus: 6100, depenses: 2300 },
]

const recentClients = [
  { nom: 'Sophie Martin', service: 'Coaching mensuel', montant: 450, statut: 'Actif', date: 'Aujourd\'hui' },
  { nom: 'Julien Dupont', service: 'Audit site web', montant: 800, statut: 'En attente', date: 'Hier' },
  { nom: 'Marie Leroy', service: 'Pack réseaux sociaux', montant: 650, statut: 'Actif', date: '29 mars' },
  { nom: 'Thomas Bernard', service: 'Formation SEO', montant: 1200, statut: 'A relancer', date: '27 mars' },
]

const todayTasks = [
  { label: 'Relancer Thomas Bernard', type: 'relance', done: false },
  { label: 'Envoyer devis à Claire Moreau', type: 'devis', done: false },
  { label: 'Publier post LinkedIn', type: 'contenu', done: true },
  { label: 'Appel de suivi – Sophie Martin', type: 'appel', done: false },
]

const StatCard = ({ label, value, icon: Icon, color, trend, trendLabel }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{Math.abs(trend)}% {trendLabel}</span>
          </div>
        )}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  </div>
)

const statusBadge = (statut) => {
  const styles = {
    'Actif': 'bg-emerald-100 text-emerald-700',
    'En attente': 'bg-amber-100 text-amber-700',
    'A relancer': 'bg-red-100 text-red-600',
  }
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[statut] || 'bg-gray-100 text-gray-600'}`}>{statut}</span>
}

const taskTypeColor = { relance: 'bg-red-500', devis: 'bg-blue-500', contenu: 'bg-purple-500', appel: 'bg-emerald-500' }

export default function Accueil({ setPage }) {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Bonjour ! 👋</h2>
        <p className="text-gray-500 mt-1 capitalize">{today}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard label="Clients actifs" value="24" icon={Users} color="bg-indigo-500" trend={8} trendLabel="ce mois" />
        <StatCard label="Revenus du mois" value="6 100 €" icon={TrendingUp} color="bg-emerald-500" trend={17} trendLabel="vs mois dernier" />
        <StatCard label="Relances en attente" value="3" icon={Bell} color="bg-amber-500" trend={-2} trendLabel="vs hier" />
        <StatCard label="Tâches aujourd'hui" value="4" icon={CheckSquare} color="bg-purple-500" />
      </div>

      {/* Charts + Tasks */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Revenue chart */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-800">Revenus vs Dépenses</h3>
              <p className="text-sm text-gray-400">6 derniers mois</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />Revenus</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" />Dépenses</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="depGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                formatter={(v) => `${v.toLocaleString('fr-FR')} €`}
              />
              <Area type="monotone" dataKey="revenus" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="depenses" stroke="#f87171" strokeWidth={2} fill="url(#depGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Today's tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Tâches du jour</h3>
          <div className="space-y-3">
            {todayTasks.map((task, i) => (
              <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg ${task.done ? 'opacity-50' : 'hover:bg-gray-50'}`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${taskTypeColor[task.type]}`} />
                <span className={`text-sm flex-1 ${task.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.label}</span>
                {task.done && <span className="text-xs text-emerald-500 font-medium">✓</span>}
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-sm text-indigo-600 font-medium hover:text-indigo-700 text-left">
            + Ajouter une tâche
          </button>
        </div>
      </div>

      {/* Recent clients */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-50">
          <h3 className="font-semibold text-gray-800">Activité récente</h3>
          <button onClick={() => setPage('clients')} className="text-sm text-indigo-600 font-medium hover:text-indigo-700">
            Voir tous les clients →
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {recentClients.map((c, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {c.nom.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{c.nom}</p>
                  <p className="text-xs text-gray-400">{c.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {statusBadge(c.statut)}
                <span className="text-sm font-semibold text-gray-700">{c.montant} €</span>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  {c.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
