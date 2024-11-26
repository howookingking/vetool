import HelperTooltip from '@/components/common/helper-tooltip'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { orderSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-schema'
import { AutoComplete } from '@/components/ui/auto-complete'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateRer } from '@/lib/calculators/rer'
import { getDiets } from '@/lib/services/icu/chart/get-diets'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { Diets } from '@/types/icu/chart'
import { Calculator } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface FeedOrderFieldProps {
  hosId: string
  form: UseFormReturn<z.infer<typeof orderSchema>>
  weight: string
  species: string
  derCalcFactor: number | null
  orderTime: string[]
}

export default function FeedOrderField({
  hosId,
  form,
  weight,
  species,
  derCalcFactor,
  orderTime,
}: FeedOrderFieldProps) {
  const [diets, setDiets] = useState<Diets[]>([])

  const dietName = form.watch('icu_chart_order_name').split('#')[0]
  const dietDescription = form.watch('icu_chart_order_name').split('#')[1] ?? ''
  const dietUnit = form.watch('icu_chart_order_name').split('#')[2] ?? ''

  const orderLength = orderTime.filter((time) => time !== '0').length

  const [searchedDiet, setSearchedDiet] = useState(dietName)
  const [selectedDiet, setSelectedDiet] = useState<Diets | null>(null)
  const [localFeedPerDay, setLocalFeedPerDay] = useState(
    orderLength === 0 ? '' : orderLength.toString(),
  )

  const dietNameRef = useRef<HTMLInputElement>(null)
  const feedPerDayRef = useRef<HTMLInputElement>(null)
  const derRef = useRef<HTMLInputElement>(null)

  const [localDietDescription, setLocalDietDescription] =
    useState(dietDescription)
  const [localDietUnit, setLocalDietUnit] = useState(dietUnit)

  const [isLoading, setIsLoading] = useState(false)

  const {
    basicHosData: { rerCalcMethod },
  } = useBasicHosDataContext()

  useEffect(() => {
    setIsLoading(true)
    getDiets(hosId, species)
      .then(setDiets)
      .finally(() => setIsLoading(false))
  }, [hosId, species, setDiets, setIsLoading])

  const mappedDietList = useMemo(
    () =>
      diets.map((diet) => ({
        value: diet.name,
        label: diet.name,
      })),
    [diets],
  )

  useEffect(() => {
    const foundDiet = diets.find((diet) => diet.name === searchedDiet)
    setSelectedDiet(foundDiet || null)
    setLocalDietUnit(foundDiet?.unit || '')
  }, [searchedDiet, diets])

  const calculatedRer = calculateRer(
    weight,
    species as 'canine' | 'feline',
    rerCalcMethod,
  )
  const calculatedDer =
    derCalcFactor && (Number(calculatedRer) * derCalcFactor).toFixed(0)

  useEffect(() => {
    const feedOrderName = `${searchedDiet}#${localDietDescription}#${localDietUnit}`
    form.setValue('icu_chart_order_name', feedOrderName)
  }, [
    selectedDiet,
    localDietDescription,
    searchedDiet,
    localDietUnit,
    dietUnit,
    form,
  ])

  // 계산기 버튼 클릭 핸들러
  const handleCalculateClick = () => {
    if (!selectedDiet) {
      dietNameRef.current?.focus()
      return
    }
    if (!calculatedDer) {
      derRef.current?.focus()
      return
    }
    if (!localFeedPerDay) {
      feedPerDayRef.current?.focus()
      return
    }

    const feedAmount = (
      Number(calculatedDer) /
      Number(selectedDiet.mass_vol) /
      Number(localFeedPerDay)
    ).toFixed(1)

    form.setValue('icu_chart_order_comment', feedAmount)
  }

  useEffect(() => {
    setLocalFeedPerDay(orderLength === 0 ? '' : orderLength.toString())
  }, [orderTime, orderLength, setLocalFeedPerDay])

  const handleFeedPerDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d+$/.test(value)) {
      setLocalFeedPerDay(value)
    }
  }

  return (
    <div className="grid grid-cols-6 gap-2">
      <FormField
        control={form.control}
        name="icu_chart_order_name"
        render={({ field }) => (
          <FormItem className="col-span-6 space-y-2">
            <FormLabel className="flex items-center gap-2 font-semibold">
              <span>사료*</span>
              <HelperTooltip variant="warning">
                칼로리값이 정확하지 않을 수 있습니다
              </HelperTooltip>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <AutoComplete
                  isLoading={isLoading}
                  ref={dietNameRef}
                  items={mappedDietList.filter((diet) =>
                    diet.value
                      .toLowerCase()
                      .includes(searchedDiet.toLowerCase()),
                  )}
                  selectedValue={field.value}
                  onSelectedValueChange={field.onChange}
                  searchValue={searchedDiet}
                  onSearchValueChange={(value) => {
                    if (value === searchedDiet) return

                    setSearchedDiet(value)
                    form.setValue('icu_chart_order_comment', '')
                  }}
                  placeholder={`${species === 'canine' ? '강아지용' : '고양이용'} 또는 공통사료를 검색합니다`}
                  emptyMessage={
                    !isLoading && (
                      <NoResultSquirrel text="검색된 사료 없음" size="sm" />
                    )
                  }
                  noBracket
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {selectedDiet
                    ? ` (${selectedDiet.mass_vol}kcal/${selectedDiet?.unit})`
                    : ''}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 급여 방법, 설명 */}
      <div className="col-span-6 space-y-2">
        <Label className="font-semibold">급여 방법, 추가 설명</Label>
        <Input
          placeholder="자발, 핸드피딩, 강제급여..."
          value={localDietDescription}
          onChange={(e) => setLocalDietDescription(e.target.value)}
        />
      </div>

      {/* DER */}
      <div className="col-span-2 space-y-2">
        <Label className={cn('text-right font-semibold')}>DER</Label>

        <div className="relative w-full">
          <Input
            ref={derRef}
            className={cn(
              'pr-18 cursor-not-allowed select-none shadow-none',
              !calculatedDer && 'text-sm text-rose-500',
            )}
            value={calculatedDer || 'DER을 설정해주세요'}
            readOnly
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-not-allowed select-none text-sm text-muted-foreground">
            kcal/day
          </span>
        </div>
      </div>

      <div className="col-span-1 space-y-2">
        <Label className="font-semibold">급여 횟수</Label>
        <div className="relative w-full">
          <Input
            ref={feedPerDayRef}
            className="pr-12"
            value={localFeedPerDay}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={handleFeedPerDayChange}
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            회
          </span>
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        type="button"
        onClick={handleCalculateClick}
        className="col-span-1 mx-auto mt-auto w-full"
      >
        <Calculator size={16} />
      </Button>

      {/* 급여량 */}
      <FormField
        control={form.control}
        name="icu_chart_order_comment"
        render={({ field }) => (
          <FormItem className="col-span-2 space-y-2">
            <FormLabel className="font-semibold">1회 급여량</FormLabel>
            <FormControl>
              <div className="relative">
                <Input {...field} placeholder="급여량 입력" className="pr-12" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {`${selectedDiet?.unit || 'g'}/회`}
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
