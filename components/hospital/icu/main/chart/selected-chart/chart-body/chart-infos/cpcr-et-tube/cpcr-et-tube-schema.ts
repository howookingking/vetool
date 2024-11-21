import { z } from 'zod'

export const cpcrEtTubeSchema = z.object({
  cpcr: z.string({ required_error: 'CPCR 여부를 선택해주세요' }),
  etTube: z.string().nullable().optional(),
})
