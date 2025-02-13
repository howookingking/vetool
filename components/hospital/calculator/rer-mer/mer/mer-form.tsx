import FactorToolTip from '@/components/hospital/calculator/rer-mer/rer-mer-factor-tool-tip'
import { CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { type MerFormValues } from '@/lib/schemas/calculator/rer-mer-schema'
import { type PatientFormData } from '@/types/hospital/calculator'
import { type Dispatch, type MouseEvent, type SetStateAction } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import CalculatorResult from '../../calculator-result'

type MerFormProps = {
  form: UseFormReturn<MerFormValues>
  setFormData: Dispatch<SetStateAction<PatientFormData>>
  rer: number | null
  result: number | null
}

export default function MerForm({
  form,
  setFormData,
  rer,
  result,
}: MerFormProps) {
  const handleCopyButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (result) {
      navigator.clipboard.writeText(result.toString())
    }
  }

  return (
    <div className="flex flex-col gap-4">
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

          <div>
            <FormLabel>RER</FormLabel>
            <Input
              disabled
              placeholder="RER"
              className="mt-2"
              value={rer ?? ''}
            />
          </div>

          <FormField
            control={form.control}
            name="factor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="inline-flex items-center gap-2">
                  Factor
                  <FactorToolTip />
                </FormLabel>
                <Input
                  onChange={(e) => {
                    field.onChange(e)
                    setFormData((prev) => ({
                      ...prev,
                      factor: e.target.value,
                    }))
                  }}
                  type="number"
                  value={field.value}
                  placeholder="Factor를 입력해주세요 (하단 표 참고)"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {result !== null && result > 0 && (
        <CalculatorResult
          result={result.toString()}
          unit="kcal/day"
          onClick={handleCopyButtonClick}
        />
      )}
    </div>
  )
}
