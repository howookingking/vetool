import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dispatch, SetStateAction } from 'react'

export default function IoPatientsGroupSelect({
  groups,
  selectedGroup,
  setSelectedGroup,
}: {
  groups: string[]
  selectedGroup: string | null
  setSelectedGroup: Dispatch<SetStateAction<string | null>>
}) {
  return (
    <div className="flex flex-col space-y-2">
      <Label>그룹 선택</Label>
      <Select
        value={selectedGroup || undefined}
        onValueChange={(value) => setSelectedGroup(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="전체" defaultValue={'all'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>

          {groups.map((group) => (
            <SelectItem key={group} value={group}>
              {group}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
