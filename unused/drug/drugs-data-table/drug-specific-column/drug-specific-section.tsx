import React from 'react'

export default function DrugSpecicSection({
  title,
  contents,
}: {
  title: string
  contents: string | null
}) {
  return (
    <section>
      <h4 className="text-base font-bold">{title}</h4>
      <div>{contents}</div>
    </section>
  )
}
