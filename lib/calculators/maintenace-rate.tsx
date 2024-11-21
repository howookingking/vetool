export const calculatedMaintenaceRate = (
  weight: string,
  species: 'canine' | 'feline',
  fold: string,
  method: 'a' | 'b' | 'c',
) => {
  let fluidRatePerDay
  if (species === 'canine') {
    if (method === 'a') {
      fluidRatePerDay = 60 * Number(weight)
    } else if (method === 'b') {
      fluidRatePerDay = 132 * Number(weight) ** (3 / 4)
    } else if (method === 'c') {
      fluidRatePerDay = 30 * Number(weight) + 70
    }
  } else if (species === 'feline') {
    if (method === 'a') {
      fluidRatePerDay = 40 * Number(weight)
    } else if (method === 'b') {
      fluidRatePerDay = 80 * Number(weight) ** (3 / 4)
    } else if (method === 'c') {
      fluidRatePerDay = 30 * Number(weight) + 70
    }
  }
  return ((fluidRatePerDay! * Number(fold)) / 24).toFixed(2)
}
