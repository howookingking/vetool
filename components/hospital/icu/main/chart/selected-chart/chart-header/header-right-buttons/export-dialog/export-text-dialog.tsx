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
import { Textarea } from '@/components/ui/textarea'
import { calculateAge } from '@/lib/utils/utils'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { differenceInDays } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ExportTextDialog({
  chartData,
}: {
  chartData: SelectedIcuChart
}) {
  const [isCopying, setIsCopying] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [textContents, setTextContents] = useState('')

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTextContents(generateTextContents(chartData))
    }
    setIsDialogOpen(open)
  }

  const handleCopy = async () => {
    setIsCopying(true)
    await navigator.clipboard.writeText(textContents)
    await new Promise((resolve) => setTimeout(resolve, 300))

    toast.success('복사 완료', {
      description: '메인차트에 붙여넣기 해주세요',
    })

    setIsCopying(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">텍스트</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {chartData.target_date} {chartData.patient.name}의 차트를 텍스트로
            복사합니다
          </DialogTitle>
          <DialogDescription>
            세부사항을 수정하고 복사 버튼을 눌러주세요
          </DialogDescription>
        </DialogHeader>

        <Textarea
          value={textContents}
          onChange={(e) => setTextContents(e.target.value)}
          rows={32}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>

          <SubmitButton
            isPending={isCopying}
            buttonText="복사"
            onClick={handleCopy}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const generateTextContents = (chartData: SelectedIcuChart) => {
  let textContents = `
${chartData.target_date} ${chartData.patient.name} 입원 ${differenceInDays(chartData.target_date as string, chartData.icu_io.in_date)}일차 차트\n
- 입원일 : ${chartData.icu_io.in_date}
- Signalment : ${chartData.patient.species.toUpperCase()} / ${chartData.patient.breed} / ${calculateAge(chartData.patient.birth)} / ${chartData.patient.gender.toUpperCase()} / ${chartData.weight}kg  
- DX : ${chartData.icu_io.icu_io_dx}
- CC : ${chartData.icu_io.icu_io_cc}
`
  const fluidOrders = chartData.orders.filter(
    (order) => order.icu_chart_order_type === 'fluid',
  )
  const checklistOrders = chartData.orders.filter(
    (order) => order.icu_chart_order_type === 'checklist',
  )
  const injectionOrders = chartData.orders.filter(
    (order) => order.icu_chart_order_type === 'injection',
  )
  const poOrders = chartData.orders.filter(
    (order) => order.icu_chart_order_type === 'po',
  )

  const testOrders = chartData.orders.filter(
    (order) => order.icu_chart_order_type === 'test',
  )
  const manualOrders = chartData.orders.filter(
    (order) => order.icu_chart_order_type === 'manual',
  )

  const feedOrders = chartData.orders.filter(
    (order) => order.icu_chart_order_type === 'feed',
  )

  textContents += `\n- 수액\n`
  fluidOrders.forEach((order) => {
    const { icu_chart_order_name, icu_chart_order_comment } = order

    textContents += `${icu_chart_order_name.trim()}${icu_chart_order_comment ? `, ${icu_chart_order_comment}` : ''} \n`
  })

  textContents += `\n- 체크리스트\n`
  checklistOrders.forEach((order) => {
    const { icu_chart_order_name, treatments } = order

    textContents += `${icu_chart_order_name.trim()} : ${treatments.length ? treatments.map((tx) => `${tx.icu_chart_tx_result}(${tx.time}시)`).join(', ') : `${icu_chart_order_name.trim()} 미체크`} \n`
  })

  textContents += `\n- 주사\n`
  injectionOrders.forEach((order) => {
    const { icu_chart_order_name, icu_chart_order_comment } = order

    textContents += `${icu_chart_order_name.trim()}${icu_chart_order_comment ? `, ${icu_chart_order_comment}` : ''} \n`
  })

  textContents += `\n- 경구제\n`
  poOrders.forEach((order) => {
    const { icu_chart_order_name, icu_chart_order_comment } = order

    textContents += `${icu_chart_order_name.trim()}${icu_chart_order_comment ? `, ${icu_chart_order_comment}` : ''} \n`
  })

  textContents += `\n- 검사\n`
  testOrders.forEach((order) => {
    const { icu_chart_order_name, icu_chart_order_comment } = order

    textContents += `${icu_chart_order_name.trim()}${icu_chart_order_comment ? `, ${icu_chart_order_comment}` : ''} \n`
  })

  textContents += `\n- 식이\n`
  feedOrders.forEach((order) => {
    const { icu_chart_order_name, treatments } = order

    textContents += `${icu_chart_order_name.trim()} : ${treatments.length ? treatments.map((tx) => `${tx.icu_chart_tx_result}(${tx.time}시)`).join(', ') : `${icu_chart_order_name.trim()} 미체크`} \n`
  })

  textContents += `\n- 기타\n`
  manualOrders.forEach((order) => {
    const { icu_chart_order_name, treatments } = order

    textContents += `${icu_chart_order_name.trim()} : ${treatments.length ? treatments.map((tx) => `${tx.icu_chart_tx_result}(${tx.time}시)`).join(', ') : `미완료`} \n`
  })

  return textContents.trim()
}
