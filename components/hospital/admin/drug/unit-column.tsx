import { Input } from '@/components/ui/input'
import React from 'react'

export default function UnitColumn({
  unit,
  productId,
}: {
  unit: string
  productId: string
}) {
  return <Input value={unit} className="mx-auto w-12" />
}
