export const calculateMaintenanceRate = (
  weight: string,
  species: 'canine' | 'feline',
  fold: string,
  method: 'a' | 'b' | 'c',
) => {
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
  return ((fluidRatePerDay! * Number(fold)) / 24).toFixed(2)
}

export const calculateResuscitation = (
  species: 'canine' | 'feline',
  bodyWeight: number,
) => {
  const rates = {
    canine: { min: 5, max: 10 },
    feline: { min: 15, max: 20 },
  }

  const selectedRate = rates[species]

  return {
    min: bodyWeight * selectedRate.min,
    max: bodyWeight * selectedRate.max,
  }
}

export const calculateRehydration = (
  weight: string,
  dehydration: string,
  time: string,
) => {
  const weightNum = parseFloat(weight)
  const dehydrationNum = parseFloat(dehydration)
  const timeNum = parseFloat(time)

  const totalMl = ((weightNum * dehydrationNum) / 100) * 1000
  const ratePerHour = totalMl / timeNum

  return {
    totalMl: Number(totalMl.toFixed(0)),
    ratePerHour: Number(ratePerHour.toFixed(1)),
  }
}
