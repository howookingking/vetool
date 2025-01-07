import { z } from 'zod'

export const FEEDBACK_CATEGORY_ENUM = [
  '문의사항',
  '에러 / 불편사항',
  '키워드 추가(수의학용어, 약물, 품종 등...)',
  '기능 추가',
  '기타',
] as const

export const feedbackFormSchema = z.object({
  feedback_category: z.enum(FEEDBACK_CATEGORY_ENUM, {
    required_error: '피드백 카테고리를 선택해주세요',
  }),
  feedback_description: z
    .string({
      required_error: '피드백 내용을 입력해주세요',
    })
    .min(1, '피드백 내용을 입력해주세요'),
})
