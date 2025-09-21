import IcuFooter from '@/components/hospital/icu/footer/icu-footer'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import type { OrderFontSize } from '@/constants/admin/order-font-size'
import type { Plan } from '@/constants/plans'
import { getIcuData } from '@/lib/services/icu/get-icu-data'
import {
  BasicHosDataProvider,
  OrderColorDisplay,
} from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'

export default async function IcuPageLayout(props: {
  children: React.ReactNode
  params: Promise<{ target_date: string; hos_id: string }>
}) {
  // 자신의 병원에만 접근가능
  // RLS 사용할 경우
  // TO authenticated
  // USING (
  //     hos_id = (
  //         SELECT hos_id
  //         FROM users
  //         WHERE auth.uid() = users.user_id
  //     )
  //     OR
  //     EXISTS (
  //         SELECT 1
  //         FROM users
  //         WHERE auth.uid() = users.user_id
  //         AND is_super = true
  //     )
  // )
  // 일단 아래 코드 비활성화
  // const vetoolUser = await getVetoolUserData()
  // redirectToOwnHospital(vetoolUser, params.hos_id, vetoolUser.is_super)

  const { hos_id, target_date } = await props.params
  const { basicHosData, icuSidebarData, vetsListData } = await getIcuData(
    hos_id,
    target_date,
  )

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
          sidebarData: icuSidebarData,
          vitalRefRange: basicHosData.vital_ref_range as VitalRefRange[],
          orderFontSizeData: basicHosData.order_font_size as OrderFontSize,
          timeGuidelineData: basicHosData.time_guidelines,
          orderColorDisplay:
            basicHosData.order_color_display as OrderColorDisplay,
          plan: basicHosData.plan as Plan,
          isInChargeSystem: basicHosData.is_in_charge_system,
        }}
      >
        <div className="flex h-desktop">
          <IcuSidebar
            hosId={hos_id}
            hosGroupList={basicHosData.group_list}
            icuSidebarData={icuSidebarData}
            vetsListData={vetsListData}
          />

          <div className="ml-0 w-screen flex-1 2xl:ml-48 2xl:w-auto">
            {props.children}
          </div>
        </div>
      </BasicHosDataProvider>

      <IcuFooter hosId={hos_id} targetDate={target_date} />
    </>
  )
}
