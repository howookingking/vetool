import * as z from 'zod'

export const templateFormSchema = z.object({
  template_name: z
    .string({ required_error: '템플릿 이름을 입력해주세요' })
    .trim()
    .min(1, {
      message: '템플릿 이름을 입력해주세요',
    }),
  template_comment: z.string().trim().optional().nullable(),
  is_time_included: z.boolean(),
})
