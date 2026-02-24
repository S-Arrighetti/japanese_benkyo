import { useState } from 'react'
import type { Word } from '../../types'
import { useFavoriteStore } from '../../store/useFavoriteStore'
import { useProgressStore } from '../../store/useProgressStore'

interface Props {
  word: Word
}

export default function WordCard({ word }: Props) {
  const [flipped, setFlipped] = useState(false)
  const toggleWord = useFavoriteStore(s => s.toggleWord)
  const hasWord = useFavoriteStore(s => s.hasWord)
  const recordAnswer = useProgressStore(s => s.recordAnswer)
  const favorited = hasWord(word.id)

  return (
    <div className="card-flip w-full" style={{ height: 220 }}>
      <div
        className={`card-flip-inner w-full h-full cursor-pointer ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(f => !f)}
      >
        {/* 앞면: 일본어 */}
        <div className="card-front w-full h-full bg-gray-800 rounded-2xl border border-gray-700 flex flex-col items-center justify-center p-6 select-none">
          <span className="text-xs text-indigo-400 font-medium mb-2">{word.level}</span>
          <p className="text-4xl font-bold text-white mb-2">{word.japanese}</p>
          <p className="text-gray-400 text-lg">{word.reading}</p>
          <p className="text-gray-600 text-xs mt-4">탭하여 뜻 확인</p>
        </div>

        {/* 뒷면: 한국어 뜻 + 예문 */}
        <div className="card-back w-full h-full bg-indigo-900/40 rounded-2xl border border-indigo-700/50 flex flex-col justify-between p-6 select-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-bold text-white mb-1">{word.korean}</p>
              <p className="text-sm text-gray-400">{word.japanese} · {word.reading}</p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); toggleWord(word.id) }}
              className="text-2xl"
            >
              {favorited ? '⭐' : '☆'}
            </button>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-3">
            <p className="text-sm text-gray-300 mb-1">{word.example}</p>
            <p className="text-xs text-gray-500">{word.exampleKorean}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={e => { e.stopPropagation(); recordAnswer(word.id, false); setFlipped(false) }}
              className="flex-1 py-2 rounded-xl bg-red-900/40 border border-red-700/50 text-red-300 text-sm font-medium active:bg-red-900/70"
            >
              모름
            </button>
            <button
              onClick={e => { e.stopPropagation(); recordAnswer(word.id, true); setFlipped(false) }}
              className="flex-1 py-2 rounded-xl bg-green-900/40 border border-green-700/50 text-green-300 text-sm font-medium active:bg-green-900/70"
            >
              알아요
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
