import ErrorLogDashboard from '@/components/hospital/super/errors/error-logs'
import FeedBackDashBoard from '@/components/hospital/super/feedbacks/feedback-dash-board'
import HospitalTable from '@/components/hospital/super/hospitals/hospitals-table'
import AnnouncementForm from '@/components/hospital/super/announcements/announcement-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getErrorFeedback } from '@/lib/services/error-feedback/error-feedback'
import { getFeedback } from '@/lib/services/super/feedback/feedback'
import type { HosListData } from '@/types/hospital'

export default async function SuperPageTabs({
  hosList,
}: {
  hosList: HosListData[]
}) {
  const errorLogData = await getErrorFeedback('all')
  const userFeedbackData = await getFeedback()

  return (
    <Tabs defaultValue="hosList" className="w-full p-2" orientation="vertical">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="hosList">병원 목록</TabsTrigger>
        <TabsTrigger value="errors">에러 로그</TabsTrigger>
        <TabsTrigger value="feedback">사용자 피드백</TabsTrigger>
        <TabsTrigger value="announcement">공지사항 작성</TabsTrigger>
      </TabsList>

      <TabsContent value="hosList">
        <HospitalTable hosList={hosList} />
      </TabsContent>

      <TabsContent value="errors">
        <ErrorLogDashboard errorLogs={errorLogData} />
      </TabsContent>

      <TabsContent value="feedback">
        <FeedBackDashBoard userFeedBackData={userFeedbackData} />
      </TabsContent>

      <TabsContent value="announcement">
        <AnnouncementForm userFeedBackData={userFeedbackData} />
      </TabsContent>
    </Tabs>
  )
}
