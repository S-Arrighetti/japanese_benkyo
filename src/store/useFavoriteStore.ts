import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteStore {
  wordIds: string[]
  phraseIds: string[]
  toggleWord: (id: string) => void
  togglePhrase: (id: string) => void
  hasWord: (id: string) => boolean
  hasPhrase: (id: string) => boolean
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      wordIds: [],
      phraseIds: [],

      toggleWord: (id) => set(s => ({
        wordIds: s.wordIds.includes(id)
          ? s.wordIds.filter(w => w !== id)
          : [...s.wordIds, id],
      })),

      togglePhrase: (id) => set(s => ({
        phraseIds: s.phraseIds.includes(id)
          ? s.phraseIds.filter(p => p !== id)
          : [...s.phraseIds, id],
      })),

      hasWord: (id) => get().wordIds.includes(id),
      hasPhrase: (id) => get().phraseIds.includes(id),
    }),
    { name: 'nihongo-favorites' }
  )
)
