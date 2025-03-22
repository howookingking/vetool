import { z } from 'zod'

/* 사료 */
export const dietSchema = z.object({
  diet_id: z.string().optional(),
  name: z.string().min(1, { message: '사료명을 입력해주세요' }),
  description: z.string().nullable(),
  species: z.string().min(1, { message: '종을 선택해주세요' }).nullable(),
  company: z.string().min(1, { message: '제조사를 입력해주세요' }),
  mass_vol: z.string().min(1, { message: '단위당 칼로리값을 입력해주세요' }),
  unit: z.string().min(1, { message: '단위를 입력해주세요 (g, ml, etc.)' }),
})

/* 약물 */
// 개별 용량 설정 스키마
// const dosageSchema = z.object({
//   species: z.string().min(1, { message: '종을 선택해주세요' }),
//   max: z.coerce.number().min(0, { message: '최대 용량은 0 이상이어야 합니다' }),
//   min: z.coerce.number().min(0, { message: '최소 용량은 0 이상이어야 합니다' }),
//   default: z.coerce
//     .number()
//     .min(0, { message: '기본 용량은 0 이상이어야 합니다' }),
// })

// 전체 약물 용량 스키마
// const drugDosagesSchema = z.object({
//   unit: z.string(),
//   bw_unit: z.string(),
//   dose_unit: z.string(),
//   mg_per_ml: z.coerce
//     .number()
//     .min(0.1, { message: 'mg 값은 0.1 이상이어야 합니다' }),
// })

// 관리자 선호 약물 설정 폼 스키마
export const hosDrugFormSchema = z.object({
  hos_drug_name: z
    .string({ required_error: '약물명을 입력해주세요' })
    .min(1, { message: '약물명을 입력해주세요' }),
  unit: z
    .string({ required_error: '단위를 입력해주세요' })
    .min(1, { message: '단위를 입력해주세요' }),
  unit_per_kg: z
    .string({ required_error: '기본용량을 입력해주세요' })
    .refine((value) => /^[0-9]*\.?[0-9]+$/.test(value), {
      message: '기본용량을 입력해주세요',
    }),
  ml_per_kg: z
    .string({ required_error: '체중당 투여량을 입력해주세요' })
    .refine((value) => /^[0-9]*\.?[0-9]+$/.test(value), {
      message: '체중당 투여량을 입력해주세요',
    }),
  hos_drug_route: z
    .string({ required_error: '경로를 선택해주세요' })
    .min(1, { message: '경로를 선텍해주세요' }),
  caution: z
    .string({ required_error: '주사 특이사항을 입력해주세요' })
    .optional(),
})

/* 메모 */
export const memoNameFormSchema = z.object({
  memoA: z
    .string({
      required_error: '메모이름을 입력해주세요',
    })
    .min(1, {
      message: '메모이름을 입력해주세요',
    })
    .max(20, {
      message: '메모이름은 최대 20자까지 설정 가능합니다.',
    }),

  memoB: z
    .string({
      required_error: '메모이름을 입력해주세요',
    })
    .min(1, {
      message: '메모이름을 입력해주세요',
    })
    .max(20, {
      message: '메모이름은 최대 20자까지 설정 가능합니다.',
    }),

  memoC: z
    .string({
      required_error: '메모이름을 입력해주세요',
    })
    .min(1, {
      message: '메모이름을 입력해주세요',
    })
    .max(20, {
      message: '메모이름은 최대 20자까지 설정 가능합니다.',
    }),
})

// 스태프관리에서 그룹선택
export const GroupCheckFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: '적어도 하나의 그룹을 선택해주세요',
  }),
})

export type HosDrugFormSchema = z.infer<typeof hosDrugFormSchema>
