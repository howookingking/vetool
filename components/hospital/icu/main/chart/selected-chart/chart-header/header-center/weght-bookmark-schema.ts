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

export const bookmarkFormSchema = z.object({
  bookmark_name: z
    .string({ required_error: '북마크 이름을 입력해주세요' })
    .trim()
    .min(1, {
      message: '북마크 이름을 입력해주세요',
    }),

  bookmark_comment: z
    .string({ message: '텍스트로 입력해주세요' })
    .trim()
    .optional()
    .nullable(),
})

export const templateFormSchema = z.object({
  template_name: z
    .string({ required_error: '템플릿 이름을 입력해주세요' })
    .trim()
    .min(1, {
      message: '템플릿 이름을 입력해주세요',
    }),

  template_comment: z
    .string({ message: '텍스트로 입력해주세요' })
    .trim()
    .optional()
    .nullable(),
})
