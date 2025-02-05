import { CALCULATORS } from '@/constants/hospital/icu/calculator/calcularor'

export type Species = 'canine' | 'feline'

export type CalcMethod = 'a' | 'b' | 'c'

export type FOLD = '1' | '1.5' | '2' | '2.5' | '3'

export type PatientFormData = {
  species: Species
  calcMethod: CalcMethod
  weight: string
  fold: FOLD
}

export type SelectedCalculator = (typeof CALCULATORS)[number]['value']
