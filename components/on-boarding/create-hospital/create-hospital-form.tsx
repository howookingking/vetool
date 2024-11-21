'use client'

import { newHospitalFormSchema } from '@/components/on-boarding/create-hospital/hospital-schema'
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
import { ADDRESS } from '@/constants/hospital/create/address'
import { createHospital } from '@/lib/services/on-boarding/on-boarding'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function CreateHospitalForm() {
  const [districts, setDistricts] = useState<string[]>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { push } = useRouter()

  const searchParams = useSearchParams()
  const isVet = searchParams.get('is_vet')
  const username = searchParams.get('name')

  const form = useForm<z.infer<typeof newHospitalFormSchema>>({
    resolver: zodResolver(newHospitalFormSchema),
    defaultValues: {
      name: '',
      city: '서울특별시',
      district: undefined,
      businessNumber: '',
    },
  })
  const city = form.watch('city')

  useEffect(() => {
    if (city) {
      const selectedCity = ADDRESS.find((value) => value.city === city)
      if (selectedCity) setDistricts(selectedCity.districts)
    }
  }, [city])

  const handleSubmit = async (
    values: z.infer<typeof newHospitalFormSchema>,
  ) => {
    const { city, district, name, businessNumber } = values

    setIsSubmitting(true)
    const returningHosId = await createHospital(
      name,
      username!,
      isVet === 'true',
      city,
      district,
      businessNumber,
    )

    toast({
      title: `${name} 등록 성공`,
      description: '잠시후 페이지가 이동됩니다',
    })

    setIsSubmitting(false)
    push(`/hospital/${returningHosId}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">병원 이름</FormLabel>
              <FormControl>
                <Input
                  placeholder="벳툴 동물병원"
                  {...field}
                  className="h-[40px] border bg-transparent px-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base">병원 주소</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="시·도" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ADDRESS.map((value) => (
                      <SelectItem key={value.city} value={value.city}>
                        {value.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem className="ml-2 w-full">
                <FormLabel className="select-none text-white">
                  병원 주소
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="시·군·구" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts?.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="businessNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">사업자 등록번호</FormLabel>
              <FormControl>
                <Input placeholder="사업자 등록번호 10자리" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="ml-auto">
          생성
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </form>
    </Form>
  )
}
