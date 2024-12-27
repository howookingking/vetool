import { Text } from 'recharts'
import { getDaysDifference } from '@/lib/utils/utils'

export default function VitalChartDateTick({
  x,
  y,
  payload,
  inDate,
}: {
  x: number
  y: number
  payload: { value: string }
  inDate: string
}) {
  const [datePart, timePart] = payload.value.split(' ')

  const dayDifference =
    getDaysDifference(inDate) - getDaysDifference(datePart) + 1

  return (
    <g transform={`translate(${x},${y})`} className="text-xs">
      <Text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {datePart + ' ' + timePart}
      </Text>

      <Text x={0} y={20} dy={16} textAnchor="middle" fill="#666">
        {`입원 ${dayDifference}일차`}
      </Text>
    </g>
  )
}
