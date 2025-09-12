import { getHosDatas } from '@/components/hospital/analysis/analysis-lib'
import { HosData } from '@/components/hospital/analysis/analysis-type'
import AnalysisHeader from '@/components/hospital/analysis/analysisheader'

export default async function AnalysisPageLayout(props: {
  children: React.ReactNode
  params: Promise<{ target_date: string; hos_id: string }>
}) {
  const hosdatas = (await getHosDatas()) as HosData[]

  // const allIcuIoDatas = await getAllIcuIoData()
  return (
    <div>
      <div>
        <AnalysisHeader hosdatas={hosdatas} />
      </div>
      <div>{props.children}</div>
    </div>
  )
}
