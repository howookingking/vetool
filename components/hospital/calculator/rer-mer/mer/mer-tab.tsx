import DietForm from '@/components/hospital/calculator/rer-mer/diet/diet-form'
import MerForm from '@/components/hospital/calculator/rer-mer/mer/mer-form'
import MerToolTip from '@/components/hospital/calculator/rer-mer/mer/mer-tool-tip'
import DisabledFeedbackButton from '@/components/hospital/common/disabled-feedback-button'
import { Separator } from '@/components/ui/separator'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { calculateMer, calculateRer } from '@/lib/calculators/rer-mer'
import {
  merFormSchema,
  type MerFormValues,
} from '@/lib/schemas/calculator/rer-mer-schema'
import { type CalculatorTabProps } from '@/types/hospital/calculator'
import { zodResolver } from '@hookform/resolvers/zod'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
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
    <>
      <div>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span>MER</span>
            <MerToolTip />
          </SheetTitle>
          <VisuallyHidden>
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>

        <MerForm
          form={form}
          setFormData={setFormData}
          rer={rer}
          result={result}
        />
      </div>

      <Separator className="my-4" />

      <div>
        <SheetTitle className="flex items-center gap-2">
          <span>사료량</span>
        </SheetTitle>
        <SheetDescription className="flex items-center gap-2">
          추가가 필요한 사료는 <DisabledFeedbackButton />
        </SheetDescription>

        <DietForm mer={result} />
      </div>
    </>
  )
}
