import type { Tab } from '../../types'

interface Props {
  active: Tab
  onChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'daily', label: '오늘의 학습', icon: '📖' },
  { id: 'phrase', label: '회화', icon: '💬' },
  { id: 'review', label: '복습', icon: '🔄' },
]

export default function TabBar({ active, onChange }: Props) {
  return (
    <nav className="flex bg-gray-900 border-t border-gray-800">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
            active === tab.id
              ? 'text-indigo-400'
              : 'text-gray-500 active:text-gray-300'
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
