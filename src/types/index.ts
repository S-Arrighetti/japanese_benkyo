export interface Word {
  id: string
  japanese: string
  reading: string
  korean: string
  level: 'N1' | 'N2' | 'N3'
  example: string
  exampleKorean: string
}

export interface Kanji {
  id: string
  character: string
  onyomi: string
  kunyomi: string
  korean: string
  level: 'N1' | 'N2' | 'N3'
  words: string[]
}

export interface Phrase {
  id: string
  category: 'daily' | 'travel' | 'business' | 'restaurant' | 'shopping'
  japanese: string
  reading: string
  korean: string
  situation: string
}

export type Tab = 'daily' | 'phrase' | 'review'

export type Level = 'N1' | 'N2' | 'N3'

export interface DailySet {
  date: string
  words: Word[]
  kanjis: Kanji[]
}

export interface WordProgress {
  wordId: string
  correct: number
  wrong: number
  favorited: boolean
}

export interface DayRecord {
  date: string
  completed: boolean
  wordIds: string[]
  kanjiIds: string[]
}
