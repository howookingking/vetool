import ChecklistSearchChartEntry from '@/components/hospital/checklist/checklist-search/checklist-search-chart-entry'

export default async function ChecklistSearchPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  return (
    <div className="mt-12 flex h-mobile flex-col border-t p-2 2xl:mt-0 2xl:h-desktop 2xl:border-0">
      <ChecklistSearchChartEntry hosId={params.hos_id} />
    </div>
  )
}
