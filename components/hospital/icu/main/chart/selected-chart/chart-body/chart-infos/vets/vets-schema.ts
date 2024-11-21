import * as z from 'zod'

export const vetsFormSchema = z.object({
  main_vet: z.string({ required_error: '주치의를 선택해주세요' }),
  sub_vet: z.string().optional(),
  today_vet: z.string().optional(),
  today_am_vet: z.string().optional(),
  today_pm_vet: z.string().optional(),
  tommorow_vet: z.string().optional(),
  tommorow_am_vet: z.string().optional(),
  tommorow_pm_vet: z.string().optional(),
})
