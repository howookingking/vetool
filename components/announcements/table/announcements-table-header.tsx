import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function AnnouncementsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50 hover:bg-gray-50">
        <TableHead className="w-[25%] text-center text-xs font-medium uppercase tracking-wider text-gray-500 md:w-[10%]">
          타입
        </TableHead>
        <TableHead className="text-center text-xs font-medium uppercase tracking-wider text-gray-500 md:px-6">
          제목
        </TableHead>
        <TableHead className="w-[25%] text-center text-xs font-medium uppercase tracking-wider text-gray-500 md:w-[10%]">
          등록일
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
