import HelperTooltip from '@/components/common/helper-tooltip'
import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CELL_COLORS } from '@/constants/hospital/icu/chart/colors'
import {
  TIMES,
  TX_ORDER_TIME_INTERVALS,
} from '@/constants/hospital/icu/chart/time'
import { useState, type Dispatch, type SetStateAction } from 'react'

type OrderTimeSettingsProps = {
  orderTime: string[]
  setOrderTime: Dispatch<SetStateAction<string[]>>
}

export default function OrderTimeSettings({
  orderTime,
  setOrderTime,
}: OrderTimeSettingsProps) {
  const [startTime, setStartTime] = useState('')
  const [timeTerm, setTimeTerm] = useState('')

  const handleSelectAllClick = () => {
    setStartTime('')
    setTimeTerm('')
    setOrderTime(Array(24).fill('1'))
  }

  const handleCancelAllClick = () => {
    setStartTime('')
    setTimeTerm('')
    setOrderTime(Array(24).fill('0'))
  }

  const handleTimeToggle = (index: number) => () => {
    setOrderTime((prevOrderTime) => {
      const newOrderTime = [...prevOrderTime]
      newOrderTime[index] = newOrderTime[index] !== '0' ? '0' : '1'
      return newOrderTime
    })
    setStartTime('')
    setTimeTerm('')
  }

  const handleSelectStartTime = (value: string) => {
    const newOrderTime = Array(24).fill('0')
    newOrderTime[Number(value)] = '1'
    setOrderTime(newOrderTime)
    setStartTime(value)
    setTimeTerm('')
  }

  const handleSelectTimeTerm = (value: string) => {
    setTimeTerm(value)

    const start = Number(startTime)
    const term = Number(value)
    const newOrderTime = Array(24).fill('0')

    for (let i = start; i < 24; i += term) {
      newOrderTime[i] = '1'
    }

    setOrderTime(newOrderTime)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">오더 시간 설정</span>
        <HelperTooltip side="right">
          처치표에서 <Kbd>Ctrl</Kbd> + <Kbd>우클릭</Kbd> 으로도 설정이
          가능합니다
        </HelperTooltip>
      </div>
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="grid w-full grid-cols-2 gap-2 md:flex">
          <Select onValueChange={handleSelectStartTime} value={startTime}>
            <SelectTrigger className="grid-col-1 h-9 text-xs md:w-36">
              <SelectValue placeholder="시작 시간" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>시작 시간</SelectLabel>
                {TIMES.map((time) => (
                  <SelectItem
                    value={time.toString()}
                    key={time}
                    className="text-xs"
                  >
                    {time}시 시작
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={handleSelectTimeTerm}
            value={timeTerm}
            disabled={!startTime}
          >
            <SelectTrigger className="grid-col-1 h-9 text-xs md:w-36">
              <SelectValue placeholder="시간 간격" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>시간 간격</SelectLabel>
                {TX_ORDER_TIME_INTERVALS.map((interval) => (
                  <SelectItem
                    value={interval}
                    key={interval}
                    className="text-xs"
                  >
                    {interval}시간 간격
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="ml-auto flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSelectAllClick}
          >
            전체 선택
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancelAllClick}
          >
            전체 취소
          </Button>
        </div>
      </div>

      <div className="mt-2 flex w-full flex-wrap md:justify-between">
        {TIMES.map((time) => (
          <Button
            tabIndex={-1}
            type="button"
            variant="outline"
            key={time}
            className="h-6 w-7 px-3 py-2 text-xs"
            style={{
              background:
                orderTime.at(time) !== '0'
                  ? CELL_COLORS.HAS_ORDER
                  : 'transparent',
            }}
            onClick={handleTimeToggle(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  )
}
