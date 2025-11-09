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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { signupFormSchema } from '@/lib/schemas/on-boarding/on-boarding-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function SignupForm() {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      isVet: undefined,
      option: undefined,
    },
  })

  const handleNext = (values: z.infer<typeof signupFormSchema>) => {
    const { name, isVet, option } = values

    {
      option === 'create'
        ? push(`/on-boarding/create-hospital?name=${name}&is_vet=${isVet}`)
        : push(`/on-boarding/select-hospital?name=${name}&is_vet=${isVet}`)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleNext)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                1. 성함을 입력해주세요
              </FormLabel>
              <FormControl>
                <Input placeholder="김벳툴" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isVet"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold">
                2. 수의사이신가요?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      Yes, 수의사입니다
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      No, 수의사가 아닙니다
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="option"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold">
                3. 벳툴에 새로운 동물병원 등록
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="create" />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      새로운 동물병원을 등록하겠습니다
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="select" />
                    </FormControl>
                    <FormLabel className="cursor-pointer">
                      이미 등록된 동물병원에 참여하겠습니다
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="ml-auto">다음</Button>
      </form>
    </Form>
  )
}
