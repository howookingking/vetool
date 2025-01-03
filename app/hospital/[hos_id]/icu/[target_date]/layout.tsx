import IcuFooter from '@/components/hospital/icu/footer/icu-footer'
import IcuHeader from '@/components/hospital/icu/header/icu-header'
import IcuSidebar from '@/components/hospital/icu/sidebar/icu-sidebar'
import { getIcuData } from '@/lib/services/icu/get-icu-data'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import React from 'react'

export default async function IcuPageLayout(props: {
  children: React.ReactNode
  params: Promise<{ target_date: string; hos_id: string }>
}) {
  const params = await props.params

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

  const { basicHosData, icuSidebarData, vetsListData } = await getIcuData(
    params.hos_id,
    params.target_date,
  )

  return (
    <BasicHosDataProvider
      basicHosData={{
        vetsListData: vetsListData,
        groupListData: basicHosData.group_list,
        orderColorsData: basicHosData.order_color as IcuOrderColors,
        memoNameListData: basicHosData.icu_memo_names,
        showOrderer: basicHosData.show_orderer,
        showTxUser: basicHosData.show_tx_user,
        maintenanceRateCalcMethod: basicHosData.maintenance_rate_calc_method,
        rerCalcMethod: basicHosData.rer_calc_method as 'a' | 'b',
        sidebarData: icuSidebarData,
        vitalRefRange: basicHosData.vital_ref_range as VitalRefRange[],
        orderFontSizeData: basicHosData.order_font_size,
        timeGuidelineData: basicHosData.time_guidelines,
        orderColorDisplay: basicHosData.order_color_display,
      }}
    >
      <IcuHeader
        hosId={params.hos_id}
        groupList={basicHosData.group_list}
        vetsData={vetsListData}
      />

      <div className="flex h-icu-chart-main">
        <IcuSidebar
          hosGroupList={basicHosData.group_list}
          icuSidebarData={icuSidebarData}
          vetsListData={vetsListData}
        />

        <div className="ml-0 w-screen flex-1 2xl:ml-48 2xl:w-auto">
          {props.children}
        </div>
      </div>

      <IcuFooter hosId={params.hos_id} targetDate={params.target_date} />
    </BasicHosDataProvider>
  )
}
