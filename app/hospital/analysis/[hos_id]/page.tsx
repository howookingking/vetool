import AnalysisCountContainer from '@/components/hospital/analysis/analysis-count-container'
import {
  getHosDatas,
  getHosIoDatas,
  getKeywordDatas,
} from '@/components/hospital/analysis/analysis-lib'
import { IcuIo } from '@/components/hospital/analysis/analysis-type'
import path from 'path'

export default async function AnalysisPage(props: {
  children: React.ReactNode
  params: { hos_id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const params = await props.params
  const searchParams = await props.searchParams

  const predate = searchParams.predate as string
  const postdate = searchParams.postdate as string
  const ids = searchParams.hos_ids as string | string[]
  const hosIdsArray =
    typeof ids === 'string' ? [ids] : Array.isArray(ids) ? ids : []
  //   const ids = params.hos_id.split('#')

  const ioDatas: IcuIo[] =
    hosIdsArray.length > 0 && predate && postdate
      ? await getHosIoDatas(hosIdsArray, predate, postdate)
      : []
  const keywords = await getKeywordDatas()

  return (
    <div>
      <div>필터링 전 검색된 환자수 : {ioDatas && ioDatas.length}</div>
      {ioDatas && keywords && (
        <AnalysisCountContainer
          IoDatas={ioDatas}
          keywords={keywords}
          predate={predate}
          postdate={postdate}
        />
      )}
    </div>
  )
}
