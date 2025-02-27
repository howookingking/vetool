import DesktopAdminSidebar from '@/components/hospital/admin/desktop-admin-sidebar'
import MobileAdminSidebar from '@/components/hospital/admin/mobile-admin-sidebar'
import { getVetoolUserData } from '@/lib/services/auth/authorization'
import { getBasicHosData } from '@/lib/services/icu/get-basic-hos-data'
import { redirectToOwnHospital } from '@/lib/utils/utils'
import { redirect } from 'next/navigation'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'

export default async function AdminLayout(props: {
  params: Promise<{ hos_id: string }>
  children: React.ReactNode
}) {
  const params = await props.params
  const basicHosData = await getBasicHosData(params.hos_id)
  const vetoolUser = await getVetoolUserData()

  if (!vetoolUser.is_admin) {
    redirect(`/hospital/${params.hos_id}`)
  }
  redirectToOwnHospital(vetoolUser, params.hos_id, vetoolUser.is_super)

  return (
    <BasicHosDataProvider
      basicHosData={{
        vetsListData: [],
        groupListData: basicHosData.group_list,
        orderColorsData: basicHosData.order_color as IcuOrderColors,
        memoNameListData: basicHosData.icu_memo_names,
        showOrderer: basicHosData.show_orderer,
        showTxUser: basicHosData.show_tx_user,
        // maintenanceRateCalcMethod: basicHosData.maintenance_rate_calc_method,
        // rerCalcMethod: basicHosData.rer_calc_method as 'a' | 'b',
        sidebarData: [],
        vitalRefRange: basicHosData.vital_ref_range as VitalRefRange[],
        orderFontSizeData: basicHosData.order_font_size,
        timeGuidelineData: basicHosData.time_guidelines,
        orderColorDisplay: basicHosData.order_color_display,
        plan: basicHosData.plan,
      }}
    >
      <div className="flex flex-col md:flex-row">
        <DesktopAdminSidebar />
        <MobileAdminSidebar />

        <div className="h-screen w-full overflow-auto p-2">
          {props.children}
        </div>
      </div>
    </BasicHosDataProvider>
  )
}
