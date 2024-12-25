import { z } from 'zod'

export const vitalChartFormSchema = z.object({
  weight: z
    .string()
    .min(1, '값을 입력해주세요')
    .refine((val) => !isNaN(Number(val)), '올바른 숫자를 입력해주세요')
    .refine((val) => Number(val) > 0, '0보다 큰 값을 입력해주세요')
    .refine((val) => Number(val) <= 99, '99 이하여야 합니다'),
})
