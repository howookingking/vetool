import ChecklistFooter from '@/components/hospital/checklist/chartlist/footer/checklist-footer'
import ChekclistSidebar from '@/components/hospital/checklist/sidebar/checklist-sidebar'
import { getChecklistData } from '@/lib/services/checklist/get-checklist-data'
import { getIcuData } from '@/lib/services/icu/get-icu-data'
import { getAnnouncementTitlesData } from '@/lib/services/super/announcement/announcement'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors, VitalRefRange } from '@/types/adimin'
import React from 'react'

export default async function ChecklistPageLayout(props: {
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
  const { basicHosData, checklistSidebarData, vetsListData } =
    await getChecklistData(hos_id, target_date)
  const { icuSidebarData } = await getIcuData(hos_id, target_date)

  const announcementTitlesData = await getAnnouncementTitlesData()

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
          orderFontSizeData: basicHosData.order_font_size,
          timeGuidelineData: basicHosData.time_guidelines,
          orderColorDisplay: basicHosData.order_color_display,
          plan: basicHosData.plan,
          isInChargeSystem: basicHosData.is_in_charge_system,
          baselineTime: basicHosData.baseline_time,
        }}
      >
        <div className="flex h-desktop">
          <ChekclistSidebar
            hosId={hos_id}
            hosGroupList={basicHosData.group_list}
            checklistSidebarData={checklistSidebarData}
            vetsListData={vetsListData}
            targetDate={target_date}
          />

          <div className="ml-0 w-screen flex-1 2xl:ml-96 2xl:w-auto">
            {props.children}
          </div>
        </div>
      </BasicHosDataProvider>

      <ChecklistFooter
        hosId={hos_id}
        targetDate={target_date}
        announcementTitlesData={announcementTitlesData}
      />
    </>
  )
}
