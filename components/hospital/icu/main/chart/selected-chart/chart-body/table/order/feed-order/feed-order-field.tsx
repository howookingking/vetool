import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import type { UseFormReturn } from 'react-hook-form'
import { Calculator } from 'lucide-react'

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
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { DietsOrderData } from '@/types/icu/chart'
import { cn } from '@/lib/utils/utils'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import DerInput from './der-input'

interface FeedOrderFieldProps {
  form: UseFormReturn<z.infer<typeof orderSchema>>
  dietListData: DietsOrderData[]
  weight: string
  species: string
  derCalcFactor: number | null
  orderTime: string[]
}

export default function FeedOrderField({
  form,
  dietListData,
  weight,
  species,
  derCalcFactor,
  orderTime,
}: FeedOrderFieldProps) {
  const dietName = form.watch('icu_chart_order_name').split('#')[0]
  const dietDescription = form.watch('icu_chart_order_name').split('#')[2] ?? ''
  const feedPerDays = orderTime.filter((time) => time !== '0').length.toString()

  const [searchedDiet, setSearchedDiet] = useState(dietName)
  const [selectedDiet, setSelectedDiet] = useState<DietsOrderData | null>(null)
  const [localFeedPerDaysValue, setLocalFeedPerDaysValue] =
    useState(feedPerDays)
  const [localDerValue, setLocalDerValue] = useState('')
  const [localDietDescription, setLocalDietDescription] =
    useState(dietDescription)

  const {
    basicHosData: { rerCalcMethod },
  } = useBasicHosDataContext()

  const hasNoDer = localDerValue === '0'

  // 자동 완성 기능에 맞게 사료 목록 매핑
  const mappedDietList = useMemo(
    () =>
      dietListData.map((diet) => ({
        value: diet.name,
        label: diet.name,
      })),
    [dietListData],
  )

  // 1. RER 계산
  const calculatedRer = useMemo(
    () =>
      calculateRer(
        weight,
        species as 'canine' | 'feline',
        rerCalcMethod as 'a' | 'b',
      ),
    [rerCalcMethod, species, weight],
  )

  // 2. DER 계산
  useEffect(() => {
    const factor = derCalcFactor || 1

    setLocalDerValue((Number(calculatedRer) * factor).toFixed(0))
  }, [calculatedRer, derCalcFactor])

  // 사료 자동완성
  useEffect(() => {
    const diet = dietListData.find((diet) => diet.name === searchedDiet)

    setSelectedDiet(diet || null)
  }, [searchedDiet, dietListData])

  useEffect(() => {
    const orderName = `${searchedDiet}#${selectedDiet?.unit ?? 'g'}#${localDietDescription}`
    console.log(orderName)

    form.setValue('icu_chart_order_name', orderName)
  }, [
    selectedDiet,
    localDietDescription,
    form.getValues('icu_chart_order_name'),
    searchedDiet,
    form,
  ])

  // 급여 횟수 Input Change 핸들러
  const handleFeedPerDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (
      value === '' ||
      (/^\d{0,2}$/.test(value) && parseInt(value, 10) <= 99)
    ) {
      setLocalFeedPerDaysValue(value)
    }
  }

  // 계산기 버튼 클릭 핸들러
  const handleCalculateClick = () => {
    if (localDerValue && parseInt(localFeedPerDaysValue) && selectedDiet) {
      const feedAmount = (
        Number(localDerValue) /
        Number(selectedDiet.mass_vol) /
        Number(localFeedPerDaysValue)
      ).toFixed(1)

      form.setValue('icu_chart_order_comment', feedAmount)
    }
  }

  const handleFeedAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void,
  ) => {
    const value = e.target.value

    const decimalPattern = /^\d{0,5}(\.?\d{0,1})?$/

    if (value === '' || decimalPattern.test(value)) {
      onChange(value)
    }
  }

  // 오더 시간 설정에 맞춰 급여 횟수 카운팅
  useEffect(() => {
    setLocalFeedPerDaysValue(
      orderTime.filter((time) => time !== '0').length.toString(),
    )
  }, [orderTime])

  return (
    <>
      <div className="flex gap-2">
        {/* 사료 자동완성 인풋 */}
        <FormField
          control={form.control}
          name="icu_chart_order_name"
          render={({ field }) => (
            <FormItem className="w-1/2 space-y-2">
              <FormLabel className="font-semibold">사료*</FormLabel>
              <FormControl>
                <AutoComplete
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
                  placeholder="사료 검색"
                  emptyMessage={
                    <NoResultSquirrel text="검색된 사료 없음" size="sm" />
                  }
                  noBracket
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 급여 방법, 설명 */}
        <div className="w-1/2 space-y-2">
          <Label className="font-semibold">급여 방법, 설명</Label>
          <Input
            placeholder="1.자발 2.핸드피딩 3.강제급여"
            value={localDietDescription}
            onChange={(e) => setLocalDietDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 items-center gap-2">
        {/* DER */}
        <div className="col-span-3 space-y-2">
          <Label
            className={cn(
              'text-right font-semibold',
              hasNoDer && 'text-rose-500',
            )}
          >
            {hasNoDer ? '차트에서 DER을 설정해주세요' : 'DER'}
          </Label>

          <DerInput
            derLocalValue={hasNoDer ? '' : localDerValue}
            setDerLocalValue={setLocalDerValue}
          />
        </div>

        {/* 단위당 열량 */}
        <div className="col-span-3 space-y-2">
          <Label className="font-semibold">단위당 열량</Label>
          <div className="relative w-full">
            <Input
              readOnly
              value={selectedDiet?.mass_vol || ''}
              className="cursor-not-allowed select-none focus-visible:ring-0"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-not-allowed select-none text-sm text-muted-foreground">
              {`${selectedDiet?.unit || 'g'}/kcal`}
            </span>
          </div>
        </div>

        {/* 급여 횟수 */}
        <div className="col-span-2 space-y-2">
          <Label className="font-semibold">급여 횟수</Label>
          <div className="relative w-full">
            <Input
              className="pr-12"
              value={localFeedPerDaysValue}
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

        {/* 계산기 */}
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
            <FormItem className="col-span-3 space-y-2">
              <FormLabel className="font-semibold">
                급여량 (숫자만 입력)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="급여량 입력"
                    className="pr-12"
                    value={field.value}
                    onChange={(e) => handleFeedAmountChange(e, field.onChange)}
                  />
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
    </>
  )
}
