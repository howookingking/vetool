import NoResultSquirrel from '@/components/common/no-result-squirrel'
import WarningMessage from '@/components/common/warning-message'
import MaintenanceToolTip from '@/components/hospital/calculator/fluid-rate/maintenance/maintenance-tool-tip'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FLUIDS } from '@/constants/hospital/icu/chart/fluid'
import { calculateMaintenanceRate } from '@/lib/calculators/fluid-rate'
import { orderSchema } from '@/lib/schemas/icu/chart/order-schema'
import { cn } from '@/lib/utils/utils'
import { Calculator } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export default function FluidOrderField({
  form,
  maintenanceRateCalcMethod,
  species,
  ageInDays = 1,
  weight,
}: {
  form: UseFormReturn<z.infer<typeof orderSchema>>
  maintenanceRateCalcMethod?: string
  species?: string
  ageInDays?: number
  weight?: string
}) {
  const watchedOrderName = form.watch('icu_chart_order_name')
  const fluidName = watchedOrderName.split('#')[0]
  const maintenaceRateCalcMethodField = watchedOrderName.split('#')[1]
  const fold = watchedOrderName.split('#')[2]
  const additives = watchedOrderName.split('#')[3]

  const [displayFluidName, setDisplayFluidName] = useState(fluidName ?? '')
  const [localMaintenaceRateCalcMethod, setLocalMaintenaceRateCalcMethod] =
    useState(maintenaceRateCalcMethodField ?? maintenanceRateCalcMethod)
  const [localFold, setLocalFold] = useState(fold ?? '1')
  const [localAdditives, setLocalAdditives] = useState(additives ?? '')

  useEffect(() => {
    const fullValue = `${displayFluidName}#${localMaintenaceRateCalcMethod}#${localFold}#${localAdditives}`

    form.setValue('icu_chart_order_name', fullValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    displayFluidName,
    localFold,
    localMaintenaceRateCalcMethod,
    localAdditives,
    watchedOrderName,
  ])

  const calculateFluidRate = useCallback(() => {
    const result = calculateMaintenanceRate(
      weight || '0',
      species as 'canine' | 'feline',
      localFold,
      localMaintenaceRateCalcMethod as 'a' | 'b' | 'c',
    )

    form.setValue('icu_chart_order_comment', result)
  }, [localFold, form, localMaintenaceRateCalcMethod, species, weight])

  return (
    <>
      <div className={cn('flex flex-col gap-2', species ? 'md:flex-row' : '')}>
        <FormField
          control={form.control}
          name="icu_chart_order_name"
          render={({ field }) => (
            <FormItem
              className={cn(
                'w-full space-y-2',
                species ? 'md:w-1/2' : 'w-full',
              )}
            >
              <FormLabel className="font-semibold">
                수액 종류 <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <AutoComplete
                  selectedValue={field.value}
                  onSelectedValueChange={field.onChange}
                  searchValue={displayFluidName}
                  onSearchValueChange={setDisplayFluidName}
                  items={FLUIDS.filter((fluid) =>
                    fluid.value
                      .toLowerCase()
                      .includes(displayFluidName.toLowerCase()),
                  )}
                  emptyMessage={
                    <NoResultSquirrel text="검색된 수액 없음" size="sm" />
                  }
                  placeholder="수액 검색"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 첨가제 */}
        <div
          className={cn('w-full space-y-2', species ? 'md:w-1/2' : 'w-full')}
        >
          <Label className="font-semibold">첨가제</Label>
          <Input
            value={localAdditives}
            onChange={(e) => setLocalAdditives(e.target.value)}
          />
        </div>
      </div>

      {species && (
        <div>
          <FormField
            control={form.control}
            name="icu_chart_order_comment"
            render={({ field }) => (
              <FormItem className="w-full space-y-2">
                <FormLabel className="font-semibold">
                  <div className="itmes-center flex gap-2">
                    <span className="mt-[3px]">수액 속도</span>

                    <MaintenanceToolTip />

                    {ageInDays <= 365 && (
                      <WarningMessage
                        className="text-sm"
                        text={`Pediatrics의 경우,  ${species === 'canine' ? 'Adult Dog * 3' : 'Adult Cat  * 2.5'}`}
                      />
                    )}

                    {!Number(weight) && (
                      <WarningMessage
                        className="text-sm"
                        text="몸무게를 입력해주세요"
                      />
                    )}
                  </div>
                </FormLabel>

                <div className="grid grid-cols-3 items-center gap-2 md:grid-cols-6">
                  <Select
                    value={localMaintenaceRateCalcMethod}
                    onValueChange={setLocalMaintenaceRateCalcMethod}
                    defaultValue={maintenanceRateCalcMethod}
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="계산법" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>계산법</SelectLabel>
                        {species === 'canine' ? (
                          <>
                            <SelectItem value="a">
                              a. 60{' '}
                              <span className="text-sm text-muted-foreground">
                                ml/kg/day
                              </span>
                            </SelectItem>
                            <SelectItem value="b">
                              b. 132 * (몸무게) <sup>0.75</sup>{' '}
                              <span className="text-sm text-muted-foreground">
                                ml/day
                              </span>
                            </SelectItem>
                            <SelectItem value="c">
                              c. 30 * (몸무게) + 70{' '}
                              <span className="text-sm text-muted-foreground">
                                ml/day
                              </span>
                            </SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="a">
                              a. 40{' '}
                              <span className="text-sm text-muted-foreground">
                                ml/kg/day
                              </span>
                            </SelectItem>
                            <SelectItem value="b">
                              b. 80 * (몸무게) <sup>0.75</sup>{' '}
                              <span className="text-sm text-muted-foreground">
                                ml/day
                              </span>
                            </SelectItem>
                            <SelectItem value="c">
                              c. 30 * (몸무게) + 70{' '}
                              <span className="text-sm text-muted-foreground">
                                ml/day
                              </span>
                            </SelectItem>
                          </>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select value={localFold} onValueChange={setLocalFold}>
                    <SelectTrigger className="col-span-1">
                      <SelectValue placeholder="배수" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>유지속도 배수</SelectLabel>
                        <SelectItem value="1">1배</SelectItem>
                        <SelectItem value="1.5">1.5배</SelectItem>
                        <SelectItem value="2">2배</SelectItem>
                        <SelectItem value="2.5">2.5배</SelectItem>
                        <SelectItem value="3">3배</SelectItem>
                        <SelectItem value="3.5">3.5배</SelectItem>
                        <SelectItem value="4">4배</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Button
                    size="icon"
                    variant="outline"
                    type="button"
                    onClick={calculateFluidRate}
                    className="col-span-1 mx-auto w-full"
                  >
                    <Calculator size={16} />
                  </Button>

                  <div className="relative col-span-2">
                    <FormControl>
                      <Input placeholder="수액속도" {...field} />
                    </FormControl>
                    <span className="absolute right-2 top-2 text-sm text-muted-foreground">
                      ml/hr
                    </span>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </>
  )
}
