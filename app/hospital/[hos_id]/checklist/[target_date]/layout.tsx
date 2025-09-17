import ChecklistFooter from '@/components/hospital/checklist/footer/checklist-footer'
import ChecklistSidebar from '@/components/hospital/checklist/sidebar/checklist-sidebar'

export default async function ChecklistPageLayout(props: {
  children: React.ReactNode
  params: Promise<{ target_date: string; hos_id: string }>
}) {
  const { hos_id, target_date } = await props.params

  return (
    <>
      <div className="flex h-desktop">
        <ChecklistSidebar hosId={hos_id} targetDate={target_date} />

        <div className="ml-0 w-screen flex-1 2xl:ml-80 2xl:w-auto">
          {props.children}
        </div>
      </div>

      <ChecklistFooter hosId={hos_id} targetDate={target_date} />
    </>
  )
}
