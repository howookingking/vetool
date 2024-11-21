import * as z from 'zod'

export const ordererSchema = z.object({
  orderer: z.string({ required_error: '오더를 내리는 수의사를 선택해주세요' }),
})
