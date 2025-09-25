'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import DataTable from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { searchPatients } from '@/lib/services/patient/patient'
import type { Patient } from '@/types'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import PatientCount from './paitent-count'
import RegisterPatientButton from './register-patient-buttons'
import { searchedPatientsColumns } from './searched-patient-columns'

type Props =
  | {
      hosId: string
      isIcu: true
      setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
    }
  | {
      hosId: string
      isIcu: false
      setIsRegisterDialogOpen: undefined
    }

export default function SearchPatientContainer({
  isIcu = false,
  hosId,
  setIsRegisterDialogOpen,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedPatientsData, setSearchedPatientsData] = useState<Patient[]>(
    [],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    debouncedSearch()
  }

  const debouncedSearch = useDebouncedCallback(async () => {
    if (searchTerm.trim()) {
      setIsSearching(true)

      const data = await searchPatients(
        searchTerm.split(',').map((s) => s.trim()),
        hosId,
      )
      setSearchedPatientsData(data)

      setIsSearching(false)
    }
  }, 500)

  return (
    <div className="relative">
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

      <div className="h-[408px]">
        {isSearching ? (
          <LargeLoaderCircle className="h-[408px]" />
        ) : (
          <DataTable
            rowLength={6}
            data={searchedPatientsData}
            columns={searchedPatientsColumns({
              isIcu,
              hosId,
              debouncedSearch,
              setIsRegisterDialogOpen,
            })}
          />
        )}
      </div>

      <PatientCount hosId={hosId} />
    </div>
  )
}
