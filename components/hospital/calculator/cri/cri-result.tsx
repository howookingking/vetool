type CriResultProps = {
  fluidVol: number
  additiveVol: number
  criSpeed: number
  drug: string
}

export default function CriResult({
  fluidVol,
  additiveVol,
  criSpeed,
  drug,
}: CriResultProps) {
  const isBicarbonate = drug === 'Bicarbonate'

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-6 text-lg">
      {!isBicarbonate ? (
        <div>
          <span className="font-bold text-primary underline">{fluidVol}ml</span>{' '}
          수액에{' '}
          <span className="font-bold text-primary underline">
            {drug} {additiveVol}ml
          </span>
          를 넣고{' '}
          <span className="font-bold text-primary underline">
            {criSpeed}ml/hr
          </span>{' '}
          속도로 투여
        </div>
      ) : (
        <div>
          실제 투여량은{' '}
          <span className="font-bold text-primary underline">{fluidVol}ml</span>
          의 <span className="font-bold text-destructive">1/2 ~ 1/8</span>을
          1~4시간 동안 공급
        </div>
      )}
    </div>
  )
}
