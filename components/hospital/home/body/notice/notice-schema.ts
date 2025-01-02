import * as z from 'zod'

export const NOTICE_COLORS = [
  '#ffffff',
  '#fecaca',
  '#fed7aa',
  '#fef08a',
  '#d9f99d',
  '#a7f3d0',
  '#a5f3fc',
  '#bfdbfe',
  '#ddd6fe',
] as const

export type NoticeColorType = (typeof NOTICE_COLORS)[number]

export const noticeSchema = z.object({
  notice: z
    .string({ required_error: '공지사항을 입력해주세요' })
    .trim()
    .min(1, { message: '공지사항을 입력해주세요' }),

  color: z.enum(NOTICE_COLORS, {
    required_error: '색상을 선택해주세요',
  }),
})
