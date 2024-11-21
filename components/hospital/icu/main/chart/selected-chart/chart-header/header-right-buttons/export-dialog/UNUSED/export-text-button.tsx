import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function ExportTextButton({
  // chartData,
  // selectedChartOrders,
  setIsDialogOpen,
}: {
  // chartData: Omit<IcuChartJoined, 'memo_a' | 'memo_b' | 'memo_c'>
  // selectedChartOrders: IcuChartOrderJoined[]
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isExportingText, setIsExportingText] = useState(false)

  //   const handleExportText = async () => {
  //     let textContents = `
  // 환자명: ${chartData.patient_id.name}
  // 입원일: ${chartData.target_date}
  // DX: ${chartData.icu_io_id.icu_io_dx}
  // CC: ${chartData.icu_io_id.icu_io_cc}
  // `
  //     const hash: Record<string, string[]> = {}
  //     const fluidOrders = selectedChartOrders.filter(
  //       (order) => order.icu_chart_order_type === 'fluid',
  //     )
  //     const otherOrders = selectedChartOrders.filter(
  //       (order) => order.icu_chart_order_type !== 'fluid',
  //     )

  //     fluidOrders.forEach((chartOrder) => {
  //       const { icu_chart_order_name, icu_chart_order_comment } = chartOrder

  //       textContents += `${icu_chart_order_name}: (${icu_chart_order_comment}) \n`
  //     })

  //     textContents += `\n=================\n`

  //     otherOrders.forEach((chartOrder) => {
  //       const { icu_chart_order_name } = chartOrder

  //       const txTable = Array.from({ length: 24 }, (_, index) => index + 1)
  //         .filter(
  //           (time) =>
  //             chartOrder[
  //               `icu_chart_order_tx_${time}` as keyof IcuChartOrderJoined
  //             ],
  //         )
  //         .map((time) => `${time}시`)

  //       if (txTable.length) {
  //         hash[icu_chart_order_name] = (hash[icu_chart_order_name] || []).concat(
  //           txTable,
  //         )
  //       }
  //     })

  //     Object.entries(hash).forEach(([key, value]) => {
  //       if (value.length) {
  //         textContents += key + ': ' + value.join(', ') + '\n'
  //       }
  //     })

  //     try {
  //       setIsExportingText(true)

  //       await navigator.clipboard.writeText(textContents.trim())

  //       toast({
  //         title: '클립보드에 복사되었습니다',
  //         description: '차트로 이동하여 붙여넣기 해주세요',
  //       })
  //     } catch (error) {
  //       console.error(error)
  //       toast({
  //         title: '텍스트 복사 실패',
  //         description: '관리자에게 문의하세요',
  //         variant: 'destructive',
  //       })
  //     } finally {
  //       setIsDialogOpen(false)
  //       setIsExportingText(false)
  //     }
  //   }

  return (
    <Button
      //  onClick={handleExportText}
      disabled={isExportingText}
    >
      텍스트로 복사
      <LoaderCircle
        className={cn(isExportingText ? 'ml-2 animate-spin' : 'hidden')}
      />
    </Button>
  )
}
