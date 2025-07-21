import type { ChecklistData } from '@/types/checklist/checklist-type'
import { Input } from '@/components/ui/input'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
import React, { use, useEffect, useState } from 'react'
type Props = {
  time: string
  name: string
  checklistData: ChecklistData
}
export default function ChecklistBodyTableCell({
  time,
  name,
  checklistData,
}: Props) {
  const [result, setResult] = useState<string>('')
  useEffect(() => {
    if (checklistData) {
      checklistData.checklist_set?.result &&
        checklistData.checklist_set.result[time] &&
        setResult(checklistData.checklist_set.result[time][name] || '')
    }
  }, [checklistData])
  const saveChecklist = async () => {
    if (checklistData) {
      const predata = { ...checklistData }

      predata.checklist_set ??= { result: {} }
      predata.checklist_set.result ??= {}
      predata.checklist_set.result[time] ??= {}
      predata.checklist_set.result[time][name] = result

      await updateEachChecklist(predata)
    } else {
      console.error('checklistData is null or undefined')
    }
  }
  return (
    <div>
      <Input
        value={result ?? ''}
        onBlur={saveChecklist}
        onChange={(e) => setResult(String(e.target.value))}
      ></Input>
    </div>
  )
}
