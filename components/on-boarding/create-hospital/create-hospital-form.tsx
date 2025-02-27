'use client'
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
import { ADDRESS } from '@/constants/hospital/create/address'
import { newHospitalFormSchema } from '@/lib/schemas/on-boarding/on-boarding-schema'
import {
  checkBusinessNumber,
  createHospital,
} from '@/lib/services/on-boarding/on-boarding'
import { cn } from '@/lib/utils/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function CreateHospitalForm() {
  const { push } = useRouter()
  const searchParams = useSearchParams()

  const [districts, setDistricts] = useState<string[]>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBusinessNumberVerified, setIsBusinessNumberVerified] =
    useState(false)
  const [isCheckingBusinessNumber, setIsCheckingBusinessNumber] =
    useState(false)

  const form = useForm<z.infer<typeof newHospitalFormSchema>>({
    resolver: zodResolver(newHospitalFormSchema),
    defaultValues: {
      name: '',
      city: '서울특별시',
      district: undefined,
      businessNumber: '',
    },
  })

  const isVet = searchParams.get('is_vet')
  const username = searchParams.get('name')

  const city = form.watch('city')
  const businessNumber = form.watch('businessNumber')
  const isFormValid = form.formState.isValid

  useEffect(() => {
    if (city) {
      const selectedCity = ADDRESS.find((value) => value.city === city)
      if (selectedCity) setDistricts(selectedCity.districts)
    }
  }, [city])

  const handleBusinessNumberCheck = async () => {
    setIsCheckingBusinessNumber(true)

    const isAvailable = await checkBusinessNumber(businessNumber)
    setIsBusinessNumberVerified(isAvailable)

    if (isAvailable) {
      toast({
        title: '사용 가능한 사업자등록번호입니다',
      })
    } else {
      toast({
        variant: 'destructive',
        title: '이미 등록된 사업자등록번호입니다',
      })
    }

    setIsCheckingBusinessNumber(false)
  }

  useEffect(() => {
    setIsBusinessNumberVerified(false)
  }, [businessNumber])

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
              <FormLabel className="text-base">동물병원 이름</FormLabel>
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
                <FormLabel className="text-base">동물병원 주소</FormLabel>
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
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="사업자 등록번호 10자리 / 예) 1234567890"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={handleBusinessNumberCheck}
                  disabled={
                    isCheckingBusinessNumber || businessNumber.length !== 10
                  }
                >
                  중복확인
                  {isCheckingBusinessNumber && (
                    <LoaderCircle className="ml-2 animate-spin" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting || !isBusinessNumberVerified || !isFormValid}
          className="ml-auto"
        >
          생성
          <LoaderCircle
            className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      </form>
    </Form>
  )
}
