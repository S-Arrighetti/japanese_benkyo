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
    <div className="flex flex-col h-full">
      {/* 카테고리 탭 */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
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
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-2">
        {filtered.map(phrase => {
          const isOpen = expanded === phrase.id
          const fav = hasPhrase(phrase.id)
          return (
            <div
              key={phrase.id}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left active:bg-gray-700/50"
                onClick={() => setExpanded(isOpen ? null : phrase.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-base">{phrase.japanese}</p>
                  <p className="text-gray-400 text-sm">{phrase.reading}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={e => { e.stopPropagation(); togglePhrase(phrase.id) }}
                    className="text-lg"
                  >
                    {fav ? '⭐' : '☆'}
                  </button>
                  <span className="text-gray-500 text-xs">{isOpen ? '▲' : '▼'}</span>
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-700 pt-3">
                  <p className="text-indigo-300 font-medium mb-1">{phrase.korean}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{phrase.situation}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
