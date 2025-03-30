import { create } from 'zustand'
import TrieSearch from 'trie-search'
import { Keyword } from '@/types/hospital/keywords'
import { KEYWORDS } from '@/constants/hospital/keywords'

interface TrieStore {
  trie: TrieSearch<Keyword> | null
  setTrie: (trie: TrieSearch<Keyword>) => void
}

export const useKeywordTrieStore = create<TrieStore>((set) => ({
  trie: null,
  setTrie: (trie) => set({ trie }),
}))

const initializeTrie = () => {
  const trie = new TrieSearch<Keyword>(['keyword', 'mainkeyword'], { min: 1, idFieldOrFunction: 'keyword' })
  trie.addAll(KEYWORDS)
  return trie
}

useKeywordTrieStore.getState().setTrie(initializeTrie())
