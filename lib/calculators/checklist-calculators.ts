export const kgToBsa = (
  weight: number,
  species: 'caninie' | 'feline',
): number => {
  if (weight <= 0) return 0
  if (species === 'caninie' || !species) {
    return Number((0.101 * Math.pow(Number(weight), 2 / 3)).toFixed(2))
  } else {
    return Number((0.1 * Math.pow(Number(weight), 2 / 3)).toFixed(2))
  }
}
