import { Button } from '@/components/ui/button'
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
import { calculateRer } from '@/lib/calculators/rer-mer'
import {
  rerFormSchema,
  type RerFormValues,
} from '@/lib/schemas/calculator/rer-mer-schema'
import { type CalculatorTabProps } from '@/types/hospital/calculator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardCopy } from 'lucide-react'
import { MouseEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import RerToolTip from './rer-tool-tip'

export default function RerTab({
  formData,
  setFormData,
  tab,
}: CalculatorTabProps) {
  const [result, setResult] = useState<number | null>(null)

  const form = useForm<RerFormValues>({
    resolver: zodResolver(rerFormSchema),
    defaultValues: {
      weight: formData.weight,
    },
  })

  useEffect(() => {
    const values = form.getValues()

    if (values.weight) {
      const calculatedRate = calculateRer(values.weight)
      setResult(calculatedRate)
    }
  }, [tab])

  useEffect(() => {
    const subscription = form.watch((value) => {
      form.trigger().then((isValid) => {
        if (isValid && value.weight) {
          const result = calculateRer(value.weight!)
          setResult(result)
        } else {
          setResult(null)
        }
      })
    })
    return () => subscription.unsubscribe()
  }, [form, setFormData])

  const handleCopyButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (result) {
      navigator.clipboard.writeText(result.toString())
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>RER</span>
          <RerToolTip />
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
          </CardContent>

          <CardContent className="pt-4">
            {result && (
              <div className="flex flex-col gap-2 text-center">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-lg font-semibold">계산 결과</span>
                  <Button
                    onClick={handleCopyButtonClick}
                    className="xl:text-xs 2xl:text-sm"
                    variant="outline"
                    size="icon"
                  >
                    <ClipboardCopy className="h-4 w-4" />
                  </Button>
                </div>

                <span className="text-2xl font-bold text-primary">
                  {result} <span className="text-sm font-normal">ml/hr</span>
                </span>
              </div>
            )}
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}
