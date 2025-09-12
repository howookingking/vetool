'use client'

import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/ui/custom-tooltip'
import { cn } from '@/lib/utils/utils'
import { Separator } from '@/components/ui/separator'
import { Pencil, FileCheck, ScrollText, Monitor } from 'lucide-react'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import React, { useEffect } from 'react'
import ChecklistEditDialogButton from '@/components/hospital/checklist/checklist-header/checklist-edit-dialogbutton'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

export default function ChecklistHeader({
  checklistId,
}: {
  checklistId: string
}) {
  const basichosdata = useBasicHosDataContext().basicHosData

  const pathname = usePathname()
  const { push } = useRouter()

  const searchParams = useSearchParams()
  const edit = searchParams.get('edit')
  const isActive = pathname.split('/')[7]
  const pathnamearray: string[] = pathname.split('/')

  return (
    <div className="ml-3 flex-col">
      <div className="flex">
        <CustomTooltip
          contents="체크리스트 작성"
          side="bottom"
          sideOffset={4}
          delayDuration={300}
        >
          <Button
            type="button"
            variant="outline"
            name="checklist"
            onClick={() => {
              push(
                `/hospital/${pathnamearray[2]}/checklist/${pathnamearray[4]}/chart/${pathnamearray[6]}/checklist?edit=${false}`,
              )
            }}
            className={cn(
              'm-2 ml-14 2xl:m-2 2xl:ml-2',
              isActive === 'checklist' && 'bg-primary text-white',
            )}
          >
            <FileCheck /> <p className="hidden 2xl:flex">CHECKLIST</p>
          </Button>
        </CustomTooltip>
        <CustomTooltip
          contents="리포트"
          side="bottom"
          sideOffset={4}
          delayDuration={300}
        >
          <Button
            type="button"
            variant="outline"
            name="report"
            className={cn(
              'm-2',
              isActive === 'report' && 'bg-primary text-white',
            )}
            onClick={() => {
              push(
                `/hospital/${pathnamearray[2]}/checklist/${pathnamearray[4]}/chart/${pathnamearray[6]}/report`,
              )
            }}
          >
            <ScrollText /> <p className="hidden 2xl:flex">REPORT</p>
          </Button>
        </CustomTooltip>

        <ChecklistEditDialogButton
          isEdit={edit === 'true' ? true : false}
          checklistId={checklistId}
        ></ChecklistEditDialogButton>
      </div>

      <Separator className="m-2" />
    </div>
  )
}
