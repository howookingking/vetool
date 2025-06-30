import * as z from 'zod'

export const txDetailRegisterFormSchema = z
  .object({
    result: z.string().optional(),
    comment: z.string().optional(),
    isCrucialChecked: z.boolean().default(false).optional(),
  })
  .refine(
    (data) => {
      const hasResult = data.result && data.result.trim() !== ''
      const hasComment = data.comment && data.comment.trim() !== ''
      const hasCrucialCheck = data.isCrucialChecked

      return hasResult || hasComment || hasCrucialCheck
    },
    {
      message:
        '처치결과를 입력하지 않은 경우 코멘트 혹은 확인이 필요한 처치에 체크를 해주세요',
      path: ['comment'],
    },
  )

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
