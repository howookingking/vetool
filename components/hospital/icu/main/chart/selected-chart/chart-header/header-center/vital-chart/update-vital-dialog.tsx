import { vitalChartFormSchema } from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-form-schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { updateWeightData } from '@/lib/services/icu/chart/vitals'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function UpdateVitalDialog({
  currentVital,
  patientId,
  isDialogOpen,
  setIsDialogOpen,
  defaultValue,
  vitalId,
}: {
  currentVital: string
  patientId: string
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  defaultValue?: string
  vitalId?: number
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof vitalChartFormSchema>>({
    resolver: zodResolver(vitalChartFormSchema),
    defaultValues: {
      weight: defaultValue || '0',
    },
  })

  useEffect(() => {
    if (defaultValue) {
      form.setValue('weight', defaultValue)
    }
  }, [defaultValue])

  const handleSubmit = async (values: z.infer<typeof vitalChartFormSchema>) => {
    setIsSubmitting(true)

    await updateWeightData(patientId, values.weight, vitalId)

    setIsDialogOpen(false)
    setIsSubmitting(false)
    form.reset()

    toast({
      title: '체중 정보가 수정되었습니다',
    })
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) form.reset()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentVital} 정보 수정</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="gap-4 py-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col space-y-4">
                      <FormLabel>체중</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            id="weight"
                            type="text"
                            placeholder="0.00"
                            className="pr-8"
                            {...field}
                          />
                        </FormControl>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                          kg
                        </span>
                      </div>
                    </div>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="ml-auto w-full gap-2 md:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" tabIndex={-1}>
                  닫기
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isSubmitting}>
                수정
                {isSubmitting && <LoaderCircle className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
