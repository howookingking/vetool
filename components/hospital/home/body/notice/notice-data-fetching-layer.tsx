import { getNotices } from '@/lib/services/hospital-home/notice'
import DragAndDropNoticeList from './drag-and-drop-notice-list'

export default async function NoticeDataFetchingLayer({
  hosId,
}: {
  hosId: string
}) {
  
  const noticesData = await getNotices(hosId)

  return <DragAndDropNoticeList hosId={hosId} noticesData={noticesData} />
}
