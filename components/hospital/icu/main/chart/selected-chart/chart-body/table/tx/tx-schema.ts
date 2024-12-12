import * as z from 'zod'

export const txDetailRegisterFormSchema = z.object({
  result: z
    .string({ required_error: '처치 결과값을 입력해주세요' })
    .trim()
    .min(1, { message: '처치 결과값을 입력해주세요' }),
  comment: z.string().optional(),
  isCrucialChecked: z.boolean().default(false).optional(),
})

export const userLogFormSchema = z.object({
  userLog: z
    .string({
      required_error: '내부적으로 정한 처치자의 코드 또는 이름을 입력해주세요',
    })
    .trim()
    .min(1, {
      message: '내부적으로 정한 처치자의 코드 또는 이름을 입력해주세요',
    }),
})
