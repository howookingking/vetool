import AnnouncementsDetail from '@/components/announcements/announcements-detail'
import BackToAnnouncementsButton from '@/components/announcements/back-to-announcement-button'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { fetchAnnouncementDetail } from '@/lib/services/super/announcement/announcement'

export default async function AnnouncementDetailPage(props: {
  params: Promise<{
    announcement_id: string
  }>
}) {
  const { announcement_id } = await props.params
  const announcementDetailData = await fetchAnnouncementDetail(announcement_id)

  if (!announcementDetailData) {
    return (
      <NoResultSquirrel
        className="h-screen"
        text="공지사항이 존재하지 않습니다"
      />
    )
  }

  return (
    <div className="space-y-2 p-2">
      <BackToAnnouncementsButton />
      <AnnouncementsDetail announcementDetailData={announcementDetailData} />
    </div>
  )
}
