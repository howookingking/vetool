import IcuAnalysisEntry from '@/components/hospital/icu/main/analysis/icu-analysis-entry'

export default async function AnalysisPage() {
  return (
    <div className="mt-12 flex h-mobile flex-col border-t p-2 2xl:mt-0 2xl:h-desktop 2xl:border-0">
      <IcuAnalysisEntry />
    </div>
  )
}
