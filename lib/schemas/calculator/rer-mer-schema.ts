import { z } from 'zod'

export const rerFormSchema = z.object({
  weight: z
    .string({ required_error: '체중을 입력해주세요' })
    .refine((value) => value === '' || /^[0-9]*\.?[0-9]+$/.test(value), {
      message: '유효한 체중을 입력해주세요 (예: 6.4)',
    }),
})

export const merFormSchema = z.object({
  factor: z.string({ required_error: '팩터를 입력해주세요' }),
  weight: z
    .string({ required_error: '체중을 입력해주세요' })
    .refine((value) => value === '' || /^[0-9]*\.?[0-9]+$/.test(value), {
      message: '유효한 체중을 입력해주세요 (예: 6.4)',
    }),
})

export type RerFormValues = z.infer<typeof rerFormSchema>
export type MerFormValues = z.infer<typeof merFormSchema>
