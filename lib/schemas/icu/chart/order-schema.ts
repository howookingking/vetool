import { ORDER_TYPE_ENUM } from '@/constants/hospital/icu/chart/order'
import { z } from 'zod'

export const orderSchema = z.object({
  icu_chart_order_type: z.enum(ORDER_TYPE_ENUM, {
    required_error: '오더 타입을 선택해주세요',
    invalid_type_error: '오더 타입을 선택해주세요',
  }),
  icu_chart_order_name: z
    .string({
      required_error: '오더명을 입력해주세요',
    })
    .min(1, { message: '오더명을 입력해주세요' }),
  icu_chart_order_comment: z.string().optional(),
  is_bordered: z.boolean().default(false).optional(),
})

export const ordererSchema = z.object({
  orderer: z.string({ required_error: '오더를 내리는 수의사를 선택해주세요' }),
})
