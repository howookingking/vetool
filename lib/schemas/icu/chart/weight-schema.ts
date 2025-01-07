import * as z from 'zod'

export const weightFormSchema = z.object({
  weight: z
    .string({ required_error: '체중을 입력해주세요' })
    .trim()
    .min(1, { message: '체중을 입력해주세요' })
    .refine((val) => !isNaN(parseFloat(val)) && isFinite(Number(val)), {
      message: '유효한 숫자를 입력해주세요',
    }),
})
