import { Badge } from '@/components/ui/badge'
import React from 'react'

export default function DrugTags({ drugTags }: { drugTags: string | null }) {
  const drugTagsArray = drugTags?.split('#').splice(1)

  return (
    <ul className="flex items-center gap-1">
      {drugTagsArray?.map((tag) => (
        <li key={tag}>
          <Badge>{tag}</Badge>
        </li>
      ))}
    </ul>
  )
}
