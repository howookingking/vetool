import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'

type Props = {
  pretime: number
  index: number
  name: string // start or end
  txt: string
  setTime: (time: number, index: number, name: string, txt: string) => void
}

export default function ChecklistTimetableTimeEditor({
  pretime,
  index,
  name,
  txt,
  setTime,
}: Props) {
  const [time, setTableTime] = useState<number | undefined>(undefined)
  const [postTxt, setPostTxt] = useState<string>('')

  useEffect(() => {
    pretime && setTableTime(pretime)
    txt ? setPostTxt(txt) : setPostTxt('')
  }, [pretime, txt])

  const setTimeToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hhmmss = e.target.value
    const [hh, mm, ss] = hhmmss.split(':').map(Number)
    const date = pretime && new Date(pretime)
    if (date) {
      date.setHours(hh)
      date.setMinutes(mm)
      date.setSeconds(ss)
      setTableTime(date.getTime())
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center">
        <div className="m-2 flex items-center gap-3">
          <Label htmlFor="time-picker" className="px-1">
            TIME
          </Label>
          <Input
            type="time"
            id="time-picker"
            step="1"
            defaultValue={
              time &&
              String(new Date(time).getHours()).padStart(2, '0') +
                ':' +
                String(new Date(time).getMinutes()).padStart(2, '0') +
                ':' +
                String(new Date(time).getSeconds()).padStart(2, '0')
            }
            onChange={setTimeToDate}
            className="min-w-[130px] appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
        {txt !== '' && name === 'time' && (
          <div className="m-2 flex items-center gap-3">
            <Label htmlFor="time-picker" className="px-1">
              TEXT
            </Label>
            <Input
              className="min-w-[200px] appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              type="text"
              defaultValue={postTxt && postTxt}
              onChange={(e) => {
                setPostTxt(e.currentTarget.value)
              }}
            ></Input>
          </div>
        )}
        <Button
          variant="outline"
          onClick={() => {
            if (time) setTime(time, index, name, postTxt)
          }}
        >
          SET
        </Button>
      </div>
    </div>
  )
}
