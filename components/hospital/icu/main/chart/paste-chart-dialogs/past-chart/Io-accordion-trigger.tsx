import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Spinner } from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ChartByIo,
  getChartsByIoId,
  type PatientIo,
} from '@/lib/services/icu/chart/get-icu-chart'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import ChartByIoRow from './chart-by-io-row'

type Props = {
  patientId: string
  targetDate: string
  patientIo: PatientIo
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function IoAccordionTrigger({
  patientId,
  targetDate,
  patientIo,
  setIsDialogOpen,
}: Props) {
  const [isFetching, setIsFetching] = useState(false)
  const [chartByIoId, setChartByIoId] = useState<ChartByIo[]>([])
  const [hasFetched, setHasFetched] = useState(false)

  const handleAccordionOpen = async () => {
    if (!hasFetched) {
      setIsFetching(true)

      const selectedIcuChartData = await getChartsByIoId(patientIo.icu_io_id)
      setChartByIoId(selectedIcuChartData)

      setIsFetching(false)
      setHasFetched(true)
    }
  }

  return (
    <TableRow key={patientIo.icu_io_id}>
      <TableCell colSpan={4} className="border-0 p-0">
        <AccordionItem value={patientIo.icu_io_id} className="border-b-0">
          <AccordionTrigger
            onClick={handleAccordionOpen}
            className="h-10 bg-muted p-0 [&[data-state=open]>svg]:text-white [&[data-state=open]]:bg-primary [&[data-state=open]]:text-primary-foreground"
          >
            <div className="w-1/4 text-center">{patientIo.in_date}</div>
            <div className="w-1/4 text-center">{patientIo.out_date}</div>
            <div className="w-1/4 truncate px-6 text-center">
              {patientIo.icu_io_dx === '' ? '-' : patientIo.icu_io_dx}
            </div>
            <div className="w-1/4 truncate px-6 text-center">
              {patientIo.icu_io_cc === '' ? '-' : patientIo.icu_io_cc}
            </div>
          </AccordionTrigger>

          <AccordionContent className="py-0">
            {isFetching ? (
              <div className="flex h-[280px] items-center justify-center">
                <Spinner className="h-10 w-10 text-primary" />
              </div>
            ) : (
              <ScrollArea className={chartByIoId.length > 3 ? 'h-[280px]' : ''}>
                <Table>
                  <TableHeader className="sticky top-0 z-10 border-b bg-background shadow-sm">
                    <TableRow>
                      <TableHead className="w-1/4 text-center">
                        입원일차
                      </TableHead>
                      <TableHead className="w-1/4 text-center">
                        입원일
                      </TableHead>
                      <TableHead className="w-1/4 text-center">
                        미리보기
                      </TableHead>
                      <TableHead className="w-1/4 text-center">선택</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {chartByIoId.map((chart, index) => (
                      <ChartByIoRow
                        key={chart.icu_chart_id}
                        patientId={patientId}
                        targetDate={targetDate}
                        index={index}
                        chart={chart}
                        setIsDialogOpen={setIsDialogOpen}
                      />
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </AccordionContent>
        </AccordionItem>
      </TableCell>
    </TableRow>
  )
}
