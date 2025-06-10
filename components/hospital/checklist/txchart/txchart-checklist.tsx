'use client'
import { useEffect, useState } from 'react'

type Props = {
  checklistId: string
  pretime: Number
}
const TxchartChecklist = ({ checklistId, pretime }: Props) => {
  const [time, setTime] = useState<Number>(0)
  useEffect(() => {
    setTime(pretime)
  }, [checklistId, pretime])
  return <div>checklist</div>
}

export default TxchartChecklist
