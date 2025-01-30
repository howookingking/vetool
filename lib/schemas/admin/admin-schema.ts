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
const dosageSchema = z.object({
  species: z.string().min(1, { message: '종을 선택해주세요' }),
  max: z.coerce.number().min(0, { message: '최대 용량은 0 이상이어야 합니다' }),
  min: z.coerce.number().min(0, { message: '최소 용량은 0 이상이어야 합니다' }),
  default: z.coerce
    .number()
    .min(0, { message: '기본 용량은 0 이상이어야 합니다' }),
})

// 전체 약물 용량 스키마
const drugDosagesSchema = z.object({
  unit: z.string(),
  bw_unit: z.string(),
  dose_unit: z.string(),
  mg_per_ml: z.coerce
    .number()
    .min(0.1, { message: 'mg 값은 0.1 이상이어야 합니다' }),
  dosages: z
    .array(dosageSchema)
    .min(1, { message: '최소 한 개의 용량 설정이 필요합니다' }),
})

// 전체 약물 폼 스키마
export const drugSchema = z.object({
  raw_drug_id: z
    .string({
      required_error: '약물 원료를 선택해주세요',
    })
    .min(1, { message: '약물 원료를 선택해주세요' })
    .uuid(),
  hos_drug_dosages: drugDosagesSchema,
  hos_drug_description: z.string().optional(),
  hos_drug_indication: z.string().optional(),
  hos_drug_side_effect: z.string().optional(),
  hos_drug_tags: z.string(),
  hos_drug_name: z.string().min(1, { message: '약물 이름을 입력해주세요' }),
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
