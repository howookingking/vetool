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
        maintenanceRateCalcMethod: basicHosData.maintenance_rate_calc_method,
        rerCalcMethod: basicHosData.rer_calc_method as 'a' | 'b',
        sidebarData: icuSidebarData ?? [],
        vitalRefRange: basicHosData.vital_ref_range as VitalRefRange[],
        orderFontSizeData: basicHosData.order_font_size,
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
          icuSidebarData={icuSidebarData ?? []}
          vetsListData={vetsListData}
        />

        <div className="ml-0 w-screen flex-1 md:ml-48 md:w-auto">
          {props.children}
        </div>
      </div>

      <IcuFooter hosId={params.hos_id} targetDate={params.target_date} />
    </BasicHosDataProvider>
  )
}
