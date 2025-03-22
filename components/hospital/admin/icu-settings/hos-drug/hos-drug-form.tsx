'use no memo'

import { Button } from '@/components/ui/button'
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
import {
  hosDrugFormSchema,
  HosDrugFormSchema,
} from '@/lib/schemas/admin/admin-schema'
import { insertHosDrug } from '@/lib/services/admin/icu/hos-drugs'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function HosDrugForm({
  setIsDialogOpen,
}: {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { refresh } = useRouter()
  const { hos_id } = useParams()

  const [isInserting, setIsInserting] = useState(false)

  const form = useForm<HosDrugFormSchema>({
    resolver: zodResolver(hosDrugFormSchema),
    defaultValues: {
      hos_drug_name: '',
      unit: 'mg',
      unit_per_kg: '',
      ml_per_kg: '',
      hos_drug_route: '',
      caution: '',
    },
  })

  const handleSubmit = async (values: HosDrugFormSchema) => {
    setIsInserting(true)

    const {
      hos_drug_name,
      unit_per_kg,
      ml_per_kg,
      hos_drug_route,
      caution,
      unit,
    } = values

    await insertHosDrug(
      hos_id as string,
      hos_drug_name,
      unit,
      unit_per_kg,
      ml_per_kg,
      hos_drug_route,
      caution ?? '',
    )

    toast({
      title: '선호 약물을 등록하였습니다',
    })

    setIsInserting(false)
    setIsDialogOpen(false)
    refresh()
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="hos_drug_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                약물명 <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Maropitant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                단위 <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="mg" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mg">mg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="μg">μg</SelectItem>
                  <SelectItem value="U">U</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit_per_kg"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="unit_per_kg">
                기본용량 (단위/kg) <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input id="unit_per_kg" placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ml_per_kg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                체중당 투여량 (ml/kg){' '}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input id="ml_per_kg" placeholder="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hos_drug_route"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                투여경로 <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="투여 경로를 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="IV">IV</SelectItem>
                  <SelectItem value="SC">SC</SelectItem>
                  <SelectItem value="IM">IM</SelectItem>
                  <SelectItem value="ETC">기타</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주사시 특이사항</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isInserting} className="ml-auto">
          추가
          <LoaderCircle
            className={cn(isInserting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </form>
    </Form>
  )
}
