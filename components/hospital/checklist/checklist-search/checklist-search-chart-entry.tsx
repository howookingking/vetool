'use client'
import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { searchChecklistCharts } from '@/lib/services/checklist/get-checklist-data-client'
import { Checklist } from '@/types'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { SearchedChecklistColumns } from './searched-checklist-columns'
type Props = {
  hosId: string
}
export default function ChecklistSearchChartEntry({ hosId }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedChecklistData, setSearchedChecklistData] = useState(
    [] as Checklist[],
  )
  const [searchedChecklist, setSearchedChecklist] = useState<Checklist>()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    debouncedSearch()
  }
  const debouncedSearch = useDebouncedCallback(async () => {
    if (searchTerm.trim()) {
      setIsSearching(true)

      const data = await searchChecklistCharts(
        searchTerm.split(',').map((s) => s.trim()),
        hosId,
      )
      console.log('search checklistdata', data)
      setSearchedChecklistData(data)

      setIsSearching(false)
    }
  }, 500)
  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative w-full">
          <Input
            placeholder="환자 번호, 환자명, Tag 로 검색하세요. (예 : 김벳툴, 호우, 수혈, ..)"
            value={searchTerm}
            onChange={handleInputChange}
            id="search-checklist-chart"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-5 w-5 text-muted-foreground"
            onClick={() => setSearchTerm('')}
          >
            <XIcon size={12} />
          </Button>
        </div>
      </div>
      <div className="h-full flex-1">
        {isSearching ? (
          <LargeLoaderCircle className="h-[400px]" />
        ) : (
          <DataTable
            rowLength={6}
            data={searchedChecklistData}
            columns={SearchedChecklistColumns({
              debouncedSearch,
            })}
          />
        )}
      </div>
    </div>
  )
}
