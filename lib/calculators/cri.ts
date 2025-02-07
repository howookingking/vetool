export const calculateCri = (
  weight: number,
  dose: number,
  fluidMassVol: number,
  criSpeed: number,
  drug: string,
) => {
  let fluidVol = 0
  let additiveVol = 0

  if (drug === 'Furosemide') {
    additiveVol = (dose * weight * fluidMassVol) / criSpeed / 10
    fluidVol = fluidMassVol - additiveVol
  }

  if (drug === 'Metroclopramide') {
    additiveVol = (dose * weight * fluidMassVol * criSpeed) / 5
    fluidVol = fluidMassVol - additiveVol
  }

  if (drug === 'Bicarbonate') {
    additiveVol = (dose * weight * 3) / 10
    fluidVol = fluidMassVol - additiveVol
  }

  if (drug === 'Midazolam') {
    additiveVol = (dose * weight * fluidMassVol) / criSpeed
    fluidVol = fluidMassVol - additiveVol
  }

  return {
    fluidVol: Number(fluidVol.toFixed(2)),
    additiveVol: Number(additiveVol.toFixed(2)),
  }
}
