import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WordProgress, DayRecord } from '../types'
import { todayStr } from '../utils/daily'

interface ProgressStore {
  records: DayRecord[]
  wordProgress: Record<string, WordProgress>
  streak: number

  markDayComplete: (wordIds: string[], kanjiIds: string[]) => void
  recordAnswer: (wordId: string, correct: boolean) => void
  toggleFavorite: (wordId: string) => void
  isTodayComplete: () => boolean
  calcStreak: () => number
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      records: [],
      wordProgress: {},
      streak: 0,

      markDayComplete: (wordIds, kanjiIds) => {
        const today = todayStr()
        set(s => ({
          records: [
            ...s.records.filter(r => r.date !== today),
            { date: today, completed: true, wordIds, kanjiIds },
          ],
        }))
      },

      recordAnswer: (wordId, correct) => {
        set(s => {
          const prev = s.wordProgress[wordId] ?? { wordId, correct: 0, wrong: 0, favorited: false }
          return {
            wordProgress: {
              ...s.wordProgress,
              [wordId]: {
                ...prev,
                correct: prev.correct + (correct ? 1 : 0),
                wrong: prev.wrong + (correct ? 0 : 1),
              },
            },
          }
        })
      },

      toggleFavorite: (wordId) => {
        set(s => {
          const prev = s.wordProgress[wordId] ?? { wordId, correct: 0, wrong: 0, favorited: false }
          return {
            wordProgress: {
              ...s.wordProgress,
              [wordId]: { ...prev, favorited: !prev.favorited },
            },
          }
        })
      },

      isTodayComplete: () => {
        const today = todayStr()
        return get().records.some(r => r.date === today && r.completed)
      },

      calcStreak: () => {
        const { records } = get()
        const completed = new Set(records.filter(r => r.completed).map(r => r.date))
        let count = 0
        const d = new Date()
        while (true) {
          const s = d.toISOString().slice(0, 10)
          if (!completed.has(s)) break
          count++
          d.setDate(d.getDate() - 1)
        }
        return count
      },
    }),
    { name: 'nihongo-progress' }
  )
)
