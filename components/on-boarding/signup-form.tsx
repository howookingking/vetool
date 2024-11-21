'use client'

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
import { logout } from '@/lib/services/auth/authentication'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signupFormSchema = z.object({
  name: z
    .string({ required_error: '이름을 입력해주세요' })
    .min(2, { message: '2자 이상 입력해주세요' })
    .max(10, { message: '10자 이하로 입력해주세요' }),
  isVet: z.enum(['true', 'false'], {
    required_error: '수의사 여부를 선택해주세요',
  }),
  option: z.enum(['create', 'select'], {
    required_error: '동물병원등록 옵션을 선택해주세요',
  }),
})
export function SignupForm() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      isVet: undefined,
      option: undefined,
    },
  })

  const { push } = useRouter()

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()
    await logout()
  }

  const handleSubmit = (values: z.infer<typeof signupFormSchema>) => {
    const { name, isVet, option } = values

    if (option === 'select') {
      push(`/on-boarding/select-hospital?name=${name}&is_vet=${isVet}`)
    }
    if (option === 'create') {
      push(`/on-boarding/create-hospital?name=${name}&is_vet=${isVet}`)
    }
  }

  return (
    <>
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
                <FormLabel className="text-base">성함을 입력해주세요</FormLabel>
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
                <FormLabel className="text-base">수의사이신가요?</FormLabel>
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
                <FormLabel className="text-base">동물병원 등록</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="select" />
                      </FormControl>
                      <FormLabel className="cursor-pointer">
                        등록된 병원의 임직원으로 참여하겠습니다
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="create" />
                      </FormControl>
                      <FormLabel className="cursor-pointer">
                        새로운 병원을 개설하겠습니다
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="ml-auto">
            <Button className="" type="submit">
              다음
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
