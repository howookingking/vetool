import { CardContent } from '@/components/ui/card'

type Props = {
  dose: number
  toxicityLevel: string
}

export default function ChocolateResult({ dose, toxicityLevel }: Props) {
  const getAlertColor = (level: string) => {
    switch (level) {
      case '안전':
        return 'bg-green-50 text-green-800 border-primary'
      case '경미':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200'
      case '중등도':
        return 'bg-orange-50 text-orange-800 border-orange-200'
      case '심각':
        return 'bg-red-50 text-red-800 border-red-200'
      default:
        return ''
    }
  }

  return (
    <CardContent className="col-span-2 px-0">
      <div
        className={`mt-6 rounded-lg border p-4 ${getAlertColor(toxicityLevel)}`}
      >
        <p className="mb-2 text-center text-lg font-semibold">분석 결과</p>
        <p className="mb-2 text-center">
          예상 테오브로민 섭취량:{' '}
          <span className="font-bold underline">{dose.toFixed(1)} mg/kg</span>
        </p>
        <p className="text-center font-semibold">
          위험도 수준: {toxicityLevel}
        </p>
      </div>
    </CardContent>
  )
}
