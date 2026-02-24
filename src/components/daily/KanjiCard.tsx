import { useState } from 'react'
import type { Kanji } from '../../types'
import { useFavoriteStore } from '../../store/useFavoriteStore'

interface Props {
  kanji: Kanji
}

export default function KanjiCard({ kanji }: Props) {
  const [flipped, setFlipped] = useState(false)
  const toggleWord = useFavoriteStore(s => s.toggleWord)
  const hasWord = useFavoriteStore(s => s.hasWord)
  const favorited = hasWord(kanji.id)

  return (
    <div className="card-flip w-full" style={{ height: 200 }}>
      <div
        className={`card-flip-inner w-full h-full cursor-pointer ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(f => !f)}
      >
        {/* 앞면: 한자 */}
        <div className="card-front w-full h-full bg-gray-800 rounded-2xl border border-gray-700 flex flex-col items-center justify-center p-6 select-none">
          <span className="text-xs text-amber-400 font-medium mb-2">{kanji.level} 한자</span>
          <p className="text-6xl font-bold text-white mb-3">{kanji.character}</p>
          <p className="text-gray-600 text-xs">탭하여 읽기 확인</p>
        </div>

        {/* 뒷면: 읽기 + 뜻 + 단어 */}
        <div className="card-back w-full h-full bg-amber-900/30 rounded-2xl border border-amber-700/40 flex flex-col justify-between p-5 select-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-4xl font-bold text-white mb-1">{kanji.character}</p>
              <p className="text-amber-300 text-sm font-medium">{kanji.korean}</p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); toggleWord(kanji.id) }}
              className="text-2xl"
            >
              {favorited ? '⭐' : '☆'}
            </button>
          </div>
          <div className="flex gap-3 text-sm">
            {kanji.onyomi !== '-' && (
              <div className="bg-gray-800/60 rounded-lg px-3 py-1.5">
                <p className="text-gray-500 text-xs">음독</p>
                <p className="text-white font-medium">{kanji.onyomi}</p>
              </div>
            )}
            {kanji.kunyomi !== '-' && (
              <div className="bg-gray-800/60 rounded-lg px-3 py-1.5">
                <p className="text-gray-500 text-xs">훈독</p>
                <p className="text-white font-medium">{kanji.kunyomi}</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {kanji.words.map((w, i) => (
              <span key={i} className="text-xs bg-gray-800/60 text-gray-300 rounded-full px-2.5 py-1">
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
