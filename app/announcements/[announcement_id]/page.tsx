import SingleAnnouncement from '@/components/announcements/single-announcement'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { getSingleAnouncement } from '@/lib/services/super/announcement/announcement'

export default async function AnnouncementDetailPage(props: {
  params: Promise<{
    announcement_id: string
  }>
}) {
  const { announcement_id } = await props.params
  const announcementDetailData = await getSingleAnouncement(announcement_id)

  if (!announcementDetailData) {
    return (
      <NoResultSquirrel
        className="h-screen"
        text="공지사항이 존재하지 않습니다"
      />
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <SingleAnnouncement announcementDetailData={announcementDetailData} />
    </div>
  )
}
