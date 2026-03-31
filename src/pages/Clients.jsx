import { useState } from 'react'
import { Search, Plus, Phone, Mail, RefreshCw, CheckCircle, Clock, AlertCircle, X, User, ChevronDown } from 'lucide-react'

const CLIENTS_INIT = [
  {
    id: 1, nom: 'Sophie Martin', email: 'sophie.martin@email.fr', tel: '06 12 34 56 78',
    service: 'Coaching mensuel', montant: 450, statut: 'Actif',
    derniereRelance: '15 mars 2026', prochaineRelance: '15 avril 2026', notes: 'Très réactive, satisfaite du service.',
  },
  {
    id: 2, nom: 'Julien Dupont', email: 'julien.dupont@société.fr', tel: '07 23 45 67 89',
    service: 'Audit site web', montant: 800, statut: 'En attente',
    derniereRelance: '20 mars 2026', prochaineRelance: '31 mars 2026', notes: 'Devis envoyé, en attente de retour.',
  },
  {
    id: 3, nom: 'Marie Leroy', email: 'marie.leroy@startup.io', tel: '06 34 56 78 90',
    service: 'Pack réseaux sociaux', montant: 650, statut: 'Actif',
    derniereRelance: '10 mars 2026', prochaineRelance: '10 avril 2026', notes: 'Contrat renouvelé pour 6 mois.',
  },
  {
    id: 4, nom: 'Thomas Bernard', email: 'thomas@bernard-conseil.fr', tel: '06 45 67 89 01',
    service: 'Formation SEO', montant: 1200, statut: 'A relancer',
    derniereRelance: '1 mars 2026', prochaineRelance: '31 mars 2026', notes: 'N\'a pas répondu au dernier email.',
  },
  {
    id: 5, nom: 'Claire Moreau', email: 'claire.moreau@gmail.com', tel: '07 56 78 90 12',
    service: 'Stratégie digitale', montant: 2000, statut: 'Prospect',
    derniereRelance: '25 mars 2026', prochaineRelance: '1 avril 2026', notes: 'Premier contact via LinkedIn.',
  },
  {
    id: 6, nom: 'Nicolas Petit', email: 'n.petit@artisan-web.fr', tel: '06 67 89 01 23',
    service: 'Maintenance mensuelle', montant: 300, statut: 'Actif',
    derniereRelance: '18 mars 2026', prochaineRelance: '18 avril 2026', notes: 'Client fidèle depuis 2 ans.',
  },
  {
    id: 7, nom: 'Laura Fontaine', email: 'laura@fontaine-studio.fr', tel: '06 78 90 12 34',
    service: 'Refonte site vitrine', montant: 3500, statut: 'Inactif',
    derniereRelance: '5 janvier 2026', prochaineRelance: null, notes: 'Projet terminé, à relancer pour nouveau projet.',
  },
]

const STATUT_STYLE = {
  'Actif': { badge: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, iconColor: 'text-emerald-500' },
  'En attente': { badge: 'bg-amber-100 text-amber-700', icon: Clock, iconColor: 'text-amber-500' },
  'A relancer': { badge: 'bg-red-100 text-red-600', icon: AlertCircle, iconColor: 'text-red-500' },
  'Prospect': { badge: 'bg-blue-100 text-blue-700', icon: User, iconColor: 'text-blue-500' },
  'Inactif': { badge: 'bg-gray-100 text-gray-500', icon: Clock, iconColor: 'text-gray-400' },
}

const STATUTS = ['Tous', 'Actif', 'Prospect', 'En attente', 'A relancer', 'Inactif']

function initials(nom) {
  return nom.split(' ').map(n => n[0]).join('').toUpperCase()
}

const avatarColors = [
  'from-indigo-400 to-purple-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-500',
  'from-blue-400 to-cyan-500',
  'from-violet-400 to-purple-500',
  'from-green-400 to-emerald-500',
]

