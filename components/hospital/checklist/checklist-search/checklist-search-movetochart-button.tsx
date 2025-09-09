'use client'

import { Button } from '@/components/ui/button'
import { ChecklistData } from '@/types/checklist/checklist-type'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Check } from 'lucide-react'
import { Checklist } from '@/types'
import { type DebouncedState } from 'use-debounce'
import ChecklistSearchPreviewButton from './checklist-search-preview-button'
import ChecklistSearchCopyButton from './checklist-search-copy-button'
import { useParams, useRouter } from 'next/navigation'
export default function ChecklistSearchMoveToChartButton({
  checklistchart,
}: {
  checklistchart: Checklist
}) {
  const { target_date, hos_id } = useParams()
  const { push } = useRouter()
  const movetourl = () => {
    const isEdit =
      checklistchart.checklist_type === '응급' || checklistchart.checklist_title
        ? true
        : false
    isEdit
      ? push(
          `/hospital/${hos_id}/checklist/${checklistchart.due_date}/chart/${checklistchart.checklist_id}/checklist?edit=${false}`,
        ) // 체크리스트 등록 후 기본정보 기록 안된경구(제목, 주치의 등)로 클릭시 edit창 바로 실행됨
      : push(
          `/hospital/${hos_id}/checklist/${checklistchart.due_date}/chart/${checklistchart.checklist_id}/checklist?edit=${true}`,
        ) // 체크리스트 등록 후 기본정보 기록완료 된 경우
  }
  return (
    <div className="flex justify-center">
      <Button
        size="icon"
        variant="ghost"
        className="mx-auto flex items-center justify-center"
        onClick={movetourl}
      >
        <Check size={18} />
      </Button>
    </div>
  )
}
