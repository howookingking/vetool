import { CALCULATORS } from '@/constants/hospital/icu/calculator/calculator'
import { Dispatch, SetStateAction } from 'react'

export type Species = 'canine' | 'feline'

export type CalcMethod = 'a' | 'b' | 'c'

export type FOLD = '1' | '1.5' | '2' | '2.5' | '3'

export type SelectedCalculator = (typeof CALCULATORS)[number]['value']

export type PatientFormData = {
  species: Species
  weight: string
  calcMethod?: CalcMethod
  fold?: FOLD
  factor?: string
}

export type CalculatorTabProps = {
  formData: PatientFormData
  setFormData: Dispatch<SetStateAction<PatientFormData>>
  tab?: string
}

export type Diet = {
  diet_id: string
  name: string
  company: string
  unit: string
  mass_vol: number
}
