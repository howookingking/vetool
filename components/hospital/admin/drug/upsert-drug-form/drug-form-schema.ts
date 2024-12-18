import { z } from 'zod'

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
    .min(0, { message: 'mg 값은 0 이상이어야 합니다' }),
  dosages: z
    .array(dosageSchema)
    .min(1, { message: '최소 한 개의 용량 설정이 필요합니다' }),
})

// 전체 약물 폼 스키마
export const drugSchema = z.object({
  raw_drug_id: z
    .string()
    .min(1, { message: '약물 원료를 선택해주세요' })
    .uuid(),
  hos_drug_dosages: drugDosagesSchema,
  hos_drug_description: z.string().optional(),
  hos_drug_indication: z.string().optional(),
  hos_drug_side_effect: z.string().optional(),
  hos_drug_tags: z.string(),
  hos_drug_name: z.string().min(1, { message: '약물 이름을 입력해주세요' }),
})
