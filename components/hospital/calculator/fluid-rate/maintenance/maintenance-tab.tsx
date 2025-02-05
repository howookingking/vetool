import MaintenanceToolTip from '@/components/hospital/calculator/fluid-rate/maintenance/maintenance-tool-tip'
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
import { calculateMaintenanceRate } from '@/lib/calculators/fluid-rate'
import {
  maintenanceFormSchema,
  type MaintenanceFormValues,
} from '@/lib/schemas/calculator/fluid-rate-schema'
import { Species, type PatientFormData } from '@/types/hospital/calculator'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardCopy } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type MaintenanceTabProps = {
  formData: PatientFormData
  setFormData: Dispatch<SetStateAction<PatientFormData>>
  tab: string
}

export default function MaintenanceTab({
  formData,
  setFormData,
  tab,
}: MaintenanceTabProps) {
  const [result, setResult] = useState<string>('')

  const form = useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceFormSchema),
    defaultValues: {
      species: formData.species,
      calcMethod: formData.calcMethod,
      weight: formData.weight,
      fold: formData.fold,
    },
  })

  useEffect(() => {
    const values = form.getValues()
    const calculatedRate = calculateMaintenanceRate(
      values.weight,
      values.species,
      values.fold,
      values.calcMethod,
    )
    setResult(calculatedRate)
  }, [tab])

  useEffect(() => {
    const subscription = form.watch((value) => {
      form.trigger().then((isValid) => {
        if (isValid) {
          const calculatedRate = calculateMaintenanceRate(
            value.weight!,
            value.species!,
            value.fold!,
            value.calcMethod!,
          )
          setResult(calculatedRate)
        } else {
          setResult('')
        }
      })
    })
    return () => subscription.unsubscribe()
  }, [form, setFormData])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Maintenance</span>
          <MaintenanceToolTip />
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
              name="calcMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>계산법</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="계산법" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.watch('species') === 'canine' ? (
                        <>
                          <SelectItem value="a">
                            a. 132 * (몸무게)<sup>0.75</sup>
                            <span className="text-sm text-muted-foreground">
                              ml/day
                            </span>
                          </SelectItem>
                          <SelectItem value="b">b. 60ml/kg/day</SelectItem>
                          <SelectItem value="c">
                            c. 30 * (몸무게) + 70 ml/day
                          </SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="a">
                            a. 80 * (몸무게)<sup>0.75</sup>
                            <span className="text-sm text-muted-foreground">
                              ml/day
                            </span>
                          </SelectItem>
                          <SelectItem value="b">b. 40ml/kg/day</SelectItem>
                          <SelectItem value="c">
                            c. 30 * (몸무게) + 70 ml/day
                          </SelectItem>
                        </>
                      )}
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
              name="fold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>배수</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="배수" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1배수</SelectItem>
                      <SelectItem value="1.5">1.5배수</SelectItem>
                      <SelectItem value="2">2배수</SelectItem>
                      <SelectItem value="2.5">2.5배수</SelectItem>
                      <SelectItem value="3">3배수</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardContent className="pt-4">
            {result && (
              <div className="flex flex-col gap-2 text-center">
                <span className="text-lg font-semibold">계산 결과</span>
                <span className="text-2xl font-bold text-primary">
                  {result} <span className="text-sm font-normal">ml/hr</span>
                </span>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button
              onClick={() => navigator.clipboard.writeText(result)}
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
