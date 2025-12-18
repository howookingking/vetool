'use client'

import DataTable from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { searchPatients } from '@/lib/services/patient/patient'
import type { Patient } from '@/types'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import RegisterPatientButton from './register-patient-buttons'
import { searchedPatientsColumns } from './searched-patient-columns'
import TotalPatientCount from './total-paitent-count'

type Props =
  | {
      hosId: string
      isIcu: true // ICU에서는 icu 환자 등록 다이얼로그가 있음
      setIsIcuRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
    }
  | {
      hosId: string
      isIcu: false // 다른곳(/patients route)에서는 icu 환자 등록 다이얼로그가 없음
      setIsIcuRegisterDialogOpen: undefined
    }

export default function SearchPatientContainer({
  isIcu = false,
  hosId,
  setIsIcuRegisterDialogOpen,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedPatients, setSearchedPatients] = useState<Patient[]>([])

  const debouncedSearch = useDebouncedCallback(async () => {
    if (searchTerm.trim()) {
      setIsSearching(true)

      const result = await searchPatients(
        searchTerm.split(',').map((s) => s.trim()),
        hosId,
      )
      setSearchedPatients(result)

      setIsSearching(false)
    }
  }, 500)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    debouncedSearch()
  }

  return (
    <div className="relative p-2">
      <div className="mb-2 flex justify-between gap-2">
        <Input
          placeholder="환자번호, 환자명, 보호자명 등으로 검색"
          value={searchTerm}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
        />

        {!isIcu && <RegisterPatientButton hosId={hosId} />}
      </div>

      <div className="h-[480px]">
        <DataTable
          isLoading={isSearching}
          rowLength={6}
          data={searchedPatients}
          columns={searchedPatientsColumns({
            isIcu,
            hosId,
            debouncedSearch,
            setIsIcuRegisterDialogOpen,
          })}
        />
      </div>

      <TotalPatientCount hosId={hosId} />
    </div>
  )
}
