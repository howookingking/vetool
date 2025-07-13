import { create } from 'zustand'
import TrieSearch from 'trie-search'
import type { Keyword } from '@/types/hospital/keywords'
import { KEYWORDS } from '@/constants/hospital/keywords'

interface TrieStore {
  trie: TrieSearch<Keyword>
  setTrie: (trie: TrieSearch<Keyword>) => void
}

const initializeTrie = () => {
  const trie = new TrieSearch<Keyword>(['keyword', 'mainkeyword'], {
    min: 1,
    idFieldOrFunction: 'keyword',
  })
  trie.addAll(KEYWORDS)
  return trie
}

export const useKeywordTrieStore = create<TrieStore>((set) => ({
  trie: initializeTrie(),
  setTrie: (trie) => set({ trie }),
}))
