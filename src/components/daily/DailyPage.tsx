import { useMemo, useState } from 'react'
import { getDailyWords, getDailyKanjis, todayStr } from '../../utils/daily'
import { useProgressStore } from '../../store/useProgressStore'
import WordCard from './WordCard'
import KanjiCard from './KanjiCard'
import type { Word, Kanji } from '../../types'

// 데이터 임포트
import wordsN3 from '../../data/words-n3.json'
import wordsN2 from '../../data/words-n2.json'
import wordsN1 from '../../data/words-n1.json'
import kanjiAll from '../../data/kanji-all.json'

const allWords = [...wordsN3, ...wordsN2, ...wordsN1] as Word[]
const allKanjis = kanjiAll as Kanji[]

type Section = 'words' | 'kanji'

export default function DailyPage() {
  const [section, setSection] = useState<Section>('words')
  const [wordIdx, setWordIdx] = useState(0)
  const [kanjiIdx, setKanjiIdx] = useState(0)

  const todayWords = useMemo(() => getDailyWords(allWords, 5), [])
  const todayKanjis = useMemo(() => getDailyKanjis(allKanjis, 3), [])

  const markDayComplete = useProgressStore(s => s.markDayComplete)
  const isTodayComplete = useProgressStore(s => s.isTodayComplete)
  const done = isTodayComplete()

  function handleWordNext() {
    if (wordIdx < todayWords.length - 1) {
      setWordIdx(i => i + 1)
    } else {
      setSection('kanji')
    }
  }

  function handleKanjiNext() {
    if (kanjiIdx < todayKanjis.length - 1) {
      setKanjiIdx(i => i + 1)
    } else {
      markDayComplete(
        todayWords.map(w => w.id),
        todayKanjis.map(k => k.id)
      )
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
        <p className="text-5xl">🎉</p>
        <p className="text-white text-xl font-bold">오늘 학습 완료!</p>
        <p className="text-gray-400 text-sm">{todayStr()} 학습을 마쳤습니다</p>
        <p className="text-gray-500 text-xs mt-2">복습 탭에서 틀린 단어를 다시 확인해보세요</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full px-4 py-4 gap-4">
      {/* 섹션 토글 */}
      <div className="flex bg-gray-800 rounded-xl p-1 gap-1">
        {(['words', 'kanji'] as Section[]).map(s => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              section === s
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 active:text-gray-200'
            }`}
          >
            {s === 'words' ? `단어 (${Math.min(wordIdx + 1, todayWords.length)}/${todayWords.length})` : `한자 (${Math.min(kanjiIdx + 1, todayKanjis.length)}/${todayKanjis.length})`}
          </button>
        ))}
      </div>

      {/* 카드 영역 */}
      <div className="flex-1 flex flex-col justify-center gap-4">
        {section === 'words' && todayWords[wordIdx] && (
          <>
            <WordCard word={todayWords[wordIdx]} />
            <button
              onClick={handleWordNext}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium active:bg-indigo-700"
            >
              {wordIdx < todayWords.length - 1 ? '다음 단어 →' : '한자 학습으로 →'}
            </button>
          </>
        )}

        {section === 'kanji' && todayKanjis[kanjiIdx] && (
          <>
            <KanjiCard kanji={todayKanjis[kanjiIdx]} />
            <button
              onClick={handleKanjiNext}
              className="w-full py-3 rounded-xl bg-amber-600 text-white font-medium active:bg-amber-700"
            >
              {kanjiIdx < todayKanjis.length - 1 ? '다음 한자 →' : '오늘 학습 완료 ✓'}
            </button>
          </>
        )}
      </div>

      {/* 진도 점 */}
      <div className="flex justify-center gap-2 pb-2">
        {section === 'words'
          ? todayWords.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i <= wordIdx ? 'bg-indigo-400' : 'bg-gray-700'}`} />
            ))
          : todayKanjis.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i <= kanjiIdx ? 'bg-amber-400' : 'bg-gray-700'}`} />
            ))
        }
      </div>
    </div>
  )
}
