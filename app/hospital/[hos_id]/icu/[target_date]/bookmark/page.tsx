import Bookmarks from '@/components/hospital/icu/main/bookmark/bookmarks'
import { getBookmarkedChartData } from '@/lib/services/icu/bookmark/bookmark'

export default async function BookmarkPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const params = await props.params
  const bookmarkedChartData = await getBookmarkedChartData(
    params.hos_id as string,
  )

  return <Bookmarks bookmarkedChartData={bookmarkedChartData} />
}
