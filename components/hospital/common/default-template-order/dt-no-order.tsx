import { TableCell, TableRow } from '@/components/ui/table'

export default function DtNoOrder({ orderWidth }: { orderWidth: number }) {
  return (
    <TableRow className="h-[240px]">
      <TableCell
        style={{
          width: orderWidth,
          transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
        }}
        className="text-center text-base text-gray-500"
      >
        👇 오더를 추가해주세요
      </TableCell>
    </TableRow>
  )
}
