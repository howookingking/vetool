import { Button } from '@/components/ui/button'
import { useTemplateStore } from '@/lib/store/icu/template'
import { Edit, LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'

export default function EditTemplateButton({
  chartId,
  templateId,
  templateName,
  templateComment,
}: {
  chartId: string
  templateId: string
  templateName: string
  templateComment: string | null
}) {
  const { setTemplate, setIsTemplateDialogOpen } = useTemplateStore()
  const [isEditing, setIsEditing] = useState(false)

  const handleOpenEditDialog = () => {
    setIsEditing(true)

    setTemplate({
      template_id: templateId,
      template_name: templateName,
      template_comment: templateComment,
      icu_chart_id: chartId,
    })

    setIsTemplateDialogOpen(true)
    setIsEditing(false)
  }
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleOpenEditDialog}
      disabled={isEditing}
      className="mx-auto flex items-center justify-center"
    >
      {isEditing ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : (
        <Edit size={18} />
      )}
    </Button>
  )
}
