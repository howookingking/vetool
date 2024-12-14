import { HosDrug, RawDrug } from '..'

export type HosDrugWithRawDrug = Omit<
  HosDrug,
  'raw_drug_id' | 'hos_drug_dosages'
> & {
  raw_drug_id: RawDrug
  hos_drug_dosages: HosDrugDosages
}

export type HosDrugDosages = {
  bw_unit: string
  unit: string
  mg_per_ml: number
  dose_unit: string
  both?: Dosage
  feline?: Dosage
  canine?: Dosage
}

type Dosage = {
  min: number
  max: number
  default: number
}
