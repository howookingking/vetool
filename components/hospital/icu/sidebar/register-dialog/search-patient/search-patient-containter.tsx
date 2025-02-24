'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchPatientsData } from '@/lib/services/patient/patient'
import { cn } from '@/lib/utils/utils'
import { type PaginatedData, type SearchedPatientsData } from '@/types/patients'
import { X } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { type RegisteringPatient } from '../register-dialog'
import PatientNumber from './paitent-number'
import PatientRegisterButtons from './patient-register-buttons'
import SearchPatientPagination from './search-patient-pagination'
import SearchPatientTable from './search-patient-table'

type SearchPatientContainerProps = {
  itemsPerPage: number
  isIcu?: boolean
  hosId: string
  setIsConfirmDialogOpen?: Dispatch<SetStateAction<boolean>>
  setRegisteringPatient?: Dispatch<SetStateAction<RegisteringPatient | null>>
}

export default function SearchPatientContainer({
  itemsPerPage,
  isIcu = false,
  hosId,
  setIsConfirmDialogOpen,
  setRegisteringPatient,
}: SearchPatientContainerProps) {
  const { hos_id } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()

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

  const currentPage = Number(searchParams.get('page') ?? '1')
  const totalPages = Math.ceil(patientsData.total_count / itemsPerPage)

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
      <div className="flex justify-between gap-2">
        <div className="relative w-full">
          <Input
            placeholder="환자 번호 or 환자명 or 보호자명을 검색하세요. 검색어는 ','로 구분됩니다. (예 : 오유림, 베리)"
            value={inputValue}
            onChange={handleInputChange}
            id="search-chart"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-5 w-5 text-muted-foreground"
            onClick={() => setInputValue('')}
          >
            <X size={12} />
          </Button>
        </div>

        {!isIcu && <PatientRegisterButtons hosId={hosId} />}
      </div>

      {isSearching ? (
        <LargeLoaderCircle
          className={cn(isIcu ? 'h-[488px]' : 'h-[571px]', 'border')}
        />
      ) : (
        <SearchPatientTable
          searchedPatients={patientsData.data}
          setIsEdited={setIsEdited}
          isIcu={isIcu}
          setIsConfirmDialogOpen={setIsConfirmDialogOpen}
          setRegisteringPatient={setRegisteringPatient}
        />
      )}

      <div className="flex w-full items-center justify-between">
        <PatientNumber hosId={hosId} />

        <SearchPatientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}
