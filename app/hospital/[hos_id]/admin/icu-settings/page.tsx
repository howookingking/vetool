import IcuSettingsTab from '@/components/hospital/admin/icu-settings/icu-settings-tab'
import { fetchIcuLayoutData } from '@/lib/services/icu/icu-layout'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'

export default async function AdminIcuSettingsPage(props: {
  params: Promise<{ hos_id: string }>
}) {
  const { hos_id } = await props.params

  const {
    basicHosSettings: {
      group_list,
      icu_memo_names,
      is_in_charge_system,
      order_color,
      order_font_size,
      show_orderer,
      show_tx_user,
      plan,
      time_guidelines,
      vital_ref_range,
    },
    vetList,
  } = await fetchIcuLayoutData(hos_id, '2023-01-01')

  return (
    <BasicHosDataProvider
      basicHosData={{
        vetList: vetList,
        groupListData: group_list,
        orderColorsData: order_color,
        memoNameListData: icu_memo_names,
        showOrderer: show_orderer,
        showTxUser: show_tx_user,
        icuSidebarPatients: [],
        vitalRefRange: vital_ref_range,
        orderFontSizeData: order_font_size,
        timeGuidelineData: time_guidelines,
        plan: plan,
        isInChargeSystem: is_in_charge_system,
      }}
    >
      <IcuSettingsTab hosId={hos_id} />
    </BasicHosDataProvider>
  )
}
