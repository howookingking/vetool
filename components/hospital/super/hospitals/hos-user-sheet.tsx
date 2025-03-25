import { hosStaffColumns } from '@/components/hospital/super/hospitals/hos-staff-columns'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/ui/data-table'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getStaffs, type Staff } from '@/lib/services/admin/staff'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

type Props = {
  hosId: string
  hosName: string
}

export default function HosUserSheet({ hosId, hosName }: Props) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [staffs, setStaffs] = useState<Staff[]>([])

  const handleSheetOpenChange = async (open: boolean) => {
    if (open) {
      setIsFetching(true)

      const staffs = await getStaffs(hosId)
      setStaffs(staffs)
      setIsFetching(false)
    }
    setIsSheetOpen(open)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          {isFetching ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <ArrowLeft size={18} />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-full md:max-w-[1200px]">
        <SheetHeader>
          <SheetTitle>{hosName} 직원 목록</SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <DataTable columns={hosStaffColumns} data={staffs} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">닫기</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
