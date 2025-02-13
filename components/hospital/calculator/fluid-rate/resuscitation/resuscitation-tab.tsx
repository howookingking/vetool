import CalculatorResult from '@/components/hospital/calculator/calculator-result'
import ResuscitationToolTip from '@/components/hospital/calculator/fluid-rate/resuscitation/resuscitation-tool-tip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { calculateResuscitation } from '@/lib/calculators/fluid-rate'
import {
  resuscitationFormSchema,
  type ResuscitationFormValues,
} from '@/lib/schemas/calculator/fluid-rate-schema'
import {
  type CalculatorTabProps,
  type Species,
} from '@/types/hospital/calculator'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { type MouseEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ResuscitationTab({
  formData,
  setFormData,
  tab,
}: CalculatorTabProps) {
  const [result, setResult] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  })

  const form = useForm<ResuscitationFormValues>({
    resolver: zodResolver(resuscitationFormSchema),
    defaultValues: {
      species: formData.species,
      weight: formData.weight,
    },
  })

  useEffect(() => {
    const values = form.getValues()
    const calculatedRate = calculateResuscitation(
      values.species,
      Number(values.weight),
    )
    setResult(calculatedRate)
  }, [tab, form])

  useEffect(() => {
    const subscription = form.watch((value) => {
      form.trigger().then((isValid) => {
        if (isValid) {
          const calculatedRate = calculateResuscitation(
            value.species!,
            Number(value.weight),
          )
          setResult(calculatedRate)
        } else {
          setResult({ min: 0, max: 0 })
        }
      })
    })
    return () => subscription.unsubscribe()
  }, [form, setFormData])

  const handleCopyButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigator.clipboard.writeText(`${result.min}ml ~ ${result.max}ml`)
  }

  return (
    <div className="flex flex-col gap-4">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <span>Resuscitation</span>
          <ResuscitationToolTip />
        </SheetTitle>
        <VisuallyHidden>
          <SheetDescription />
        </VisuallyHidden>
      </SheetHeader>

      <Form {...form}>
        <form className="grid grid-cols-2 gap-2">
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
            name="species"
            render={({ field }) => (
              <FormItem>
                <FormLabel>종 선택</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setFormData((prev) => ({
                      ...prev,
                      species: value as Species,
                    }))
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="종 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="canine">Canine</SelectItem>
                    <SelectItem value="feline">Feline</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {(result.min !== 0 || result.max !== 0) && (
        <CalculatorResult
          result={`${result.min}ml ~ ${result.max}ml`}
          comment="buffered isotonic 수액을 15~30분간 주입해주세요."
          onClick={handleCopyButtonClick}
        />
      )}
    </div>
  )
}
