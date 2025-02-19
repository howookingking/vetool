export const calculateRer = (weight: string) => {
  if (weight === '') return undefined
  return Number((70 * Number(weight) ** (3 / 4)).toFixed(0))
}

export const cacluateFeedAmount = (
  mer?: number,
  massVol?: number,
  feedPerDay?: number,
) => {
  if (!mer || !massVol || !feedPerDay) return undefined

  return Number((mer / massVol / feedPerDay).toFixed(1))
}
