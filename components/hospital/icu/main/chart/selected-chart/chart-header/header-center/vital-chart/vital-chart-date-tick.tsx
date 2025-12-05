import { Text } from 'recharts'

type Props = {
  x: number
  y: number
  payload: { value: string }
  inDate: string
}

export default function VitalChartDateTick({ x, y, payload, inDate }: Props) {
  const [datePart, timePart] = payload.value.split(' ')

  return (
    <g transform={`translate(${x},${y})`}>
      <Text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {datePart.slice(2) + ' ' + timePart}
      </Text>
    </g>
  )
}
