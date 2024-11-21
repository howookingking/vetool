'use client'

import Autocomplete from '@/components/common/auto-complete/auto-complete'
import HelperTooltip from '@/components/common/helper-tooltip'
import SearchChartTable from '@/components/hospital/icu/main/search/search-chart-table'
import SearchChartSheet from '@/components/hospital/icu/main/search/sheet/search-chart-sheet'
import SearchTypeRadio from '@/components/hospital/icu/main/search/sheet/search-type-radio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchIos } from '@/lib/services/icu/search/search-charts'
import { useKeywordTrieStore } from '@/lib/store/hospital/keyword-trie'
import type { SearchedIcuIos } from '@/types/icu/search'
import { Search } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export type SearchOptions = {
  timeRange: string
  order: 'desc' | 'asc'
  searchType: 'simple' | 'keyword'
}

export default function IcuSearchChart() {
  const { hos_id } = useParams()
  const { trie } = useKeywordTrieStore()

  const [inputValue, setInputValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedIcuIos, setSearchedIcuIos] = useState<SearchedIcuIos[]>([])
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    timeRange: '1',
    order: 'desc',
    searchType: 'simple',
  })

  const getSearchValue = useCallback(
    (value: string) => {
      if (searchOptions.searchType === 'keyword') {
        // ','를 기준하여 키워드 분할
        const splittedSearchValue = value.split(',').map((term) => term.trim())

        // 순회하여 검색어 변환
        const keywords = splittedSearchValue.map((term) => {
          const result = trie
            ?.search(term)
            .sort((a, b) => a.keyword.length - b.keyword.length)[0]
          return result?.searchKeyword ?? term
        })

        // 공백을 기준으로 조인
        return keywords.join(' ')
      }
      return value
    },
    [searchOptions.searchType, trie],
  )

  const performSearch = useDebouncedCallback(async (searchValue: string) => {
    setIsSearching(true)

    if (searchValue) {
      const searchResult = await searchIos(
        searchValue,
        hos_id as string,
        searchOptions.timeRange,
        searchOptions.order,
      )

      setSearchedIcuIos(searchResult)
    }
    setIsSearching(false)
  }, 600)

  const handleInputChange = (value: string) => {
    const trimmedValue = value.trim()
    const searchedValue = getSearchValue(trimmedValue)

    setInputValue(trimmedValue)
    performSearch(searchedValue)
  }

  // searchOptions 변경을 감지하여 검색어 설정 및 검색 진행
  useEffect(() => {
    const searchedValue = getSearchValue(inputValue)

    performSearch(searchedValue)
  }, [searchOptions, inputValue, getSearchValue, performSearch])

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="relative flex items-center gap-4 pr-2">
        <Button
          type="button"
          onClick={() => {}}
          variant={'ghost'}
          className="absolute left-0 top-0 z-10 p-2"
        >
          <Search size={18} />
        </Button>

        <Autocomplete
          handleUpdate={handleInputChange}
          label=" "
          placeholder="환자명, 보호자명, DX, CC, 종, 품종, 약물, 오더명 검색"
        />

        {/* <SearchTypeRadio setOptions={setSearchOptions} /> */}

        {/* <HelperTooltip>
          <span className="flex flex-col font-semibold">
            <span>키워드 검색: 키워드의 메인키워드를 검색</span>
            <span>단순 검색: 상위 키워드도 검색 가능</span>
          </span>
        </HelperTooltip> */}
        <SearchChartSheet
          searchOptions={searchOptions}
          setSearchOptions={setSearchOptions}
        />
      </div>

      <SearchChartTable
        searchedIcuIos={searchedIcuIos}
        isSearching={isSearching}
      />
    </div>
  )
}
