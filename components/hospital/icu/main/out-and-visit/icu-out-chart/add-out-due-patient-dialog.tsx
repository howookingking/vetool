'use client'

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
import { toast } from '@/components/ui/use-toast'
import {
  getNotOutDuePatients,
  updatePatientOutDueDate,
} from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { convertPascalCased } from '@/lib/utils/utils'
import type { NotOutDuePatientsData } from '@/types/icu/movement'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function AddOutDuePatientDialog() {
  const [selectedIoId, setSelectedIoId] = useState('')
  const [notOutDuePatients, setNotOutDuePatients] = useState<
    NotOutDuePatientsData[]
  >([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { hos_id, target_date } = useParams()
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (isDialogOpen) {
      const getNotOutDueIoPatients = async () => {
        setIsFetching(true)
        const patients = await getNotOutDuePatients(
          hos_id as string,
          target_date as string,
        )
        setNotOutDuePatients(patients ?? [])
        setIsFetching(false)
      }

      getNotOutDueIoPatients()
    }
  }, [isDialogOpen, hos_id, target_date])

  const handleUpdatePatientOutDueDate = async (icuIoId: string) => {
    setIsDialogOpen(false)

    await updatePatientOutDueDate(
      icuIoId,
      hos_id as string,
      target_date as string,
    )

    toast({
      title: '퇴원예정 환자를 추가하였습니다',
    })

    setIsDialogOpen(false)
  }

  const noPatientToAdd = useMemo(
    () => notOutDuePatients.length === 0,
    [notOutDuePatients],
  )

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" className="h-6 w-6 rounded-full">
          <Plus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>퇴원 예정 환자 추가</DialogTitle>
          <DialogDescription>
            입원 환자 중 {target_date} 날짜로의 퇴원 예정 환자를 추가합니다
          </DialogDescription>
        </DialogHeader>

        <Select onValueChange={setSelectedIoId}>
          <SelectTrigger disabled={noPatientToAdd || isFetching}>
            <SelectValue
              placeholder={
                isFetching
                  ? '입원중인 환자목록 가져오는 중...'
                  : noPatientToAdd
                    ? '퇴원할 환자가 없습니다'
                    : '환자 선택'
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {notOutDuePatients.map((patient) => (
                <SelectItem key={patient.patient_id} value={patient.icu_io_id}>
                  <div className="flex items-center gap-1">
                    <span>{patient.patient.name}</span>
                    <span className="pl-1 text-xs leading-[10px] text-muted-foreground">
                      {convertPascalCased(patient.patient.breed)}
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
          <Button onClick={() => handleUpdatePatientOutDueDate(selectedIoId)}>
            추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
