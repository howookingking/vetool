import AnnouncementDetail from '@/components/announcements/announcement-detail'
import GotoAnnouncementItemsButton from '@/components/announcements/go-to-announcement-items-button'
import NoResultSquirrel from '@/components/common/no-result-squirrel'
import { getAnnouncementDetailData } from '@/lib/services/super/announcement/announcement'

export default async function AnnouncementDetailPage(props: {
  params: Promise<{
    announcement_id: string
  }>
}) {
  const { announcement_id } = await props.params
  const announcementDetailData =
    await getAnnouncementDetailData(announcement_id)

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
      <GotoAnnouncementItemsButton />
      <AnnouncementDetail announcementDetailData={announcementDetailData} />
    </div>
  )
}
