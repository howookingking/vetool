import DietForm from '@/components/hospital/calculator/rer-mer/diet/diet-form'
import MerForm from '@/components/hospital/calculator/rer-mer/mer/mer-form'
import MerToolTip from '@/components/hospital/calculator/rer-mer/mer/mer-tool-tip'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { calculateMer, calculateRer } from '@/lib/calculators/rer-mer'
import {
  merFormSchema,
  type MerFormValues,
} from '@/lib/schemas/calculator/rer-mer-schema'
import { type CalculatorTabProps } from '@/types/hospital/calculator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function MerTab({ formData, setFormData }: CalculatorTabProps) {
  const [rer, setRer] = useState<number | null>(null)
  const [result, setResult] = useState<number | null>(null)

  const form = useForm<MerFormValues>({
    resolver: zodResolver(merFormSchema),
    defaultValues: {
      weight: formData.weight,
      factor: formData.factor,
    },
  })

  useEffect(() => {
    const weight = form.getValues('weight')
    const factor = form.getValues('factor')

    if (weight && factor) {
      const rer = calculateRer(weight)
      const calculatedMer = calculateMer(weight, factor)

      setRer(rer)
      setResult(calculatedMer)
    }
  }, [form])

  useEffect(() => {
    const subscription = form.watch((value) => {
      form.trigger().then((isValid) => {
        if (isValid && value.weight) {
          const result = calculateMer(value.weight!, value.factor!)
          const rer = calculateRer(value.weight!)

          setResult(result)
          setRer(rer)
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
          <span>MER</span>
          <MerToolTip />
        </CardTitle>
      </CardHeader>

      <MerForm
        form={form}
        setFormData={setFormData}
        rer={rer}
        result={result}
      />

      <Separator className="my-1" />

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>사료 계산</span>
        </CardTitle>
        <CardDescription>검색되지 않는 사료는 문의해주세요</CardDescription>
      </CardHeader>

      <DietForm mer={result} />
    </Card>
  )
}