export default function Clients() {
  const [clients, setClients] = useState(CLIENTS_INIT)
  const [search, setSearch] = useState('')
  const [filtre, setFiltre] = useState('Tous')
  const [showModal, setShowModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [form, setForm] = useState({ nom: '', email: '', tel: '', service: '', montant: '', statut: 'Prospect', notes: '' })

  const filtered = clients.filter(c => {
    const matchSearch = c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.service.toLowerCase().includes(search.toLowerCase())
    const matchFiltre = filtre === 'Tous' || c.statut === filtre
    return matchSearch && matchFiltre
  })

  const handleAdd = (e) => {
    e.preventDefault()
    const newClient = {
      id: Date.now(),
      ...form,
      montant: Number(form.montant),
      derniereRelance: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      prochaineRelance: null,
    }
    setClients([newClient, ...clients])
    setShowModal(false)
    setForm({ nom: '', email: '', tel: '', service: '', montant: '', statut: 'Prospect', notes: '' })
  }

  const marquerRelance = (id) => {
    setClients(clients.map(c => c.id === id ? {
      ...c,
      statut: 'Actif',
      derniereRelance: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    } : c))
    if (selectedClient?.id === id) setSelectedClient(null)
  }

  const aRelancer = clients.filter(c => c.statut === 'A relancer').length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Clients & Relances</h2>
          <p className="text-gray-500 mt-1">{clients.length} clients • <span className="text-red-500 font-medium">{aRelancer} à relancer</span></p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Nouveau client
        </button>
      </div>

      {/* Filtres */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un client..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {STATUTS.map(s => (
            <button
              key={s}
              onClick={() => setFiltre(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtre === s ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Client</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Service</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Statut</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Dernière relance</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Prochaine relance</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Montant</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((c, i) => {
              const st = STATUT_STYLE[c.statut] || STATUT_STYLE['Inactif']
              return (
                <tr
                  key={c.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedClient(c)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 bg-gradient-to-br ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                        {initials(c.nom)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{c.nom}</p>
                        <p className="text-xs text-gray-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{c.service}</td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.badge}`}>{c.statut}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{c.derniereRelance}</td>
                  <td className="px-4 py-4">
                    {c.prochaineRelance ? (
                      <span className={`text-sm ${c.statut === 'A relancer' ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                        {c.prochaineRelance}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-700">{c.montant} €</td>
                  <td className="px-4 py-4">
                    {c.statut === 'A relancer' && (
                      <button
                        onClick={e => { e.stopPropagation(); marquerRelance(c.id) }}
                        className="flex items-center gap-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <RefreshCw size={12} />
                        Relancer
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <User size={36} className="mx-auto mb-2 opacity-30" />
            <p>Aucun client trouvé</p>
          </div>
        )}
      </div>

      {/* Client detail panel */}
      {selectedClient && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-40 flex flex-col border-l border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Fiche client</h3>
            <button onClick={() => setSelectedClient(null)} className="p-1.5 hover:bg-gray-100 rounded-lg">
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {initials(selectedClient.nom)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800">{selectedClient.nom}</h4>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUT_STYLE[selectedClient.statut]?.badge}`}>
                  {selectedClient.statut}
                </span>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={15} className="text-gray-400" />
                <a href={`mailto:${selectedClient.email}`} className="text-indigo-600 hover:underline">{selectedClient.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-gray-400" />
                <span className="text-gray-700">{selectedClient.tel}</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Service</p>
              <p className="text-sm font-medium text-gray-800">{selectedClient.service}</p>
              <p className="text-lg font-bold text-indigo-600 mt-1">{selectedClient.montant} €</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Dernière relance</p>
                <p className="text-sm font-medium text-gray-700">{selectedClient.derniereRelance}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Prochaine relance</p>
                <p className={`text-sm font-medium ${selectedClient.statut === 'A relancer' ? 'text-red-500' : 'text-gray-700'}`}>
                  {selectedClient.prochaineRelance || '—'}
                </p>
              </div>
            </div>
            {selectedClient.notes && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Notes</p>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{selectedClient.notes}</p>
              </div>
            )}
          </div>
          {selectedClient.statut === 'A relancer' && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => marquerRelance(selectedClient.id)}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
              >
                <RefreshCw size={16} />
                Marquer comme relancé
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal nouveau client */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Nouveau client</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Nom complet *</label>
                  <input required value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Jean Dupont" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="jean@exemple.fr" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Téléphone</label>
                  <input value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="06 00 00 00 00" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Service</label>
                  <input value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Nom du service" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Montant (€)</label>
                  <input type="number" value={form.montant} onChange={e => setForm({ ...form, montant: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="0" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Statut</label>
                  <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                    {STATUTS.filter(s => s !== 'Tous').map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Notes</label>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" placeholder="Notes sur ce client..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Créer le client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
