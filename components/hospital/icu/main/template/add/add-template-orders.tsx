import AddTemplateOrdersButton from '@/components/hospital/icu/main/template/add/add-template-orders-button'
import ResetTemplateOrdersButton from '@/components/hospital/icu/main/template/add/reset-template-orders-button'
import TemplateOrdersTable from '@/components/hospital/icu/main/template/add/template-orders-table'
import { useTemplateStore } from '@/lib/store/icu/template'
import { useState } from 'react'

export default function AddTemplateOrders() {
  const [isSorting, setIsSorting] = useState(false)
  const { templateOrders, reset } = useTemplateStore()

  return (
    <div className="flex max-w-3xl flex-col gap-2">
      <TemplateOrdersTable isSorting={isSorting} setIsSorting={setIsSorting} />

      <div className="flex gap-2">
        <ResetTemplateOrdersButton />
        <AddTemplateOrdersButton />
      </div>
    </div>
  )
}