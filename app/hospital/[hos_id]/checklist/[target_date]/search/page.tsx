import ChecklistSearchChartEntry from '@/components/hospital/checklist/checklist-search/checklist-search-chart-entry'

export default async function ChecklistSearchPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const params = await props.params
  return <ChecklistSearchChartEntry hosId={params.hos_id} />
}
