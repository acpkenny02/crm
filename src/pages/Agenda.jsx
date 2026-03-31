import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, X, Clock, MapPin, Video, Phone } from 'lucide-react'

const TYPE_STYLE = {
  rdv: { label: 'RDV Client', color: 'bg-indigo-500', light: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  appel: { label: 'Appel', color: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  tache: { label: 'Tâche', color: 'bg-amber-500', light: 'bg-amber-50 text-amber-700 border-amber-200' },
  visio: { label: 'Visio', color: 'bg-purple-500', light: 'bg-purple-50 text-purple-700 border-purple-200' },
  relance: { label: 'Relance', color: 'bg-red-500', light: 'bg-red-50 text-red-700 border-red-200' },
}

const TYPE_ICON = { rdv: MapPin, appel: Phone, tache: Clock, visio: Video, relance: Phone }

const EVENTS_INIT = [
  { id: 1, titre: 'Appel de suivi – Sophie Martin', date: '2026-04-01', heure: '10:00', type: 'appel', description: 'Bilan mensuel du coaching' },
  { id: 2, titre: 'Visio – Claire Moreau', date: '2026-04-02', heure: '14:30', type: 'visio', description: 'Présentation de la stratégie digitale' },
  { id: 3, titre: 'Relance – Thomas Bernard', date: '2026-04-03', heure: '09:00', type: 'relance', description: 'Relance pour la formation SEO' },
  { id: 4, titre: 'RDV – Julien Dupont', date: '2026-04-07', heure: '11:00', type: 'rdv', description: 'Présentation audit site web' },
  { id: 5, titre: 'Envoyer devis – Claire Moreau', date: '2026-04-07', heure: '16:00', type: 'tache', description: 'Finaliser et envoyer le devis stratégie' },
  { id: 6, titre: 'Formation client – Nicolas Petit', date: '2026-04-10', heure: '09:30', type: 'rdv', description: 'Session de formation outil' },
  { id: 7, titre: 'Appel prospect – Laura Fontaine', date: '2026-04-15', heure: '15:00', type: 'appel', description: 'Nouveau projet à discuter' },
  { id: 8, titre: 'Facturation mensuelle', date: '2026-04-30', heure: '09:00', type: 'tache', description: 'Envoyer toutes les factures du mois' },
]

const MOIS_FR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const JOURS_FR = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

function buildCalendarCells(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  const startPadding = firstDay === 0 ? 6 : firstDay - 1
  const cells = []
  for (let i = startPadding - 1; i >= 0; i--) cells.push({ day: daysInPrevMonth - i, cur: false })
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, cur: true })
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, cur: false })
  return cells
}

function pad(n) { return String(n).padStart(2, '0') }

export default function Agenda() {
  const today = new Date()
  const [current, setCurrent] = useState(new Date(2026, 3, 1)) // April 2026
  const [events, setEvents] = useState(EVENTS_INIT)
  const [showModal, setShowModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)
  const [form, setForm] = useState({ titre: '', date: '', heure: '09:00', type: 'rdv', description: '' })

  const year = current.getFullYear()
  const month = current.getMonth()
  const cells = buildCalendarCells(year, month)

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1))

  const eventsForDate = (y, m, d) => {
    const dateStr = `${y}-${pad(m + 1)}-${pad(d)}`
    return events.filter(e => e.date === dateStr)
  }

  const dayEvents = selectedDay ? eventsForDate(year, month, selectedDay) : []

  const upcomingEvents = events
    .filter(e => e.date >= `${year}-${pad(month + 1)}-01`)
    .sort((a, b) => a.date.localeCompare(b.date) || a.heure.localeCompare(b.heure))
    .slice(0, 8)

  const handleAdd = (e) => {
    e.preventDefault()
    setEvents([...events, { id: Date.now(), ...form }])
    setShowModal(false)
    setForm({ titre: '', date: '', heure: '09:00', type: 'rdv', description: '' })
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mon Agenda</h2>
          <p className="text-gray-500 mt-1">{events.length} événements planifiés</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Nouvel événement
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <h3 className="text-lg font-bold text-gray-800">{MOIS_FR[month]} {year}</h3>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {JOURS_FR.map(j => (
              <div key={j} className="text-center text-xs font-semibold text-gray-400 uppercase py-2">{j}</div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, i) => {
              const dayEvents = cell.cur ? eventsForDate(year, month, cell.day) : []
              const isToday = cell.cur && year === today.getFullYear() && month === today.getMonth() && cell.day === today.getDate()
              const isSelected = cell.cur && selectedDay === cell.day
              return (
                <div
                  key={i}
                  onClick={() => cell.cur && setSelectedDay(cell.day === selectedDay ? null : cell.day)}
                  className={`min-h-[70px] p-1.5 rounded-lg cursor-pointer transition-colors ${
                    !cell.cur ? 'opacity-0 pointer-events-none' :
                    isSelected ? 'bg-indigo-50 ring-2 ring-indigo-400' :
                    'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold mb-1 ${
                    isToday ? 'bg-indigo-600 text-white' :
                    isSelected ? 'text-indigo-700' :
                    'text-gray-700'
                  }`}>
                    {cell.day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div key={ev.id} className={`w-full h-1.5 rounded-full ${TYPE_STYLE[ev.type]?.color}`} />
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-400 text-center">+{dayEvents.length - 2}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
            {Object.entries(TYPE_STYLE).map(([key, val]) => (
              <span key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className={`w-2.5 h-2.5 rounded-full ${val.color}`} />
                {val.label}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar: selected day or upcoming */}
        <div className="space-y-4">
          {selectedDay && dayEvents.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-semibold text-gray-800 mb-4">
                {selectedDay} {MOIS_FR[month]}
              </h4>
              <div className="space-y-3">
                {dayEvents.map(ev => {
                  const TypeIcon = TYPE_ICON[ev.type] || Clock
                  return (
                    <div key={ev.id} className={`p-3 rounded-lg border ${TYPE_STYLE[ev.type]?.light}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <TypeIcon size={14} />
                        <span className="text-xs font-bold uppercase">{TYPE_STYLE[ev.type]?.label}</span>
                        <span className="ml-auto text-xs font-semibold">{ev.heure}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{ev.titre}</p>
                      {ev.description && <p className="text-xs text-gray-500 mt-1">{ev.description}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          ) : null}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-semibold text-gray-800 mb-4">À venir</h4>
            <div className="space-y-3">
              {upcomingEvents.map(ev => {
                const TypeIcon = TYPE_ICON[ev.type] || Clock
                return (
                  <div key={ev.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${TYPE_STYLE[ev.type]?.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{ev.titre}</p>
                      <p className="text-xs text-gray-400">{formatDate(ev.date)} · {ev.heure}</p>
                    </div>
                  </div>
                )
              })}
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Aucun événement à venir</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Nouvel événement</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Titre *</label>
                <input required value={form.titre} onChange={e => setForm({ ...form, titre: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="Ex: Appel – Jean Dupont" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Date *</label>
                  <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Heure</label>
                  <input type="time" value={form.heure} onChange={e => setForm({ ...form, heure: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                  {Object.entries(TYPE_STYLE).map(([key, val]) => <option key={key} value={key}>{val.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" placeholder="Détails de l'événement..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Annuler
                </button>
                <button type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Créer l'événement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
