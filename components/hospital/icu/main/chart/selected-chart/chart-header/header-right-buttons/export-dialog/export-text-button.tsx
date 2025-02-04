import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils/utils'
import type { SelectedChart } from '@/types/icu/chart'
import { LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

type ExportTextButtonProps = {
  chartData: SelectedChart
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function ExportTextButton({
  chartData,
  setIsDialogOpen,
}: ExportTextButtonProps) {
  const [isExportingText, setIsExportingText] = useState(false)

  const handleExportText = async () => {
    let textContents = `
환자명: ${chartData.patient.name}
입원일: ${chartData.target_date}
DX: ${chartData.icu_io.icu_io_dx}
CC: ${chartData.icu_io.icu_io_cc}
`
    const hash: Record<string, string[]> = {}
    const fluidOrders = chartData.orders.filter(
      (order) => order.order_type === 'fluid',
    )
    const otherOrders = chartData.orders.filter(
      (order) => order.order_type !== 'fluid',
    )

    fluidOrders.forEach((order) => {
      const { order_name, order_comment } = order

      textContents += `Fluid: ${order_name.trim()} (${order_comment}) \n`
    })

    textContents += `\n=================\n\n`

    otherOrders.forEach((order) => {
      const { order_name, order_times } = order

      const txTable = Array.from({ length: 24 }, (_, index) => index)
        .filter((time) => order_times[time] && order_times[time] !== '0')
        .map((time) => `${time + 1}시`)

      if (txTable.length) {
        hash[order_name] = (hash[order_name] || []).concat(txTable)
      }
    })

    Object.entries(hash).forEach(([key, value]) => {
      if (value.length) {
        textContents += key + ': ' + value.join(', ') + '\n'
      }
    })

    setIsExportingText(true)

    await navigator.clipboard.writeText(textContents.trim())

    toast({
      title: '클립보드에 복사되었습니다',
    })

    setIsDialogOpen(false)
    setIsExportingText(false)
  }

  return (
    <Button
      variant="secondary"
      onClick={handleExportText}
      disabled={isExportingText}
    >
      텍스트로 복사
      <LoaderCircle
        className={cn(isExportingText ? 'ml-2 animate-spin' : 'hidden')}
      />
    </Button>
  )
}
