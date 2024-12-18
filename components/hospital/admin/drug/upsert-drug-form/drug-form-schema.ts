import { z } from 'zod'

export const drugSchema = z.object({
  raw_drug_id: z.string({ required_error: '약품 원료를 선택해주세요' }).uuid(),
  hos_drug_indication: z.string(),
  hos_drug_description: z.string(),
  hos_drug_side_effect: z.string(),
  hos_drug_tags: z.string(),
  //   hos_drug_dosages: z.string(),
})
