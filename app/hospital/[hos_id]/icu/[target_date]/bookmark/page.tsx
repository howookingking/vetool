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

  return (
    <div className="mt-12 flex h-mobile flex-col border-t p-2 2xl:mt-0 2xl:h-desktop 2xl:border-0">
      <Bookmarks bookmarkedChartData={bookmarkedChartData} />
    </div>
  )
}
