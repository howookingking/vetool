export const calculateBsa = (weight: number): number =>
  Number((0.1 * Math.pow(weight, 2 / 3)).toFixed(2))
