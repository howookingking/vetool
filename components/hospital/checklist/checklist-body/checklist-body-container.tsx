'use client'
import { ChecklistData } from '@/types/checklist/checklist-type'
import GeneralClock from '@/components/hospital/checklist/common/generalclock'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ChecklistStartEndTimeSet from '@/components/hospital/checklist/checklist-body/checklist-startend-timeset'
import ChecklistIntervalMin from '@/components/hospital/checklist/checklist-body/checklist-interval-min'
import { useState } from 'react'
import ChecklistBodyInformation from '@/components/hospital/checklist/checklist-body/checklist-body-information'
import ChecklistBodyTable from '@/components/hospital/checklist/checklist-body/checklist-body-checklist/checklist-body-table'
import useIsMobile from '@/hooks/use-is-mobile'
import ChecklistBodyTableMobile from '@/components/hospital/checklist/checklist-body/checklist-body-checklist/checklist-body-table-mobile'
import ChecklistBodyProtocol from '@/components/hospital/checklist/checklist-body/checklist-body-protocol/checklist-body-protocol'
import ChecklistTimetableRecord from '@/components/hospital/checklist/checklist-body/checklist-body-checklist/checklist-timetable-record'

type Props = {
  checklistData: ChecklistData
}
export default function ChecklistBodyContainer({ checklistData }: Props) {
  const [timeMin, setTimeMin] = useState<number>(0)
  // const isMobile = useIsMobile()
  const isMobile = true
  // const isMobile = true
  return (
    <div className="flex-col">
      <div className="flex flex-wrap">
        <GeneralClock />
        <span className="ml-3 text-xl">시작후</span>
        {!checklistData.endtime && (
          <ChecklistIntervalMin
            startime={checklistData.starttime}
            setChecklistTimes={(intervaltime: string) => {
              setTimeMin(Number(intervaltime))
            }}
          />
        )}
      </div>
      <div className="m-3 flex max-w-[400px] flex-col gap-2 rounded border bg-gray-100 p-4">
        <ChecklistStartEndTimeSet checklistData={checklistData} />
      </div>
      <Tabs
        defaultValue={isMobile ? 'mobileOnly' : 'checklist'}
        className="m-3 w-[400px] sm:w-[800px] xl:w-full"
      >
        <TabsList>
          <TabsTrigger value="checklist">체크리스트</TabsTrigger>
          <TabsTrigger value="info">처치정보</TabsTrigger>
          {checklistData.checklist_protocol &&
            checklistData.checklist_protocol.length > 0 && (
              <TabsTrigger value="protocol">프로토콜</TabsTrigger>
            )}
          {isMobile && <TabsTrigger value="mobileOnly">모바일전용</TabsTrigger>}
        </TabsList>
        <TabsContent value="checklist">
          <ChecklistBodyTable checklistData={checklistData} timeMin={timeMin} />
          <ChecklistTimetableRecord checklistData={checklistData} />
        </TabsContent>
        <TabsContent value="info">
          <ChecklistBodyInformation checklistData={checklistData} />
        </TabsContent>
        {checklistData.checklist_protocol &&
          checklistData.checklist_protocol.length > 0 && (
            <TabsContent value="protocol">
              <ChecklistBodyProtocol checklistData={checklistData} />
            </TabsContent>
          )}
        {isMobile && (
          <TabsContent value="mobileOnly">
            <ChecklistBodyTableMobile
              checklistData={checklistData}
              timeMin={timeMin}
            />
          </TabsContent>
        )}
      </Tabs>
      <Separator className="m-3" />
    </div>
  )
}
