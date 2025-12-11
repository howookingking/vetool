import { ORDER_TYPE_ENUM } from '@/constants/hospital/icu/chart/order'
import { z } from 'zod'

export const calcResultApplyFormSchema = z.object({
  icu_chart_order_type: z.enum(ORDER_TYPE_ENUM),
  icu_chart_order_name: z
    .string({
      required_error: '오더명을 입력해주세요',
    })
    .min(1, { message: '오더명을 입력해주세요' }),
  icu_chart_order_comment: z.string().optional(),
})
