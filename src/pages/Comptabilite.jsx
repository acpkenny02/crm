import { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Clock, Plus, X, CheckCircle, AlertCircle, Download } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const chartData = [
  { mois: 'Oct', revenus: 3200, depenses: 1400 },
  { mois: 'Nov', revenus: 4100, depenses: 1800 },
  { mois: 'Déc', revenus: 3700, depenses: 1600 },
  { mois: 'Jan', revenus: 4800, depenses: 2100 },
  { mois: 'Fév', revenus: 5200, depenses: 1900 },
  { mois: 'Mar', revenus: 6100, depenses: 2300 },
]

const FACTURES_INIT = [
  { id: 'F-2026-031', client: 'Sophie Martin', service: 'Coaching mensuel', montant: 450, date: '01/03/2026', echeance: '15/03/2026', statut: 'Payée' },
  { id: 'F-2026-032', client: 'Marie Leroy', service: 'Pack réseaux sociaux', montant: 650, date: '05/03/2026', echeance: '20/03/2026', statut: 'Payée' },
  { id: 'F-2026-033', client: 'Nicolas Petit', service: 'Maintenance mensuelle', montant: 300, date: '01/03/2026', echeance: '15/03/2026', statut: 'Payée' },
  { id: 'F-2026-034', client: 'Julien Dupont', service: 'Audit site web', montant: 800, date: '15/03/2026', echeance: '30/03/2026', statut: 'En attente' },
  { id: 'F-2026-035', client: 'Thomas Bernard', service: 'Formation SEO – acompte', montant: 600, date: '10/03/2026', echeance: '25/03/2026', statut: 'En retard' },
  { id: 'F-2026-036', client: 'Claire Moreau', service: 'Stratégie digitale', montant: 2000, date: '25/03/2026', echeance: '09/04/2026', statut: 'Brouillon' },
]

const DEPENSES_INIT = [
  { id: 1, label: 'Abonnement outils SaaS', categorie: 'Logiciels', montant: 120, date: '01/03/2026' },
  { id: 2, label: 'Publicité réseaux sociaux', categorie: 'Marketing', montant: 350, date: '05/03/2026' },
  { id: 3, label: 'Hébergement & domaines', categorie: 'Technique', montant: 45, date: '01/03/2026' },
  { id: 4, label: 'Formation en ligne', categorie: 'Formation', montant: 190, date: '12/03/2026' },
  { id: 5, label: 'Comptable', categorie: 'Services', montant: 200, date: '15/03/2026' },
  { id: 6, label: 'Matériel informatique', categorie: 'Matériel', montant: 280, date: '20/03/2026' },
]

const STATUT_STYLE = {
  'Payée': 'bg-emerald-100 text-emerald-700',
  'En attente': 'bg-amber-100 text-amber-700',
  'En retard': 'bg-red-100 text-red-600',
  'Brouillon': 'bg-gray-100 text-gray-500',
}

function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  )
}

export default function Comptabilite() {
  const [factures, setFactures] = useState(FACTURES_INIT)
  const [depenses] = useState(DEPENSES_INIT)
  const [tab, setTab] = useState('factures')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ client: '', service: '', montant: '', echeance: '', statut: 'Brouillon' })

  const totalRevenus = factures.filter(f => f.statut === 'Payée').reduce((s, f) => s + f.montant, 0)
  const totalDepenses = depenses.reduce((s, d) => s + d.montant, 0)
  const totalAttendu = factures.filter(f => f.statut === 'En attente').reduce((s, f) => s + f.montant, 0)
  const totalRetard = factures.filter(f => f.statut === 'En retard').reduce((s, f) => s + f.montant, 0)

  const handleAdd = (e) => {
    e.preventDefault()
    const id = `F-2026-0${factures.length + 37}`
    setFactures([{ id, date: new Date().toLocaleDateString('fr-FR'), ...form, montant: Number(form.montant) }, ...factures])
    setShowModal(false)
    setForm({ client: '', service: '', montant: '', echeance: '', statut: 'Brouillon' })
  }

  const marquerPayee = (id) => setFactures(factures.map(f => f.id === id ? { ...f, statut: 'Payée' } : f))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Comptabilité</h2>
          <p className="text-gray-500 mt-1">Mars 2026 · Vue financière</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Nouvelle facture
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard label="Revenus encaissés" value={`${totalRevenus.toLocaleString('fr-FR')} €`} icon={TrendingUp} color="bg-emerald-500" sub="Ce mois" />
        <StatCard label="Dépenses" value={`${totalDepenses.toLocaleString('fr-FR')} €`} icon={TrendingDown} color="bg-red-400" sub="Ce mois" />
        <StatCard label="Bénéfice net" value={`${(totalRevenus - totalDepenses).toLocaleString('fr-FR')} €`} icon={DollarSign} color="bg-indigo-500" sub="Ce mois" />
        <StatCard label="En attente" value={`${(totalAttendu + totalRetard).toLocaleString('fr-FR')} €`} icon={Clock} color="bg-amber-500" sub={totalRetard > 0 ? `dont ${totalRetard} € en retard` : undefined} />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-6">Revenus vs Dépenses — 6 derniers mois</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="mois" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
              formatter={(v) => `${v.toLocaleString('fr-FR')} €`}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }} />
            <Bar dataKey="revenus" name="Revenus" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="depenses" name="Dépenses" fill="#f87171" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-100">
          {[
            { id: 'factures', label: `Factures (${factures.length})` },
            { id: 'depenses', label: `Dépenses (${depenses.length})` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'factures' && (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Facture</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Client</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Service</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Émise le</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Échéance</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase px-4 py-3">Montant</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Statut</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {factures.map(f => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono font-medium text-gray-600">{f.id}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-800">{f.client}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{f.service}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{f.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{f.echeance}</td>
                  <td className="px-4 py-4 text-sm font-bold text-gray-800 text-right">{f.montant} €</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUT_STYLE[f.statut]}`}>{f.statut}</span>
                  </td>
                  <td className="px-4 py-4">
                    {f.statut !== 'Payée' && f.statut !== 'Brouillon' && (
                      <button onClick={() => marquerPayee(f.id)}
                        className="text-xs text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1">
                        <CheckCircle size={13} /> Marquer payée
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'depenses' && (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Libellé</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Catégorie</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Date</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase px-4 py-3">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {depenses.map(d => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{d.label}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{d.categorie}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{d.date}</td>
                  <td className="px-4 py-4 text-sm font-bold text-red-500 text-right">- {d.montant} €</td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t-2 border-gray-200">
                <td colSpan={3} className="px-6 py-3 text-sm font-bold text-gray-700">Total dépenses</td>
                <td className="px-4 py-3 text-sm font-bold text-red-600 text-right">- {totalDepenses} €</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Nouvelle facture</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Client *</label>
                <input required value={form.client} onChange={e => setForm({ ...form, client: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Nom du client" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Service / Prestation *</label>
                <input required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Description du service" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Montant (€) *</label>
                  <input required type="number" value={form.montant} onChange={e => setForm({ ...form, montant: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="0" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Échéance</label>
                  <input type="text" value={form.echeance} onChange={e => setForm({ ...form, echeance: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="30/04/2026" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Statut</label>
                <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                  {Object.keys(STATUT_STYLE).map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Créer la facture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
