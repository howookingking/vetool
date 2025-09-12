import ChecklistFooter from '@/components/hospital/checklist/footer/checklist-footer'
import ChecklistSidebar from '@/components/hospital/checklist/sidebar/checklist-sidebar'
import type { OrderFontSize } from '@/constants/admin/order-font-size'
import type { Plan } from '@/constants/plans'
import { getChecklistData } from '@/lib/services/checklist/get-checklist-data'
import {
  BasicHosDataProvider,
  OrderColorDisplay,
} from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'

export default async function ChecklistPageLayout(props: {
  children: React.ReactNode
  params: Promise<{ target_date: string; hos_id: string }>
}) {
  const { hos_id, target_date } = await props.params
  const { basicHosData, checklistSidebarData, vetsListData } =
    await getChecklistData(hos_id, target_date)

  return (
    <>
      <BasicHosDataProvider
        basicHosData={{
          vetsListData: vetsListData,
          groupListData: basicHosData.group_list,
          orderColorsData: basicHosData.order_color as IcuOrderColors,
          memoNameListData: basicHosData.icu_memo_names,
          showOrderer: basicHosData.show_orderer,
          showTxUser: basicHosData.show_tx_user,
          sidebarData: [],
          vitalRefRange: basicHosData.vital_ref_range as VitalRefRange[],
          orderFontSizeData: basicHosData.order_font_size as OrderFontSize,
          timeGuidelineData: basicHosData.time_guidelines,
          orderColorDisplay:
            basicHosData.order_color_display as OrderColorDisplay,
          plan: basicHosData.plan as Plan,
          isInChargeSystem: basicHosData.is_in_charge_system,
          baselineTime: basicHosData.baseline_time,
        }}
      >
        <div className="flex h-desktop">
          <ChecklistSidebar
            hosId={hos_id}
            checklistsidebarData={checklistSidebarData}
            targetDate={target_date}
          ></ChecklistSidebar>
          <div className="ml-0 w-screen flex-1 2xl:ml-96 2xl:w-auto">
            {props.children}
          </div>
        </div>
      </BasicHosDataProvider>
      <ChecklistFooter
        hosId={hos_id}
        targetDate={target_date}
      ></ChecklistFooter>
    </>
  )
}
