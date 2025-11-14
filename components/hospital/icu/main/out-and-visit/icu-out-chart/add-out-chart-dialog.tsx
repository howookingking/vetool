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
import { convertPascalCased } from '@/lib/utils/utils'
import type { IcuIo, Patient } from '@/types'
import type { Species } from '@/types/hospital/calculator'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export type OutPatientCandidate = {
  icu_io_id: IcuIo['icu_io_id']
  patients: Pick<Patient, 'name' | 'breed' | 'owner_name' | 'species'>
}

type Props = {
  targetDate: string
  hosId: string
}

export default function AddOutChartDialog({ targetDate, hosId }: Props) {
  const safeRefresh = useSafeRefresh()

  const [selectedIoId, setSelectedIoId] = useState('')
  const [outPatientCandidates, outPatientCadidates] = useState<
    OutPatientCandidate[]
  >([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const noPatientToAdd = outPatientCandidates.length === 0

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      setIsFetching(true)

      const patients = await getOutCandidates(hosId, targetDate)

      outPatientCadidates(patients)

      setIsFetching(false)
      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
    }
  }

  const handleAddToChart = async () => {
    setIsSubmitting(true)

    await addPatientToOutChart(selectedIoId, targetDate)

    toast.success('퇴원 예정 환자를 추가하였습니다')

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
          <DialogTitle>퇴원예정 환자추가</DialogTitle>
          <DialogDescription>
            {targetDate} 퇴원차트에 추가합니다
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
              {outPatientCandidates.map(({ patients, icu_io_id }) => (
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
