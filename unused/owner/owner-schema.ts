import * as z from 'zod'

export const ownerFormSchema = z.object({
  owner_name: z
    .string({ required_error: '보호자 이름을 입력해주세요' })
    .trim()
    .min(1, { message: '보호자 이름을 입력해주세요' }),
  owner_address: z.string().default(''),
  owner_phone_number: z.string().default(''),
  owner_memo: z.string().default(''),
  hos_owner_id: z
    .string({
      required_error: '보호자 번호를 입력해주세요',
    })
    .trim()
    .min(1, { message: '보호자 번호를 입력해주세요' }),
})
