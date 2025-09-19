import { Input } from '@/components/ui/input'
import {
  type ChecklistWithPatientWithWeight,
  updateEachChecklist,
} from '@/lib/services/checklist/checklist-data'
import React, { useEffect, useState } from 'react'

type Props = {
  time: string
  name: string
  checklistData: ChecklistWithPatientWithWeight
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChecklistBodyTableCell({
  time,
  name,
  checklistData,
  setIsSaving,
}: Props) {
  const [result, setResult] = useState<string>('')

  useEffect(() => {
    if (checklistData) {
      checklistData.checklist_set?.result &&
        checklistData.checklist_set.result[time] &&
        setResult(checklistData.checklist_set.result[time][name] || '')
    }
  }, [checklistData, time, name])

  const saveChecklist = async () => {
    setIsSaving(true)
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
      />
    </div>
  )
}
