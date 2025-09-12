'use client'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'
import type { HosData } from './analysis-type'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { ChevronDownIcon } from 'lucide-react'
import { format, set } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Calendar as CalendarIcon } from 'lucide-react'
type Props = {
  hosdatas: HosData[] | null
}

export default function AnalysisHeader({ hosdatas }: Props) {
  const [selectedHospitals, setSelectedHospitals] = useState<string[]>([])
  const [isChanged, setIsChanged] = useState(false)
  const [preopen, setPreOpen] = useState(false)
  const [predate, setPreDate] = useState<Date | undefined>(undefined)
  const [postopen, setPostOpen] = useState(false)
  const [postdate, setPostDate] = useState<Date | undefined>(undefined)
  const pathname = usePathname()
  const { push } = useRouter()
  const selectHospital = () => {
    const queryString = selectedHospitals
      .map((id) => `hos_ids=${encodeURIComponent(id)}`)
      .join('&')
    // let hosids = ''
    // for (let i = 0; i < selectedHospitals.length; i++) {
    //   if (i === 0) {
    //     hosids = hosids + selectedHospitals[i]
    //   } else {
    //     hosids = hosids + '#' + selectedHospitals[i]
    //   }
    // }
    predate &&
      postdate &&
      queryString &&
      push(
        `/hospital/analysis/hos_id?${queryString}&predate=${format(predate, 'yyyy-MM-dd')}&postdate=${format(postdate, 'yyyy-MM-dd')}`,
      )
    setSelectedHospitals([])
    setIsChanged(false)
  }

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button>병원선택 </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen max-w-md">
          <div className="flex items-start gap-3">
            <Checkbox
              id="all"
              checked={selectedHospitals.length === hosdatas?.length}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedHospitals(
                    hosdatas!.map((hosdata) => hosdata.hos_id),
                  )
                } else {
                  setSelectedHospitals([])
                }
                setIsChanged(true)
              }}
            />
            <Label htmlFor="toggle">모든병원</Label>
          </div>
          {hosdatas?.map((hosdata) => (
            <div key={hosdata.hos_id} className="flex items-start gap-3">
              <Checkbox
                checked={selectedHospitals.includes(hosdata.hos_id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedHospitals([...selectedHospitals, hosdata.hos_id])
                  } else {
                    setSelectedHospitals(
                      selectedHospitals.filter((id) => id !== hosdata.hos_id),
                    )
                  }
                  setIsChanged(true)
                }}
              />
              <Label htmlFor="toggle">{hosdata.name}</Label>
            </div>
          ))}
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!predate}
            className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            <CalendarIcon />
            {predate ? format(predate, 'PPP') : <span>검색시작일</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={predate} onSelect={setPreDate} />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!postdate}
            className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            <CalendarIcon />
            {postdate ? format(postdate, 'PPP') : <span>검색종료일</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={postdate} onSelect={setPostDate} />
        </PopoverContent>
      </Popover>
      {selectedHospitals.length > 0 && isChanged && predate && postdate && (
        <Button onClick={selectHospital} className="ml-3">
          분석
        </Button>
      )}
    </div>
  )
}
//   `/hospital/${hos_id}/checklist/${target_date}/chart/${checklistchart.checklist_id}/checklist?edit=${false}`,
