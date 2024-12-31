import { getNotices } from '@/lib/services/hospital-home/notice'
import DragAndDropNoticeList from './drag-and-drop-notice-list'

export default async function NoticeDataFetchingLayer({
  hosId,
}: {
  hosId: string
}) {
  // 1초 넣읍시다
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const noticesData = await getNotices(hosId)

  return <DragAndDropNoticeList hosId={hosId} noticesData={noticesData} />
}
