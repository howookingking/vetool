'use client'

import SpeciesToIcon from '@/components/common/species-to-icon'
import SubmitButton from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import {
  addPatientToOutChart,
  getOutCandidates,
} from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { getVisitablePatients } from '@/lib/services/icu/out-and-visit/visit-chart'
import { convertPascalCased } from '@/lib/utils/utils'
import type { Patient } from '@/types'
import type { Species } from '@/types/hospital/calculator'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export type OutOrVisitPatientCandidates = {
  icu_io_id: string
  patients: Pick<Patient, 'name' | 'breed' | 'owner_name' | 'species'>
}

type Props = {
  targetDate: string
  hosId: string
  type: 'out' | 'visit'
}

export default function AddOutOrVisitChartDialog({
  targetDate,
  hosId,
  type,
}: Props) {
  const isOut = type === 'out'

  const safeRefresh = useSafeRefresh()

  const [selectedIoId, setSelectedIoId] = useState('')
  const [outOrVisitPatientCandidates, outOrVisitPatientCadidates] = useState<
    OutOrVisitPatientCandidates[]
  >([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const noPatientToAdd = outOrVisitPatientCandidates.length === 0

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      setIsFetching(true)

      const patients = isOut
        ? await getOutCandidates(hosId, targetDate)
        : await getVisitablePatients(hosId, targetDate)
      outOrVisitPatientCadidates(patients)

      setIsFetching(false)
      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
    }
  }

  const handleAddToChart = async () => {
    setIsSubmitting(true)

    isOut
      ? await addPatientToOutChart(selectedIoId, targetDate)
      : await addPatientToOutChart(selectedIoId, targetDate)

    toast.success(`${isOut ? '퇴원' : '면회'}예정 환자를 추가하였습니다`)

    setIsSubmitting(false)
    setIsDialogOpen(false)
    safeRefresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className={'absolute bottom-4 right-4 rounded-full'}
          disabled={isFetching}
        >
          {isFetching ? <Spinner /> : <PlusIcon />}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isOut ? '퇴원' : '면회'}예정 환자추가</DialogTitle>
          <DialogDescription>
            입원 환자 중 {targetDate}에 {isOut ? '퇴원' : '면회'}할 환자를
            추가합니다
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={setSelectedIoId}>
          <SelectTrigger disabled={noPatientToAdd}>
            <SelectValue
              placeholder={
                noPatientToAdd ? '추가 가능한 환자가 없습니다' : '환자 선택'
              }
            />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {outOrVisitPatientCandidates.map(({ icu_io_id, patients }) => (
                <SelectItem key={icu_io_id} value={icu_io_id}>
                  <div className="flex w-full items-center gap-1">
                    <SpeciesToIcon species={patients.species as Species} />
                    <span>{patients.name}</span>
                    {patients.owner_name && (
                      <span className="text-xs">({patients.owner_name})</span>
                    )}
                    <span className="pl-1 text-xs text-muted-foreground">
                      {convertPascalCased(patients.breed)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>

          <SubmitButton
            buttonText="확인"
            isPending={isSubmitting}
            onClick={handleAddToChart}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
