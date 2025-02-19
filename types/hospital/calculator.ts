import { CALCULATORS } from '@/constants/hospital/icu/calculator/calculator'

export type Species = 'canine' | 'feline'

export type CalcMethod = 'a' | 'b' | 'c'

export type Fold = '1' | '1.5' | '2' | '2.5' | '3'

export type SelectedCalculator = (typeof CALCULATORS)[number]['value']

export type Diet = {
  diet_id: string
  name: string
  company: string
  unit: string
  mass_vol: number
}
