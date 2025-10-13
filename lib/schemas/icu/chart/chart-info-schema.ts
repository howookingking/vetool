import { z } from 'zod'

export const cpcrEtTubeSchema = z.object({
  cpcr: z.string({ required_error: 'CPCR 여부를 선택해주세요' }),
  etTube: z.string().nullable().optional(),
})

export const groupCheckFormSchema = z.object({
  groupList: z.array(z.string()).refine((value) => {
    if (value.length === 0) return true
    return value.some((item) => item)
  }),
})

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
