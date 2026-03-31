import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Accueil from './pages/Accueil'
import Clients from './pages/Clients'
import Agenda from './pages/Agenda'
import Comptabilite from './pages/Comptabilite'
import CreationContenu from './pages/CreationContenu'

const notifications = {
  clients: 3,
  agenda: 2,
}

export default function App() {
  const [page, setPage] = useState('accueil')

  const pages = {
    accueil: <Accueil setPage={setPage} />,
    clients: <Clients />,
    agenda: <Agenda />,
    comptabilite: <Comptabilite />,
    contenu: <CreationContenu />,
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar page={page} setPage={setPage} notifications={notifications} />
      <main className="flex-1 overflow-y-auto">
        {pages[page]}
      </main>
    </div>
  )
}
