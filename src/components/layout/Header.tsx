import { useProgressStore } from '../../store/useProgressStore'

export default function Header() {
  const streak = useProgressStore(s => s.calcStreak)()
  const today = new Date()
  const dateLabel = `${today.getMonth() + 1}월 ${today.getDate()}일`

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
      <div>
        <h1 className="text-lg font-bold text-white">日本語ヘルパー</h1>
        <p className="text-xs text-gray-400">{dateLabel}</p>
      </div>
      {streak > 0 && (
        <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-500/40 rounded-full px-3 py-1">
          <span className="text-orange-400 text-sm">🔥</span>
          <span className="text-orange-300 text-sm font-bold">{streak}일 연속</span>
        </div>
      )}
    </header>
  )
}
