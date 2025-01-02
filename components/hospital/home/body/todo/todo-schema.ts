import * as z from 'zod'

export const todoSchema = z.object({
  todo_title: z
    .string({ required_error: 'TODO를 입력해주세요' })
    .trim()
    .min(1, { message: 'TODO를 입력해주세요' }),
  target_user: z.string().optional(),
})
