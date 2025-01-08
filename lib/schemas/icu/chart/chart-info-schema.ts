import { z } from 'zod'

export const cpcrEtTubeSchema = z.object({
  cpcr: z.string({ required_error: 'CPCR 여부를 선택해주세요' }),
  etTube: z.string().nullable().optional(),
})

export const groupCheckFormSchema = z.object({
  groupList: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: '적어도 하나의 그룹을 선택해주세요',
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
