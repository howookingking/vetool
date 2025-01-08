import Analysis from '@/components/hospital/icu/main/analysis/analysis'

export default async function AnalysisPage() {
  return (
    <div className="mt-12 flex h-mobile flex-col border-t p-2 2xl:mt-0 2xl:h-desktop 2xl:border-0">
      <Analysis />
    </div>
  )
}
