import { z } from 'zod'

export const criFormSchema = z.object({
  dose: z.number(),
  fluidMassVol: z.number(),
  weight: z
    .number()
    .min(0, { message: '몸무게를 입력해주세요' })
    .max(100, { message: '몸무게는 100kg 이하여야 합니다' }),
  criSpeed: z.number(),
})

export type CriFormValues = z.infer<typeof criFormSchema>
