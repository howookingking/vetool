import { staffColumns } from '@/components/hospital/super/hospitals/staff-columns'
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
import { getStaffs } from '@/lib/services/admin/staff/staff'
import type { UserHospitalJoined } from '@/types/adimin'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function HosUserSheet({
  hosId,
  hosName,
}: {
  hosId: string
  hosName: string
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [staffs, setStaffs] = useState<UserHospitalJoined[]>([])

  const handleSheetOpenChange = async () => {
    setIsSheetOpen(!isSheetOpen)

    if (!isSheetOpen) {
      const staffs = await getStaffs(hosId)

      setStaffs(staffs)
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ArrowLeft size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-full md:max-w-[1200px]">
        <SheetHeader>
          <SheetTitle>{hosName} 직원 목록</SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <DataTable columns={staffColumns} data={staffs} />
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
