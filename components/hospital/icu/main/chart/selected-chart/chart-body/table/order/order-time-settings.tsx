import HelperTooltip from '@/components/common/helper-tooltip'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CELL_COLORS } from '@/constants/hospital/icu/chart/colors'
import {
  TIMES,
  TX_ORDER_TIME_INTERVALS,
} from '@/constants/hospital/icu/chart/time'
import { type Dispatch, type SetStateAction } from 'react'

type OrderTimeSettingsProps = {
  startTime: string
  timeTerm: string
  orderTime: string[]
  setStartTime: Dispatch<SetStateAction<string>>
  setTimeTerm: Dispatch<SetStateAction<string>>
  setOrderTime: Dispatch<SetStateAction<string[]>>
}

export default function OrderTimeSettings({
  startTime,
  timeTerm,
  orderTime,
  setStartTime,
  setTimeTerm,
  setOrderTime,
}: OrderTimeSettingsProps) {
  const handleSelectAllClick = () => {
    setStartTime('undefined')
    setTimeTerm('undefined')
    setOrderTime(Array(24).fill('1'))
  }

  const handleCancelAllClick = () => {
    setStartTime('undefined')
    setTimeTerm('undefined')
    setOrderTime(Array(24).fill('0'))
  }

  const handleTimeToggle = (index: number) => () => {
    setOrderTime((prevOrderTime) => {
      const newOrderTime = [...prevOrderTime]
      newOrderTime[index] = newOrderTime[index] !== '0' ? '0' : '1'
      return newOrderTime
    })

    setStartTime('undefined')
    setTimeTerm('undefined')
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">오더 시간 설정</span>
        <HelperTooltip side="right">
          표에서 ctrl + 우클릭 으로도 설정이 가능합니다
        </HelperTooltip>
      </div>
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div className="grid w-full grid-cols-2 gap-2 md:flex">
          <Select onValueChange={setStartTime} value={startTime}>
            <SelectTrigger className="grid-col-1 h-9 text-xs md:w-36">
              <SelectValue placeholder="시작 시간" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {['undefined', ...TIMES].map((time) => (
                  <SelectItem
                    value={time.toString()}
                    key={time}
                    className="text-xs"
                  >
                    {time === 'undefined' ? '시작 시간' : `${time}시 시작`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={setTimeTerm}
            value={timeTerm}
            disabled={startTime === 'undefined'}
          >
            <SelectTrigger className="grid-col-1 h-9 text-xs md:w-36">
              <SelectValue placeholder="시간 간격" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {['undefined', ...TX_ORDER_TIME_INTERVALS].map((interval) => (
                  <SelectItem
                    value={interval.toString()}
                    key={interval}
                    className="text-xs"
                  >
                    {interval === 'undefined'
                      ? '시간 간격'
                      : `${interval}시간 간격`}
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
        {TIMES.map((time, index) => (
          <Button
            tabIndex={-1}
            type="button"
            variant="outline"
            key={time}
            className="h-6 w-7 px-3 py-2 text-xs"
            style={{
              background:
                orderTime[index] !== '0' ? CELL_COLORS.NOT_DONE : 'transparent',
            }}
            onClick={handleTimeToggle(index)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  )
}
