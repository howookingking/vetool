import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { changeTargetDateInUrl } from '@/lib/utils/utils'
import { useEffect, useState } from 'react'

type Props = {
  preTag: string | null
  preTagArray: string[] | null
  changeChecklistTagArray: (tags: string[]) => void | null
  changeChecklistTag: (tag: string) => void | null
}
export default function ChecklistTagging({
  preTag,
  preTagArray,
  changeChecklistTagArray,
  changeChecklistTag,
}: Props) {
  const [tags, setTags] = useState<string[]>([])
  const [txt, setTxt] = useState<string>('')
  useEffect(() => {
    preTagArray
      ? setTags([...preTagArray])
      : preTag && setTags([...preTag?.split('#').splice(1)])
  }, [preTag, preTagArray])
  const addTag = () => {
    if (txt) {
      if (tags.includes(txt)) return
      setTags([...tags, txt])
      setTxt('')
      if (!preTagArray) {
        let newTag = ''
        const _tags = [...tags, txt]
        _tags.map((tag, index) => {
          if (index === 0) {
            newTag = '#' + tag
          } else {
            newTag = newTag + '#' + tag
          }
        })

        changeChecklistTag(newTag)
      } else {
        changeChecklistTagArray([...tags, txt])
      }
    }
  }
  const deltag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = Number(e.currentTarget.name)
    const newTags = tags.filter((_, i) => i !== index)

    if (!preTagArray) {
      let _tags = ''
      newTags.map((tag, index) => {
        if (index === 0) {
          _tags = '#' + tag
        } else {
          _tags = _tags + '#' + tag
        }
      })
      changeChecklistTag(_tags)
      setTags([...newTags])
    } else {
      changeChecklistTagArray([...newTags])
      setTags([...newTags])
    }
  }
  return (
    <div className="m-3 flex-col rounded border p-4">
      <div className="mr-3 flex items-center">
        #Tag
        <Input
          className="ml-3 mr-3 w-[200px]"
          value={txt ?? ''}
          onChange={(e) => setTxt(e.target.value)}
          onKeyUp={(e) => {
            e.key === 'Enter' && addTag()
          }}
        ></Input>
        <Button variant={'outline'} onClick={addTag}>
          +
        </Button>
      </div>
      <div className="mb-3 mt-3 flex flex-wrap text-sm">
        {tags.map(
          (tag, index) =>
            index >= 5 && (
              <Button
                key={index}
                variant={'outline'}
                className="mb-2 mr-2"
                size="sm"
                name={String(index)}
                onClick={deltag}
              >
                #{tag}
              </Button>
            ),
        )}
      </div>
    </div>
  )
}
