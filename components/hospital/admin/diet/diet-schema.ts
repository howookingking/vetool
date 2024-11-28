import { z } from 'zod'

export const dietSchema = z.object({
  diet_id: z.string().optional(),
  name: z.string().min(1, { message: '사료명을 입력해주세요' }),
  description: z.string().nullable(),
  species: z.string().min(1, { message: '종을 선택해주세요' }).nullable(),
  company: z.string().min(1, { message: '제조사를 입력해주세요' }),
  mass_vol: z.string().min(1, { message: '단위당 칼로리값을 입력해주세요' }),
  unit: z.string().min(1, { message: '단위를 입력해주세요 (g, ml, etc.)' }),
})
