import { z } from 'zod'

export const maintenanceFormSchema = z.object({
  species: z.enum(['canine', 'feline'], {
    message: '종을 선택해주세요',
  }),

  calcMethod: z.enum(['a', 'b', 'c'], {
    message: '계산법을 선택해주세요',
  }),

  weight: z
    .string({ required_error: '체중을 입력해주세요' })
    .refine((value) => value === '' || /^[0-9]*\.?[0-9]+$/.test(value), {
      message: '유효한 체중을 입력해주세요 (예: 6.4)',
    }),

  fold: z.enum(['1', '1.5', '2', '2.5', '3'], {
    message: '배수를 선택해주세요',
  }),
})

export const resuscitationFormSchema = z.object({
  species: z.enum(['canine', 'feline']),
  weight: z
    .string({ required_error: '체중을 입력해주세요' })
    .refine((value) => value === '' || /^[0-9]*\.?[0-9]+$/.test(value), {
      message: '유효한 체중을 입력해주세요 (예: 6.4)',
    }),
})

export const rehydrationFormSchema = z.object({
  dehydration: z.enum(['5', '7', '9', '11'], {
    message: '탈수 정도를 선택해주세요',
  }),

  weight: z
    .string({ required_error: '체중을 입력해주세요' })
    .refine((value) => value === '' || /^[0-9]*\.?[0-9]+$/.test(value), {
      message: '유효한 체중을 입력해주세요 (예: 6.4)',
    }),

  time: z
    .string({ required_error: '교정 시간을 입력해주세요' })
    .refine((value) => value === '' || /^\d+$/.test(value), {
      message: '자연수를 입력해주세요',
    }),
})

export type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>
export type ResuscitationFormValues = z.infer<typeof resuscitationFormSchema>
export type RehydrationFormValues = z.infer<typeof rehydrationFormSchema>
