import EditTemplateOrders from '@/components/hospital/icu/main/template/edit/edit-template-orders'
import { useState } from 'react'
import EditTemplateDetails from './edit-template-details'
import { useTemplateStore } from '@/lib/store/icu/template'

export default function EditTemplateDialogs() {
  const [isNextStep, setIsNextStep] = useState(false)
  const { template } = useTemplateStore()

  return (
    <div>
      <EditTemplateOrders
        chartId={template.icu_chart_id!}
        templateName={template.template_name!}
        isNextStep={isNextStep}
        setIsNextStep={setIsNextStep}
      />

      <EditTemplateDetails
        templateId={template.template_id!}
        templateName={template.template_name!}
        templateComment={template.template_comment!}
        isNextStep={isNextStep}
        setIsNextStep={setIsNextStep}
      />
    </div>
  )
}
