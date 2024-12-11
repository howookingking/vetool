import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dispatch, SetStateAction } from 'react'

export default function IoPatientsVetSelect({
  vets,
  selectedVet,
  setSelectedVet,
}: {
  vets: string[]
  selectedVet: string | null
  setSelectedVet: Dispatch<SetStateAction<string | null>>
}) {
  return (
    <div className="flex flex-col space-y-2">
      <Label>주치의 선택</Label>
      <Select
        value={selectedVet || undefined}
        onValueChange={(value) => setSelectedVet(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="전체" defaultValue={'all'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>

          {vets.map((group) => (
            <SelectItem key={group} value={group}>
              {group}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
