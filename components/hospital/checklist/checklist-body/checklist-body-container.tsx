'use client'

import ChecklistBodyTable from '@/components/hospital/checklist/checklist-body/checklist-body-checklist/checklist-body-table'
import ChecklistTimetableRecord from '@/components/hospital/checklist/checklist-body/checklist-body-checklist/checklist-timetable-record'
import ChecklistBodyInformation from '@/components/hospital/checklist/checklist-body/checklist-body-information'
import ChecklistBodyProtocol from '@/components/hospital/checklist/checklist-body/checklist-body-protocol/checklist-body-protocol'
import ChecklistIntervalMin from '@/components/hospital/checklist/checklist-body/checklist-interval-min'
import ChecklistStartEndTimeSet from '@/components/hospital/checklist/checklist-body/checklist-startend-timeset'
import GeneralClock from '@/components/hospital/checklist/common/generalclock'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useIsMobile from '@/hooks/use-is-mobile'
import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/get-checklist-data-client'
import { useState } from 'react'
import ChecklistBodyTableMobile from './checklist-body-checklist/checklist-body-table-mobile'

type Props = {
  checklistData: ChecklistWithPatientWithWeight
}
export default function ChecklistBodyContainer({ checklistData }: Props) {
  const isMobile = useIsMobile()

  return (
    <div className="flex-col">
      <div className="flex flex-wrap">
        <GeneralClock />

        {!checklistData.end_time && (
          <ChecklistIntervalMin startime={checklistData.start_time!} />
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
          {/* {isMobile && <TabsTrigger value="mobileOnly">모바일전용</TabsTrigger>} */}
        </TabsList>

        <TabsContent value="checklist">
          <ChecklistBodyTable checklistData={checklistData} />
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
        {/* {isMobile && (
          <TabsContent value="mobileOnly">
            <ChecklistBodyTableMobile
              checklistData={checklistData}
              timeMin={timeMin}
            />
          </TabsContent>
        )} */}
      </Tabs>
      <Separator className="m-3" />
    </div>
  )
}
