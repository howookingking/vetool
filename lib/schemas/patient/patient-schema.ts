import * as z from 'zod'

export const registerPatientFormSchema = z.object({
  name: z
    .string({ required_error: '환자 이름을 입력해주세요' })
    .trim()
    .min(1, { message: '환자 이름을 입력해주세요' })
    .max(15, { message: '환자 이름을 15자 이내로 입력해주세요' }),
  hos_patient_id: z
    .string({ required_error: '메인차트에 등록된 환자번호를 입력해주세요' })
    .trim()
    .min(1, { message: '환자 번호를 입력해주세요' }),
  breed: z
    .string({ required_error: '품종을 선택해주세요' })
    .min(1, { message: '품종을 선택해주세요' }),
  species: z.string({ required_error: '종을 선택해주세요' }),
  weight: z
    .string({ required_error: '몸무게를 입력해주세요' })
    .refine((value) => value === '' || /^[0-9]*\.?[0-9]+$/.test(value), {
      message: '유효한 체중을 입력해주세요 (예: 6.4)',
    }),
  gender: z.string({ required_error: '성별을 선택해주세요' }),
  birth: z.date({ required_error: '나이 또는 생년월일을 선택해주세요' }),
  microchip_no: z.string({ required_error: '마이크로칩 넘버를 입력해주세요' }),
  owner_name: z.string({ required_error: '보호자 이름을 입력해주세요' }),
  hos_owner_id: z.string({ required_error: '보호자 번호를 입력해주세요' }),
  memo: z.string({ required_error: '종을 선택해주세요' }),
})
