export const calculateBsa = (
  species: 'canine' | 'feline',
  weight: number,
): number => {
  const factor = species === 'canine' ? 0.101 : 0.1

  return Number((factor * Math.pow(weight, 2 / 3)).toFixed(2))
}
