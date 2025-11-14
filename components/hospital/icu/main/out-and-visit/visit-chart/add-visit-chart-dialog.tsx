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
  addPatientToVisitChart,
  getVisitCandidates,
} from '@/lib/services/icu/out-and-visit/icu-visit-chart'
import { convertPascalCased } from '@/lib/utils/utils'
import type { IcuChart, IcuIo, Patient } from '@/types'
import type { Species } from '@/types/hospital/calculator'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export type VisitPatientCandidate = {
  icu_chart_id: IcuChart['icu_chart_id']
  icu_io: Pick<IcuIo, 'created_at' | 'out_date'>
  patients: Pick<Patient, 'name' | 'breed' | 'owner_name' | 'species'>
}

type Props = {
  targetDate: string
  hosId: string
}

export default function AddVisitChartDialog({ targetDate, hosId }: Props) {
  const safeRefresh = useSafeRefresh()

  const [selectedChartId, setSelectedChartId] = useState('')
  const [visitPatientCandidates, visitPatientCadidates] = useState<
    VisitPatientCandidate[]
  >([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const noPatientToAdd = visitPatientCandidates.length === 0

  const handleOpenChange = async (open: boolean) => {
    if (open) {
      setIsFetching(true)

      const patients = (await getVisitCandidates(hosId, targetDate)).filter(
        (patient) => patient.icu_io?.out_date === null,
      )

      const sortedPatients = patients.sort(
        (a, b) =>
          new Date(a.icu_io?.created_at!).getTime() -
          new Date(b.icu_io?.created_at!).getTime(),
      )

      visitPatientCadidates(sortedPatients as VisitPatientCandidate[])

      setIsFetching(false)
      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
    }
  }

  const handleAddToChart = async () => {
    setIsSubmitting(true)

    await addPatientToVisitChart(selectedChartId)

    toast.success('면회예정 환자를 추가하였습니다')

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
          <DialogTitle>면회예정 환자추가</DialogTitle>
          <DialogDescription>
            {targetDate} 면회차트에 추가합니다
            <br />
            하루 두번 이상 면회할 경우 완료를 취소하고 새로 작성해주세요
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={setSelectedChartId}>
          <SelectTrigger disabled={noPatientToAdd}>
            <SelectValue
              placeholder={
                noPatientToAdd ? '추가 가능한 환자가 없습니다' : '환자 선택'
              }
            />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {visitPatientCandidates.map(({ patients, icu_chart_id }) => (
                <SelectItem key={icu_chart_id} value={icu_chart_id}>
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
