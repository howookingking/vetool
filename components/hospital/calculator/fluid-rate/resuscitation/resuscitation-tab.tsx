import ResuscitationToolTip from '@/components/hospital/calculator/fluid-rate/resuscitation/resuscitation-tool-tip'
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
import { toast } from '@/components/ui/use-toast'
import { calculateResuscitation } from '@/lib/calculators/fluid-rate'
import {
  resuscitationFormSchema,
  type ResuscitationFormValues,
} from '@/lib/schemas/calculator/fluid-rate-schema'
import { type PatientFormData, type Species } from '@/types/hospital/calculator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardCopy } from 'lucide-react'
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'

type ResuscitationTabProps = {
  formData: PatientFormData
  setFormData: Dispatch<SetStateAction<PatientFormData>>
  tab: string
}

export default function ResuscitationTab({
  formData,
  setFormData,
  tab,
}: ResuscitationTabProps) {
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
  }, [tab, setFormData])

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
  }, [form])

  const handleCopyButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigator.clipboard.writeText(`${result.min}ml ~ ${result.max}ml`)
    toast({
      title: '계산 결과가 클립보드에 복사되었습니다.',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Resuscitation <ResuscitationToolTip />
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form>
          <CardContent className="grid grid-cols-2 gap-2">
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
          </CardContent>

          <CardContent className="pt-4">
            {(result.min !== 0 || result.max !== 0) && (
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
                <span>
                  <span className="pr-1 text-2xl font-bold text-primary">
                    {result.min}
                    ml ~ {result.max}
                    ml
                  </span>
                  <br />
                  buffered isotonic 수액을 15~30분간 주입해주세요.
                </span>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  `${result.min}ml ~ ${result.max}ml`,
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
