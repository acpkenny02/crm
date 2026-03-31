import { useState } from 'react'
import { Plus, X, Instagram, Linkedin, Youtube, Globe, Edit3, CheckCircle, Lightbulb, Clock, Send, Eye } from 'lucide-react'

const STATUTS = ['Tous', 'Idée', 'En cours', 'Prêt', 'Publié']

const STATUT_STYLE = {
  'Idée': { badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400', icon: Lightbulb },
  'En cours': { badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500', icon: Edit3 },
  'Prêt': { badge: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500', icon: CheckCircle },
  'Publié': { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', icon: Send },
}

const PLATEFORMES = ['Tous', 'Instagram', 'LinkedIn', 'Blog', 'YouTube', 'Email']

const PLATEFORME_STYLE = {
  'Instagram': { bg: 'bg-pink-50 text-pink-600 border-pink-200', icon: Instagram },
  'LinkedIn': { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Linkedin },
  'Blog': { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: Globe },
  'YouTube': { bg: 'bg-red-50 text-red-600 border-red-200', icon: Youtube },
  'Email': { bg: 'bg-gray-50 text-gray-600 border-gray-200', icon: Send },
}

const CONTENU_INIT = [
  { id: 1, titre: '5 erreurs à éviter en SEO en 2026', plateforme: 'Blog', statut: 'Publié', date: '20 mars 2026', format: 'Article', notes: 'Très bon engagement, 1.2k vues' },
  { id: 2, titre: 'Carrousel : Comment structurer un audit web', plateforme: 'LinkedIn', statut: 'Publié', date: '22 mars 2026', format: 'Carrousel', notes: '82 likes, 14 partages' },
  { id: 3, titre: 'Reel : Avant / après refonte de site', plateforme: 'Instagram', statut: 'Prêt', date: '1 avril 2026', format: 'Vidéo', notes: 'Vidéo filmée et montée, prête à poster' },
  { id: 4, titre: 'Newsletter : Conseils stratégie digitale', plateforme: 'Email', statut: 'En cours', date: '3 avril 2026', format: 'Newsletter', notes: 'Brouillon à finaliser' },
  { id: 5, titre: 'Tuto YouTube : Créer un tunnel de vente', plateforme: 'YouTube', statut: 'En cours', date: '10 avril 2026', format: 'Vidéo', notes: 'Script écrit, tournage à planifier' },
  { id: 6, titre: 'Post : Témoignage client Sophie Martin', plateforme: 'LinkedIn', statut: 'Prêt', date: '5 avril 2026', format: 'Post texte', notes: 'Validé par le client, à programmer' },
  { id: 7, titre: 'Série Reels : Conseils SEO quotidiens', plateforme: 'Instagram', statut: 'Idée', date: null, format: 'Vidéo', notes: '7 épisodes de 30 secondes' },
  { id: 8, titre: 'Article : Guide complet Google Ads 2026', plateforme: 'Blog', statut: 'Idée', date: null, format: 'Article', notes: 'SEO fort, longue traîne' },
  { id: 9, titre: 'Webinar : Stratégie réseaux sociaux', plateforme: 'YouTube', statut: 'Idée', date: null, format: 'Live', notes: 'Ouvert aux prospects — à planifier Q2' },
]

function PlateformeBadge({ plateforme }) {
  const style = PLATEFORME_STYLE[plateforme]
  if (!style) return <span className="text-xs text-gray-500">{plateforme}</span>
  const Icon = style.icon
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${style.bg}`}>
      <Icon size={11} />
      {plateforme}
    </span>
  )
}

export default function CreationContenu() {
  const [contenu, setContenu] = useState(CONTENU_INIT)
  const [filtreStatut, setFiltreStatut] = useState('Tous')
  const [filtrePlateforme, setFiltrePlateforme] = useState('Tous')
  const [vue, setVue] = useState('liste') // 'liste' | 'kanban'
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ titre: '', plateforme: 'Instagram', statut: 'Idée', format: '', date: '', notes: '' })

  const filtered = contenu.filter(c => {
    const ms = filtreStatut === 'Tous' || c.statut === filtreStatut
    const mp = filtrePlateforme === 'Tous' || c.plateforme === filtrePlateforme
    return ms && mp
  })

  const handleAdd = (e) => {
    e.preventDefault()
    setContenu([{ id: Date.now(), ...form }, ...contenu])
    setShowModal(false)
    setForm({ titre: '', plateforme: 'Instagram', statut: 'Idée', format: '', date: '', notes: '' })
  }

  const changeStatut = (id, newStatut) => {
    setContenu(contenu.map(c => c.id === id ? { ...c, statut: newStatut } : c))
  }

  const stats = {
    'Idée': contenu.filter(c => c.statut === 'Idée').length,
    'En cours': contenu.filter(c => c.statut === 'En cours').length,
    'Prêt': contenu.filter(c => c.statut === 'Prêt').length,
    'Publié': contenu.filter(c => c.statut === 'Publié').length,
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Création de Contenu</h2>
          <p className="text-gray-500 mt-1">{contenu.length} contenus planifiés</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button onClick={() => setVue('liste')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${vue === 'liste' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}>
              Liste
            </button>
            <button onClick={() => setVue('kanban')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${vue === 'kanban' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}>
              Kanban
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Nouveau contenu
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {Object.entries(stats).map(([statut, count]) => {
          const style = STATUT_STYLE[statut]
          const Icon = style.icon
          return (
            <div key={statut} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.badge}`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{count}</p>
                <p className="text-xs text-gray-400">{statut}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {STATUTS.map(s => (
            <button key={s} onClick={() => setFiltreStatut(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtreStatut === s ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}>
              {s}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-gray-200" />
        <div className="flex gap-2 flex-wrap">
          {PLATEFORMES.map(p => (
            <button key={p} onClick={() => setFiltrePlateforme(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filtrePlateforme === p ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Vue Liste */}
      {vue === 'liste' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Titre</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Plateforme</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Format</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Statut</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">Notes</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => {
                const st = STATUT_STYLE[c.statut]
                return (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-800">{c.titre}</p>
                    </td>
                    <td className="px-4 py-4"><PlateformeBadge plateforme={c.plateforme} /></td>
                    <td className="px-4 py-4 text-sm text-gray-500">{c.format}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.badge}`}>{c.statut}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{c.date || '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-400 max-w-xs truncate">{c.notes}</td>
                    <td className="px-4 py-4">
                      <select
                        value={c.statut}
                        onChange={e => changeStatut(c.id, e.target.value)}
                        onClick={e => e.stopPropagation()}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-300"
                      >
                        {STATUTS.filter(s => s !== 'Tous').map(s => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Edit3 size={36} className="mx-auto mb-2 opacity-30" />
              <p>Aucun contenu trouvé</p>
            </div>
          )}
        </div>
      )}

      {/* Vue Kanban */}
      {vue === 'kanban' && (
        <div className="grid grid-cols-4 gap-5">
          {['Idée', 'En cours', 'Prêt', 'Publié'].map(statut => {
            const colonneItems = contenu.filter(c =>
              c.statut === statut &&
              (filtrePlateforme === 'Tous' || c.plateforme === filtrePlateforme)
            )
            const style = STATUT_STYLE[statut]
            const Icon = style.icon
            return (
              <div key={statut}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                  <span className="text-sm font-bold text-gray-700">{statut}</span>
                  <span className="ml-auto text-xs text-gray-400 font-semibold">{colonneItems.length}</span>
                </div>
                <div className="space-y-3">
                  {colonneItems.map(c => (
                    <div key={c.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
                      <PlateformeBadge plateforme={c.plateforme} />
                      <p className="text-sm font-semibold text-gray-800 mt-2 mb-1 leading-snug">{c.titre}</p>
                      {c.format && <p className="text-xs text-gray-400 mb-2">{c.format}</p>}
                      {c.date && <p className="text-xs text-gray-400">📅 {c.date}</p>}
                      {c.notes && <p className="text-xs text-gray-500 mt-2 bg-gray-50 rounded-lg p-2 leading-relaxed">{c.notes}</p>}
                      <div className="mt-3 flex gap-1.5 flex-wrap">
                        {['Idée', 'En cours', 'Prêt', 'Publié'].filter(s => s !== statut).map(s => (
                          <button key={s} onClick={() => changeStatut(c.id, s)}
                            className="text-xs text-gray-500 border border-gray-200 px-2 py-0.5 rounded-md hover:bg-gray-50 transition-colors">
                            → {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {colonneItems.length === 0 && (
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-300 text-sm">
                      Aucun contenu
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Nouveau contenu</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Titre *</label>
                <input required value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Titre de votre contenu" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Plateforme</label>
                  <select value={form.plateforme} onChange={e => setForm({ ...form, plateforme: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                    {PLATEFORMES.filter(p => p !== 'Tous').map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Format</label>
                  <input value={form.format} onChange={e => setForm({ ...form, format: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Article, Reel, Post..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Statut</label>
                  <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                    {STATUTS.filter(s => s !== 'Tous').map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Date de publication</label>
                  <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Ex: 5 avril 2026" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Notes / Idées</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" placeholder="Description, angle, mots-clés..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Créer le contenu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
