import React from 'react'
import DrugTags from '../drug-tags'

export default function DrugTagsColumn({
  drugTags,
}: {
  drugTags: string | null
}) {
  return (
    <div className="flex justify-center">
      <DrugTags drugTags={drugTags} />
    </div>
  )
}
