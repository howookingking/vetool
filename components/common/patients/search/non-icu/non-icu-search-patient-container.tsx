'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { type RegisteringPatient } from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { searchPatients } from '@/lib/services/patient/patient'
import { type Patient } from '@/types'
import { X } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import PatientNumber from '@/components/common/patients/search/paitent-number'
import RegisterPatientButton from '@/components/common/patients/search//register-patient-buttons'

import { nonIcusearchedPatientsColumns } from './non-icu-searched-patient-columns'

type Props = {
  isIcu?: boolean
  hosId: string
  setIsConfirmDialogOpen?: Dispatch<SetStateAction<boolean>>
  setRegisteringPatient?: Dispatch<SetStateAction<RegisteringPatient | null>>
}

export default function NonIcuSearchPatientContainer({
  isIcu = false,
  hosId,
  setIsConfirmDialogOpen,
  setRegisteringPatient,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedPatientsData, setSearchedPatientsData] = useState(
    [] as Patient[],
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
    <div className="flex h-[540px] flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="relative w-full">
          <Input
            placeholder="환자 번호, 환자명, 보호자명으로 검색하세요. (예 : 김벳툴, 호우)"
            value={searchTerm}
            onChange={handleInputChange}
            id="search-chart"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-5 w-5 text-muted-foreground"
            onClick={() => setSearchTerm('')}
          >
            <X size={12} />
          </Button>
        </div>

        {!isIcu && <RegisterPatientButton hosId={hosId} />}
      </div>

      <div className="h-full flex-1">
        {isSearching ? (
          <LargeLoaderCircle className="h-[400px]" />
        ) : (
          <DataTable
            rowLength={6}
            data={searchedPatientsData}
            columns={nonIcusearchedPatientsColumns({
              isIcu,
              setIsConfirmDialogOpen,
              setRegisteringPatient,
              debouncedSearch,
            })}
          />
        )}
      </div>

      <PatientNumber hosId={hosId} />
    </div>
  )
}
