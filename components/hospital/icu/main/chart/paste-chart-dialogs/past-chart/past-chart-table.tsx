import { Accordion } from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PatientIo } from '@/lib/services/icu/chart/get-icu-chart'
import type { Dispatch, SetStateAction } from 'react'
import IoAccordionTrigger from './Io-accordion-trigger'

import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
  patientId: string
  targetDate: string
  patientIos: PatientIo[]
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function PastChartTable({
  patientId,
  targetDate,
  patientIos,
  setIsDialogOpen,
}: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <ScrollArea className="h-[480px]">
        <Table className="border">
          <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
            <TableRow>
              <TableHead className="w-1/4 text-center">입원일</TableHead>
              <TableHead className="w-1/4 text-center">퇴원일</TableHead>
              <TableHead className="w-1/4 text-center">DX</TableHead>
              <TableHead className="w-1/4 text-center">CC</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {patientIos.map((patientIo) => (
              <IoAccordionTrigger
                key={patientIo.icu_io_id}
                patientId={patientId}
                targetDate={targetDate}
                patientIo={patientIo}
                setIsDialogOpen={setIsDialogOpen}
              />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Accordion>
  )
}
