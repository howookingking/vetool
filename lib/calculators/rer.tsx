export const calculateRer = (
  weight: string,
  species: 'canine' | 'feline',
  method: 'a' | 'b',
) => {
  let rer
  if (species === 'canine') {
    if (method === 'a') {
      rer = Number(weight) * 30 + 70
    } else if (method === 'b') {
      rer = 70 * Number(weight) ** (3 / 4)
    }
  } else if (species === 'feline') {
    if (method === 'a') {
      rer = Number(weight) * 40
    } else if (method === 'b') {
      rer = 70 * Number(weight) ** (3 / 4)
    }
  }
  return rer!.toFixed(0)
}
