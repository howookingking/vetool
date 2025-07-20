import { NOTICE_COLORS } from '@/constants/hospital/icu/chart/colors'
import * as z from 'zod'

/* 공지사항 */
export const noticeSchema = z.object({
  notice: z
    .string({ required_error: '공지사항을 입력해주세요' })
    .trim()
    .min(1, { message: '공지사항을 입력해주세요' }),

  color: z.enum(NOTICE_COLORS, {
    required_error: '색상을 선택해주세요',
  }),
})

/* 투두 */
export const todoSchema = z.object({
  targaet_date: z.date({
    required_error: '날짜을 선택해주세요',
  }),
  todo_title: z
    .string({ required_error: 'TODO를 입력해주세요' })
    .trim()
    .min(1, { message: 'TODO를 입력해주세요' }),
  target_user: z.string().optional(),
})
