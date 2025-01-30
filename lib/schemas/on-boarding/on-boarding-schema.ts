import * as z from 'zod'

export const newHospitalFormSchema = z.object({
  name: z
    .string({ required_error: '병원 이름을 입력해주세요' })
    .trim()
    .min(1, { message: '병원 이름을 입력해주세요' }),
  city: z.string({ required_error: '시를 입력하세요' }),
  district: z.string({ required_error: '구를 입력하세요' }),
  businessNumber: z
    .string({ required_error: '사업자 번호를 입력하세요' })
    .trim()
    .length(10, { message: '- 없이 10자를 입력해주세요' }),
})

export const signupFormSchema = z.object({
  name: z
    .string({ required_error: '이름을 입력해주세요' })
    .min(2, { message: '2자 이상 입력해주세요' })
    .max(10, { message: '10자 이하로 입력해주세요' }),
  isVet: z.enum(['true', 'false'], {
    required_error: '수의사 여부를 선택해주세요',
  }),
  option: z.enum(['create', 'select'], {
    required_error: '동물병원등록 옵션을 선택해주세요',
  }),
})
