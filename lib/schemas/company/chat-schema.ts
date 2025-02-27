import { z } from 'zod'

export const chartSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  hospital: z.string().min(1, '소속 병원 혹은 이름을 입력해주세요'),
  message: z.string().min(1, '문의사항을 입력해주세요'),
})

export type ChatFormValues = z.infer<typeof chartSchema>
