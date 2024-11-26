import { z } from 'zod'

export const dietSchema = z.object({
  diet_products_id: z.string().optional(),
  name: z.string().min(1, { message: '사료명을 입력해주세요' }),
  description: z.string().nullable(),
  company: z.string().min(1, { message: '제조사를 입력해주세요' }),
  mass_vol: z.coerce.number().positive({ message: '총량은 0보다 커야 합니다' }),
  unit: z.string().min(1, { message: '단위를 입력해주세요 (g, ml, etc.)' }),
})
