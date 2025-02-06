// export const calculateRer = (
//   weight: string,
//   species: 'canine' | 'feline',
//   method: 'a' | 'b',
// ) => {
//   let rer
//   if (species === 'canine') {
//     if (method === 'a') {
//       rer = Number(weight) * 30 + 70
//     } else if (method === 'b') {
//       rer = 70 * Number(weight) ** (3 / 4)
//     }
//   } else if (species === 'feline') {
//     if (method === 'a') {
//       rer = Number(weight) * 40
//     } else if (method === 'b') {
//       rer = 70 * Number(weight) ** (3 / 4)
//     }
//   } else {
//     return '0'
//   }

//   return rer!.toFixed(0)
// }

export const calculateRer = (weight: string) => {
  return Number((70 * Number(weight) ** (3 / 4)).toFixed(0))
}

export const calculateMer = (weight: string, factor: string) => {
  const mer = calculateRer(weight) * Number(factor)

  return Number(mer.toFixed(0))
}

export const cacluateFeedAmount = (
  mer: number,
  massVol: number,
  feedPerDay: number,
) => {
  return Number((mer / massVol / feedPerDay).toFixed(1))
}
