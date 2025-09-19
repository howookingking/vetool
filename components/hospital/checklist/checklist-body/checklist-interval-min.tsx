import useMinutesPassed from '@/hooks/use-minute-passed'

type Props = {
  startime: string
}
export default function ChecklistIntervalMin({ startime }: Props) {
  const minutesPassed = useMinutesPassed(startime)

  return <div className="ml-3 text-lg font-bold">시작 후 {minutesPassed}분</div>
}
