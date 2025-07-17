import { useEffect, useState } from 'react'

type Props = {
  preTag: string | null
  preTagArray: string[] | null
}
export default function ChecklistTagging({ preTag, preTagArray }: Props) {
  const [tags, setTags] = useState<string[]>([])
  useEffect(() => {
    preTagArray
      ? setTags([...preTagArray])
      : preTag && setTags([...preTag?.split('#').splice(1)])
  }, [preTag, preTagArray])
  return <div>ChecklistTagging</div>
}
