import Analysis from '@/components/hospital/icu/main/analysis/analysis'
import { getAnalysisData } from '@/lib/services/icu/analysis/get-analysis-data'

export default async function AnalysisPage(
  props: {
    params: Promise<{
      hos_id: string
      target_date: string
    }>
  }
) {
  const params = await props.params;
  const analysisData = await getAnalysisData(params.hos_id, params.target_date)

  return <Analysis analysisData={analysisData} />
}
