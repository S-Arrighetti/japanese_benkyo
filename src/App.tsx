import { useState } from 'react'
import type { Tab } from './types'
import Header from './components/layout/Header'
import TabBar from './components/layout/TabBar'
import DailyPage from './components/daily/DailyPage'
import PhrasePage from './components/phrase/PhrasePage'
import ReviewPage from './components/review/ReviewPage'

export default function App() {
  const [tab, setTab] = useState<Tab>('daily')

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden">
        {tab === 'daily' && <DailyPage />}
        {tab === 'phrase' && <PhrasePage />}
        {tab === 'review' && <ReviewPage />}
      </main>
      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
