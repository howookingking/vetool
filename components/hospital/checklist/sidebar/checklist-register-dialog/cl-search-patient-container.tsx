import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { searchPatients } from '@/lib/services/patient/patient'
import type { Patient } from '@/types'
import { XIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { clSearchedPatientsColumns } from './cl-searched-patient-columns'
import TotalPatientCount from '@/components/common/patients/search/total-paitent-count'

type Props = {
  hosId: string
  targetDate: string
  setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function ClSearchPatientContainer({
  hosId,
  targetDate,
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
    <div className="flex h-[540px] flex-col gap-2">
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
          <XIcon />
        </Button>
      </div>

      <div className="h-full flex-1">
        {isSearching ? (
          <LargeLoaderCircle className="h-[400px]" />
        ) : (
          <DataTable
            rowLength={6}
            data={searchedPatientsData}
            columns={clSearchedPatientsColumns({
              hosId,
              targetDate,
              setIsRegisterDialogOpen,
            })}
          />
        )}
      </div>

      <TotalPatientCount hosId={hosId} />
    </div>
  )
}
