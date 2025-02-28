import { Input } from '@/components/ui/input'
import React from 'react'

export default function SideEffectColumn({
  id,
  sideEffect,
}: {
  id: string
  sideEffect: string
}) {
  return <Input value={sideEffect} />
}
