import { Input } from '@/components/ui/input'

export default function MassVolumeColumn({
  hosId,
  drugProductId,
  massVol,
}: {
  hosId: string
  drugProductId: string
  massVol: number
}) {
  return <Input value={massVol} onChange={() => {}} className="mx-auto w-12" />
}
