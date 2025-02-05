import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  rehydrationFormSchema,
  type RehydrationFormValues,
} from '@/lib/schemas/calculator/fluid-rate-schema'
import { type PatientFormData } from '@/types/hospital/calculator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardCopy } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import RehydrationToolTip from './rehydration-tool-tip'
import { calculateRehydration } from '@/lib/calculators/fluid-rate'

type RehydrationTabProps = {
  formData: PatientFormData
  setFormData: Dispatch<SetStateAction<PatientFormData>>
  tab: string
}

export default function RehydrationTab({
  formData,
  setFormData,
  tab,
}: RehydrationTabProps) {
  const [result, setResult] = useState<{
    totalMl: number
    ratePerHour: number
  } | null>(null)

  const form = useForm<RehydrationFormValues>({
    resolver: zodResolver(rehydrationFormSchema),
    defaultValues: {
      weight: formData.weight,
      dehydration: '5',
      time: '12',
    },
  })

  useEffect(() => {
    const values = form.getValues()
    const calculatedRate = calculateRehydration(
      values.weight,
      values.dehydration,
      values.time,
    )
    setResult(calculatedRate)
  }, [tab])

  useEffect(() => {
    const subscription = form.watch((value) => {
      form.trigger().then((isValid) => {
        if (isValid) {
          const result = calculateRehydration(
            value.weight!,
            value.dehydration!,
            value.time!,
          )
          setResult(result)
        } else {
          setResult(null)
        }
      })
    })
    return () => subscription.unsubscribe()
  }, [form, setFormData])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Rehydration <RehydrationToolTip />
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form>
          <CardContent className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>체중 (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="체중을 입력하세요"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setFormData((prev) => ({
                          ...prev,
                          weight: e.target.value,
                        }))
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dehydration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>탈수 정도</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="탈수 정도 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5">5%</SelectItem>
                      <SelectItem value="7">7%</SelectItem>
                      <SelectItem value="9">9%</SelectItem>
                      <SelectItem value="11">11%</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>교정 시간</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="교정 시간을 입력하세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardContent className="pt-4">
            {result && (
              <div className="flex flex-col gap-2 text-center">
                <span className="text-lg font-semibold">계산 결과</span>
                <span className="text-lg">
                  <span className="text-2xl font-bold text-primary">
                    {result.ratePerHour}
                    <span className="text-sm font-normal">ml/hr</span>
                  </span>
                  <br />
                  <span className="text-base">{`(${result.totalMl}ml를 ${form.watch('time')}시간동안 주입)`}</span>
                </span>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  result?.ratePerHour.toString() ?? '',
                )
              }
              className="ml-auto w-1/2 xl:text-xs 2xl:text-sm"
              variant="outline"
              type="button"
            >
              <ClipboardCopy className="h-4 w-4" />
              클립보드 복사
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
