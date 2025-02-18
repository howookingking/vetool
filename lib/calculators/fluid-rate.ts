import {
  type CalcMethod,
  type Fold,
  type Species,
} from '@/types/hospital/calculator'

export const calculateMaintenanceRate = (
  weight: string,
  species: Species,
  fold: Fold,
  method: CalcMethod,
) => {
  if (weight === '') return undefined

  let fluidRatePerDay

  if (species === 'canine') {
    if (method === 'a') {
      fluidRatePerDay = 132 * Number(weight) ** (3 / 4)
    } else if (method === 'b') {
      fluidRatePerDay = 60 * Number(weight)
    } else if (method === 'c') {
      fluidRatePerDay = 30 * Number(weight) + 70
    }
  } else if (species === 'feline') {
    if (method === 'a') {
      fluidRatePerDay = 80 * Number(weight) ** (3 / 4)
    } else if (method === 'b') {
      fluidRatePerDay = 40 * Number(weight)
    } else if (method === 'c') {
      fluidRatePerDay = 30 * Number(weight) + 70
    }
  }
  return ((fluidRatePerDay! * Number(fold)) / 24).toFixed(1)
}

export const calculateRehydration = (
  weight: string,
  dehydration: string,
  rehydrationTime: string,
) => {
  if (weight === '' || rehydrationTime === '') return undefined

  const weightNum = parseFloat(weight)
  const dehydrationNum = parseFloat(dehydration)
  const timeNum = parseFloat(rehydrationTime)

  const totalMl = ((weightNum * dehydrationNum) / 100) * 1000
  const ratePerHour = totalMl / timeNum

  return {
    totalMl: Number(totalMl.toFixed(0)),
    ratePerHour: Number(ratePerHour.toFixed(1)),
  }
}

export const calculateResuscitation = (
  species: 'canine' | 'feline',
  weight: string,
) => {
  if (weight === '') return undefined

  const rates = {
    feline: { min: 5, max: 10 },
    canine: { min: 15, max: 20 },
  }

  const selectedRate = rates[species]

  return {
    min: Number((Number(weight) * selectedRate.min).toFixed(1)),
    max: Number((Number(weight) * selectedRate.max).toFixed(1)),
  }
}
