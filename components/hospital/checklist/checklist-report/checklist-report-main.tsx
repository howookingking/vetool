'use client'

import { Button } from '@/components/ui/button'
import type { ChecklistData } from '@/types/checklist/checklist-type'
import { Image } from 'lucide-react'
import ChecklistReport from '@/components/hospital/checklist/checklist-report/checklist-report'

type Props = {
  checklistData: ChecklistData
}
export default function ChecklistReportMain({ checklistData }: Props) {
  return (
    <div>
      <div className="felx-wrap m-3 flex w-[200px] items-center rounded border border-gray-300 p-2">
        <div className="mr-2">내보내기</div>
        <Button className="mr-2" size="sm" variant={'outline'}>
          <Image />
        </Button>
        <Button size="sm" variant={'outline'}>
          PDF
        </Button>
      </div>
      <div className="mb-20">
        <ChecklistReport checklistData={checklistData} />
      </div>
    </div>
  )
}
