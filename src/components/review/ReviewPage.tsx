import { useState } from 'react'
import type { Word, Kanji } from '../../types'
import { useFavoriteStore } from '../../store/useFavoriteStore'
import { useProgressStore } from '../../store/useProgressStore'
import WordCard from '../daily/WordCard'
import KanjiCard from '../daily/KanjiCard'
import wordsN3 from '../../data/words-n3.json'
import wordsN2 from '../../data/words-n2.json'
import wordsN1 from '../../data/words-n1.json'
import kanjiAll from '../../data/kanji-all.json'

const allWords = [...wordsN3, ...wordsN2, ...wordsN1] as Word[]
const allKanjis = kanjiAll as Kanji[]

type ReviewTab = 'wrong' | 'favorites'

export default function ReviewPage() {
  const [tab, setTab] = useState<ReviewTab>('wrong')
  const wordProgress = useProgressStore(s => s.wordProgress)
  const favoriteWordIds = useFavoriteStore(s => s.wordIds)

  const wrongWords = allWords.filter(w => {
    const p = wordProgress[w.id]
    return p && p.wrong > 0
  })

  const wrongKanjis = allKanjis.filter(k => {
    const p = wordProgress[k.id]
    return p && p.wrong > 0
  })

  const favWords = allWords.filter(w => favoriteWordIds.includes(w.id))
  const favKanjis = allKanjis.filter(k => favoriteWordIds.includes(k.id))

  const showWords = tab === 'wrong' ? wrongWords : favWords
  const showKanjis = tab === 'wrong' ? wrongKanjis : favKanjis
  const isEmpty = showWords.length === 0 && showKanjis.length === 0

  return (
    <div className="flex-1 flex flex-col">
      {/* 탭 */}
      <div className="flex bg-gray-800 mx-4 mt-4 mb-3 rounded-xl p-1 gap-1 shrink-0">
        <button
          onClick={() => setTab('wrong')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'wrong' ? 'bg-red-600/80 text-white' : 'text-gray-400'
          }`}
        >
          틀린 단어 {wrongWords.length + wrongKanjis.length > 0 && `(${wrongWords.length + wrongKanjis.length})`}
        </button>
        <button
          onClick={() => setTab('favorites')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'favorites' ? 'bg-amber-500/80 text-white' : 'text-gray-400'
          }`}
        >
          즐겨찾기 ⭐ {favWords.length + favKanjis.length > 0 && `(${favWords.length + favKanjis.length})`}
        </button>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <p className="text-4xl">{tab === 'wrong' ? '🎯' : '⭐'}</p>
            <p className="text-gray-400 text-sm">
              {tab === 'wrong'
                ? '아직 틀린 단어가 없습니다\n오늘의 학습을 시작해보세요!'
                : '즐겨찾기가 없습니다\n단어 카드의 ☆를 탭해서 추가하세요'}
            </p>
          </div>
        ) : (
          <>
            {showWords.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">단어</p>
                <div className="flex flex-col gap-3">
                  {showWords.map(w => <WordCard key={w.id} word={w} />)}
                </div>
              </div>
            )}
            {showKanjis.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">한자</p>
                <div className="flex flex-col gap-3">
                  {showKanjis.map(k => <KanjiCard key={k.id} kanji={k} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
