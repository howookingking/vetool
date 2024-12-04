'use client'

import SearchPatientPagination from '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-pagination'
import SearchPatientTable from '@/components/hospital/icu/header/register-dialog/search-patient/search-patient-table'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  getHosPatientCount,
  searchPatientsData,
} from '@/lib/services/patient/patient'
import type { PaginatedData, SearchedPatientsData } from '@/types/patients'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchPatientContainer({
  itemsPerPage,
  isIcu,
  hosId,
}: {
  itemsPerPage: number
  isIcu: boolean
  hosId: string
}) {
  const [totalPatientCount, setTotalPatientCount] = useState<number>()
  const { hos_id } = useParams()
  const [isEdited, setIsEdited] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [patientsData, setPatientsData] = useState<
    PaginatedData<SearchedPatientsData[]>
  >({
    data: [],
    total_count: 0,
    page: 1,
    itemsPerPage: 10,
  })
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || '1')
  const router = useRouter()
  const totalPages = Math.ceil(patientsData.total_count / itemsPerPage)

  useEffect(() => {
    getHosPatientCount(hosId).then(setTotalPatientCount)
  }, [hosId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    debouncedSearch()
  }

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('page', newPage.toString())
    router.push(`?${searchParams.toString()}`)

    debouncedSearch()
  }

  const debouncedSearch = useDebouncedCallback(async () => {
    // 정상적인 검색어 값이면 검색
    if (inputValue.trim()) {
      setIsSearching(true)

      const data = await searchPatientsData(
        inputValue,
        hos_id as string,
        isIcu,
        currentPage,
        itemsPerPage,
      )
      setPatientsData(data)
      setIsSearching(false)
    } else {
      setPatientsData({
        data: [],
        total_count: 0,
        page: 1,
        itemsPerPage: itemsPerPage,
      })

      setIsSearching(false)
    }
  }, 500)

  useEffect(() => {
    debouncedSearch()

    setIsEdited(false)
  }, [isEdited, debouncedSearch])

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="환자 번호, 환자명, 보호자명을 검색하세요"
        value={inputValue}
        onChange={handleInputChange}
        id="search-chart"
      />

      <SearchPatientTable
        isSearching={isSearching}
        searchedPatients={patientsData.data}
        setIsEdited={setIsEdited}
        isIcu={isIcu}
      />

      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        현재 등록된 환자 수 :
        {totalPatientCount ? (
          <span className="font-medium text-black">
            {totalPatientCount}마리
          </span>
        ) : (
          <Skeleton className="h-6 w-20" />
        )}
      </div>

      {!isSearching && (
        <div className="flex items-center justify-between px-2">
          <SearchPatientPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}
