import type { Word, Kanji } from '../types'

// 날짜 문자열 → 숫자 해시 (같은 날 = 항상 같은 결과)
function dateHash(dateStr: string): number {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) & 0xffffffff
  }
  return Math.abs(hash)
}

// 배열에서 n개를 결정론적으로 선택
function pickN<T>(arr: T[], n: number, seed: number): T[] {
  if (arr.length <= n) return arr
  const indices = new Set<number>()
  let s = seed
  while (indices.size < n) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    indices.add(Math.abs(s) % arr.length)
  }
  return [...indices].map(i => arr[i])
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"
}

export function getDailyWords(allWords: Word[], count = 30): Word[] {
  const hash = dateHash(todayStr())
  return pickN(allWords, count, hash)
}

export function getDailyKanjis(allKanjis: Kanji[], count = 10): Kanji[] {
  const hash = dateHash(todayStr() + 'kanji')
  return pickN(allKanjis, count, hash)
}
