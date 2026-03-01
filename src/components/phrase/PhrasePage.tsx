import { useState } from 'react'
import type { Phrase } from '../../types'
import { useFavoriteStore } from '../../store/useFavoriteStore'
import phrasesData from '../../data/phrases.json'

const phrases = phrasesData as Phrase[]

const categories: { id: Phrase['category']; label: string; icon: string }[] = [
  { id: 'daily', label: '일상', icon: '☀️' },
  { id: 'travel', label: '여행', icon: '✈️' },
  { id: 'business', label: '비즈니스', icon: '💼' },
  { id: 'restaurant', label: '음식점', icon: '🍜' },
  { id: 'shopping', label: '쇼핑', icon: '🛍️' },
]

export default function PhrasePage() {
  const [activeCategory, setActiveCategory] = useState<Phrase['category']>('daily')
  const [expanded, setExpanded] = useState<string | null>(null)
  const togglePhrase = useFavoriteStore(s => s.togglePhrase)
  const hasPhrase = useFavoriteStore(s => s.hasPhrase)

  const filtered = phrases.filter(p => p.category === activeCategory)

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 카테고리 탭 — 가로 스크롤, 스크롤바 숨김 */}
      <div
        className="flex gap-2 px-4 py-3 shrink-0"
        style={{ overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setExpanded(null) }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 active:bg-gray-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 표현 리스트 */}
      <div
        className="flex-1 min-h-0 px-4 pb-6 flex flex-col gap-2"
        style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
      >
        {filtered.map(phrase => {
          const isOpen = expanded === phrase.id
          const fav = hasPhrase(phrase.id)
          return (
            <div
              key={phrase.id}
              className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden"
            >
              {/* 헤더 — 탭하면 펼치기 */}
              <div
                className="flex items-center justify-between px-4 py-4 active:bg-gray-700/50 cursor-pointer select-none"
                onClick={() => setExpanded(isOpen ? null : phrase.id)}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-white font-semibold text-base leading-snug break-keep">
                    {phrase.japanese}
                  </p>
                  <p className="text-gray-400 text-sm mt-0.5 leading-snug">
                    {phrase.reading}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={e => { e.stopPropagation(); togglePhrase(phrase.id) }}
                    className="text-xl p-1"
                  >
                    {fav ? '⭐' : '☆'}
                  </button>
                  <span className={`text-gray-500 text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              {/* 펼침 내용 */}
              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-700 pt-3 flex flex-col gap-2">
                  <p className="text-indigo-300 font-medium text-base leading-snug">
                    {phrase.korean}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {phrase.situation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
