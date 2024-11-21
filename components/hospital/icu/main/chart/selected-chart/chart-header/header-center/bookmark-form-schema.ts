import * as z from 'zod'

export const bookmarkFormSchema = z.object({
  bookmark_name: z
    .string({ required_error: '즐겨찾기 이름을 입력해주세요' })
    .trim()
    .min(1, {
      message: '즐겨찾기 이름을 입력해주세요',
    }),

  bookmark_comment: z.string().trim().optional().nullable(),
})
