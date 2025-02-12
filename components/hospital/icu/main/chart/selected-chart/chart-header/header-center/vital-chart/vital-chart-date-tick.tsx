import { getDaysDifference } from '@/lib/utils/utils'
import { Text } from 'recharts'

type Props = {
  x: number
  y: number
  payload: { value: string }
  inDate: string
}

export default function VitalChartDateTick({ x, y, payload, inDate }: Props) {
  const [datePart, timePart] = payload.value.split(' ')

  const dayDifference =
    getDaysDifference(inDate) - getDaysDifference(datePart) + 1

  return (
    <g transform={`translate(${x},${y})`}>
      <Text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {datePart.slice(2) + ' ' + timePart}
      </Text>

      <Text x={0} y={20} dy={16} textAnchor="middle" fill="#666">
        {`입원 ${dayDifference}일차`}
      </Text>
    </g>
  )
}
